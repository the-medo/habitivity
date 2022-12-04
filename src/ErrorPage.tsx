import { useRouteError } from "react-router-dom";
import {Header1} from "./components/global/Headers";

export default function ErrorPage() {
    const error = useRouteError() as any;
    console.error(error);

    return (
        <div id="error-page">
            <Header1>Oops!</Header1>
            <p>Sorry, an unexpected error has occurred.</p>
            <p>
                <i>{error.statusText || error.message}</i>
            </p>
        </div>
    );
}