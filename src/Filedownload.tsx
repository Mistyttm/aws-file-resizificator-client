import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleExclamation } from "@fortawesome/free-solid-svg-icons";
import { ClockLoader } from "react-spinners";

function Download() {
    let intervalId: NodeJS.Timeout;

    const navigate = useNavigate();


    const [complete, setComplete] = useState<boolean>(false);
    const [url, setUrl] = useState<string | undefined>(undefined);
    const [error, setError] = useState<string | undefined>(undefined);

    const ID = localStorage.getItem("file");

    async function getURL() {
        console.log("testing");
        const id = ID;

        try {
            const result = await fetch(
                "http://0.0.0.0:8080/api/v1/files/encodedVideo/" + id
            );
            const data = await result.json();

            if (data.status === "OK") {
                setComplete(true);
                console.log("Success! Stopping the interval.");
                clearInterval(intervalId);
                setUrl(data.signedUrl);
                setError(undefined);
            } else {
                setError(data.message);
            }
        } catch (error) {
            setError("An error occurred while fetching the data.");
        }
    }

    const handleDownload = () => {
        // Create a temporary anchor element
        const anchor = document.createElement("a");
        anchor.href = url || "";
        anchor.target = "_blank"; // Open in a new tab
        anchor.download = "downloaded_file"; // Set a default file name

        // Programmatically click the anchor element to trigger the download
        anchor.click();

        navigate("/");
    };

    useEffect(() => {
        getURL();
        let intervalId: NodeJS.Timeout;

        if (!complete){
            intervalId = setInterval(getURL, 10 * 1000);
        }

        return () => {
            clearInterval(intervalId);
        };
    }, []);

    return (
        <div className="p-40 text-center">
            <div className="mx-80 p-20 flex flex-col w-auto gap-y-8 border-4 border-solid border-emerald-600 rounded-lg">
                <h1 className="text-6xl">Download your file here!</h1>
                {error && <div><ClockLoader color="#36d7b7" className="mx-auto my-5" size={107} /><p className="text-red-600 text-3xl"><FontAwesomeIcon icon={faCircleExclamation} /> {error}</p></div>}
                {complete && (
                    <button onClick={handleDownload} className="bg-orange-300 hover:bg-orange-700 mx-60 p-5 rounded-lg focus:outline-none focus:ring focus:ring-violet-300">
                        Download your file here
                    </button>
                )}
            </div>
            </div>
    );
}

export default Download;
