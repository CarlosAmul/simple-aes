import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Decrypt from './Decrypt'
import Encrypt from './Encrypt'

function App() {

  const [mode, setMode] = useState("Decrypt")

  return (
    <div id='container'>
      <div id='options'>
        <button disabled={mode==='Encrypt'} onClick={()=>setMode("Encrypt")}>Encrypt</button>
        <button disabled={mode==='Decrypt'} onClick={()=>setMode("Decrypt")}>Decrypt</button>
      </div>
       {
          mode === "Decrypt" ?
            <Decrypt /> : <Encrypt />
        }
    </div>
  )
}

export default App
