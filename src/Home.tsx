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
        <div className="p-40 text-center">
            <div className="mx-80 p-20 flex flex-col w-auto gap-y-8 border-4 border-solid border-emerald-600 rounded-lg">
                <h1 className="text-6xl">File Resizificator</h1>
                <label htmlFor="file" className="text-3xl">
                    Choose a file
                </label>
                <input
                    id="file"
                    type="file"
                    onChange={handleFileChange}
                    className="mx-auto"
                />
                {error && <p>{error}</p>}
                <select
                    name="resolution"
                    value={res}
                    onChange={handleResChange}
                    className="mx-auto h-10 rounded-lg px-5 cursor-pointer mb-10">
                    <option value={undefined} disabled selected>
                        Select an option
                    </option>
                    <option value={"176x144"}>144p</option>
                    <option value={"320x240"}>240p</option>
                    <option value={"640360"}>360p</option>
                    <option value={"854x480"}>480p</option>
                    <option value={"1280x720"}>720p</option>
                    <option value={"1920x1080"}>1080p</option>
                    <option value={"2560x1440"}>1440p</option>
                    <option value={"3840x2160"}>4K</option>
                </select>
            
            {file && (
                <section>
                    <p className="text-3xl mb-5">File details:</p>
                    <ul className="list-disc mx-40">
                        <li>Name: {file.name}</li>
                        <li>Type: {file.type}</li>
                        <li>Size: {file.size} bytes</li>
                    </ul>
                </section>
            )}

            {file && <button onClick={handleUpload} className="bg-orange-300 mx-80 rounded-lg py-4">Upload your file</button>}
            </div>
        </div>
    );
}

export default Home;
