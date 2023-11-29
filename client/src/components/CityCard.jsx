import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { getAllProjects } from "../redux/slices/projectSlice";

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
        <div className="flex gap-2 overflow-x-scroll">
            <div className=" bg-white min-w-[130px] h-[80px] rounded-md flex items-center justify-center text-center">
                <h4 className=" text-center text-black">Delhi</h4>
            </div>
            <div className=" bg-white min-w-[130px] h-[80px] rounded-md flex items-center justify-center text-center">
                <h4 className=" text-center text-black">Delhi</h4>
            </div>
            <div className=" bg-white min-w-[130px] h-[80px] rounded-md flex items-center justify-center text-center">
                <h4 className=" text-center text-black">Delhi</h4>
            </div>
            <div className=" bg-white min-w-[130px] h-[80px] rounded-md flex items-center justify-center text-center">
                <h4 className=" text-center text-black">Delhi</h4>
            </div>
            <div className=" bg-white min-w-[130px] h-[80px] rounded-md flex items-center justify-center text-center">
                <h4 className=" text-center text-black">Delhi</h4>
            </div>
            <div className=" bg-white min-w-[130px] h-[80px] rounded-md flex items-center justify-center text-center">
                <h4 className=" text-center text-black">Delhi</h4>
            </div>

            <div className=" bg-white min-w-[130px] h-[80px] rounded-md flex items-center justify-center text-center">
                <h4 className=" text-center text-black">Delhi</h4>
            </div>
            <div className=" bg-white min-w-[130px] h-[80px] rounded-md flex items-center justify-center text-center">
                <h4 className=" text-center text-black">Delhi</h4>
            </div>
            <div className=" bg-white min-w-[130px] h-[80px] rounded-md flex items-center justify-center text-center">
                <h4 className=" text-center text-black">Delhi</h4>
            </div>
            <div className=" bg-white min-w-[130px] h-[80px] rounded-md flex items-center justify-center text-center">
                <h4 className=" text-center text-black">Delhi</h4>
            </div>
        </div>
    )
}

export default CityCard