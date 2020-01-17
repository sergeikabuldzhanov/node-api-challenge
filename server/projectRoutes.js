const express = require("express");
const projectDb = require("../data/helpers/projectModel");
const {checkProjectId, validateProjectData} = require('./customMiddleware');

const router = express.Router();

//GET routes
router.get("/", async (req, res, next) => {
  try {
    const projects = await projectDb.get();
    if (projects.length) {
      res.status(200).json(projects);
    } else {
      res.status(404).json({ message: `No projects in DB` });
    }
  } catch (error) {
    next(error);
  }
});

router.get("/:id", checkProjectId, (req, res) => {
  res.status(200).json(req.project);
});

router.get("/:id/actions", checkProjectId, async (req, res, next) => {
  const { id } = req.params;
  try {
    const actions = await projectDb.getProjectActions(id);
    if (actions.length) {
      res.status(200).json(actions);
    } else {
      res
        .status(404)
        .json({ message: `Project has no actions associated with it` });
    }
  } catch (error) {
    next(error);
  }
});

//POST ROUTES
router.post("/", validateProjectData, async (req, res, next) => {
  const projectData = req.body;
  try {
    const newProject = await projectDb.insert(projectData);
    res.status(201).json(newProject);
  } catch (error) {
    next(error);
  }
});

//DELETE ROUTES
router.delete("/:id", checkProjectId, async (req, res, next) => {
  const { id } = req.params;
  try {
    await projectDb.remove(id);
    res.status(200).json(req.project);
  } catch (error) {
    next(error);
  }
});

//PUT ROUTES
router.put(
  "/:id",
  checkProjectId,
  validateProjectData,
  async (req, res, next) => {
    const { id } = req.params;
    const projectData = req.body;
    try {
      const updatedProject = await projectDb.update(id, projectData);
      res.status(200).json(updatedProject);
    } catch (error) {
      next();
    }
  }
);


module.exports = router;
