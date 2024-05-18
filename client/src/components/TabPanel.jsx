import { useEffect, useState } from "react";
import CreateSubMission from "./CreateSubMission";
import SubMissionPanel from "./SubMissionPanel";
import EditMissionModal from "./EditMissionModal";
const url = import.meta.env.VITE_BACKEND_URL || "http://localhost:3001";

export default function TabPanel(props) {
  const [mission, setMission] = useState({});
  const [submissionRefresh, setSubmissionRefresh] = useState(true);
  const [edit, setEdit] = useState(false);
  let id = props.activeTab;

  function changeEditStatus() {
    setEdit(!edit);
  }

  function subMissionRefresher() {
    setSubmissionRefresh(!submissionRefresh);
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
  }, [props.missionRefresh, id]);

  async function deleteMission() {
    props.onDelete();
    try {
      const result = await fetch(`${url}/missions/${id}`, {
        method: "DELETE"
      });
      props.missionRefresher();
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="tab-panel">
      {edit && <EditMissionModal missionRefresher={props.missionRefresher} id={id} onEdit={changeEditStatus} />}
      <div className="mission-info">
        <h2 className="mission-title">{mission.title}</h2>
        <p className="mission-description">{mission.description}</p>
        <CreateSubMission subMissionRefresher={subMissionRefresher} id={id} />
        <SubMissionPanel submissionRefresh={submissionRefresh} id={id} />
      </div>
      <div className="button-bar">
        <button onClick={deleteMission} className="action-btn">Terminar Misión</button>
        <button onClick={changeEditStatus} className="action-btn">Editar Misión</button>
      </div>
    </div>

  );

};