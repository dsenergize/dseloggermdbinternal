import mongoose from "mongoose";

const modbusSchema = new mongoose.Schema({}, { strict: false });

const logSchema = new mongoose.Schema({
  response: {
    data: {
      imei: String,
      uid: Number,
      dtm: String,
      seq: Number,
      sig: Number,
      msg: String,
      modbus: [modbusSchema]
    }
  },
  insertiontime: { type: Date, default: Date.now },
  updationtime: { type: Date, default: Date.now },
}, { versionKey: false });

logSchema.index({ "response.data.imei": 1, "response.data.dtm": 1, "response.data.seq": 1 }, { unique: true });

export const Log = mongoose.model("Log", logSchema);
