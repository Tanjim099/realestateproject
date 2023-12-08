import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { getAllProjects } from "../redux/slices/projectSlice";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, FreeMode, Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import Bangalore from '../assets/bangalore.png';
import chennai from '../assets/chennai.png';
import hyderabad from '../assets/hyderabad.png';
import mumbai from '../assets/mumbai.png';
import kolkata from '../assets/kolkata.png';
import delhi from '../assets/delhi.png';
import { NavLink } from "react-router-dom";

function CityCard() {
    const dispatch = useDispatch();
    const [city, setCity] = useState([]);
    const { projects } = useSelector((state) => state.project);
    // const cityD = []
    // console.log(projects)
    // const cityData = projects.find((item) => {
    //     return item.city
    // })
    // console.log(city)
    // async function onLoadGetData() {
    //     const response = await dispatch(getAllProjects());
    //     console.log(response?.payload?.data)
    //     const cityData = response?.payload?.data.map((item) => {

    //         return item.city
    //     })
    //     console.log(cityData)
    //     // console.log(response?.payload?.data?.name);
    //     for (let i = 0; i < cityData.length; i++) {
    //         if (!city.includes(cityData[i])) {
    //             setCity(cityData[i])
    //         }
    //     }
    // }
    // useEffect(() => {
    //     onLoadGetData()
    // }, [])

    return (
        <div className="flex justify-center lg:justify-between flex-wrap w-full gap-3">
            <NavLink to="/city/bangalore">
                <div className=" bg-white rounded-lg border w-[170px] h-[110px] gap-2 flex flex-col items-center justify-center text-center">
                    <img src={Bangalore} className="w-[50px] h-[50px]" alt="CityImage" />
                    <h4 className=" text-center text-[#7f1657]">Bangalore</h4>
                </div>
            </NavLink>
            <NavLink to="/city/chennai">
                <div className=" bg-white rounded-lg border w-[170px] h-[110px] gap-2 flex flex-col items-center justify-center text-center">
                    <img src={chennai} className="w-[50px] h-[50px]" alt="CityImage" />
                    <h4 className=" text-center text-black">Chennai</h4>
                </div>
            </NavLink>
            <NavLink to="/city/hyderabad">
                <div className=" bg-white rounded-lg border w-[170px] h-[110px] gap-2 flex flex-col items-center justify-center text-center">
                    <img src={hyderabad} className="w-[50px] h-[50px]" alt="CityImage" />
                    <h4 className=" text-center text-black">Hyderabad</h4>
                </div>
            </NavLink>
            <NavLink to="/city/mumbai">
                <div className=" bg-white rounded-lg border w-[170px] h-[110px] gap-2 flex flex-col items-center justify-center text-center">
                    <img src={mumbai} className="w-[50px] h-[50px]" alt="CityImage" />
                    <h4 className=" text-center text-black">Mumbai</h4>
                </div>
            </NavLink>
            <NavLink to="/city/kolkata">
                <div className=" bg-white rounded-lg border w-[170px] h-[110px] gap-2 flex flex-col items-center justify-center text-center">
                    <img src={kolkata} className="w-[50px] h-[50px]" alt="CityImage" />
                    <h4 className=" text-center text-black">Kolkata</h4>
                </div>
            </NavLink>
            <NavLink to="/city/delhi">
                <div className=" bg-white rounded-lg border w-[170px] h-[110px] gap-2 flex flex-col items-center justify-center text-center">
                    <img src={delhi} className="w-[50px] h-[50px]" alt="CityImage" />
                    <h4 className=" text-center text-black">Delhi</h4>
                </div>
            </NavLink>
        </div>
    )
}


export default CityCard;