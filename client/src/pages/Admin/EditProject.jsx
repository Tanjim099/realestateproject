import React, { useEffect } from 'react'
import CreateProject from './CreateProject'
import { useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import { setEditProject, setProject } from '../../redux/slices/projectSlice';

function EditProject() {
    const dispatch = useDispatch();
    const { courseId } = useParams();

    useEffect(async () => {
        (async () => {
            const res = await getProject(courseId);
            if (res) {
                dispatch(setEditProject(true));
                dispatch(setProject(res));
            }
        })()
    }, []);

    return (
        <CreateProject />
    )
}

export default EditProject