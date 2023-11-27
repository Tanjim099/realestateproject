import { TiThMenu } from "react-icons/ti"
import { Link, NavLink, useNavigate } from "react-router-dom"
import { AiFillCloseCircle } from 'react-icons/ai';
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/slices/authSlice";
function Navbar() {


    const dispatch = useDispatch();
    const navigate = useNavigate();
    const hideDrawer = () => {
        const element = document.getElementsByClassName('drawer-toggle');
        element[0].checked = false;
    }

    const { data } = useSelector((state) => state.auth);
    // console.log(data);

    const handelLogout = async (e) => {
        // e.preventDefault();
       const res = await dispatch(logout());
       console.log(res);
       if(res?.payload?.success) window.location.reload();
    }

    return (
        <div className="navbar bg-[#7f1657] z-10 sticky top-0 left-0 right-0">
            <div className="flex-1">

                <div>
                    <div className="drawer flex items-center z-20">
                        <input id="my-drawer" type="checkbox" className="drawer-toggle" />
                        <div className="drawer-content">
                            {/* Page content here */}
                            <label htmlFor="my-drawer" className=" btn  h-auto text-white text-3xl bg-transparent border-0 hover:bg-transparent  drawer-button"><TiThMenu /></label>
                        </div>
                        <div className="drawer-side">
                            <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
                            <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
                                <li className='w-fit absolute right-2 z-50'>
                                    <button>
                                        <AiFillCloseCircle
                                            size={"24px"}
                                            onClick={hideDrawer}
                                        />
                                    </button>
                                </li>
                                {/* Sidebar content here */}
                                <li><a>Property</a></li>
                                <li><a>Blog</a></li>
                                <li><NavLink to="/project">Project</NavLink></li>
                                <li><NavLink to="/create-project">Create-Project</NavLink></li>
                                <div className="flex justify-between items-center gap-3 p-2">
                                    <li className="bg-red-400 flex items-center justify-center w-[50%] rounded"><NavLink to="/login">Login</NavLink></li>
                                    <li className="bg-red-400 flex items-center justify-center w-[50%] rounded"><NavLink to="/register">Register</NavLink></li>
                                </div>
                            </ul>
                        </div>
                        <Link to={'/'} className=" font-semibold text-white p-0 text-3xl">HOME99</Link>
                    </div>
                </div>
            </div>
            <div className="flex-none">
                <div className="dropdown dropdown-end">
                    <label tabIndex={0} className="btn btn-ghost btn-circle">
                        <div className="indicator">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                            <span className="badge badge-sm indicator-item">8</span>
                        </div>
                    </label>
                    <div tabIndex={0} className="mt-3 z-[1] card card-compact dropdown-content w-52 bg-base-100 shadow">
                        <div className="card-body">
                            <span className="font-bold text-lg">8 Items</span>
                            <span className="text-info">Subtotal: $999</span>
                            <div className="card-actions">
                                <button className="btn btn-primary btn-block">View cart</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="dropdown dropdown-end">
                    <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                        <div className="w-10 rounded-full">
                            <img alt="User Image" src={data?.avatar?.secure_url} />
                        </div>
                    </label>
                    <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                        <li>
                            <a className="justify-between">
                                Profile
                                <span className="badge">New</span>
                            </a>
                        </li>
                        <li><a>Settings</a></li>
                        <li><Link onClick={handelLogout}>Logout</Link></li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Navbar