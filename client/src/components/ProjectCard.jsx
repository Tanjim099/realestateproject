import { useNavigate } from "react-router-dom";
import HomeLayout from "./HomeLayout";

function ProjectCard({ name, developer, price, description, status, city, image, area, data }) {
    const navigate = useNavigate();
    return (
        <div className="w-[100%]flex items-center justify-center">
            <div className="flex gap-2  bg-white p-3 rounded-md shadow">
                <div className="w-[30%]">
                    <img className="w-full h-[100%] rounded-md" src={image} alt="" />
                </div>
                <div className="w-[70%]">
                    <h3 className=" text-lg">{(name).substring(0, 70)} ...</h3>
                    <h4 className=" font-medium text-gray-500">{developer}</h4>
                    <h4 className=" font-medium my-1"> Starting at ₹ {price}</h4>
                    <p className=" text-sm">{(description).substring(0, 250)} <span onClick={() => navigate(`/project/${data.slug}`, { state: data })} className="underline underline-offset-1 cursor-pointer">View more</span></p>
                    <div className="flex justify-between mt-1">
                        <div>
                            <p className="font-medium text-sm">Appartments</p>
                            <p className="font-medium text-gray-500 text-xs">2,3 BHK</p>
                        </div>
                        <div>
                            <p className="font-medium text-sm">Area</p>
                            <p className="font-medium text-gray-500 text-xs">{area}</p>
                        </div>
                        <div>
                            <p className="font-medium text-sm">Status</p>
                            <p className="font-medium text-gray-500 text-xs">{status}</p>
                        </div>
                        <div>
                            <p className="font-medium text-sm">City</p>
                            <p className="font-medium text-gray-500 text-xs">{city}</p>
                        </div>
                        <div className=" flex items-center">
                            <button
                                className=" bg-[#7f1657] px-2 py-1 border-2 text-white rounded-md hover:bg-transparent hover:text-black"
                                onClick={() => navigate(`/project/${data.slug}`, { state: data })}
                            >
                                View Details
                            </button>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default ProjectCard;