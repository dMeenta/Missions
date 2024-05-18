const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 3001;
const missionRoutes = require('./routes/missions.routes');

app.use(cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173"
}));
app.use(express.json());
app.use(missionRoutes);
app.use((err, req, res, next) => {
    return res.json({
        message: err.message
    })
})

app.listen(port, () => {
    console.log(`Server running on port http://localhost:${port}`);
});