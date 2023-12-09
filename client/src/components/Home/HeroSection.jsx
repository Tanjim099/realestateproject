import React, { useEffect, useState } from 'react'
import { FaSearch } from "react-icons/fa";
import CountUp from 'react-countup';
import { getSuggestions, searchProject, setQuery } from '../../redux/slices/projectSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
function HeroSection() {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { query, results, suggestions, status, error } = useSelector((state) => state?.project);
    console.log("results", results);
    console.log("suggestions", suggestions);
    const handleInputChange = (e) => {
        const inputValue = e.target.value;
        dispatch(setQuery(inputValue));
    };

    const handleSearch = async () => {
        const response = await dispatch(searchProject(query));
        if (response?.payload?.length > 1) {
            navigate("/search")
        }
    };

    useEffect(() => {
        if (query) {
            dispatch(getSuggestions(query));
        }

    }, [query, dispatch]);

    const handleSuggestionClick = (suggestion) => {
        dispatch(setQuery(suggestion));
        dispatch(searchProject(suggestion));
    }

    return (
        <div>
            {/* Hero Section */}
            <div className="hero_section">
                <div className="hero gradiantColor min-h-[600px] sm:h-[200px] md:h-[300px]"
                //  style={{
                //     backgroundImage: `url(${backroundImage})`,
                //     backgroundSize: 'cover',
                //     backgroundPosition: 'center',
                //     backgroundRepeat: 'no-repeat',
                //     backgroundAttachment: 'fixed',
                //     backgroundColor: 'rgba(255, 255, 255, 0.8)',
                //     boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)',
                //     opacity: 0.9,
                //     transition: 'background 0.3s ease-in-out',
                //     clipPath: 'polygon(0 0, 100% 0, 100% 90%, 0 100%)',
                // }}
                >
                    <div className="bg-opacity-60"></div>
                    <div className="hero-content h-full text-neutral-content w-[100%]">
                        <div className="flex flex-col h-full w-full justify-around items-center">
                            <div className="text-white flex flex-col justify-end h-full text-center w-[60%]">
                                <h1 className=" sm:text-4xl font-semibold">Discover Properties in India</h1>
                                <p className="text-xl my-5">We help you find your new home</p>
                                {/* <div className="flex">
                                    <input type="text" placeholder="Enter Location builder, project" name="" id="" className="w-[100%] outline-none p-1 sm:p-3 text-black sm:text-sm" />
                                    <button className="btn border-0 rounded-none bg-[#7f1657] text-white hover:text-black">Search</button>
                                    </div> */}
                                {/* <div className=" my-5">
                                    <h1 className=" text-left mb-2 text-xl">Top City</h1>
                                    <div className="project_container w-100  relative">
                                        <div className="sliderBtn top-1/2">
                                            <button onClick={arrowRight} className=" absolute left-[-1%] md:left-[0%] top-1/2 w-[40px] h-[40px] bg-[#cff4ff] rounded-full text-center flex items-center justify-center"><IoIosArrowBack /></button>
                                            <button onClick={arrowLeft} className=" absolute right-[-1%] md:right-[0%] top-1/2 w-[40px] h-[40px] bg-[#cff4ff] rounded-full text-center flex items-center justify-center"><IoIosArrowForward /></button>
                                        </div>
                                        <div className="projects flex overflow-x-auto gap-5" id="projects">
                                            <CityCard />
                                        </div>
                                    </div>
                                 </div> */}
                                {/* ====================== */}
                                <div className="">
                                    <div className="flex items-center gap-2 w-full h-[50px]">
                                        <div className="relative flex items-center gap-2 w-full h-[50px]">
                                            <input
                                                type="text"
                                                placeholder="Enter Location builder, project"
                                                name="query"
                                                value={query}
                                                id="query"
                                                className="border border-gray-200 shadow-sm outline-0 text-black h-full w-full rounded p-3 pl-10"
                                                onChange={handleInputChange}
                                            />
                                            <span className="absolute z-10 top-4 left-4 text-gray-400"><FaSearch /></span>
                                        </div>
                                        <button onClick={handleSearch} className="bg-[#7f1657] w-[100px] h-full flex items-center justify-center rounded text-white hover:text-black right-7 top-6">Search</button>
                                    </div>
                                    {status === 'loading' && <p>Loading...</p>}
                                    {status === 'failed' && <p>Error: {error}</p>}
                                    <ul>
                                        {suggestions?.map((suggestion) => (
                                            <li key={suggestion} onClick={() => handleSuggestionClick(suggestion)}>
                                                {suggestion}
                                            </li>
                                        ))}
                                    </ul>
                                    <div>
                                        <h2>Search Results</h2>
                                        <ul>
                                            {results?.map((project) => (
                                                <li key={project._id}>{project.projectName}</li>
                                                // Display other project details as needed...
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="w-full flex justify-end items-end h-full">
                                <div className="w-[90%] mx-auto text-white flex justify-between my-10 text-center">
                                    <div className="">
                                        <span className="text-4xl font-semibold text-white">
                                            <CountUp start={0} end={50} duration={2} delay={0} />
                                        </span>
                                        <p>YEARS OF EXPERIENCED</p>
                                    </div>
                                    <div className="text-3xl flex items-center">|</div>
                                    <div>
                                        <span className="text-4xl font-semibold text-white">
                                            <CountUp start={0} end={210} duration={2} delay={0} />K+
                                        </span>
                                        <p>TOTAL PROPERTIES</p>
                                    </div>
                                    <div className="text-3xl flex items-center">|</div>
                                    <div>
                                        <span className="text-4xl font-semibold text-white">
                                            <CountUp start={0} end={450} duration={2} delay={0} />
                                        </span>
                                        <p>QUALIFIED REALTORS</p>
                                    </div>
                                    <div className="text-3xl flex items-center">|</div>
                                    <div>
                                        <span className="text-4xl font-semibold text-white">
                                            <CountUp start={0} end={100} duration={2} delay={0} />
                                        </span>
                                        <p>TOTAL BRANCHES</p>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default HeroSection