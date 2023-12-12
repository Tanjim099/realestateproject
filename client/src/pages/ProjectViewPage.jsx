import { useEffect, useState } from "react";
import HomeLayout from "../components/HomeLayout";
import SimilarProjectCard from "../components/SimilarProjectCard";
import "../styles/ProjectViewPage.css";
import { useDispatch, useSelector } from "react-redux";
import { createContact } from "../redux/store";
import { Swiper, SwiperSlide } from "swiper/react"
import { Autoplay, FreeMode, Navigation, Pagination } from 'swiper/modules';
import { NavLink, useParams } from "react-router-dom";
import { getProject, getSimilarProject } from "../redux/slices/projectSlice";
import { IoLocationSharp } from "react-icons/io5";
import { MdOutlineLocationCity } from "react-icons/md";
import { BsCaretLeftFill, BsCaretRightFill } from 'react-icons/bs';
import { Link as ScrollLink, animateScroll as scroll } from 'react-scroll';

function ProjectViewPage() {

    const dispatch = useDispatch();
    const { similarProject } = useSelector((state) => state?.project);
    console.log(similarProject);
    const [data, setData] = useState([]);
    console.log(data);
    const [nextEl, setNextEl] = useState(null);
    const [prevEl, setPrevEl] = useState(null);

    const [userInput, setUserInput] = useState({
        name: '',
        phone: '',
        email: '',
        interested: '',
    });

    console.log(userInput);

    const handelInput = (e) => {
        const { value, name } = e.target;
        setUserInput((prev) => ({
            ...prev,
            [name]: value
        }));
    }

    const onFormSubmit = async (e) => {
        e.preventDefault();

        const res = await dispatch(createContact(userInput));

    }

    const { slug } = useParams();
    async function onLoadGetData() {
        const response = await dispatch(getProject(slug));
        if (response?.payload?.success) {
            setData(response?.payload?.data)
        }
    }

    useEffect(() => {
        onLoadGetData();
        fetchSimilarProjects();
    }, [slug])

    async function fetchSimilarProjects() {
        console.log(data.developer);
        console.log(data.city);
        const response = await dispatch(getSimilarProject([data?.developer, data?.city]));
        console.log(response);
    }

    useEffect(() => {
        fetchSimilarProjects();
    }, [data]);

    const classNames = 'hover:bg-dry absolute flex items-center justify-center transitions text-sm rounded w-8 h-8 flex-colo bg-[#7f1657] text-white';
    return (
        <HomeLayout>
            {/* =================== */}
            {/* You can open the modal using document.getElementById('ID').showModal() method */}
            {/* <dialog id="my_modal_3" className="modal">
                <div className="modal-box p-1 w-[25%] rounded-md bg-cyan-900">

                    <div className="contactformbox w-full bg-[#8ed1fc] p-5 rounded-md sticky top-10">
                        <form method="dialog">
                            if there is a button in form, it will close the modal
                            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                        </form>
                        <div className="flex flex-col items-center justify-center gap-2">
                            <img className="w-[90px]" id="contactformbox_logo" src="https://mantridevelopers.in/wp-content/uploads/2023/08/cropped-web-logo.png" alt />
                            <h3 id="contactformbox_title" className="text-center text-lg">Get Instant Call Back</h3>
                        </div>
                        <div className="contactformbox_box1 flex items-center justify-between mt-5">
                            <div className="flex flex-col items-center justify-between">
                                <img className="w-[30px]" src="https://mantridevelopers.in/wp-content/uploads/2023/09/phone-ringing-1.webp" alt />
                                <p className="text-sm">24/7 Support</p>
                            </div>
                            <div className="flex flex-col items-center justify-between">
                                <img className="w-[30px]" src="https://mantridevelopers.in/wp-content/uploads/2023/09/phone-ringing-1.webp" alt />
                                <p className="text-sm">24/7 Support</p>
                            </div>
                            <div className="flex flex-col items-center justify-between">
                                <img className="w-[30px]" src="https://mantridevelopers.in/wp-content/uploads/2023/09/phone-ringing-1.webp" alt />
                                <p className="text-sm">24/7 Support</p>
                            </div>
                        </div>
                        <form action className="contactform contactformbox_box2 flex mt-5 flex-col items-center justify-between gap-3">
                            <h3 className=" text-lg font-medium">Mantri Webcity</h3>
                            <input type="text" placeholder="Name" className="w-full px-2 py-1 rounded-sm outline-none" id="second" />
                            <input type="text" placeholder="+91 - " className="w-full px-2 py-1 rounded-sm outline-none" />
                            <input type="email" placeholder="Email" className="w-full px-2 py-1 rounded-sm outline-none" />
                            <select className="w-full p-1 rounded-sm outline-none">
                                <option value>Interested for Site Visit?</option>
                                <option value="yes">Yes</option>
                                <option value="no">No</option>
                            </select>
                            <button className=" bg-cyan-900 w-full p-1 text-white rounded-sm">Enquire Now</button>
                        </form>
                        <div className="contactformbox_box2 flex items-center justify-between mt-2">
                            <div className="flex items-center gap-1">
                                <img className="w-[30px]" src="https://mantridevelopers.in/wp-content/uploads/2023/09/phone-ringing-1.webp" alt />
                                <p className="text-sm">Call</p>
                            </div>
                            <div className="flex items-center gap-1">
                                <img className="w-[30px]" src="https://mantridevelopers.in/wp-content/uploads/2023/09/whatsapp.webp" alt />
                                <p className="text-sm">WhatsApp</p>
                            </div>
                        </div>
                    </div>
                </div>
            </dialog> */}
            {/* =================== */}
            <div className="projectviewpage_container max-w-[1200px] mx-auto px-2 py-5 mt-4">
                {data.length !== 0 ? (
                    <div className="w-full flex gap-6">
                        <div className="w-[100%] md:w-[70%]">
                            <Swiper
                                slidesPerView={1}
                                spaceBetween={20}
                                loop={true}
                                autoplay={{ delay: 2000, disableOnInteraction: false }}
                                modules={[FreeMode, Pagination, Navigation, Autoplay]}
                                className="carousel w-full rounded-md"
                            >
                                <SwiperSlide id="slide1" className="carousel-item relative w-full rounded-md">
                                    <img src={data?.gallery[0]?.secure_url || "https://superadmin.homes247.in/images/uploadPropertyImgs/1617262167-1.jpg"} className="w-full object-cover h-[350px] md:h-[400px] lg:h-[500px] rounded" />
                                </SwiperSlide>
                                <SwiperSlide id="slide2" className="carousel-item relative w-full rounded-md">
                                    <img src={data?.gallery[1]?.secure_url || "https://superadmin.homes247.in/images/uploadPropertyImgs/1617262167-1.jpg"} className="w-full object-cover h-[350px] md:h-[400px] lg:h-[500px] rounded" />
                                </SwiperSlide>
                                <SwiperSlide id="slide3" className="carousel-item relative w-full rounded-md">
                                    <img src={data?.gallery[2]?.secure_url || "https://superadmin.homes247.in/images/uploadPropertyImgs/1617262167-1.jpg"} className="w-full object-cover h-[350px] md:h-[400px] lg:h-[500px] rounded" />
                                </SwiperSlide>

                            </Swiper>
                            <div className="bg-gradient-to-r from-indigo-200 p-2 rounded-md w-full mt-3">
                                <h2 className="text-2xl  font-semibold">{data?.name}</h2>
                                <div className="flex items-center justify-between mt-3">
                                    <div className="flex flex-col gap-1">
                                        <div className="flex items-center gap-1">
                                            <MdOutlineLocationCity />
                                            <p>By {data?.developer}</p>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <IoLocationSharp />
                                            <p>{data?.location}</p>
                                        </div>
                                    </div>
                                    <div className="flex flex-col gap-1">
                                        <div className="flex items-center gap-1">
                                            <MdOutlineLocationCity />
                                            <p>By {data?.pricing?.startingFrom}</p>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <IoLocationSharp />
                                            <p>4787 - 10985 SQ. FT.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* === */}
                            <div className="my-8 shadow-[0_0_3px_gray] p-3 rounded-md">
                                <ul className="flex items-center justify-between">
                                    <li className="cursor-pointer"><ScrollLink to="overflow" smooth={true} duration={500}>Overview</ScrollLink></li>
                                    <li className="cursor-pointer"><ScrollLink to="about" smooth={true} duration={500}>About</ScrollLink></li >
                                    <li className="cursor-pointer"><ScrollLink to="specification" smooth={true} duration={500}>Specification</ScrollLink></li>
                                    <li className="cursor-pointer"><ScrollLink to="floor-plan" smooth={true} duration={500}>Floor Plan</ScrollLink></li>
                                    <li className="cursor-pointer"><ScrollLink to="gallery" smooth={true} duration={500}>Gallery</ScrollLink></li>
                                    <li className="cursor-pointer"><ScrollLink to="amenities" smooth={true} duration={500}>Amenities</ScrollLink></li>
                                    <li className="cursor-pointer"><ScrollLink to="location" smooth={true} duration={500}>Location</ScrollLink></li>
                                </ul>
                            </div>

                            <div className="bg-gradient-to-l from-indigo-200 p-2 rounded-md w-full mt-3" id="overflow">
                                <h2 className="text-2xl  font-semibold">Overview of {data?.name}</h2>
                                <div className="grid grid-cols-3 gap-4 mt-3">
                                    <div className="border-2 border-white py-2 px-3">
                                        <p className="text-sm">Project Area</p>
                                        <p className="font-medium">{data?.projectArea}</p>
                                    </div>
                                    <div className="border-2 border-white py-2 px-3">
                                        <p className="text-sm">Project Type</p>
                                        <p className="font-medium">{data?.projectType}</p>
                                    </div>
                                    <div className="border-2 border-white py-2 px-3">
                                        <p className="text-sm">Project Status</p>
                                        <p className="font-medium">{data?.status}</p>
                                    </div>
                                    <div className="border-2 border-white py-2 px-3">
                                        <p className="text-sm">Possession On</p>
                                        <p className="font-medium">{data?.possessionOn}</p>
                                    </div>
                                    <div className="border-2 border-white py-2 px-3">
                                        <p className="text-sm">Configurations</p>
                                        <p className="font-medium">{data?.projectArea}</p>
                                    </div>
                                    <div className="border-2 border-white py-2 px-3">
                                        <p className="text-sm">RERA No</p>
                                        <p className="font-medium">{data?.reraNo}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="mt-8" id="about">
                                <h1 className=" text-2xl my-2 font-semibold">{data?.name}</h1>
                                <div className=" content01 p-2 rounded-md w-full max-h-[500px] overflow-y-auto" dangerouslySetInnerHTML={{ __html: data?.content }}>
                                </div>
                            </div>

                            {/* ================= */}
                            <div className="content05   mt-5 p-2 rounded-md" id="specification">
                                <h2 className="py-2 text-2xl font-semibold">Specification of {data?.name}</h2>
                                <div dangerouslySetInnerHTML={{ __html: data?.specifications }}>

                                </div>
                            </div>

                            <div className="content04  relative mt-5 py-4 px-2  rounded-md" id="floor-plan">
                                <h1 className="text-3xl font-semibold">Complete View of Floor Plans &amp; Pricing</h1>
                                {/* <div className="content04_box">
                                    <div id="Flats" className="w-[35%] flex items-center justify-between my-3 mx-auto">
                                        <h2 className=" ">3000+ Flats</h2>
                                        <h2>80+ Villa</h2>
                                    </div>
                                    <div className="priceandplansbox flex justify-between w-[80%] m-auto">
                                        <div id="pricesandbuttonbox" className=" flex flex-col items-center">
                                            <h2>Select Floor Plan Type</h2>
                                            <div className="planbtn mt-5 grid grid-cols-3 gap-3" style={{ width: "fit-content" }}>
                                                {data?.floorPlan?.map((item) => {
                                                    return <button className=" text-xl text-white bg-black border-0 rounded py-1 px-1 cursor-pointer" onclick="changer(this)">{item.types}</button>
                                                })}
                                            </div>
                                            <div className="sqftbox mt-5 flex items-center justify-between gap-2"><img className="w-[30px]" src="https://sobhaneopolis.co/wp-content/uploads/2023/03/ruler.webp" alt />
                                                <p id="sqft" className=" text-center">643 - 643 Sqft</p>
                                            </div>
                                            <p id="price" className=" text-center mt-5">95 LPA</p>
                                            <button id="pricesheet" className="btn bg-cyan-900 text-white" onclick="popUp()">Price Sheet</button>
                                        </div>
                                        <div id="floorbox">
                                            <img className="w-full shadow rounded" id="floorimage" src="https://www.sobhaneopolis.net.in/images/plans/2bhk-320w.webp" alt />
                                        </div>
                                    </div>
                                </div> */}
                                <Swiper
                                    navigation={{ nextEl, prevEl }}
                                    slidesPerView={1}
                                    spaceBetween={20}
                                    loop={true}
                                    autoplay={{ delay: 2000, disableOnInteraction: false }}
                                    modules={[FreeMode, Pagination, Navigation]}
                                    className="carousel w-full rounded-md shadow-[0_0_1px_gray] mt-6"
                                >
                                    {
                                        data?.floorPlan?.map((item) => {
                                            return (
                                                <SwiperSlide id="slide3" className=" bg-white carousel-item relative w-[100%] rounded-md">
                                                    <div className="flex w-[100%]">
                                                        <div className="w-[40%]">
                                                            <div className="p-4">
                                                                <p className="text-sm">Types</p>
                                                                <p className="mt-2 font-medium">{item?.types}</p>
                                                            </div>
                                                            <hr />
                                                            <div className="p-4">
                                                                <p className="text-sm">Build up Aread</p>
                                                                <p className="mt-2 font-medium">{item?.dimensions}</p>
                                                            </div>
                                                            <hr />
                                                            <div className="p-4">
                                                                <p className="text-sm">Base Selling Price</p>
                                                                <p className="mt-2 font-medium">{item?.floorPrice}</p>
                                                            </div>
                                                            <hr />
                                                            <div className="p-4 flex items-center justify-center">
                                                                <button className=" bg-[#7f1657] text-white px-4 py-2 rounded-md">Price Sheet</button>
                                                            </div>
                                                        </div>
                                                        <div className="w-[60%]">
                                                            <div className="w-full flex items-center justify-center">
                                                                <img className="w-[100%]" src={item?.image?.secure_url} alt="" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </SwiperSlide>
                                            )
                                        })
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






                            {/* ==================== */}

                            <div id='gallery' className="content06 mt-5 p-2 rounded-md">
                                <h1 className="py-2 px-2 text-3xl font-semibold">Gallery</h1>
                                <div className="gallery mt-4 grid grid-cols-4 gap-2">
                                    {
                                        data?.gallery?.map((img) => {
                                            return <img className="w-[200px] h-full rounded-sm" src={img?.secure_url} alt />
                                        })
                                    }
                                </div>
                            </div>
                            <div className="content07 bg-gradient-to-r from-cyan-100 to-blue-10 mt-5 p-2 rounded-md" id="amenities">
                                <h1 className="py-2 px-2 text-3xl font-semibold">Amenities You Would Love to Use</h1>
                                <div className="Amenities grid grid-cols-6 gap-2">
                                    {data?.amenities?.map((item) => {
                                        return (
                                            <div className=" bg-white p-2 rounded-md flex flex-col items-center shadow-md">
                                                <img className="w-[30px] " src={item?.image?.secure_url} width="30px" alt />
                                                <p className=" text-center" >{item?.name}</p>
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>

                            <div className="content05  mt-5 p-2 rounded-sm" id="virtualsitetour">
                                <h1 className="py-2 px-2 text-3xl font-semibold">Virtual Site Tour</h1>
                                <iframe className="w-full h-[400px]" src="https://www.youtube.com/embed/nlo2_mQ5nA4" title="YouTube video player" frameborder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                    allowfullscreen></iframe>
                            </div>

                            <div className="content09 bg-gradient-to-r from-cyan-100 to-blue-10 mt-5 p-2 rounded-md " id="location">
                                <h1 className="py-2 px-2 text-3xl font-semibold">Location Of Project Name</h1>
                                <iframe className=" w-full h-[450px] rounded-md" src={data?.map || "https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d7011.287631511752!2d77.23265872911378!3d28.52036222486543!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sin!4v1684832604572!5m2!1sen!2sin"} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
                            </div>
                            {/* similar project card section */}
                            <div className="mt-5 rounded-md">
                                <h2 className="border-b-2 border-[#7f1657] pb-2 my-10 text-2xl text-[#7f1657] font-semibold">
                                    Similar Project
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
                                        similarProject && (
                                            similarProject.map((data, idx) => (
                                                <SwiperSlide key={idx} className=" min-w-[300px] mb-5">
                                                    <SimilarProjectCard data={data} />
                                                </SwiperSlide>
                                            ))
                                        )
                                    }
                                </Swiper>
                                {
                                    similarProject && similarProject.length > 4 && (
                                        <div className='flex justify-between gap-10'>
                                            <button
                                                className={`${classNames} top-[50%] left-[-3%]`}
                                                ref={(node) => setPrevEl(node)}
                                            >
                                                <BsCaretLeftFill />
                                            </button>
                                            <button
                                                className={`${classNames} top-[50%]`}
                                                ref={(node) => setNextEl(node)}
                                            >
                                                <BsCaretRightFill />
                                            </button>
                                        </div>
                                    )
                                }
                            </div>
                        </div>
                        {/* =============================== */}
                        <div className=" sm:w-[100%] md:w-[30%] h-[100%] sticky top-24 z-10 hidden lg:flex  flex-col gap-6">
                            {/*   <div className="w-full bg-[#8ed1fc] p-5 rounded-md">
                                <div className="flex items-center justify-center">
                                    <img className="w-[100px]" src="https://mantridevelopers.in/wp-content/uploads/2023/08/cropped-web-logo.png" alt="" />
                                </div>
                                <div className="flex justify-between mt-3">
                                    <div className="flex flex-col">
                                        <div className="flex items-center justify-between gap-2">
                                            <img src="https://mantridevelopers.in/wp-content/uploads/2023/08/ruler.webp" alt="" />
                                            <span>Land Area</span>
                                        </div>
                                        <span>44.26 Acers</span>
                                    </div>
                                    <div className="flex flex-col">
                                        <div className="flex items-center justify-between gap-2">
                                            <img src="https://mantridevelopers.in/wp-content/uploads/2023/08/ruler.webp" alt="" />
                                            <span>Land Area</span>
                                        </div>
                                        <span>44.26 Acers</span>
                                    </div>
                                </div>
                                <hr />
                                <div className="flex justify-between mt-3">
                                    <div className="flex flex-col">
                                        <div className="flex items-center justify-between gap-2">
                                            <img src="https://mantridevelopers.in/wp-content/uploads/2023/08/ruler.webp" alt="" />
                                            <span>Land Area</span>
                                        </div>
                                        <span>44.26 Acers</span>
                                    </div>
                                    <div className="flex flex-col">
                                        <div className="flex items-center justify-between gap-2">
                                            <img src="https://mantridevelopers.in/wp-content/uploads/2023/08/ruler.webp" alt="" />
                                            <span>Land Area</span>
                                        </div>
                                        <span>44.26 Acers</span>
                                    </div>
                                </div>
                                <hr />
                                <div className="flex justify-between mt-3">
                                    <div className="flex flex-col">
                                        <div className="flex items-center justify-between gap-2">
                                            <img src="https://mantridevelopers.in/wp-content/uploads/2023/08/ruler.webp" alt="" />
                                            <span>Land Area</span>
                                        </div>
                                        <span>44.26 Acers</span>
                                    </div>
                                    <div className="flex flex-col">
                                        <div className="flex items-center justify-between gap-2">
                                            <img src="https://mantridevelopers.in/wp-content/uploads/2023/08/ruler.webp" alt="" />
                                            <span>Land Area</span>
                                        </div>
                                        <span>44.26 Acers</span>
                                    </div>
                                </div>
                                <hr />
                                <div className="flex justify-between mt-3">
                                    <div className="flex flex-col">
                                        <div className="flex items-center justify-between gap-2">
                                            <img src="https://mantridevelopers.in/wp-content/uploads/2023/08/ruler.webp" alt="" />
                                            <span>Land Area</span>
                                        </div>
                                        <span>44.26 Acers</span>
                                    </div>
                                    <div className="flex flex-col">
                                        <div className="flex items-center justify-between gap-2">
                                            <img src="https://mantridevelopers.in/wp-content/uploads/2023/08/ruler.webp" alt="" />
                                            <span>Land Area</span>
                                        </div>
                                        <span>44.26 Acers</span>
                                    </div>
                                </div>
                                <button className=" bg-cyan-900 w-full p-1 mt-4 text-white rounded-sm" onClick={() => document.getElementById('my_modal_3').showModal()}>Get Call Instant Back</button>
                            </div> */}
                            <div>
                                {/* ============================= */}
                                <div className="main02_right">
                                    <div className="contactformbox w-full bg-[#8ed1fc] p-5 rounded-md">
                                        <div className="flex flex-col items-center justify-center gap-2">
                                            <img className="w-[90px]" id="contactformbox_logo" src="https://mantridevelopers.in/wp-content/uploads/2023/08/cropped-web-logo.png" alt />
                                            <h3 id="contactformbox_title" className="text-center text-lg">Get Instant Call Back</h3>
                                        </div>
                                        <div className="contactformbox_box1 flex items-center justify-between mt-5">
                                            <div className="flex flex-col items-center justify-between">
                                                <img className="w-[30px]" src="https://mantridevelopers.in/wp-content/uploads/2023/09/phone-ringing-1.webp" alt />
                                                <p className="text-sm">24/7 Support</p>
                                            </div>
                                            <div className="flex flex-col items-center justify-between">
                                                <img className="w-[30px]" src="https://mantridevelopers.in/wp-content/uploads/2023/09/phone-ringing-1.webp" alt />
                                                <p className="text-sm">24/7 Support</p>
                                            </div>
                                            <div className="flex flex-col items-center justify-between">
                                                <img className="w-[30px]" src="https://mantridevelopers.in/wp-content/uploads/2023/09/phone-ringing-1.webp" alt />
                                                <p className="text-sm">24/7 Support</p>
                                            </div>
                                        </div>
                                        <form onSubmit={onFormSubmit} action className="contactform contactformbox_box2 flex mt-5 flex-col items-center justify-between gap-3">
                                            <h3 className=" text-lg font-medium">Mantri Webcity</h3>
                                            <input name="name" value={userInput.name} onChange={handelInput} type="text" placeholder="Name" className="w-full px-2 py-1 rounded-sm outline-none" id="second" />
                                            <input name="phone" value={userInput.phone} onChange={handelInput} type="text" placeholder="+91 - " className="w-full px-2 py-1 rounded-sm outline-none" />
                                            <input name="email" value={userInput.email} onChange={handelInput} type="email" placeholder="Email" className="w-full px-2 py-1 rounded-sm outline-none" />
                                            <select name="interested" value={userInput.interested} onChange={handelInput} className="w-full p-1 rounded-sm outline-none">
                                                <option value>Interested for Site Visit?</option>
                                                <option value="yes">Yes</option>
                                                <option value="no">No</option>
                                            </select>
                                            <button className=" bg-cyan-900 w-full p-1 text-white rounded-sm">Enquire Now</button>
                                        </form>
                                        <div className="contactformbox_box2 flex items-center justify-between mt-2">
                                            <div className="flex items-center gap-1">
                                                <img className="w-[30px]" src="https://mantridevelopers.in/wp-content/uploads/2023/09/phone-ringing-1.webp" alt />
                                                <p className="text-sm">Call</p>
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <img className="w-[30px]" src="https://mantridevelopers.in/wp-content/uploads/2023/09/whatsapp.webp" alt />
                                                <p className="text-sm">WhatsApp</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* ============================= */}
                            </div>
                        </div>
                    </div>
                ) : (

                    <h1>Not Fount</h1>
                )}
            </div>
        </HomeLayout>
    )
}

export default ProjectViewPage