import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { getAllProjects } from "../redux/slices/projectSlice";

function CityCard() {
    const dispatch = useDispatch();
    const [city, setCity] = useState([]);
    const { projects } = useSelector((state) => state.project);
    async function onLoadGetData() {
        const response = await dispatch(getAllProjects());
        console.log(response?.payload?.data)
        console.log(response?.payload?.data?.city);
    }
    useEffect(() => {
        onLoadGetData()
    }, [])

    return (
        <div>
            <h1>City Card</h1>
        </div>
    )
}

export default CityCard