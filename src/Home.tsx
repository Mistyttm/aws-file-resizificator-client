import React, { useState } from "react";

function Home() {
    const [file, setFile] = useState<File | null>(null);
    const [res, setRes] = useState<string | undefined>();
    const [error, setError] = useState<string | undefined>(undefined);

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
            if(res !== undefined){
                formData.append("resolution", res)
            } else {
                setError("Please select a resolution");
                return
            }
            
            console.log("Uploading file...");

            try {
                const result = await fetch("http://0.0.0.0:8080/api/v1/files/upload", {
                    method: "POST",
                    body: formData,
                });

                const data = await result.json();

                console.log(data);
            } catch (error) {
                console.error(error);
            }
        }
    };

    console.log(res);

    return (
        <>
            <div>
                <label htmlFor="file" className="sr-only">
                    Choose a file
                </label>
                <input id="file" type="file" onChange={handleFileChange} />
                {error && <p>{error}</p>}
                <select name="resolution" value={res} onChange={handleResChange}>
                    <option value={undefined}>Select an option</option>
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
        </>
    );
}

export default Home;
