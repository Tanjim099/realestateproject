import { useDispatch, useSelector } from "react-redux";
import HomeLayout from "../components/HomeLayout";
import Project from "../components/Project";
import { getAllProjects } from "../redux/slices/projectSlice";
import { useEffect } from "react";
import backroundImage from '../assets/items1.jpg';
import image from '../assets/section-bg1.jpg';
import { MdOutlineHomeWork, MdOutlineSecurity } from "react-icons/md";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import CityCard from "../components/CityCard";
import { FaHome, FaUser } from "react-icons/fa";

function HomePage() {
    const dispatch = useDispatch();

    function arrowLeft() {
        projects.scrollLeft -= 400
    }
    function arrowRight() {
        projects.scrollLeft += 400
    }

    const { projects } = useSelector((state) => state.project);
    async function onLoadGetData() {
        const response = await dispatch(getAllProjects());
    }
    useEffect(() => {
        onLoadGetData()
    }, [])
    return (
        <HomeLayout>
            <div className="homeContainer ">
                {/* Hero Section */}
                <div className="hero_section">
                    <div className="hero min-h-[600px] sm:h-[200px] md:h-[300px]" style={{
                        backgroundImage: `url(${backroundImage})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        backgroundRepeat: 'no-repeat',
                        backgroundAttachment: 'fixed',
                        backgroundColor: 'rgba(255, 255, 255, 0.8)',
                        boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)',
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
                                <CityCard />
                            </div>
                        </div>
                    </div>
                </div>

                {/* About Section */}
                <div className="grid grid-cols-10 mt-20 mb-10 p-10 gap-10">
                    <div className="border col-span-3 h-[700px]">
                        <img src="" className="h-full object-cover" />
                    </div>
                    <div className="col-span-7 h-[700px]">
                        <h5 className="font-bold text-[#7f1657] uppercase">About Us</h5>
                        <h2 className="text-5xl font-mono my-3">Home 99 A Real Estate Company</h2>
                        <p className="w-[810px] text-gray-400">Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts. Separated they live in Bookmarksgrove right at the coast of the Semantics, a large language ocean.</p>
                        <div className="flex justify-between my-10 text-center">
                            <div>
                                <span className="text-4xl font-bold text-[#7f1657]">50</span>
                                <p>YEARS OF EXPERIENCED</p>
                            </div>
                            <div>
                                <span className="text-4xl font-bold text-[#7f1657]">210K+</span>
                                <p>TOTAL PROPERTIES</p>
                            </div>
                            <div>
                                <span className="text-4xl font-bold text-[#7f1657]">450</span>
                                <p>QUALIFIED REALTORS</p>
                            </div>
                            <div>
                                <span className="text-4xl font-bold text-[#7f1657]">100</span>
                                <p>TOTAL BRANCHES</p>
                            </div>
                        </div>
                        <div className="border h-[410px]">
                            {/* <img src={about_1} className="h-full object-cover w-full" /> */}
                        </div>
                    </div>
                </div>


                {/* Section 1 */}
                <div className="project_section sm:w-[80%] md:w-[80%] m-auto my-20">
                    <h1 className=" text-3xl font-semibold mb-3 border-b-4 pb-4 border-[#7f1657]">Top Projects</h1>
                    <div className=" my-5">
                        <div className="project_container w-100  relative">
                            <div className="sliderBtn top-1/2">

                                <button onClick={arrowRight} className=" absolute left-[-1%] md:left-[0%] top-1/2 w-[40px] h-[40px] bg-[#cff4ff] rounded-full text-center flex items-center justify-center"><IoIosArrowBack /></button>
                                <button onClick={arrowLeft} className=" absolute right-[-1%] md:right-[0%] top-1/2 w-[40px] h-[40px] bg-[#cff4ff] rounded-full text-center flex items-center justify-center"><IoIosArrowForward /></button>
                            </div>
                            <div className="projects flex overflow-x-auto gap-5" id="projects">
                                {projects?.map((p, i) => {
                                    return (
                                        <Project key={i} data={p} />
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                </div>
                {/* Section 2 */}
                <div className="md:h-[500px] p-4 min-h-screen my-10 flex items-center flex-col justify-center" style={{
                    backgroundImage: `url(${image})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    backgroundAttachment: 'fixed',
                    backgroundColor: 'rgba(255, 255, 255, 0.8)',
                    boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)',
                    opacity: 0.9,
                    transition: 'background 0.3s ease-in-out',
                }}>
                    <h2 className="text-white text-4xl text-center">How we help people?</h2>
                    <div className="bg-[#7f1657] grid col-span-1 md:flex md:justify-between mt-10 px-4 text-white min-h-[300px] w-[70%]">
                        <div className="text-center md:w-[30%] flex flex-col items-center justify-center p-2">
                            <p className="text-[60px]"><MdOutlineHomeWork /></p>
                            <h3 className="text-xl my-3 font-bold">Sell home or office</h3>
                            <p className="font-mono leading-6">Get started by choosing from one of our pre-built page templates to showcase your properties</p>
                        </div>
                        <div className="text-center md:w-[30%] flex flex-col items-center justify-center p-2">
                            <p className="text-[60px]"><MdOutlineHomeWork /></p>
                            <h3 className="text-xl my-3 font-bold">Rent home or office</h3>
                            <p className="font-mono leading-6">Get started by choosing from one of our pre-built page templates to showcase your properties</p>
                        </div>
                        <div className="text-center md:w-[30%] flex flex-col items-center justify-center p-2">
                            <p className="text-[60px]"><MdOutlineHomeWork /></p>
                            <h3 className="text-xl my-3 font-bold">Find next</h3>
                            <p className="font-mono leading-6">Get started by choosing from one of our pre-built page templates to showcase your properties</p>
                        </div>
                    </div>
                </div>
                {/* Section 3 */}
                <div className="bg-red-300 min-h-screen lg:min-h-[400px] my-10 grid grid-cols-1 lg:grid-cols-3 gap-3 p-10">
                    <div className="col-span-1 text-white ml-6 p-5">
                        <h2 className="text-5xl">Explore by Property Type</h2>
                        <p className="font-mono text-lg my-5">Get started by choosing from one of our pre-built page templates to showcase your properties</p>
                        <button className="bg-[#7f1657] hover:bg-[#a7076a] transition-all duration-300 ease-in-out text-white font-semibold px-5 py-3 rounded ">View All Property</button>
                    </div>
                    <div className="col-span-2 grid grid-cols-1 lg:grid-cols-4 text-white p-5 h-screen lg:h-[200px] mt-24 bg-red-400">
                        <div className="flex flex-col col-span-1 items-center justify-center lg:border-r-2 p-2">
                            <span className="text-5xl"><MdOutlineHomeWork /></span>
                            <p>Home & Appartment</p>
                        </div>
                        <div className="flex flex-col col-span-1 items-center justify-center lg:border-r-2 p-2">
                            <span className="text-5xl"><MdOutlineHomeWork /></span>
                            <p>Home & Appartment</p>
                        </div>
                        <div className="flex flex-col col-span-1 items-center justify-center lg:border-r-2 p-2">
                            <span className="text-5xl"><MdOutlineHomeWork /></span>
                            <p>Home & Appartment</p>
                        </div>
                        <div className="flex flex-col col-span-1 items-center justify-center p-2">
                            <span className="text-5xl"><MdOutlineHomeWork /></span>
                            <p>Home & Appartment</p>
                        </div>
                    </div>
                </div>
                {/* Section 4 */}
                <div className="my-24 border-t-2">
                    <div className="text-center max-w-[700px] mx-auto p-3">
                        <h2 className="text-4xl text-[#7f1657] font-semibold my-5">WE BRING DREAM HOMES TO REALITY</h2>
                        <p className="text-gray-500">Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam enim pariatur similique debitis vel nisi qui reprehenderit totam? Quod maiores.</p>
                    </div>
                    <div className="flex justify-center flex-col items-center lg:items-start lg:flex-row gap-12 mt-20 mb-20">
                        <div className="relative flex justify-center w-[60%]">
                            {/* <img className="relative z-10" src={img} />
                            <img className="absolute bottom-[-50px] right-[100px]" src={dot} /> */}
                        </div>
                        <div className="w-[50%] flex flex-col gap-10">
                            <div className="flex items-center gap-4">
                                <div className="h-[80px] w-[80px] border rounded-full flex items-center justify-center">
                                    <FaHome className="text-2xl" />
                                </div>
                                <div>
                                    <h2 className="text-xl font-semibold text-[#7f1657]">QUALITY PROPERTIES</h2>
                                    <p className="w-[300px]">Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum iste.</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="h-[80px] w-[80px] border rounded-full flex items-center justify-center">
                                    <FaUser className="text-2xl" />
                                </div>
                                <div>
                                    <h2 className="text-xl font-semibold text-[#7f1657]">TOP RATED AGENTS</h2>
                                    <p className="w-[300px]">Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum iste.</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="h-[80px] w-[80px] border rounded-full flex items-center justify-center">
                                    <MdOutlineSecurity className="text-2xl" />
                                </div>
                                <div>
                                    <h2 className="text-xl font-semibold text-[#7f1657]">EASY AND SAFE</h2>
                                    <p className="w-[300px]">Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum iste.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-around text-center">
                        <div>
                            <span className="text-4xl font-bold text-[#7f1657]">2,917</span>
                            <p># of Buy Properties</p>
                        </div>
                        <div>
                            <span className="text-4xl font-bold text-[#7f1657]">3,918</span>
                            <p># of Sell Properties</p>
                        </div>
                        <div>
                            <span className="text-4xl font-bold text-[#7f1657]">38,928</span>
                            <p># of All Properties</p>
                        </div>
                        <div>
                            <span className="text-4xl font-bold text-[#7f1657]">1,291</span>
                            <p># of Agents</p>
                        </div>
                    </div>
                </div>

            </div>
        </HomeLayout>
    )
}

export default HomePage