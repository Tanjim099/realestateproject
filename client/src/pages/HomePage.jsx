import { useDispatch, useSelector } from "react-redux";
import HomeLayout from "../components/HomeLayout";
import { getAllProjects } from "../redux/slices/projectSlice";
import { useEffect } from "react";
import '../styles/HomePage.css';
import { getAllBlogs } from "../redux/slices/blogSlice";

import HeroSection from "../components/Home/HeroSection";
import CitySection from "../components/Home/CitySection";
import TopProjects from "../components/Home/TopProjects";
import Section_1 from "../components/Home/Section_1";
import Section_2 from "../components/Home/Section_2";
import GallerySection from "../components/Home/GallerySection";
import Section_3 from "../components/Home/Section_3";
import BlogSection from "../components/Home/BlogSection";
import Developer from "../components/Home/Developer";
import Section_4 from "../components/Home/Section_4";

function HomePage() {
    const dispatch = useDispatch();

    const { blogData } = useSelector((state) => state?.blog);
    console.log(blogData)

    async function onLoadGetData() {
        const response = await dispatch(getAllProjects());
    }

    async function onLoadGetBlogData() {
        const response = await dispatch(getAllBlogs());
    }
    useEffect(() => {
        onLoadGetData();
        onLoadGetBlogData();
    }, [])
    return (
        <HomeLayout
            title={"Best Property Management Company in India Home 99"}
            description={"Best Flat in New Delhi"}
        >
            <div className="homeContainer">
                <HeroSection />
                <CitySection />
                <TopProjects />
                <Section_1 />
                <Section_2 />
                <GallerySection />
                <BlogSection />
                <Section_3 />
                <Section_4 />
                <Developer />

                {/* Section 1 */}

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

                {/* Section 3 */}

                {/* Section 4 */}

                {/* Section 4 */}
                {/* <div className="my-24 border-t-2">
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
                </div> */}

                {/* Gallery section */}


                {/* Section 2 */}



                {/* Blog Section */}


            </div>
        </HomeLayout>
    )
}

export default HomePage