"use client";

export default function DownloadButton({sessionId}) {

    async function handleDownload(event) {
        event.preventDefault();
        const api = `http://127.0.0.1:8000/api/rasterdownload?session_id=${sessionId}`;
        const response = await fetch(api);
        const status = response.status;
        if (status !== 200) {
            alert("Download Failed. Status code: " + status);
            return;
        }
        const data = await response.json();
        const fileName = data.file_name;
        const fileUrl = `http://127.0.0.1:3000/temp/for_download/${fileName}`;
        window.open(fileUrl);
    }

    return (
        <>
            <h3>Download</h3>
            <button onClick={handleDownload}>Download</button>
        </>
    );
}