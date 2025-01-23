import express from "express";
import {
  getAllJobs,
  createJobs,
  showAllJobsByUser,
} from "../controller/jobController.js";

const router = express.Router();

router.post("/fetch-all-job", getAllJobs);
router.post("/create_job", createJobs);
router.post("/show_all", showAllJobsByUser);

export default router;
