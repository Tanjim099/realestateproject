import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage'
import ProjectViewPage from './pages/ProjectViewPage'

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path='/project' element={<ProjectViewPage />} />
    </Routes>
  )
}

export default App
