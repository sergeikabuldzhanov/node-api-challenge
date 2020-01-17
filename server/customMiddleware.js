const actionsDb = require("../data/helpers/actionModel");
const projectDb = require("../data/helpers/projectModel");


const middleware = {
  checkActionID: async function(req, res, next) {
    const { id } = req.params;
    try {
      const action = await actionsDb.get(id);
      if (action) {
        req.action = action;
        next();
      } else {
        res.status(404).json({ message: `No action with matching ID found` });
      }
    } catch (error) {
      next(error);
    }
  },

  validateActionData: function(req, res, next) {
    const actionData = req.body;
    if (actionData) {
      const { project_id, description, notes } = req.body;
      if (project_id && description && notes) {
        next();
      } else {
        res.status(400).json({
          message: `Missing one of required fields.`,
          required: [`project_id`, `description`, `notes`]
        });
      }
    } else {
      res.status(400).json({ message: `Missing request body` });
    }
  },

  validateProjectData: function(req, res, next) {
    const projectData = req.body;
    if (projectData) {
      const { decription, notes } = projectData;
      if (decription && notes) {
        next();
      } else {
        res
          .status(400)
          .json({ message: `Project missing description or notes` });
      }
    } else {
      res.status(400).json({ message: `Missing request body` });
    }
  },

  checkProjectId: async function(req, res, next) {
    const { id } = req.params;
    try {
      const project = await projectDb.get(id);
      if (project) {
        req.project = project;
        next();
      } else {
        res.status(404).json({ message: "No project with matching ID found" });
      }
    } catch (error) {
      next(error);
    }
  }
};

module.exports = middleware;