
import { FaBed } from "react-icons/fa";
import {useNavigate} from 'react-router-dom';

function Project({ data }) {
    const navigate = useNavigate();

    return (
        <div
            className='border border-border bg-dry'
        >
            <div className="h-[250px]">
                <img className="w-full h-full object-contain border-b-2" src={data?.gallery[0]?.secure_url || "https://www.homznspace.com/wp-content/uploads/2023/11/Main-Elevation-Brigade-Sanctuary-324x235.jpg"} alt="" />
            </div>
            <div className="p-4 mt-2">
                <div className="flex justify-between">
                    <span className="font-medium text-[#7f1657] text-lg">₹ {data.pricing.startingFrom} Cr</span>
                    <button onClick={() => navigate(`/project/${data._id}`)} className="px-2 py-1 rounded-sm  border-2">Details</button>
                </div>
                <h3 className="project_name text-xl font-medium my-2">{data.name}</h3>
                <p className="project_description text-sm">3,4 BHK Apartment in Dhul Siras, Dwarka Delhi</p>
            </div>
            <div className="border flex justify-between p-4 h-[50px]">
                <div className="flex items-center gap-1">
                    <FaBed />
                    <span>2 Bedroom</span>
                </div>
                <div className="flex items-center gap-1">
                    <FaBed />
                    <span>2 Bedroom</span>
                </div>
                <div className="flex items-center gap-1">
                    <FaBed />
                    <span>2 Bedroom</span>
                </div>
            </div>
        </div>
    )
}

export default Project