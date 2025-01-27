import Job from "../model/jobModel.js";
import asyncHandler from "express-async-handler";

const getHelloWorld = asyncHandler(async (req, res) => {
  try {
    // Respond with "Hello, World!"
    res.status(200).send({ message: "Hello, World by job!" });
  } catch (error) {
    console.error("Error in getHelloWorld:", error.message); // Log error
    res.status(500).send({ message: "Server error.", error: error.message });
  }
});

// get all jobs
const getAllJobs = asyncHandler(async (req, res) => {
  try {
    const { userId } = req.body;

    // Validate userId
    if (!userId) {
      return res.status(400).send({ message: "userId is required." });
    }

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).send({ message: "Invalid userId format." });
    }

    // Fetch jobs
    const alljobsByUser = await Job.find({ candidate: userId });

    if (alljobsByUser.length) {
      res.status(200).json(alljobsByUser);
    } else {
      res.status(404).send({ message: "No jobs found for the given user." });
    }
  } catch (error) {
    console.error("Error fetching jobs:", error.message); // Log error
    res.status(500).send({ message: "Server error.", error: error.message });
  }
});

const createJobs = asyncHandler(async (req, res) => {
  console.log(req.body, "line no 20");
  const { userId, job_title, description, company_name, job_type } = req.body;
  console.log(userId, "line no 21");
  const newJobRef = await Job.create({
    candidate: userId,
    job_title,
    description,
    company_name,
    job_type,
  });

  if (newJobRef) {
    res.status(200).send({ message: "user created successfully!!!" });
  }
});

// show all jobs for user
const showAllJobsByUser = asyncHandler(async (req, res) => {
  const { id } = req.body;

  console.log(req.body, "line no 45");
  const userJobs = await Job.find({ candidate: id });
  if (userJobs.length) {
    res.status(200).json(userJobs);
  } else {
    res.status(500).send({ message: "No jobs found for current user !!!" });
  }
});

export { getAllJobs, createJobs, showAllJobsByUser, getHelloWorld };
