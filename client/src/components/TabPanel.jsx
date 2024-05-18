import { useEffect, useState } from "react";
import CreateSubMission from "./CreateSubMission";
import SubMissionPanel from "./SubMissionPanel";
import EditMissionModal from "./EditMissionModal";
const url = import.meta.env.VITE_BACKEND_URL || "http://localhost:3001";

export default function TabPanel(props) {
  const [mission, setMission] = useState({});
  const [auxiliar, setAuxiliar] = useState(true);
  const [edit, setEdit] = useState(false);
  let id = props.activeTab;

  function changeEditStatus() {
    setEdit(!edit);
  }

  function refresh() {
    setAuxiliar(!auxiliar);
  }

  async function getMission() {
    try {
      const result = await fetch(`${url}/missions/${id}`);
      const jsonData = await result.json();
      setMission(jsonData);
    } catch (err) {
      console.error(err.message);
    }
  }
  useEffect(() => {
    getMission();
  }, [props.activeTab, edit]);

  async function deleteMission() {
    window.location = "/";
    try {
      const result = await fetch(`${url}/missions/${id}`, {
        method: "DELETE"
      }
      );
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="tab-panel">
      {edit && <EditMissionModal id={id} onEdit={changeEditStatus} />}
      <div className="mission-info">
        <h2 className="mission-title">{mission.title}</h2>
        <p className="mission-description">{mission.description}</p>
        <CreateSubMission onAux={refresh} id={id} />
        <SubMissionPanel onAux={refresh} aux={auxiliar} id={id} />
      </div>
      <div className="button-bar">
        <button onClick={deleteMission} className="action-btn">Terminar Misión</button>
        <button onClick={changeEditStatus} className="action-btn">Editar Misión</button>
      </div>
    </div>

  );

};