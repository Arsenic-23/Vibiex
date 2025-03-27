const express = require("express");
const { addToQueue, removeFromQueue, getCurrentTrack } = require("../controllers/queueController");

const router = express.Router();

router.post("/:roomId/add", async (req, res) => {
    try {
        const queue = await addToQueue(req.params.roomId, req.body.song);
        res.json(queue);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.post("/:roomId/remove", async (req, res) => {
    try {
        const queue = await removeFromQueue(req.params.roomId);
        res.json(queue);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get("/:roomId/current", async (req, res) => {
    try {
        const track = await getCurrentTrack(req.params.roomId);
        res.json(track);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;