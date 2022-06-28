import AsyncStorage from '@react-native-async-storage/async-storage'
import JWT from 'expo-jwt'
import { setToken } from 'graphql/config'
import React, { useContext, useEffect, useState } from 'react'
import { getUserPrivilege } from 'services/session'
import { getUserFn, setPushTokenFn } from 'services/user'
import { getWorkerFn } from 'services/workers'
import { $security } from '../config'
import { IWorker, Privilege, typeAuthContext, User } from '../types/types'
import useData from './DataContext'

const AuthContext = React.createContext<typeAuthContext>({} as typeAuthContext)

export const AuthProvider = ({
  children,
  isLogin,
  setIsLogin
}: {
  children: JSX.Element
  isLogin: boolean
  setIsLogin: React.Dispatch<React.SetStateAction<boolean>>
}) => {
  //hooks
  const { section, setLoading, tokenExpo } = useData()
  //States

  const [alreadyLogin, setAlreadyLogin] = useState(false)
  const [user, setUser] = useState<User | IWorker>()
  const [permissions, setPermissions] = useState<Privilege>()
  const [worker, setWorker] = useState(false)

  useEffect(() => {
    ;(async () => {
      if (isLogin) {
        setLoading(true)
        const isWorker = await AsyncStorage.getItem('worker')
        const user = JSON.parse((await AsyncStorage.getItem('user')) as string)

        if (isWorker) {
          const workerData = await getWorkerFn(user._id as string)
          if (workerData) {
            setUser(workerData)
            setWorker(true)
          } else {
            logout()
          }
        } else {
          const userData = await getUserFn(user._id as string)
          if (userData) {
            setUser(userData)
            const permissions = JSON.parse((await AsyncStorage.getItem('permissions')) as string)
            setPermissions(permissions)
          } else {
            logout()
          }
        }
        setLoading(false)
      }
    })()
  }, [isLogin])

  useEffect(() => {
    if (user && worker) {
      setAlreadyLogin(true)
    }
    if (user && permissions) {
      setAlreadyLogin(true)
    }
  }, [user, permissions, worker])

  const refetchWorker = async () => {
    const workerData = await getWorkerFn(user?._id as string)
    setUser(workerData)
    await AsyncStorage.setItem('user', JSON.stringify(workerData))
    await AsyncStorage.setItem('worker', 'yes')
    setWorker(true)
  }

  const login = async (token: string, worker?: boolean) => {
    try {
      setLoading(true)
      const data = JWT.decode(token, $security.secretKey, { timeSkew: 30 })
      await AsyncStorage.setItem('token', token)
      setToken(token)
      const dataUser = data.data as User
      if (worker) {
        const workerData = await getWorkerFn(dataUser._id as string)
        if (!workerData?.tokenExpo) {
          await setPushTokenFn(workerData._id as string, tokenExpo, 'worker')
        }
        setUser(workerData)
        await AsyncStorage.setItem('user', JSON.stringify(workerData))
        await AsyncStorage.setItem('worker', 'yes')
        setWorker(true)
      } else {
        const userData = await getUserFn(dataUser._id as string)
        if (!userData?.tokenExpo) {
          await setPushTokenFn(userData._id as string, tokenExpo, 'user')
        }
        setUser(userData)

        await AsyncStorage.setItem('user', JSON.stringify(userData))
        const perm = await getUserPrivilege(dataUser.privilegeID)
        var totalPrivilege: Privilege = JSON.parse(JSON.stringify(perm))
        totalPrivilege.permissions?.map(
          l => (l.sectionName = section.find(r => r._id === l.sectionID)?.name)
        )
        setPermissions(totalPrivilege)
        await AsyncStorage.setItem('permissions', JSON.stringify(totalPrivilege))
      }
    } catch (error) {
      console.info(error)
      // throw new Error(error)
    } finally {
      setLoading(false)
    }
  }

  const logout = async () => {
    try {
      setAlreadyLogin(false)
      setIsLogin(false)
      setUser(undefined)
      setPermissions(undefined)
      setWorker(false)
      await AsyncStorage.multiRemove(['user', 'permissions', 'token', 'worker'])
    } catch (error) {
      console.error(error)
    }
  }
  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: alreadyLogin || isLogin,
        login,
        refetchWorker,
        worker,
        logout,
        permissions
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export default function useAuth() {
  return useContext(AuthContext)
}
