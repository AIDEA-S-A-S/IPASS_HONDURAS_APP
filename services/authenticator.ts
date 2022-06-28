import axios from 'axios'
import constant from '../constants/Layout'
export const verifyQrAuthenticator = async (code: string, id: string): Promise<{ status: string; message: string; code: string }> => {
  return (
    await axios({
      method: 'POST',
      url: `${constant.url}/authenticator/verify`,
      data: {
        code,
        id
      }
    })
  ).data
}
