import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import HomeLayout from './components/HomeLayout'

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomeLayout />} />
    </Routes>
  )
}

export default App
