import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { LoginResister } from './components/LoginResister' 

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <LoginResister/>
    </>
  )
}

export default App
