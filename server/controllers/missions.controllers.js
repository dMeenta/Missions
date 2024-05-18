const pool = require('../db');

async function getAllMissions(req, res, next) {
    try {
        const result = await pool.query("SELECT * FROM missions");
        res.json(result.rows);
    } catch (err) {
        next(err);
    }
}

async function postMission(req, res, next) {
    const { title, description } = req.body;
    try {
        const result = await pool.query("INSERT INTO missions (title, description) VALUES ($1, $2);", [title, description]);
        res.json(result.rows);
    } catch (err) {
        next(err);
    }
}

async function getMission(req, res, next) {
    const id = req.params.id;
    try {
        const result = await pool.query(
            "SELECT * FROM missions WHERE id = $1;", [id]);
        res.json(result.rows[0]);
    } catch (err) {
        next(err);
    }
}

async function editMission(req, res, next) {
    const id = req.params.id;
    const { title, description } = req.body;
    try {
        const result = await pool.query("UPDATE missions SET (title, description) = ($1,$2) WHERE id=$3;",
            [title, description, id]);
        res.json(result.rows)
    } catch (err) {
        next(err);
    }
}

async function deleteMission(req, res, next) {
    const id = req.params.id;
    try {
        const result = await pool.query(
            `BEGIN TRANSACTION; DELETE FROM sub_missions WHERE mission_id = ${id}; DELETE FROM missions WHERE id = ${id}; COMMIT;`
        )
        res.send("Successfully deleted");
    } catch (err) {
        next(err);
    }
}

async function getAllSubmissions(req, res, next) {
    const id = req.params.id;
    try {
        const result = await pool.query("SELECT * FROM sub_missions WHERE mission_id = $1;", [id]);
        res.json(result.rows);
    } catch (err) {
        next(err)
    }
}

async function postSubmission(req, res, next) {
    const id = req.params.id;
    const { content } = req.body;
    try {
        const result = await pool.query(
            "INSERT INTO sub_missions (content, mission_id) VALUES ($1, $2);", [content, id]
        )
        res.json(result.rows)
    } catch (err) {
        next(err);
    }
}

async function deleteSubmission(req, res, next) {
    const id = req.params.id;
    try {
        const result = await pool.query(
            "DELETE FROM sub_missions WHERE id = $1;", [id]
        );
        res.send("Successfully deleted");
    } catch (err) {
        next(err);
    }
}

module.exports = {
    getAllMissions,
    postMission,
    getMission,
    deleteMission,
    editMission,
    getAllSubmissions,
    postSubmission,
    deleteSubmission
}