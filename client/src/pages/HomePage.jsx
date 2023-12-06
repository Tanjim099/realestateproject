import { useDispatch, useSelector } from "react-redux";
import HomeLayout from "../components/HomeLayout";
import Project from "../components/Project";
import { getAllProjects, searchProject } from "../redux/slices/projectSlice";
import { useEffect, useState } from "react";
import backroundImage from '../assets/items1.jpg';
import image from '../assets/section-bg1.jpg';
import { MdOutlineHomeWork, MdOutlineSecurity } from "react-icons/md";
import { BsBookmarkStarFill, BsCaretLeftFill, BsCaretRightFill } from 'react-icons/bs';
import { FaHome, FaUser } from "react-icons/fa";
import CityCard from "../components/CityCard";
import { Swiper, SwiperSlide } from "swiper/react"
import { Autoplay, FreeMode, Navigation, Pagination } from 'swiper/modules';
import about from '../assets/about.jpg';
import about_1 from '../assets/about-1.jpg';
import img from '../assets/img_2.jpg';
import dot from '../assets/dots.png';
import { FaSearch } from "react-icons/fa";
import '../styles/HomePage.css';
import CountUp from 'react-countup';


function HomePage() {
    const dispatch = useDispatch();
    const [nextEl, setNextEl] = useState(null);
    const [prevEl, setPrevEl] = useState(null);
    const classNames = 'hover:bg-dry absolute flex items-center justify-center transitions text-sm rounded w-8 h-8 flex-colo bg-[#7f1657] text-white';
    const { projects } = useSelector((state) => state.project);
    const [search, setSearch] = useState("");
    console.log(search);


    useEffect(() => {
        try {
            (async () => {
                const res = await dispatch(searchProject(search));
                console.log(res);
            })()
        } catch (Error) {
            console.log(Error);
        }
    }, [search]);

    async function onLoadGetData() {
        const response = await dispatch(getAllProjects());
    }
    useEffect(() => {
        onLoadGetData()
    }, [])
    return (
        <HomeLayout>
            <div className="homeContainer">
                {/* Hero Section */}
                <div className="hero_section">
                    <div className="hero gradiantColor min-h-[600px] sm:h-[200px] md:h-[300px]"
                    //  style={{
                    //     backgroundImage: `url(${backroundImage})`,
                    //     backgroundSize: 'cover',
                    //     backgroundPosition: 'center',
                    //     backgroundRepeat: 'no-repeat',
                    //     backgroundAttachment: 'fixed',
                    //     backgroundColor: 'rgba(255, 255, 255, 0.8)',
                    //     boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)',
                    //     opacity: 0.9,
                    //     transition: 'background 0.3s ease-in-out',
                    //     clipPath: 'polygon(0 0, 100% 0, 100% 90%, 0 100%)',
                    // }}
                    >
                        <div className="bg-opacity-60"></div>
                        <div className="hero-content text-neutral-content w-[100%] h-full">
                            <div className="flex flex-col w-full items-center h-full">
                                <div className="text-white text-center w-[60%]">
                                    <h1 className=" sm:text-4xl font-semibold">Discover Properties in India</h1>
                                    <p className="text-xl my-5">We help you find your new home</p>
                                    {/* <div className="flex">
                                    <input type="text" placeholder="Enter Location builder, project" name="" id="" className="w-[100%] outline-none p-1 sm:p-3 text-black sm:text-sm" />
                                    <button className="btn border-0 rounded-none bg-[#7f1657] text-white hover:text-black">Search</button>
                                    </div> */}
                                    {/* <div className=" my-5">
                                    <h1 className=" text-left mb-2 text-xl">Top City</h1>
                                    <div className="project_container w-100  relative">
                                        <div className="sliderBtn top-1/2">
                                            <button onClick={arrowRight} className=" absolute left-[-1%] md:left-[0%] top-1/2 w-[40px] h-[40px] bg-[#cff4ff] rounded-full text-center flex items-center justify-center"><IoIosArrowBack /></button>
                                            <button onClick={arrowLeft} className=" absolute right-[-1%] md:right-[0%] top-1/2 w-[40px] h-[40px] bg-[#cff4ff] rounded-full text-center flex items-center justify-center"><IoIosArrowForward /></button>
                                        </div>
                                        <div className="projects flex overflow-x-auto gap-5" id="projects">
                                            <CityCard />
                                        </div>
                                    </div>
                                 </div> */}
                                    {/* ====================== */}
                                    <div className="">
                                        <div className="flex items-center gap-2 w-full h-[50px]">
                                            <div className="relative flex items-center gap-2 w-full h-[50px]">
                                                <input type="text" placeholder="Enter Location builder, project" name="" id="" className="border border-gray-200 shadow-sm outline-0 text-black h-full w-full rounded p-3 pl-10" onChange={(e) => setSearch(e.target.value)} />
                                                <span className="absolute z-10 top-4 left-4 text-gray-400"><FaSearch /></span>
                                            </div>
                                            <button className="bg-[#7f1657] w-[100px] h-full flex items-center justify-center rounded text-white hover:text-black right-7 top-6">Search</button>
                                        </div>
                                    </div>
                                </div>
                                <div className="w-[70%] mx-auto text-white flex justify-between items-end  my-10 text-center absolute bottom-0 ">
                                    <div className="">
                                        <span className="text-4xl font-semibold text-[rgb(127,22,87)]">
                                            <CountUp start={0} end={50} duration={2} delay={0} />
                                        </span>
                                        <p>YEARS OF EXPERIENCED</p>
                                    </div>
                                    <div className="text-3xl flex items-center">|</div>
                                    <div>
                                        <span className="text-4xl font-semibold text-[#7f1657]">
                                            <CountUp start={0} end={210} duration={2} delay={0} />K+
                                        </span>
                                        <p>TOTAL PROPERTIES</p>
                                    </div>
                                    <div className="text-3xl flex items-center">|</div>
                                    <div>
                                        <span className="text-4xl font-semibold text-[#7f1657]">
                                            <CountUp start={0} end={450} duration={2} delay={0} />
                                        </span>
                                        <p>QUALIFIED REALTORS</p>
                                    </div>
                                    <div className="text-3xl flex items-center">|</div>
                                    <div>
                                        <span className="text-4xl font-semibold text-[#7f1657]">
                                            <CountUp start={0} end={100} duration={2} delay={0} />
                                        </span>
                                        <p>TOTAL BRANCHES</p>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>

                <div className=" my-5 mx-auto w-[1200px]">
                    <h2 className="border-b-2 border-[#7f1657] pb-4 my-10 text-3xl text-[#7f1657] font-semibold">
                        Top Cities In India
                        <p className="text-sm">Best places to live in India</p>
                    </h2>
                    <div className="w-full relative">
                        <CityCard />
                    </div>
                </div>

                {/* Section 1 */}
                <div className='mt-14 w-[80%] relative mx-auto'>
                    <h2 className="border-b-2 border-[#7f1657] pb-4 my-10 text-3xl text-[#7f1657] font-semibold">
                        Top Projects
                    </h2>
                    <Swiper
                        navigation={{ nextEl, prevEl }}
                        slidesPerView={1}
                        spaceBetween={20}
                        loop={true}
                        autoplay={{ delay: 2000, disableOnInteraction: false }}
                        modules={[FreeMode, Pagination, Navigation, Autoplay]}
                        breakpoints={{
                            700: {
                                slidesPerView: 2,
                            },
                            1024: {
                                slidesPerView: 4,
                            },
                        }}
                        className="max-h-[30rem]"
                    >
                        {
                            projects && (
                                projects.map((data, idx) => (
                                    <SwiperSlide key={idx}>
                                        <Project data={data} />
                                    </SwiperSlide>
                                ))
                            )
                        }
                    </Swiper>
                    <div className='flex justify-between gap-10'>
                        <button
                            className={`${classNames} top-[50%] left-[-3%]`}
                            ref={(node) => setPrevEl(node)}
                        >
                            <BsCaretLeftFill />
                        </button>
                        <button
                            className={`${classNames} right-[-3%] top-[50%]`}
                            ref={(node) => setNextEl(node)}
                        >
                            <BsCaretRightFill />
                        </button>
                    </div>
                </div>

                {/* About Section */}
                {/* <div className="grid grid-cols-10 mt-20 mb-10 mx-auto w-[1200px] gap-10">
                    <div className="col-span-3 rounded-tr-2xl rounded-bl-2xl  h-[700px]">
                        <img src={about} className="h-full rounded-tr-2xl rounded-bl-2xl  object-cover" />
                    </div>
                    <div className="col-span-7 h-[700px]">
                        <h5 className="font-bold text-[#7f1657] uppercase">About Us</h5>
                        <h2 className="text-4xl my-3">Home 99 A Real Estate Company</h2>
                        <p className="w-[810px] text-gray-400">Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts. Separated they live in Bookmarksgrove right at the coast of the Semantics, a large language ocean.</p>
                        <div className="flex justify-between my-10 text-center">
                            <div>
                                <span className="text-4xl font-semibold text-[#7f1657]">50</span>
                                <p>YEARS OF EXPERIENCED</p>
                            </div>
                            <div>
                                <span className="text-4xl font-semibold text-[#7f1657]">210K+</span>
                                <p>TOTAL PROPERTIES</p>
                            </div>
                            <div>
                                <span className="text-4xl font-semibold text-[#7f1657]">450</span>
                                <p>QUALIFIED REALTORS</p>
                            </div>
                            <div>
                                <span className="text-4xl font-semibold text-[#7f1657]">100</span>
                                <p>TOTAL BRANCHES</p>
                            </div>
                        </div>
                        <div className="rounded-tr-2xl rounded-bl-2xl h-[410px]">
                            <img src={about_1} className="h-full object-cover rounded-tr-2xl rounded-bl-2xl w-full" />
                        </div>
                    </div>
                </div> */}


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
                    <div className="bg-[#7f1657] rounded grid col-span-1 md:flex md:justify-between mt-10 px-4 text-white min-h-[300px] w-[70%]">
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
                <div className="bg-white min-h-screen lg:min-h-[400px] w-[1200px] items-center mx-auto my-10 grid grid-cols-1 lg:grid-cols-3">
                    <div className="col-span-1 text-black">
                        <h2 className="text-3xl">Explore by Property Type</h2>
                        <p className="text-md my-5">Get started by choosing from one of our pre-built page templates to showcase your properties</p>
                        <button className="bg-[#7f1657] hover:bg-[#a7076a] transition-all duration-300 ease-in-out text-white font-semibold px-5 py-3 rounded ">View All Property</button>
                    </div>
                    <div className="col-span-2 rounded grid grid-cols-1 lg:grid-cols-4 text-white p-5 h-screen lg:h-[200px] bg-[#7f1657]">
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
                        <div className="relative flex rounded-tr-2xl rounded-bl-2xl justify-center w-[60%]">
                            <img className="relative rounded-tr-2xl rounded-bl-2xl z-10" src={img} />
                            <img className="absolute bottom-[-50px] right-[100px]" src={dot} />
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
                    <div className="flex justify-evenly text-center">
                        <div>
                            <span className="text-4xl font-semibold text-[#7f1657]">2,917</span>
                            <p># of Buy Properties</p>
                        </div>
                        <div>
                            <span className="text-4xl font-semibold text-[#7f1657]">3,918</span>
                            <p># of Sell Properties</p>
                        </div>
                        <div>
                            <span className="text-4xl font-semibold text-[#7f1657]">38,928</span>
                            <p># of All Properties</p>
                        </div>
                        <div>
                            <span className="text-4xl font-semibold text-[#7f1657]">1,291</span>
                            <p># of Agents</p>
                        </div>
                    </div>
                </div>

                {/* Gallery section */}

                <div className="w-[1200px] mx-auto my-20">
                    <h2 className="text-4xl font-semibold text-[#7f1657] border-b-2 border-[#7f1657] pb-4 my-10">Gallery</h2>
                    <div className="grid grid-cols-4 gap-5">
                        {
                            projects && (
                                projects.slice(0, 20).map((project, idx) => (
                                    <div key={idx} className="group col-span-1 relative">
                                        <img src={project?.gallery[0]?.secure_url} className="h-[200px] object-cover border" alt="Gallery" />
                                        <div className="bg-gray-50 opacity-0 hover:opacity-[.6] transition-all duration-300 ease-in-out h-full w-full absolute top-0 flex items-center justify-center">
                                            <h2 className="text-3xl text-black">{project?.name}</h2>
                                        </div>
                                    </div>
                                ))
                            )
                        }
                    </div>
                </div>

                {/* Blog Section */}

                <div className="my-20">
                    <div className="w-[1200px] mx-auto">
                        <h2 className="text-3xl font-semibold text-[#7f1657] border-b-2 border-[#7f1657] pb-4 my-10">Recent Blog</h2>
                        <Swiper
                            //   navigation={{ nextEl, prevEl }}
                            slidesPerView={1}
                            spaceBetween={20}
                            loop={true}
                            autoplay={{ delay: 2000, disableOnInteraction: false }}
                            modules={[FreeMode, Pagination, Navigation, Autoplay]}
                            breakpoints={{
                                700: {
                                    slidesPerView: 2,
                                },
                                1024: {
                                    slidesPerView: 3,
                                },
                            }}
                            className="max-h-[30rem]"
                        >
                            <SwiperSlide className="border w-[300px]">
                                <div className="w-full">
                                    <img src={about_1} className="h-full w-full object-cover" />
                                </div>
                                <div className="p-5">
                                    <h3 className="font-bold text-xl my-3">New Home Sales Picked Up in December</h3>
                                    <p className="text-lg text-gray-500">A small river named Duden flows by their place and supplies it with the necessary regelialia.</p>
                                </div>
                            </SwiperSlide>
                            <SwiperSlide className="border w-[300px]">
                                <div className="w-full">
                                    <img src={about_1} className="h-full w-full object-cover" />
                                </div>
                                <div className="p-5">
                                    <h3 className="font-bold text-xl my-3">New Home Sales Picked Up in December</h3>
                                    <p className="text-lg text-gray-500">A small river named Duden flows by their place and supplies it with the necessary regelialia.</p>
                                </div>
                            </SwiperSlide>
                            <SwiperSlide className="border w-[300px]">
                                <div className="w-full">
                                    <img src={about_1} className="h-full w-full object-cover" />
                                </div>
                                <div className="p-5">
                                    <h3 className="font-bold text-xl my-3">New Home Sales Picked Up in December</h3>
                                    <p className="text-lg text-gray-500">A small river named Duden flows by their place and supplies it with the necessary regelialia.</p>
                                </div>
                            </SwiperSlide>
                            <SwiperSlide className="border w-[300px]">
                                <div className="w-full">
                                    <img src={about_1} className="h-full w-full object-cover" />
                                </div>
                                <div className="p-5">
                                    <h3 className="font-bold text-xl my-3">New Home Sales Picked Up in December</h3>
                                    <p className="text-lg text-gray-500">A small river named Duden flows by their place and supplies it with the necessary regelialia.</p>
                                </div>
                            </SwiperSlide>
                            <SwiperSlide className="border w-[300px]">
                                <div className="w-full">
                                    <img src={about_1} className="h-full w-full object-cover" />
                                </div>
                                <div className="p-5">
                                    <h3 className="font-bold text-xl my-3">New Home Sales Picked Up in December</h3>
                                    <p className="text-lg text-gray-500">A small river named Duden flows by their place and supplies it with the necessary regelialia.</p>
                                </div>
                            </SwiperSlide>
                            <SwiperSlide className="border w-[300px]">
                                <div className="w-full">
                                    <img src={about_1} className="h-full w-full object-cover" />
                                </div>
                                <div className="p-5">
                                    <h3 className="font-bold text-xl my-3">New Home Sales Picked Up in December</h3>
                                    <p className="text-lg text-gray-500">A small river named Duden flows by their place and supplies it with the necessary regelialia.</p>
                                </div>
                            </SwiperSlide>
                            <SwiperSlide className="border w-[300px]">
                                <div className="w-full">
                                    <img src={about_1} className="h-full w-full object-cover" />
                                </div>
                                <div className="p-5">
                                    <h3 className="font-bold text-xl my-3">New Home Sales Picked Up in December</h3>
                                    <p className="text-lg text-gray-500">A small river named Duden flows by their place and supplies it with the necessary regelialia.</p>
                                </div>
                            </SwiperSlide>
                            <SwiperSlide className="border w-[300px]">
                                <div className="w-full">
                                    <img src={about_1} className="h-full w-full object-cover" />
                                </div>
                                <div className="p-5">
                                    <h3 className="font-bold text-xl my-3">New Home Sales Picked Up in December</h3>
                                    <p className="text-lg text-gray-500">A small river named Duden flows by their place and supplies it with the necessary regelialia.</p>
                                </div>
                            </SwiperSlide>
                            <SwiperSlide className="border w-[300px]">
                                <div className="w-full">
                                    <img src={about_1} className="h-full w-full object-cover" />
                                </div>
                                <div className="p-5">
                                    <h3 className="font-bold text-xl my-3">New Home Sales Picked Up in December</h3>
                                    <p className="text-lg text-gray-500">A small river named Duden flows by their place and supplies it with the necessary regelialia.</p>
                                </div>
                            </SwiperSlide>
                        </Swiper>
                    </div>
                </div>

            </div>
        </HomeLayout>
    )
}

export default HomePage