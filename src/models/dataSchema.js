import mongoose from 'mongoose';

const DataSchema = new mongoose.Schema({
  data: {
    type: Object,
    required: true,
  },
}, { timestamps: true });

const DataModel = mongoose.model('Data', DataSchema);

export default DataModel;