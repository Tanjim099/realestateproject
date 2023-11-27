import { useNavigate } from "react-router";
import "../styles/Project.css";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io"
function Project({ data }) {
    const navigate = useNavigate();
    let projects = document.getElementById("projects");
    // console.log(data.gallery[0])
    // console.log(data.gallery[1].secure_url)
    return (
        <div>
            <div className="w-[300px] p-3 border-2 cursor-pointer" onClick={() => navigate(`project/${data._id}`, { state: data })}>
                <div className="project_header flex items-center justify-center">
                    <img className="w-100 h-48 max-h-full" src={data?.gallery[0]?.secure_url || "https://www.homznspace.com/wp-content/uploads/2023/11/Main-Elevation-Brigade-Sanctuary-324x235.jpg"} alt="" />
                </div>
                <div className="project_content mt-2">
                    <h3 className="project_name text-lg font-medium">{data.name}</h3>
                    <p className="project_description text-sm">3,4 BHK Apartment in Dhul Siras, Dwarka Delhi</p>
                    <div className="flex justify-between">
                        <span className=" font-medium">₹ {data.pricing.startingFrom} Cr</span>
                        <button className="px-2 py-1 rounded-sm  border-2">Details</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Project