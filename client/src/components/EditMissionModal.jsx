import { useState } from "react";
const url = import.meta.env.VITE_BACKEND_URL || "http://localhost:3001";

export default function EditMissionModal(props) {
    const [mission, setMission] = useState({
        title: "",
        description: ""
    });

    function changeHandler(evnt) {
        const { name, value } = evnt.target;

        setMission(prevMission => {
            return {
                ...prevMission,
                [name]: value
            };
        });
    }

    async function saveMission() {
        props.onEdit();
        try {
            const body = mission;
            const result = await fetch(`${url}/missions/${props.id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body)
            })
            setMission({
                title: "",
                description: ""
            });
            window.location.replace(`${url}`);
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <div className="bg-modal" >
            <form className="modal" onSubmit={saveMission} action="PUT" >
                <h2>Editar misión</h2>
                <input
                    name="title"
                    type="text"
                    onChange={changeHandler}
                    value={mission.title}
                    className="mission-input"
                    placeholder="Ingrese el título de la misión..."
                    id="title"
                />
                <textarea
                    name="description"
                    rows={6}
                    onChange={changeHandler}
                    value={mission.description}
                    className="mission-input"
                    placeholder="Ingrese la descripción de la misión..."
                    id="description"
                />
                {mission.title.length === 0 || mission.description.length === 0 ?
                    <button className="action-btn" disabled type="submit">Guardar</button> :
                    <button className="action-btn" type="submit">Guardar</button>
                }
                <button className="action-btn" onClick={() => { props.onEdit() }}>Cancelar</button>
            </form>
        </div >
    )
}