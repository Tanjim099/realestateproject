import { NavLink, useParams } from "react-router-dom";
import HomeLayout from "../components/HomeLayout";
import { useDispatch, useSelector } from "react-redux";
import { getUserProfile } from "../redux/slices/authSlice";
import { useEffect } from "react";
import { ImBlog } from "react-icons/im";
import { FaLinkedin, FaInstagramSquare, FaFacebookSquare } from "react-icons/fa";
import { MdEditLocationAlt } from "react-icons/md";


function Author() {
    // const dispatch = useDispatch();
    // const { id } = useParams();
    // console.log(id);
    // const { userData } = useSelector((state) => state?.auth);
    // console.log(userData)
    // async function getUserData() {
    //     const response = await dispatch(getUserProfile(id));
    //     console.log(response);
    // }
    // useEffect(() => {
    //     getUserData()
    // }, []);
    return (
        <HomeLayout>
            <div className="w-[75%] m-auto">
                <div className="w-[100%] flex gap-4 my-4">
                    <div className="w-[30%] flex items-center flex-col bg-white shadow-[0_0_2px_gray] rounded-md py-10">
                        <div>
                            <img className="w-[100px] h-[100px] rounded-full" src="https://superadmin.homes247.in/images/bloggerprofile/1699344848-WhatsApp%20Image%202023-11-07%20at%201.43.03%20PM.jpeg" alt="" />
                        </div>
                        <div className="my-5">
                            <h2 className="text-xl">Akhil G Nair</h2>
                        </div>
                        <div className="w-[60%] border-b-2 border-gray-500"></div>
                        <div className="my-5 flex items-center gap-2">
                            <ImBlog />
                            <h3>54 Blogs</h3>
                        </div>
                        <div className="w-[60%] border-b-2 border-gray-500"></div>
                        <div className="my-5 flex items-center gap-2">
                            <MdEditLocationAlt />
                            <h3>Calicut, Kerala</h3>
                        </div>
                        <div className="w-[60%] border-b-2 border-gray-500"></div>
                        <div className="flex gap-2 text-xl mt-5">
                            <NavLink>
                                <FaLinkedin />
                            </NavLink>
                            <NavLink>
                                <FaInstagramSquare />
                            </NavLink>
                            <NavLink>
                                <FaFacebookSquare />
                            </NavLink>
                        </div>
                    </div>
                    <div className="w-[70%] bg-red-600">
                        <h1>hello</h1>
                    </div>
                </div>
            </div>
        </HomeLayout>
    )
}

export default Author;