import HomeLayout from "./HomeLayout";

function ProjectCard() {
    return (
        <HomeLayout>
            <div className="flex items-center justify-center mt-4">
                <div className="flex gap-2 w-[900px] bg-white p-3 rounded-md shadow">
                    <div className="w-[30%]">
                        <img className="w-full h-[100%] rounded-md" src="https://superadmin.homes247.in/images/uploadPropertyImgs/1675313155-Cover%20image%20_1.png" alt="" />
                    </div>
                    <div className="w-[70%]">
                        <h3 className=" text-lg">Sobha Palm Court in Kogilu Road, Bangalore</h3>
                        <h4 className=" font-medium text-gray-500">Sobha Limited Properties in Kogilu Road, Bangalore</h4>
                        <h4 className=" font-medium my-1"> Starting at ₹ 82 L To 1.23 Cr</h4>
                        <p className=" text-sm">Sobha Palm Court is an ongoing residential venture developed by Sobha Limited.
                            This residential project is located in Yelahanka, prime residential area of North Bangalore.
                            This project is developed in 4 Acres. Total number of units available in this project is 294
                            arranged in 2 residential blocks which has structure of G+17 and G+18 Floors.
                            This project offers 2 and 3 BHK units with their unit size ranging from 1480 sq ft – 1930 sq ft.
                        </p>
                        <div className="flex justify-between mt-1">
                            <div>
                                <p className="font-medium text-sm">Appartments</p>
                                <p className="font-medium text-gray-500 text-xs">2,3 BHK</p>
                            </div>
                            <div>
                                <p className="font-medium text-sm">Area</p>
                                <p className="font-medium text-gray-500 text-xs">1950 Sqft</p>
                            </div>
                            <div>
                                <p className="font-medium text-sm">Status</p>
                                <p className="font-medium text-gray-500 text-xs">Ready to move</p>
                            </div>
                            <div>
                                <p className="font-medium text-sm">City</p>
                                <p className="font-medium text-gray-500 text-xs">Bangalore</p>
                            </div>
                            <div className=" flex items-center">
                                <button className=" bg-[#7f1657] px-2 py-1 border-2 text-white rounded-md hover:bg-transparent hover:text-black">View Details</button>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </HomeLayout>
    )
}

export default ProjectCard;