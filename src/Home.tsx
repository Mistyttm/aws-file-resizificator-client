import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Home() {
    const [file, setFile] = useState<File | null>(null);
    const [res, setRes] = useState<string | undefined>();
    const [error, setError] = useState<string | undefined>(undefined);

    const navigate = useNavigate();

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setFile(e.target.files[0]);
        }
    };

    const handleResChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setRes(event.target.value);
    };

    const handleUpload = async () => {
        if (file) {
            const formData = new FormData();
            formData.append("video", file);
            if (res !== undefined) {
                formData.append("resolution", res);
            } else {
                setError("Please select a resolution");
                return;
            }

            console.log("Uploading file...");

            try {
                const result = await fetch(
                    "http://0.0.0.0:8080/api/v1/files/upload",
                    {
                        method: "POST",
                        body: formData,
                    }
                );

                const data = await result.json();

                console.log(data);
                localStorage.setItem("file", data.message);
                navigate("/download");
            } catch (error) {
                console.error(error);
            }
        }
    };

    console.log(res);

    return (
            <div className="p-80 text-center">
                <div className="flex flex-col w-auto gap-y-8 border-solid border-emerald-600 rounded-lg">
                    <h1 className="text-6xl">File Resizificator</h1>
                    <label htmlFor="file" className="text-3xl">
                        Choose a file
                    </label>
                    <input id="file" type="file" onChange={handleFileChange} />
                    {error && <p>{error}</p>}
                    <select
                        name="resolution"
                        value={res}
                        onChange={handleResChange}>
                        <option value={undefined} disabled>
                            Select an option
                        </option>
                        <option value={"144x176"}>144p</option>
                        <option value={"240x320"}>240p</option>
                        <option value={"360x640"}>360p</option>
                        <option value={"480x854"}>480p</option>
                        <option value={"720x1280"}>720p</option>
                        <option value={"1080x1920"}>1080p</option>
                        <option value={"1440x2560"}>1440p</option>
                        <option value={"2160x3840"}>4K</option>
                    </select>
                </div>
                {file && (
                    <section>
                        File details:
                        <ul>
                            <li>Name: {file.name}</li>
                            <li>Type: {file.type}</li>
                            <li>Size: {file.size} bytes</li>
                        </ul>
                    </section>
                )}

                {file && <button onClick={handleUpload}>Upload a file</button>}
            </div>
    );
}

export default Home;
