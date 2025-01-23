import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const jobSchema = new mongoose.Schema(
  {
    candidate: {
      type: mongoose.Schema.ObjectId,
      ref: "user",
      required: true,
    },
    job_title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    job_type: {
      type: String,
      required: true,
    },
    company_name: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Job = mongoose.model("Job", jobSchema);
export default Job;
