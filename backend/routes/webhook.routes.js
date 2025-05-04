import express from "express";
import { Ping } from "../models/ping.model.js";
import { Log } from "../models/log.model.js";

const router = express.Router();

router.post("/packets", async (req, res) => {
  const body = req.body;

  try {
    if (body?.response?.msg === "ping") {
      await Ping.updateOne(
        {
          "response.imei": body.response.imei,
          "response.time": body.response.time
        },
        {
          $set: { ...body, updationtime: new Date() },
          $setOnInsert: { insertiontime: new Date() }
        },
        { upsert: true }
      );
    } else if (body?.response?.data?.msg === "log") {
      const data = body.response.data;
      await Log.updateOne(
        {
          "response.data.imei": data.imei,
          "response.data.dtm": data.dtm,
          "response.data.seq": data.seq
        },
        {
          $set: { ...body, updationtime: new Date() },
          $setOnInsert: { insertiontime: new Date() }
        },
        { upsert: true }
      );
    } else {
      return res.status(400).json({ message: "Invalid payload format" });
    }

    res.status(200).json({ message: "Data stored/updated successfully" });
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

export default router;
