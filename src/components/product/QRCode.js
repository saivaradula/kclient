import React from 'react'
import { QRCode } from 'react-qrcode-logo'

export default function QrCode(props) {
  const defaultOptions = {
    ecLevel: 'M',
    enableCORS: false,
    size: 150,
    quietZone: 10,
    bgColor: '#FFFFFF',
    fgColor: '#000000',
    logoImage: '',
    logoWidth: 30,
    logoHeight: 30,
    logoOpacity: 1,
    qrStyle: 'square',
  }

  const options = { ...defaultOptions, ...props.options }

  return <QRCode value={props.url} {...options} />
}
