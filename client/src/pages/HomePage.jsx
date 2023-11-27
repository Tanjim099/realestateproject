import { useDispatch, useSelector } from "react-redux";
import HomeLayout from "../components/HomeLayout";
import Project from "../components/Project";
import { getAllProjects } from "../redux/slices/projectSlice";
import { useEffect } from "react";

function HomePage() {
    const dispatch = useDispatch();
    const { projects } = useSelector((state) => state.project);
    console.log(projects)
    async function onLoadGetData() {
        const response = await dispatch(getAllProjects());
        console.log(response)
    }
    useEffect(() => {
        onLoadGetData()
    }, [])
    return (
        <HomeLayout>
            <div className="homeContainer ">
                <div className="hero_section">
                    <div className="hero h-[500px] sm:h-[200px] md:h-[300px]" style={{ backgroundImage: 'url(https://daisyui.com/images/stock/photo-1507358522600-9f71e620c44e.jpg)' }}>
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
                    <h1 className=" text-3xl font-semibold mb-3">Top Projects</h1>
                    <div className=" my-5">
                        {projects?.map((p, i) => {
                            console.log(p?.gallery)
                            return (
                                <Project key={i} data={p} />
                            )
                        })}
                    </div>
                </div>
            </div>
        </HomeLayout>
    )
}

export default HomePage