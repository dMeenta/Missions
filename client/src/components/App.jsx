import { useState } from "react";
import MissionTabPanel from "./MissionTabPanel";
import CreateMission from "./CreateMission";
import TabPanel from "./TabPanel";

export default function App() {
    const year = new Date().getFullYear();
    const [activeTab, setActiveTab] = useState(0);
    const [missionRefresh, setMissionRefresh] = useState(false);

    function missionRefresher() {
        setMissionRefresh(!missionRefresh);
    }

    function changeToCreateStatus() {
        setActiveTab(0);
    }

    return (
        <div className="missions-app">
            <header>
                <h1>Bienvenido a sus Misiones</h1>
            </header>
            <main>
                <section className="side-menu">
                    <button className="tab-btn" onClick={changeToCreateStatus}>Crear Misión</button>
                    <MissionTabPanel
                        activeTab={activeTab}
                        onClick={setActiveTab}
                        missionRefresh={missionRefresh}
                    />
                </section>
                <section className="mission-display">
                    {
                        activeTab === 0 ?
                            <CreateMission missionRefresher={missionRefresher} /> :
                            <TabPanel
                                activeTab={activeTab}
                                missionRefresh={missionRefresh}
                                missionRefresher={missionRefresher}
                            />
                    }
                </section>
            </main>
            <footer>
                <p>Diego Quipuzco © {year}</p>
            </footer>
        </div>
    )
}