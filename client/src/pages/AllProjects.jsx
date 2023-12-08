import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getAllProjectsByPage } from "../redux/slices/projectSlice";
import HomeLayout from "../components/HomeLayout";
import ProjectCard from "../components/ProjectCard";

function AllProjects() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { page } = useParams();
    console.log(page)
    const [limit, setLimit] = useState(10);
    const { projectByPage } = useSelector((state) => state?.project);
    console.log(projectByPage);
    async function fetchData() {
        const response = await dispatch(getAllProjectsByPage({ data: parseInt(page) || 1, data: limit }));
    }

    const handleNextPage = () => {
        // Dispatch action with updated page value
        const nextPage = parseInt(page) + 1;
        dispatch(getAllProjectsByPage({ page: nextPage, limit }));
        navigate(`/projects/page/${nextPage}`);
    };


    const handlePrevPage = () => {
        // Dispatch action with updated page value
        const prevPage = parseInt(page) - 1;
        dispatch(getAllProjectsByPage({ page: prevPage, limit }));
        navigate(`/projects/page/${prevPage}`);
    }
    useEffect(() => {
        fetchData()
    }, [])
    return (
        <HomeLayout>
            <div className="w-[100%] md:w-[80%] m-auto">
                <div className="flex gap-2 my-5">
                    <div className="w-[75%] flex flex-col gap-4">
                        <div className="flex flex-col gap-4">
                            {
                                projectByPage?.map((p, i) => {
                                    return <ProjectCard
                                        key={i}
                                        name={p.name}
                                        developer={p.developer}
                                        price={p?.pricing?.startingFrom}
                                        description={p.description}
                                        status={p.status}
                                        city={p.city}
                                        image={p?.gallery[0]?.secure_url}
                                        area={p?.projectArea}
                                        data={p}
                                    />
                                })
                            }
                        </div>
                        <div className="flex items-center justify-center">
                            <div className="flex justify-end items-center gap-4 mt-2">
                                <button className="btn btn-outline py-1 px-2 h-[30px] min-h-[30px] rounded-md" variant="contained" onClick={handlePrevPage} disabled={page === 1}>
                                    Previous
                                </button>
                                <span>{page}</span>
                                <button className="btn btn-outline py-1 px-2 h-[30px] min-h-[30px] rounded-md" variant="contained" onClick={handleNextPage}>
                                    Next
                                </button>
                            </div>
                        </div>
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

export default AllProjects