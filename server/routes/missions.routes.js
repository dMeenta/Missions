const { Router } = require('express');

const { getAllMissions, postMission, getMission, getAllSubmissions, postSubmission, deleteSubmission, editMission, deleteMission } = require('../controllers/missions.controllers');

const router = Router();

router.get("/missions", getAllMissions)

router.post("/missions", postMission)

router.get("/missions/:id", getMission)

router.put("/missions/:id", editMission)

router.delete("/missions/:id", deleteMission)

router.get("/sub/:id", getAllSubmissions)

router.post("/sub/:id", postSubmission)

router.delete("/sub/:id", deleteSubmission)

module.exports = router;