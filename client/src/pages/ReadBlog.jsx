import { useEffect, useState } from 'react';
import HomeLayout from '../components/HomeLayout';
import { CgProfile } from "react-icons/cg";
import { FaCalendarAlt } from "react-icons/fa";
import { LuNewspaper } from "react-icons/lu";
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useParams } from 'react-router-dom';
import { getBlog, getLatestBlogs } from '../redux/slices/blogSlice';
import dateFormeter from '../helper/dateFormeter';
function ReadBlog() {
    const dispatch = useDispatch();
    const [data, setData] = useState([]);
    const { latestBlogs } = useSelector((state) => state?.blog);
    console.log(latestBlogs);
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

    async function fetchLatestBlog() {
        const response = await dispatch(getLatestBlogs());
    }
    useEffect(() => {
        onFetchData();
        fetchLatestBlog();
    }, [slug]);
    return (
        <HomeLayout >
            <div className=' w-[100%] min-h-screen h-[100%] bg-slate-100'>
                <div className='w-[80%] m-auto'>
                    <div className=' w-full flex gap-4 py-5'>
                        {data ? (
                            <>
                                <div id="my_modal_3" className="w-[70%] bg-white p-4">
                                    <div className="flex flex-col gap-4">
                                        <div>
                                            <h1 className=' text-3xl font-medium'>{data?.title}</h1>
                                        </div>
                                        <div className='flex items-center gap-4'>
                                            <div className='flex items-center gap-1 bg-slate-200 p-1 text-xs rounded-sm'>
                                                <CgProfile />By
                                                <NavLink className={'capitalize'} to={`/author/${data?.author?._id}`}>{data?.author?.firstName}</NavLink>
                                            </div>
                                            <div className='flex items-center gap-1 bg-slate-200 p-1 text-xs rounded-sm'>
                                                <FaCalendarAlt />
                                                <p>{dateFormeter(data?.createdAt)}</p>
                                            </div>
                                        </div>
                                        <div>
                                            <img className='w-full' src={data?.image?.secure_url} alt="" />
                                        </div>
                                        <div dangerouslySetInnerHTML={{ __html: data?.content }}>
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
                                        {
                                            latestBlogs?.map((blog) => (
                                                <NavLink to={`/blog/${blog.slug}`} className='flex items-center gap-2 bg-white p-4'>
                                                    <div className='h-[100%] text-white'>
                                                        <img className='w-[120px] h-[60px]' src={blog?.image?.secure_url} alt="" />
                                                    </div>
                                                    <div>
                                                        <h3 className='text-lg font-medium'>{(blog?.title).substring(0, 37)}..</h3>
                                                        <p className=' text-sm'>Read more</p>
                                                    </div>
                                                </NavLink>
                                            ))
                                        }
                                    </div>
                                </div>
                            </>
                        ) : (
                            <div className=' flex items-center justify-center w-full min-h-screen'>
                                <h2 className='text-[7vw] text-gray-300'>Data Not Found</h2>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </HomeLayout>
    )
}

export default ReadBlog;