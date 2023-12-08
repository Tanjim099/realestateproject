import { useParams } from "react-router-dom";
import HomeLayout from "../components/HomeLayout";
import { useDispatch, useSelector } from "react-redux";
import { getUserProfile } from "../redux/slices/authSlice";
import { useEffect } from "react";

function Author() {
    const dispatch = useDispatch();
    const { id } = useParams();
    console.log(id);
    const { userData } = useSelector((state) => state?.auth);
    console.log(userData)
    async function getUserData() {
        const response = await dispatch(getUserProfile(id));
        console.log(response);
    }
    useEffect(() => {
        getUserData()
    }, []);
    return (
        <HomeLayout>
            <h1>Author</h1>
        </HomeLayout>
    )
}

export default Author;