import React, { useEffect, useState } from 'react'
import CryptoJS from 'crypto-js'
import { Item } from './components/Item'
import { Input } from './components/Input'

function App() {
  const [key, setKey] = useState('Secret key')
  const [message, setMessage] = useState('Este es un mensaje para calcular HMAC con SHA256')
  const [ipad, setIpad] = useState('69706164')
  const [opad, setOpad] = useState('6f706164')
  const [hmacResult, setHmacResult] = useState('')

  useEffect(() => {
    hmac()
  }, [key, message])

  function hmac() {
    // Convert to hexadecimal
    const keyHex = CryptoJS.enc.Utf8.parse(key)
    const messageHex = CryptoJS.enc.Utf8.parse(message)

    const ipadHex = CryptoJS.enc.Hex.parse(ipad)
    const opadHex = CryptoJS.enc.Hex.parse(opad)

    // Step 1: XOR between keyHex and ipadHex then opadHex
    const keyXorIpad = xorHex(keyHex.toString(), ipadHex.toString())
    const keyXorOpad = xorHex(keyHex.toString(), opadHex.toString())

    // Step 2: Concatenate keyXorIpad with messageHex
    const hmacStep1 = keyXorIpad.concat(messageHex)

    // Step 3: Concatenate keyXorOpad with the result of Step 2, and hash it with SHA256
    const hmacStep2 = CryptoJS.SHA256(keyXorOpad.concat(hmacStep1))

    // Step 4: Convert the final hash to a hexadecimal string
    const hmacResultHex = hmacStep2.toString(CryptoJS.enc.Hex)

    setHmacResult(hmacResultHex);
  }

  function xorHex(a, b) {
    // Ensure both inputs are of the same length
    const maxLength = Math.max(a.length, b.length)
    a = a.padStart(maxLength, '0')
    b = b.padStart(maxLength, '0')

    // Perform XOR byte by byte
    let result = ''
    for (let i = 0; i < maxLength; i += 2) {
      const byteA = parseInt(a.substr(i, 2), 16)
      const byteB = parseInt(b.substr(i, 2), 16)
      const xorResult = (byteA ^ byteB).toString(16).padStart(2, '0')
      result += xorResult
    }

    return result
  }

  return (
    <main className='flex flex-col min-h-screen items-center justify-center bg-gray-100 dark:bg-neutral-900 py-16 gap-8'>
      <h1 className='mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white'>
        HMAC con
        <span className='text-blue-600 dark:text-blue-500'> SHA256 </span>
      </h1>
      <Input setKey={setKey} setMessage={setMessage} />
      <div className='flex flex-col w-2/4 gap-6 p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-zinc-800 dark:border-zinc-700'>
        <Item name='Key' value={key} />
        <Item name='Message' value={message} />
        <Item name='ipadHex' value={ipad} />
        <Item name='opadHex' value={opad} />
        <Item name='HMAC' value={hmacResult} />
      </div>
    </main>
  )
}

export default App
