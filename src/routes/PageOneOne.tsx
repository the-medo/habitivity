import React, {useEffect, useState} from "react";
import {Task, taskConverter} from "../types/Tasks";
import {useDispatch, useSelector} from "react-redux";
import {ReduxState} from "../store";
import {collection, getDocs} from "firebase/firestore";
import {db} from "../firebase";
import {selectTasks, setTasks} from "../store/taskSlice";

/*
import {SecretManagerServiceClient} from '@google-cloud/secret-manager';

const name = "projects/595220701343/secrets/vite_configs/versions/latest";

const client = new SecretManagerServiceClient();

async function accessSecretVersion() {
    const [version] = await client.accessSecretVersion({
        name: name,
    });

    // Extract the payload as a string.
    const payload = version.payload?.data?.toString();

    // WARNING: Do not print the secret in a production environment - this
    // snippet is showing how to access the secret material.
    console.info(`Payload: ${payload}`);
}

==============

    useEffect(() => {
        accessSecretVersion().then((data) => console.log(data));

    }, []);

*/


const taskColRef = collection(db, 'task-testing').withConverter(taskConverter);

const PageOneOne: React.FC = () => {
    const dispatch = useDispatch();

    const tasks = useSelector((state: ReduxState) => selectTasks(state));

    useEffect(() => {
        getDocs(taskColRef).then((snapshot) => {
            dispatch(setTasks(snapshot.docs.map(x => x.data())));
        })

    }, []);

    useEffect(() => {
        console.log(tasks);
    }, [tasks]);

    return (
        <div>
            <b>Here you will find list of tasks:</b><br/>
            {
                tasks.map(t => <li key={t.taskId}>{t.taskName}</li>)
            }
        </div>
    )
}

export default PageOneOne;
