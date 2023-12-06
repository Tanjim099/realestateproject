import HomeLayout from '../components/HomeLayout';
import { CgProfile } from "react-icons/cg";
import { FaCalendarAlt } from "react-icons/fa";
import { LuNewspaper } from "react-icons/lu";
import { NavLink } from 'react-router-dom';
function ReadBlog() {
    return (
        <HomeLayout >
            <div className=' w-[100%] min-h-screen h-[100%] bg-slate-100'>
                <div className='w-[80%] m-auto'>
                    <div className=' w-full flex gap-4 py-5'>
                        <div id="my_modal_3" className="w-[70%] bg-white p-4">
                            <div className="flex flex-col gap-4">
                                <div>
                                    <h1 className=' text-3xl font-medium'>Which Is The Best Direction To Sleep as per Vastu?</h1>
                                </div>
                                <div className='flex items-center gap-4'>
                                    <div className='flex items-center gap-1 bg-slate-200 p-1 text-xs rounded-sm'>
                                        <CgProfile />By
                                        <NavLink>Username</NavLink>
                                    </div>
                                    <div className='flex items-center gap-1 bg-slate-200 p-1 text-xs rounded-sm'>
                                        <FaCalendarAlt />
                                        <p>25 November, 2023</p>
                                    </div>
                                </div>
                                <div>
                                    <img src="https://static.360realtors.ws/blog/737/Which_Is_The_Best_Direction_To_Sleep_as_per_Vastu.jpg" alt="" />
                                </div>
                                <div>
                                    <p>
                                        As you brace up to purchase your new property, vastu would be one of the first things to consider.
                                        Vastu is the ancient science originating from the Indian culture, which guides individuals on different aspects.
                                        According to vastu shastra, it’s imperative to choose the best direction to sleep.
                                        Besides, this science guides homeowners over different aspects, including which direction to place your furniture,
                                        sit while eating, or carry out other daily activities.
                                    </p>
                                    <br />
                                    <p>
                                        As you brace up to purchase your new property, vastu would be one of the first things to consider.
                                        Vastu is the ancient science originating from the Indian culture, which guides individuals on different aspects.
                                        According to vastu shastra, it’s imperative to choose the best direction to sleep.
                                        Besides, this science guides homeowners over different aspects, including which direction to place your furniture,
                                        sit while eating, or carry out other daily activities.
                                    </p>
                                    <br />
                                    <p>
                                        As you brace up to purchase your new property, vastu would be one of the first things to consider.
                                        Vastu is the ancient science originating from the Indian culture, which guides individuals on different aspects.
                                        According to vastu shastra, it’s imperative to choose the best direction to sleep.
                                        Besides, this science guides homeowners over different aspects, including which direction to place your furniture,
                                        sit while eating, or carry out other daily activities.
                                    </p>
                                    <br />
                                    <p>
                                        As you brace up to purchase your new property, vastu would be one of the first things to consider.
                                        Vastu is the ancient science originating from the Indian culture, which guides individuals on different aspects.
                                        According to vastu shastra, it’s imperative to choose the best direction to sleep.
                                        Besides, this science guides homeowners over different aspects, including which direction to place your furniture,
                                        sit while eating, or carry out other daily activities.
                                    </p>
                                </div>
                            </div>
                        </div>
                        {/* =================== */}
                        <div className="sm:w-[30%] md:w-[30%] w-[30%]">
                            <div className='w-[100%] flex flex-col gap-4'>
                                <div className='flex items-center gap-2 bg-white p-4'>
                                    <div className='rounded-full p-2 bg-[#7f1657] text-white'>
                                        <LuNewspaper className='text-2xl' />
                                    </div>
                                    <div>
                                        <h3 className='text-lg font-medium'>Latest Blogs</h3>
                                        <p className=' text-sm'>Updates from around the world</p>
                                    </div>
                                </div>
                                <NavLink className='flex items-center gap-2 bg-white p-4'>
                                    <div className='h-[100%] text-white'>
                                        <img className='w-[120px] h-[60px]' src="https://static.360realtors.ws/blog/736/Top_20_Residential_Areas_to_Live_in_Bangalore.jpg" alt="" />
                                    </div>
                                    <div>
                                        <h3 className='text-lg font-medium'>Top 20 Residential Areas to Live in Bangalore</h3>
                                        <p className=' text-sm'>Read more</p>
                                    </div>
                                </NavLink>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </HomeLayout>
    )
}

export default ReadBlog;