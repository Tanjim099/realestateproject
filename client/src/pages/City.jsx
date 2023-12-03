import { useParams } from "react-router-dom";
import HomeLayout from "../components/HomeLayout";
import ProjectCard from "../components/ProjectCard";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getAllProjects } from "../redux/slices/projectSlice";

function City() {
    const dispatch = useDispatch();
    const { cityname } = useParams();
    const { projects } = useSelector((state) => state.project);
    async function onLoadGetData() {
        const response = await dispatch(getAllProjects());
    }
    const filterProject = projects?.filter((project) => {
        return cityname === project?.city?.toLowerCase();
    });
    console.log(filterProject);
    useEffect(() => {
        onLoadGetData()
    }, [])
    return (
        <HomeLayout>
            <div className="w-[100%] md:w-[80%] m-auto">
                <div className="flex gap-2 my-5">
                    <div className="w-[75%] flex flex-col gap-4">
                        {
                            projects?.map((p, i) => {
                                return <ProjectCard
                                    key={i}
                                    name={p.name}
                                    developer={p.developer}
                                    price={p?.pricing?.startingFrom}
                                    description={p.description}
                                    status={p.status}
                                    city={p.city}
                                    image={p?.gallery[0]?.secure_url}
                                    data={p}
                                />
                            })
                        }
                    </div>
                    <div className="w-[25%]">
                        <div className="main02_right">
                            <div className="contactformbox w-full bg-[#8ed1fc] p-5 rounded-md sticky top-10">
                                <div className="flex flex-col items-center justify-center gap-2">
                                    <h3 id="contactformbox_title" className="text-center text-lg">Quick Way To Save Time!!</h3>
                                </div>
                                <div className="contactformbox_box1 flex items-center justify-between mt-5">
                                    <div className="flex flex-col items-center justify-between">
                                        <img className="w-[30px]" src="https://mantridevelopers.in/wp-content/uploads/2023/09/phone-ringing-1.webp" alt />
                                        <p className="text-xs">24/7 Support</p>
                                    </div>
                                    <div className="flex flex-col items-center justify-between">
                                        <img className="w-[30px]" src="https://mantridevelopers.in/wp-content/uploads/2023/09/phone-ringing-1.webp" alt />
                                        <p className="text-xs">24/7 Support</p>
                                    </div>
                                    <div className="flex flex-col items-center justify-between">
                                        <img className="w-[30px]" src="https://mantridevelopers.in/wp-content/uploads/2023/09/phone-ringing-1.webp" alt />
                                        <p className="text-xs">24/7 Support</p>
                                    </div>
                                </div>
                                <form action className="contactform contactformbox_box2 flex mt-5 flex-col items-center justify-between gap-3">
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
                    </div>
                </div>
            </div>
        </HomeLayout>
    )
}

export default City;