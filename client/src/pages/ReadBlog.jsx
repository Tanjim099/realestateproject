import { useEffect, useState } from 'react';
import HomeLayout from '../components/HomeLayout';
import { CgProfile } from "react-icons/cg";
import { FaCalendarAlt } from "react-icons/fa";
import { LuNewspaper } from "react-icons/lu";
import { useDispatch } from 'react-redux';
import { NavLink, useParams } from 'react-router-dom';
import { getBlog } from '../redux/slices/blogSlice';
function ReadBlog() {
    const dispatch = useDispatch();
    const [data, setData] = useState([]);
    console.log(data);
    const { slug } = useParams();
    console.log(slug);
    async function onFetchData() {
        const response = await dispatch(getBlog(slug));
        setData(response?.payload?.data)
        // if (response?.payload?.data?.success) {
        //     setData(response?.payload?.data)
        // }
    }
    useEffect(() => {
        onFetchData()
    }, [slug]);
    return (
        <HomeLayout >
            <div className=' w-[100%] min-h-screen h-[100%] bg-slate-100'>
                <div className='w-[80%] m-auto'>
                    <div className=' w-full flex gap-4 py-5'>
                        {data.length !== 0 ? (
                            <>
                                <div id="my_modal_3" className="w-[70%] bg-white p-4">
                                    <div className="flex flex-col gap-4">
                                        <div>
                                            <h1 className=' text-3xl font-medium'>{data?.title}</h1>
                                        </div>
                                        <div className='flex items-center gap-4'>
                                            <div className='flex items-center gap-1 bg-slate-200 p-1 text-xs rounded-sm'>
                                                <CgProfile />By
                                                <NavLink to={`/author/${data?.author?.firstName}`}>{data?.author?.firstName}</NavLink>
                                            </div>
                                            <div className='flex items-center gap-1 bg-slate-200 p-1 text-xs rounded-sm'>
                                                <FaCalendarAlt />
                                                <p>25 November, 2023</p>
                                            </div>
                                        </div>
                                        <div>
                                            <img className='w-full' src={data?.image?.secure_url} alt="" />
                                        </div>
                                        <div dangerouslySetInnerHTML={{ __html: data?.description }}>
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
                            </>
                        ) : (
                            <h1>hello</h1>
                        )}
                    </div>
                </div>
            </div>
        </HomeLayout>
    )
}

export default ReadBlog;