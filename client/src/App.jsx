
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
import AdminLayout from './components/AdminLayout'
import Profile from './pages/Profile'
import ForgotPassword from './pages/ForgotPassword'
import CreateBlog from './pages/Admin/CreateBlog'
import AdminGetAllProject from './pages/Admin/AdminGetProject'

function App() {

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
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
        <Route path='/admin/dashboard' element={<AdminLayout />} />

        <Route element={<RequireAuth allowedRoles={["ADMIN"]} />}>

          <Route path='/update-project/:courseId' element={<EditProject />} />
        </Route>
        <Route path='admin/dashboard/add-project' element={<CreateProject />} />
        <Route path='admin/dashboard/all-projects' element={<AdminGetAllProject />} />
        <Route path='admin/dashboard/add-blog' element={<CreateBlog />} />

      </Routes>


    )
  );

}

export default App
