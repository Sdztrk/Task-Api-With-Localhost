const express = require("express")
const router = express.Router()

//importing controllers
const taskController = require("../controllers/taskControllers")

router.get("/", taskController.getTasks)
router.post("/", taskController.createTask)
router.put("/:id", taskController.updateTask)
router.delete("/:id" , taskController.deleteTask)
router.get("/:id",taskController.getTaskById)

module.exports = router;