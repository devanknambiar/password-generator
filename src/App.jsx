import { useCallback, useEffect, useState, useRef } from 'react'
import './App.css'

function App() {
  const [length,setLength] = useState(10)
  const [numberAllowed, setNumberAllowed] = useState(false)
  const [charAllowed, setCharAllowed] = useState(false)
  const [pswd, setPswd] = useState("")

  const pswdRef = useRef(null)

  const pswdGenerator = useCallback(() => {
    let pass = ""
    let strn = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"

    if (charAllowed) {
      strn += "!@#$%^&*()-_=+[]{}|;:,.<>?/~"
    }
    if (numberAllowed) {
      strn += "0123456789"
    }
    for (let i = 0; i < length; i++) {
      let key = Math.floor(Math.random() * strn.length)
      pass += strn.charAt(key)

    }
    setPswd(pass)
  }, [length, numberAllowed, charAllowed, setPswd])

  useEffect(() => {
    pswdGenerator()
  }, [pswdGenerator])

  const pswdCopy = () => {
    navigator.clipboard.writeText(pswdRef.current.value)
    pswdRef.current.select()
  }

  const regeneratePswd = () => {
    pswdGenerator()
  }

  return (
    <>
      <div className="flex justify-center items-center min-h-screen">
        <div className="w-full max-w-lg px-8 py-4 rounded-lg text-3xl bg-gray-700">
          <div className="flex gap-x-2 items-center">
            <h1 className='flex-none text-white'>Password Generator</h1>
            <h1 className="ml-auto">🔐</h1>
          </div>
          <div className="flex overflow-hidden mt-4 rounded-xl">
            <div className="relative w-full">
            <input 
            type="text"
            placeholder='password'
            className='w-full bg-white pl-2 pr-14 py-3 cursor-not-allowed'
            ref={pswdRef}
            value={pswd}
            readOnly
            />
            <div className="flex w-14 items-center justify-center inset-y-0  right-0 absolute cursor-pointer">
              <img 
              src="./src/assets/loader.svg" alt="regenerate" 
              className='h-10 hover:animate-oppspin'
              onClick={regeneratePswd}
              />
            </div>
            </div>
            <button
            className='bg-blue-700 hover:bg-blue-500 active:text-black transition-colors text-white outline-none shrink-0 px-2 py-0.5'
            onClick={pswdCopy}
            >Copy</button>
          </div>
          <div className="flex gap-x-2 text-sm mt-4 text-white">
            <div className="flex items-center gap-x-1">
              <input 
              type="range" name="length" id="length"
              min={8}
              max={15}
              value={length}
              className='cursor-pointer'
              onChange={e => setLength(e.target.value)}
              />
              <label htmlFor="length">Length: {length}</label>
            </div>
            <div className="flex items-center gap-x-1">
              <input 
              type="checkbox" name="number" id="number"
              checked={numberAllowed}
              onChange={() => setNumberAllowed(prev => !prev)}
              />
              <label htmlFor="number">Number</label>
            </div>
            <div className="flex items-center gap-x-1">
              <input 
              type="checkbox" name="character" id="character"
              checked={charAllowed}
              onChange={() => setCharAllowed(prev => !prev)}
              />
              <label htmlFor="character">Character</label>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
