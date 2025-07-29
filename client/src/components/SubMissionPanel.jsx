import { useEffect, useState } from "react";
import SubMission from "./SubMission";
import getOrCreateUserId from "../utils/userId";
const url = import.meta.env.VITE_BACKEND_URL || "http://localhost:3001";

export default function SubMissionPanel(props) {
    const [subMissions, setSubmissions] = useState([]);

    async function getSubMissions() {
        try {
            const userId = getOrCreateUserId()
            const result = await fetch(`${url}/sub/${props.id}`, {
                method: "GET",
                headers: { "Content-Type": "application/json", "x-user-id": userId },
            });
            const jsonData = await result.json();
            setSubmissions(jsonData);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        getSubMissions();
    }, [props.id, props.submissionRefresh]);

    return (
        <div className="submissions-panel">
            <h3>Sub Misiones</h3>
            {subMissions.length !== 0 ?
                <ul className="submissions-list">
                    {
                        subMissions.map(subMissionItem => (
                            <SubMission
                                key={subMissionItem.id}
                                id={subMissionItem.id}
                                content={subMissionItem.content}
                            />
                        ))
                    }
                </ul>
                : <p>No hay sub misiones que mostrar...</p>
            }
        </div>
    )
}