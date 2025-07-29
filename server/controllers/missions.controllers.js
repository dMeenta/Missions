const pool = require('../db');

async function getAllMissions(req, res, next) {
    try {
        const userId = req.userId;
        const result = await pool.query("SELECT * FROM missions WHERE user_id = $1 ORDER BY id DESC", [userId]);
        res.json(result.rows);
    } catch (err) {
        next(err);
    }
}

async function postMission(req, res, next) {
    try {
        const { title, description } = req.body;
        const userId = req.userId;
        const result = await pool.query(
            "INSERT INTO missions (title, description, user_id) VALUES ($1, $2, $3);", [title, description, userId]
        );
        res.send("Successfully added");
    } catch (err) {
        next(err);
    }
}

async function getMission(req, res, next) {
    try {
        const id = req.params.id;
        const userId = req.userId;
        const result = await pool.query(
            "SELECT * FROM missions WHERE id = $1 AND user_id = $2;", [id, userId]);
        res.json(result.rows[0]);
    } catch (err) {
        next(err);
    }
}

async function editMission(req, res, next) {
    try {
        const id = req.params.id;
        const userId = req.userId;
        const { title, description } = req.body;
        const result = await pool.query(
            "UPDATE missions SET (title, description) = ($1,$2) WHERE id=$3 AND user_id = $4;", [title, description, id, userId]
        );
        res.send("Successfully updated");
    } catch (err) {
        next(err);
    }
}

async function deleteMission(req, res, next) {
    try {
        const id = req.params.id;
        const userId = req.userId;
        await pool.query('BEGIN');
        await pool.query('DELETE FROM sub_missions WHERE mission_id = $1;', [id]);
        await pool.query('DELETE FROM missions WHERE id = $1 AND user_id = $2;', [id, userId]);
        await pool.query('COMMIT');
        res.send("Successfully deleted");
    } catch (err) {
        await pool.query('ROLLBACK');
        next(err);
    }

}

async function getAllSubmissions(req, res, next) {
    try {
        const id = req.params.id;
        const userId = req.userId;
        const result = await pool.query("SELECT sm.* FROM sub_missions sm JOIN missions m ON sm.mission_id = m.id WHERE sm.mission_id = $1 AND m.user_id = $2;", [id, userId]);
        res.json(result.rows);
    } catch (err) {
        next(err)
    }
}

async function postSubmission(req, res, next) {
    try {
        const id = req.params.id;
        const { content } = req.body;
        const userId = req.userId;
        const missionCheck = await pool.query(`
            SELECT id FROM missions WHERE id = $1 AND user_id = $2;
        `, [id, userId]);

        if (missionCheck.rowCount === 0) {
            return res.status(403).json({ error: "Forbidden" });
        }

        const result = await pool.query(`
            INSERT INTO sub_missions (content, mission_id)
            VALUES ($1, $2)
            RETURNING *;
        `, [content, id]);

        res.status(201).json(result.rows[0]);
    } catch (err) {
        next(err);
    }
}

async function deleteSubmission(req, res, next) {
    try {
        const id = req.params.id;
        const userId = req.userId;
        await pool.query(`DELETE FROM sub_missions WHERE id = $1 AND mission_id IN (SELECT id FROM missions WHERE user_id = $2);`, [id, userId]);
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