import { useState } from "react";
const url = import.meta.env.VITE_BACKEND_URL || "http://localhost:3001";

export default function SubMission(props) {
    const [isDone, setIsDone] = useState(false);

    function setDone() {
        setIsDone(true);
    }

    async function deleteSubmission() {
        setDone();
        try {
            const userId = getOrCreateUserId()
            const result = await fetch(`${url}/sub/${props.id}`, {
                method: "DELETE",
                headers: { "x-user-id": userId },
            });
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <li
            id={props.id}
            onClick={deleteSubmission}
            className={isDone ? "submission-item done" : "submission-item"}>
            {props.content}
        </li>
    )
}