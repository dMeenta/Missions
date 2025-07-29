import { useEffect, useState } from "react";
import getOrCreateUserId from "../utils/userId";
const URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:3001";

export default function MissionTabPanel(props) {
    const [missions, setMissions] = useState([]);

    async function getMissions() {
        try {
            const userId = getOrCreateUserId()
            const result = await fetch(`${URL}/missions`, {
                method: 'GET',
                headers: { "Content-Type": "application/json", "x-user-id": userId },
            });
            const jsonData = await result.json();
            setMissions(jsonData);
        } catch (err) {
            console.error(err.message);
        }
    };

    useEffect(() => {
        getMissions();
    }, [props.missionRefresh]);

    return (
        <div className="mssn-tab-panel">
            {missions.map(missionItem => (
                <button
                    key={missionItem.id}
                    id={missionItem.id}
                    className={props.activeTab === missionItem.id ? "tab-btn mission mission-active" : "mission tab-btn"}
                    onClick={() => {
                        props.onClick(missionItem.id);
                    }}>
                    {missionItem.title}
                </button>
            ))}
        </div>
    )
}
