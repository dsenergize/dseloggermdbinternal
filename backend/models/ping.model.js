import mongoose from "mongoose";

const pingSchema = new mongoose.Schema({
  response: {
    msg: String,
    imei: String,
    time: String,
    signal: String,
  },
  insertiontime: { type: Date, default: Date.now },
  updationtime: { type: Date, default: Date.now },
}, { versionKey: false });

pingSchema.index({ "response.imei": 1, "response.time": 1 }, { unique: true });

export const Ping = mongoose.model("Ping", pingSchema);
