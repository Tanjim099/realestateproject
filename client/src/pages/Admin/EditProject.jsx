import React, { useEffect } from 'react'
import CreateProject from './CreateProject'
import { useLocation, useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import { getProject, setEditProject, setProject } from '../../redux/slices/projectSlice';

function EditProject() {
    const dispatch = useDispatch();
    const { projectId } = useParams();

    const {state} = useLocation();
    console.log(state);

    if(state){
        dispatch(setEditProject(true));
        dispatch(setProject(state));
    }

    // useEffect(() => {
    //     (async () => {
    //         const res = await dispatch(getProject(projectId));
    //         console.log(res);
    //         if (res?.payload) {
    //             dispatch(setEditProject(true));
    //             dispatch(setProject(res?.payload?.data));
    //         }
    //     })()
    // }, []);

    return (
        <CreateProject />
    )
}

export default EditProject