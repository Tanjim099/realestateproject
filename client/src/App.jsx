
import './App.css'
import { Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage'
import ProjectViewPage from './pages/ProjectViewPage'
import CreateProject from './pages/Admin/CreateProject'
import Register from './pages/Register'
import Login from './pages/Login'
import VerifyEmail from './pages/VerifyEmail'
import EditProject from './pages/Admin/EditProject'
import { useEffect, useState } from 'react'
import Spinner from './components/Spinner'
import RequireAuth from './components/auth/RequireAuth'
import NotFound from './pages/NotFound'
import Denied from './pages/Denied'
import ForgotPassword from './pages/ForgotPassword'
import Profile from './pages/Profile'

function App() {

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 4000);
  }, []);

  return (
    loading ? (
      <Spinner />
    ) : (
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/verify-email" element={<VerifyEmail />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/user-profile" element={<Profile />} />
        <Route path='/project/:id' element={<ProjectViewPage />} />
        <Route path='/denied' element={<Denied />} />
        <Route path='*' element={<NotFound />} />

        <Route element={<RequireAuth allowedRoles={["ADMIN"]} />}>
          <Route path='/create-project' element={<CreateProject />} />
          <Route path='/update-project/:courseId' element={<EditProject />} />
        </Route>
      </Routes>
    )
  );

}

export default App
