import React, { useState } from 'react';
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    UploadOutlined,
    UserOutlined,
    VideoCameraOutlined,
} from '@ant-design/icons';
import { GrProjects, GrUserAdmin } from "react-icons/gr";
import { AiFillProject } from "react-icons/ai";
import { FaStackOverflow } from "react-icons/fa";
import { MdOutlineMoveToInbox } from "react-icons/md";
import { Layout, Menu, Button, theme } from 'antd';
import { useNavigate, Link } from 'react-router-dom';
import "../styles/AdminLayout.css"
import { useSelector } from 'react-redux';

const { Header, Sider, Content } = Layout;

function AdminLayout({ children }) {
    const navigate = useNavigate();
    const [collapsed, setCollapsed] = useState(false);
    const { editProject } = useSelector((state) => state.project);
    console.log(editProject);
    const {
        token: { colorBgContainer },
    } = theme.useToken();


    const menuItems = [
        {
            key: '1',
            icon: <FaStackOverflow />,
            label: 'Dashboard',
            link: '',
        },
        {
            key: '2',
            icon: <MdOutlineMoveToInbox />,
            label: 'Inbox',
            link: 'inbox',
        },
        {
            key: '3',
            icon: <FaStackOverflow />,
            label: 'Lead',
            link: 'leads/page/1',
        },
        {
            key: '4',
            icon: <UserOutlined />,
            label: 'All Users',
            link: 'users/page/1',
        },
        {
            key: '5',
            icon: <GrProjects />,
            label: 'All Project',
            link: 'all-projects',
        },
        {
            key: '6',
            icon: <AiFillProject />,
            label: `${editProject ? 'Edit Project' : 'Add Project'}`,
            link: 'add-project',
        },
        {
            key: '7',
            icon: <AiFillProject />,
            label: 'All Blog',
            link: 'blogs/page/1',
        },
        {
            key: '8',
            icon: <GrUserAdmin />,
            label: 'Add Blog',
            link: 'add-blog',
        },
        {
            key: '9',
            icon: <GrUserAdmin />,
            label: 'Author',
            link: 'author',
        },

    ];
    return (
        <Layout className='h-100' style={{ height: '100vh' }}>
            <Sider trigger={null} collapsible collapsed={collapsed} className='overflow-y-scroll sideBar'>

                <div className='demo-logo-vertical' />
                <h2 mode='inline' className=' text-center text-sm text-white my-2'>Dashboard</h2>
                <Menu
                    theme='dark'
                    mode='inline'
                    defaultSelectedKeys={['1']}
                >

                    {menuItems.map(item => (
                        <Menu.Item key={item.key} icon={item.icon}>
                            <Link to={`/admin/dashboard/${item.link}`}>{item.label}</Link>
                        </Menu.Item>
                    ))}
                </Menu>
            </Sider>
            <Layout>
                <Header
                    style={{
                        padding: 0,
                        background: colorBgContainer,
                    }}
                    className=' flex items-center justify-between'
                >

                    <Button
                        type='text'
                        icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                        onClick={() => setCollapsed(!collapsed)}
                        style={{
                            fontSize: '16px',
                            width: 64,
                            height: 64,
                        }}
                    />

                    <div className="dropdown dropdown-end mr-4 ">
                        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar flex">
                            <div className="w-10 rounded-full ">
                                <img alt="Tailwind CSS Navbar component" src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
                            </div>
                        </div>
                        <ul className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
                            <li>
                                <a className="justify-between">
                                    Profile
                                    <span className="badge">New</span>
                                </a>
                            </li>
                            <li><a>Settings</a></li>
                            <li><a>Logout</a></li>
                        </ul>
                    </div>
                </Header>
                <Content
                    style={{
                        margin: '24px 16px',
                        padding: 24,
                        minHeight: 280,
                        background: colorBgContainer,
                    }}
                    className=' overflow-y-scroll content'
                >
                    {children}
                </Content>
            </Layout>
        </Layout>
    );
}

export default AdminLayout;
