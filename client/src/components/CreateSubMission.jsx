import { useState } from "react";
import SubMission from "./SubMission";
import getOrCreateUserId from "../utils/userId";
const url = import.meta.env.VITE_BACKEND_URL || "http://localhost:3001";

export default function CreateSubMission(props) {
    const [content, setContent] = useState("");

    async function onSubmitSubmission(evnt) {
        evnt.preventDefault();
        try {
            const body = { content };
            const userId = getOrCreateUserId()
            const result = await fetch(`${url}/sub/${props.id}`, {
                method: "POST",
                headers: { "Content-Type": "application/json", "x-user-id": userId },
                body: JSON.stringify(body)
            });
            setContent("");
            props.subMissionRefresher();
        } catch (err) {
            console.error(err.message);
        }
    };

    function changeHandler(evnt) {
        setContent(evnt.target.value)
    }

    return (
        <form onSubmit={onSubmitSubmission} className="sub-mission-form" action="POST">
            <input
                type="text" name="content"
                value={content}
                onChange={changeHandler}
                className="mission-input"
                placeholder="Añadir Sub Misión..."
                autoComplete="false"
            />
            <button className="action-btn" disabled={content.length === 0} type="submit">+</button>
        </form>
    )
}