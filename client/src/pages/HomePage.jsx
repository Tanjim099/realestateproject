import { useDispatch } from "react-redux";
import HomeLayout from "../components/HomeLayout";
import Project from "../components/Project";
import { getAllProjects } from "../redux/slices/projectSlice";
import { useEffect } from "react";
import backroundImage from '../assets/items1.jpg';
import image from '../assets/section-bg1.jpg';
import { MdOutlineHomeWork } from "react-icons/md";

function HomePage() {
    const dispatch = useDispatch();
    async function onLoadGetData() {
        const response = await dispatch(getAllProjects());
        console.log(response)
    }
    useEffect(() => {
        (async () => {
            const response = await dispatch(getAllProjects());
            console.log(response)
        })();
    }, [])
    return (
        <HomeLayout>
            <div className="homeContainer ">
                <div className="hero_section">
                    <div className="hero min-h-[600px] sm:h-[200px] md:h-[300px]" style={{
                        backgroundImage: `url(${backroundImage})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        backgroundRepeat: 'no-repeat',
                        backgroundAttachment: 'fixed',
                        backgroundColor: 'rgba(255, 255, 255, 0.8)',
                        boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)',
                        borderRadius: '10px',
                        opacity: 0.9,
                        transition: 'background 0.3s ease-in-out',
                        clipPath: 'polygon(0 0, 100% 0, 100% 90%, 0 100%)',
                    }}>
                        <div className="hero-overlay bg-opacity-60"></div>
                        <div className="hero-content text-center text-neutral-content w-[100%]">

                            <div className="w-[100%] sm:w-[50%] md:w-[90%] flex flex-col gap-3">
                                <h1 className=" sm:text-3xl font-semibold">India's Favourite Property Portal</h1>
                                <div className="flex">
                                    <input type="text" placeholder="Enter Location builder, project" name="" id="" className="w-[100%] outline-none p-1 sm:p-3 text-black sm:text-sm" />
                                    <button className="btn border-0 rounded-none bg-[#7f1657] text-white hover:text-black">Search</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="project_section sm:w-[80%] md:w-[80%] m-auto mt-5">
                    <h1 className=" text-3xl font-semibold mb-3 border-b-4 pb-4 border-[#7f1657]">Top Projects</h1>
                    <div className=" my-5">
                        <Project />
                    </div>
                </div>
                <div className="h-[500px] my-10 flex flex-wrap items-center flex-col justify-center" style={{
                    backgroundImage: `url(${image})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    backgroundAttachment: 'fixed',
                    backgroundColor: 'rgba(255, 255, 255, 0.8)',
                    boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)',
                    borderRadius: '10px',
                    opacity: 0.9,
                    transition: 'background 0.3s ease-in-out',
                }}>
                    <h2 className="text-white text-4xl text-center">How we help people?</h2>
                    <div className="bg-[#7f1657] mt-10 px-4 flex justify-between flex-wrap text-white h-[300px] w-[70%]">
                        <div className="text-center w-[30%] flex flex-col items-center justify-center p-2">
                            <p className="text-[60px]"><MdOutlineHomeWork /></p>
                            <h3 className="text-xl my-3 font-bold">Sell home or office</h3>
                            <p className="font-mono leading-6">Get started by choosing from one of our pre-built page templates to showcase your properties</p>
                        </div>
                        <div className="text-center w-[30%] flex flex-col items-center justify-center p-2">
                            <p className="text-[60px]"><MdOutlineHomeWork /></p>
                            <h3 className="text-xl my-3 font-bold">Rent home or office</h3>
                            <p className="font-mono leading-6">Get started by choosing from one of our pre-built page templates to showcase your properties</p>
                        </div>
                        <div className="text-center w-[30%] flex flex-col items-center justify-center p-2">
                            <p className="text-[60px]"><MdOutlineHomeWork /></p>
                            <h3 className="text-xl my-3 font-bold">Find next</h3>
                            <p className="font-mono leading-6">Get started by choosing from one of our pre-built page templates to showcase your properties</p>
                        </div>
                    </div>

                </div>
            </div>
        </HomeLayout>
    )
}

export default HomePage