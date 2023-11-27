import "../styles/Project.css";
// import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io"
import { FaBed } from "react-icons/fa";
function Project() {
    let projects = document.getElementById("projects");
    function arrowLeft() {
        console.log("yes")
        projects.scrollLeft -= 400
    }
    function arrowRight() {
        projects.scrollLeft += 400
    }
    return (
        <div>
            <div className="project_container w-100  relative">
                {/* <div className="sliderBtn top-1/2">

                    <button onClick={arrowRight} className=" absolute left-[-1%] md:left-[0%] top-1/2 w-[40px] h-[40px] bg-[#cff4ff] rounded-full text-center flex items-center justify-center"><IoIosArrowBack /></button>
                    <button onClick={arrowLeft} className=" absolute right-[-1%] md:right-[0%] top-1/2 w-[40px] h-[40px] bg-[#cff4ff] rounded-full text-center flex items-center justify-center"><IoIosArrowForward /></button>
                </div> */}
                <div className="projects flex overflow-x-auto gap-5" id="projects">

                    <div className="min-w-[400px] border">
                        <div className="project_header h-[200px]">
                            <img className="w-full h-full object-cover" src="https://www.homznspace.com/wp-content/uploads/2023/11/Main-Elevation-Brigade-Sanctuary-324x235.jpg" alt="" />
                        </div>
                        <div className="project_content mt-2 px-6 py-4">
                            <div className="flex justify-between">
                                <span className="font-medium text-xl font-sans">₹ 3.12 Cr</span>
                                <button className="px-2 py-1 rounded  border-2">Details</button>
                            </div>
                            <h5 className="text-2xl my-1">Appartment</h5>
                            <p className="font-mono mt-3">Get started by choosing from one of our pre-built page templates to showcase your properties</p>
                        </div>
                        <div className="border-t-2 flex justify-between px-5 py-4">
                            <div className="flex items-center justify-center gap-1">
                                <span><FaBed /></span>
                                <span>2 Bedroom</span>
                            </div>
                            <div className="flex items-center justify-center gap-1">
                                <span><FaBed /></span>
                                <span>2 Bedroom</span>
                            </div>
                            <div className="flex items-center justify-center gap-1">
                                <span><FaBed /></span>
                                <span>2 Bedroom</span>
                            </div>
                        </div>
                    </div>

                    <div className="min-w-[300px] p-3 border-2">
                        <div className="project_header">
                            <img className="w-full" src="https://www.homznspace.com/wp-content/uploads/2023/11/Main-Elevation-Brigade-Sanctuary-324x235.jpg" alt="" />
                        </div>
                        <div className="project_content mt-2">
                            <h3 className="project_name text-lg font-medium">Orchid The Consulate Apartments</h3>
                            <p className="project_description text-sm">3,4 BHK Apartment in Dhul Siras, Dwarka Delhi</p>
                            <div className="flex justify-between">
                                <span className=" font-medium">₹ 3.12 Cr</span>
                                <button className="px-2 py-1 rounded-sm  border-2">Details</button>
                            </div>
                        </div>
                    </div>
                    <div className="min-w-[300px] p-3 border-2">
                        <div className="project_header">
                            <img className="w-full" src="https://www.homznspace.com/wp-content/uploads/2023/11/Main-Elevation-Brigade-Sanctuary-324x235.jpg" alt="" />
                        </div>
                        <div className="project_content mt-2">
                            <h3 className="project_name text-lg font-medium">Orchid The Consulate Apartments</h3>
                            <p className="project_description text-sm">3,4 BHK Apartment in Dhul Siras, Dwarka Delhi</p>
                            <div className="flex justify-between">
                                <span className=" font-medium">₹ 3.12 Cr</span>
                                <button className="px-2 py-1 rounded-sm  border-2">Details</button>
                            </div>
                        </div>
                    </div>
                    <div className="min-w-[300px] p-3 border-2">
                        <div className="project_header">
                            <img className="w-full" src="https://www.homznspace.com/wp-content/uploads/2023/11/Main-Elevation-Brigade-Sanctuary-324x235.jpg" alt="" />
                        </div>
                        <div className="project_content mt-2">
                            <h3 className="project_name text-lg font-medium">Orchid The Consulate Apartments</h3>
                            <p className="project_description text-sm">3,4 BHK Apartment in Dhul Siras, Dwarka Delhi</p>
                            <div className="flex justify-between">
                                <span className=" font-medium">₹ 3.12 Cr</span>
                                <button className="px-2 py-1 rounded-sm  border-2">Details</button>
                            </div>
                        </div>
                    </div>
                    <div className="min-w-[300px] p-3 border-2">
                        <div className="project_header">
                            <img className="w-full" src="https://www.homznspace.com/wp-content/uploads/2023/11/Main-Elevation-Brigade-Sanctuary-324x235.jpg" alt="" />
                        </div>
                        <div className="project_content mt-2">
                            <h3 className="project_name text-lg font-medium">Orchid The Consulate Apartments</h3>
                            <p className="project_description text-sm">3,4 BHK Apartment in Dhul Siras, Dwarka Delhi</p>
                            <div className="flex justify-between">
                                <span className=" font-medium">₹ 3.12 Cr</span>
                                <button className="px-2 py-1 rounded-sm  border-2">Details</button>
                            </div>
                        </div>
                    </div>
                    <div className="min-w-[300px] p-3 border-2">
                        <div className="project_header">
                            <img className="w-full" src="https://www.homznspace.com/wp-content/uploads/2023/11/Main-Elevation-Brigade-Sanctuary-324x235.jpg" alt="" />
                        </div>
                        <div className="project_content mt-2">
                            <h3 className="project_name text-lg font-medium">Orchid The Consulate Apartments</h3>
                            <p className="project_description text-sm">3,4 BHK Apartment in Dhul Siras, Dwarka Delhi</p>
                            <div className="flex justify-between">
                                <span className=" font-medium">₹ 3.12 Cr</span>
                                <button className="px-2 py-1 rounded-sm  border-2">Details</button>
                            </div>
                        </div>
                    </div>
                    <div className="min-w-[300px] p-3 border-2">
                        <div className="project_header">
                            <img className="w-full" src="https://www.homznspace.com/wp-content/uploads/2023/11/Main-Elevation-Brigade-Sanctuary-324x235.jpg" alt="" />
                        </div>
                        <div className="project_content mt-2">
                            <h3 className="project_name text-lg font-medium">Orchid The Consulate Apartments</h3>
                            <p className="project_description text-sm">3,4 BHK Apartment in Dhul Siras, Dwarka Delhi</p>
                            <div className="flex justify-between">
                                <span className=" font-medium">₹ 3.12 Cr</span>
                                <button className="px-2 py-1 rounded-sm  border-2">Details</button>
                            </div>
                        </div>
                    </div>
                    <div className="min-w-[300px] p-3 border-2">
                        <div className="project_header">
                            <img className="w-full" src="https://www.homznspace.com/wp-content/uploads/2023/11/Main-Elevation-Brigade-Sanctuary-324x235.jpg" alt="" />
                        </div>
                        <div className="project_content mt-2">
                            <h3 className="project_name text-lg font-medium">Orchid The Consulate Apartments</h3>
                            <p className="project_description text-sm">3,4 BHK Apartment in Dhul Siras, Dwarka Delhi</p>
                            <div className="flex justify-between">
                                <span className=" font-medium">₹ 3.12 Cr</span>
                                <button className="px-2 py-1 rounded-sm  border-2">Details</button>
                            </div>
                        </div>
                    </div>
                    <div className="min-w-[300px] p-3 border-2">
                        <div className="project_header">
                            <img className="w-full" src="https://www.homznspace.com/wp-content/uploads/2023/11/Main-Elevation-Brigade-Sanctuary-324x235.jpg" alt="" />
                        </div>
                        <div className="project_content mt-2">
                            <h3 className="project_name text-lg font-medium">Orchid The Consulate Apartments</h3>
                            <p className="project_description text-sm">3,4 BHK Apartment in Dhul Siras, Dwarka Delhi</p>
                            <div className="flex justify-between">
                                <span className=" font-medium">₹ 3.12 Cr</span>
                                <button className="px-2 py-1 rounded-sm  border-2">Details</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Project