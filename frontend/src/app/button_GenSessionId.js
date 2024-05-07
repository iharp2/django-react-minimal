"use client";

export default function GenSessionIdButton({ setSessionId }) {

    async function handleGenSessionId(event) {
        event.preventDefault();
        // get session_id from backend
        const api = "http://127.0.0.1:8000/api/gensessionid/"
        const response = await fetch(api);
        const status = response.status;
        if (status !== 200) {
            alert("Failed to get session id. Status code: " + status);
            return;
        }
        const data = await response.json()
        const sessionId = data.session_id;
        setSessionId(sessionId);
    }

    return (
        <>
            <button onClick={handleGenSessionId}>Generate Session ID</button>
        </>
    );
}