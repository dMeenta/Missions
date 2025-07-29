const { Router } = require('express');

const { getAllMissions, postMission, getMission, getAllSubmissions, postSubmission, deleteSubmission, editMission, deleteMission } = require('../controllers/missions.controllers');

const attachUserId = require('../middleware/attachUserId')

const router = Router();

router.get("/missions", attachUserId, getAllMissions)

router.post("/missions", attachUserId, postMission)

router.get("/missions/:id", attachUserId, getMission)

router.put("/missions/:id", attachUserId, editMission)

router.delete("/missions/:id", attachUserId, deleteMission)

router.get("/sub/:id", attachUserId, getAllSubmissions)

router.post("/sub/:id", attachUserId, postSubmission)

router.delete("/sub/:id", attachUserId, deleteSubmission)

module.exports = router;