import React from 'react'
import Camera from './Camera'
import GetImage from './GetImage'
const GetPhoto = ({ sendPhoto }: { sendPhoto: (value: string) => void }) => {
  return (
    <>
      <Camera sendPhoto={sendPhoto} />
      <GetImage sendPhoto={sendPhoto} />
    </>
  )
}

export default React.memo(GetPhoto)
