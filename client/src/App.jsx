
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
import AllUsers from './pages/Admin/AllUsers'
import AdminAllBlogs from './pages/Admin/AdminAllBlogs'
import UpdateBlog from './pages/Admin/UpdateBlog'
import City from './pages/City'
import Dashboard from './pages/Admin/Dashboard'
import Lead from './pages/Admin/Lead'
import ReadBlog from './pages/ReadBlog'
import Author from './pages/Author'
import AllProjects from './pages/AllProjects'

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
        <Route path='/project/:slug' element={<ProjectViewPage />} />
        <Route path='/projects/page/:page' element={<AllProjects />} />
        <Route path='/denied' element={<Denied />} />
        <Route path='/city/:cityname' element={<City />} />
        <Route path='/blog/:slug' element={<ReadBlog />} />
        <Route path='/author' element={<Author />} />

        <Route path='/admin/dashboard' element={<Dashboard />} />

        <Route element={<RequireAuth allowedRoles={["ADMIN"]} />}>

        </Route>
        <Route path='admin/dashboard/leads/page/:page' element={<Lead />} />
        <Route path='admin/dashboard/update-project/:projectId' element={<EditProject />} />
        <Route path='admin/dashboard/users/page/:page' element={<AllUsers />} />
        <Route path='admin/dashboard/add-project' element={<CreateProject />} />
        <Route path='admin/dashboard/all-projects' element={<AdminGetAllProject />} />
        <Route path='/admin/dashboard/add-blog' element={<CreateBlog />} />
        <Route path='admin/dashboard/blogs/page/:page' element={<AdminAllBlogs />} />
        <Route path='admin/dashboard/blogs/update/:id' element={<UpdateBlog />} />
        <Route path='*' element={<NotFound />} />
      </Routes>


    )
  );

}

export default App
