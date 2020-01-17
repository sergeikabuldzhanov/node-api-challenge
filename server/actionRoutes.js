const express = require("express");
const actionsDb = require("../data/helpers/actionModel");
const router = express.Router();
const {checkActionID, validateActionData} = require('./customMiddleware');

//GET ROUTES

// Get all actions
router.get("/", async (req, res, next) => {
  try {
    const actions = await actionsDb.get();
    if (actions.length) {
      res.status(200).json(actions);
    } else {
      res.status(404).json({ message: `No actions in DB` });
    }
  } catch (error) {
    next(error);
  }
});

//Get action with specific id
router.get("/:id", checkActionID, (req, res) => {
  res.status(200).json(req.action);
});

//POST ROUTES
//post a new action
router.post("/", validateActionData, async (req, res, next) => {
  const actionData = req.body;
  try {
    const newAction = await actionsDb.insert(actionData);
    res.status(200).json(newAction);
  } catch (error) {
    next(error);
  }
});

//DELETE ROUTES
//delete action with specific id
router.delete("/:id", checkActionID, async (req, res, next) => {
  const { id } = req.params;
  try {
    await actionsDb.remove(id);
    res.status(200).json(req.action);
  } catch (error) {
    next(error);
  }
});

//PUT ROUTES
//updatean action with specific id
router.put(
  "/:id",
  checkActionID,
  validateActionData,
  async (req, res, next) => {
    const { id } = req.params;
    const actionUpdateData = req.body;
    try {
      const updatedAction = await actionsDb.update(id, actionUpdateData);
      res.status(200).json(updatedAction);
    } catch (error) {
      next(error);
    }
  }
);


module.exports = router;