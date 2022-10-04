import React, {useEffect} from "react";
import {SecretManagerServiceClient} from '@google-cloud/secret-manager';
/*

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
*/


const PageOneOne: React.FC = () => {

    useEffect(() => {
        // accessSecretVersion().then((data) => console.log(data));

    }, []);

    return (
        <div>
            Page ONE ONE
        </div>
    )
}

export default PageOneOne;