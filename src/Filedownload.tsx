import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

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
            intervalId = setInterval(getURL, 30 * 1000);
        }

        return () => {
            clearInterval(intervalId);
        };
    }, []);

    return (
        <div>
            <p>Hello World</p>
            {error && <p>{error}</p>}
            {complete && (
                <button onClick={handleDownload}>
                    Download your file here
                </button>
            )}
        </div>
    );
}

export default Download;
