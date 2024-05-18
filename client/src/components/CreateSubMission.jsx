import { useState } from "react";
import SubMission from "./SubMission";
const url = import.meta.env.VITE_BACKEND_URL || "http://localhost:3001";

export default function CreateSubMission(props) {
    const [content, setContent] = useState("");

    async function onSubmitSubmission(evnt) {
        evnt.preventDefault();
        try {
            const body = { content };
            const result = await fetch(`${url}/sub/${props.id}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
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
            />
            {content.length === 0 ?
                <button className="action-btn" disabled type="submit">+</button> :
                <button className="action-btn" type="submit">+</button>
            }
        </form>
    )
}