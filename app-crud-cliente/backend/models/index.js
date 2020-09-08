import mongoose from "mongoose";

const db = {};
db.mongoose = mongoose;
db.url = process.env.MONGODB;

const gradeSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  subject: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  value: {
    type: String,
    required: true,
    validate(value) {
      if (value < 0)
        throw new Error("Valor negativo para a nota não permitido!");
    },
  },
  lastModified: {
    type: Date,
    default: Date.now,
  },
});

const gradeModel = mongoose.model("clients", gradeSchema, "clients");

export { db, gradeModel };
