import { TiThMenu } from "react-icons/ti"
import { Link, NavLink, useNavigate } from "react-router-dom"
import { AiFillCloseCircle } from 'react-icons/ai';
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/slices/authSlice";
import { FaRegUser } from "react-icons/fa";
import { IoIosLogOut } from "react-icons/io";
import { MdDashboard } from "react-icons/md";
import { FiLogIn } from "react-icons/fi";
import { FaUserPlus } from "react-icons/fa6";
import { topCities } from "../Constants/cityName";
import { useState } from "react";
import { MdAddIcCall } from "react-icons/md";
function Navbar() {


    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [cityValue, setCityValue] = useState('');

    const handelSubmitValue = (e) => {
        setCityValue(e.target.value);
        navigate(`/city/${e.target.value.split(" ").join("-")}`);
    }

    const hideDrawer = () => {
        const element = document.getElementsByClassName('drawer-toggle');
        element[0].checked = false;
    }

    const { data, role } = useSelector((state) => state.auth);
    // console.log(role);
    // console.log(data);

    const isLoggedIn = useSelector((state) => state?.auth?.isLoggedIn)
    // console.log(isLoggedIn);
    const handelLogout = async (e) => {
        // e.preventDefault();
        const res = await dispatch(logout());
        // console.log(res);
        if (res?.payload?.success) {
            window.location.reload();
            navigate('/');
        };
    }

    console.log(cityValue);

    return (
        <div className="navbar  bg-[#7f1657] z-20 sticky top-0 left-0 right-0">
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
                                <li><Link to={'/'}>Home</Link></li>
                                <li><a>Property</a></li>
                                <li><a>Blog</a></li>
                                <li><NavLink to="/project">Project</NavLink></li>
                            </ul>
                        </div>
                        <div className="flex gap-5 items-center">
                            <Link to={'/'} className=" font-medium text-white p-0 text-2xl sm:text-4xl">HOME99</Link>
                            <div className="mt-1">
                                <select value={cityValue} onChange={handelSubmitValue} className="bg-transparent outline-0 text-white">
                                    {topCities && (
                                        topCities.sort((city1, city2) => city1.name.localeCompare(city2.name)).map((topCitie, idx) => (
                                            <option key={idx} value={topCitie.name} className="text-black">
                                                {topCitie.name}
                                            </option>
                                        ))
                                    )}
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex-none">
                {/* <div className="dropdown dropdown-end">
                    <label tabIndex={0} className="btn btn-ghost btn-circle">
                        <div className="indicator">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                            <span className="badge badge-sm indicator-item">8</span>
                        </div>
                    </label>
                    <div tabIndex={0} className="mt-3 z-[1] card card-compact dropdown-content w-52 bg-base-100 shadow">
                        <div className="card-body">
                            <span className="font-bold text-lg">8 Items</span>
                            <span className="text-info">Subtotal: $999</span>
                            <div className="card-actions">
                                <Link to={'/cart'} className="btn btn-primary btn-block">View cart</Link>
                            </div>
                        </div>
                    </div>
                </div> */}
                {/* <div className="flex items-center text-sm gap-2 text-white bg-transparent relative left-[-70px] border-2 px-5 py-1 rounded-full">
                    <MdAddIcCall /><NavLink className=" "> +1 234-567-8901</NavLink>
                </div> */}
                <div className="dropdown dropdown-end text-white">
                    <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                        <div className="w-10 h-10 object-cover rounded-full">
                            {
                                isLoggedIn ? (<img alt="User Image" src={data?.avatar?.secure_url} />) : (<FaRegUser className="text-3xl mt-1" />)
                            }
                        </div>
                    </label>
                    <ul tabIndex={0} className="menu dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 w-52 text-black hover:bg-none active:bg-none">
                        {!isLoggedIn ? (
                            <>
                                <li className="bg-transparent flex flex-row items-center border-b-2 text-black">
                                    <p className="text-black">
                                        <FiLogIn className="text-black text-lg" />
                                    </p>
                                    <NavLink to="/login" className="bg-transparent text-lg text-black">
                                        Login
                                    </NavLink>
                                </li>
                                <li className="flex flex-row items-center text-black">
                                    <p className="">
                                        <FaUserPlus className=" text-black text-lg" />
                                    </p>
                                    <NavLink className="text-lg text-black hover:bg-none" to="/register" >
                                        Register
                                    </NavLink>
                                </li>
                            </>
                        ) : (
                            <>
                                <li className="border-b-2 border-[#7f1657]">
                                    <p className="text-[#7f1657] italic text-md">Hey</p>
                                    <span className="font-bold text-lg capitalize">{data?.firstName}</span>
                                </li>
                                <li className="flex flex-row items-center">
                                    <p className="">
                                        <FaRegUser className="text-lg" />
                                    </p>
                                    <NavLink className={'text-lg'} to={'/user-profile'}>My Profile</NavLink>
                                </li>
                                {
                                    isLoggedIn && role === 'ADMIN' && (
                                        <li className="flex flex-row items-center">
                                            <p>
                                                <MdDashboard className="text-lg" />
                                            </p>
                                            <NavLink className="text-lg" to={'/admin/dashboard'}>Dashboard </NavLink>
                                        </li>
                                    )
                                }
                                <li className="flex flex-row items-center">
                                    <p>
                                        <IoIosLogOut className="text-lg" />
                                    </p>
                                    <Link className="text-lg" onClick={handelLogout}>Logout</Link>
                                </li>
                            </>
                        )}
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Navbar;