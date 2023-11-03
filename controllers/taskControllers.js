const dummyData = require("../data/dummydata")

//getting all tasks
const getTasks = (req,res) => {
    res.status(201).send({
        success:true,
        data: dummyData.tasks,
        count:dummyData.tasks.length,
    })
}

//getting only one task
const getTaskById = (req,res, next) => {
    const id = Number(req.params.id)
    try{
        if (isNaN(id)) throw new Error("Id can not be String", {errCode:400});
        const task = dummyData.tasks.find((task) => task.id === id)
        if (!task) throw new Error("Task can not be found" , {errCode: 404})
        res.json({
            success:true,
            data: task,
        })
    } catch (err) {
        next(err)
    }
};


//creating a task-post
const createTask = (req, res) => {
    const {title, description} = req.body
    try{
        if (!title) throw new Error ("title is required", {errCode:400})
        if(!description) throw new Error ("Description is required", {errCode:400})
        const newTask = {
        id: Math.ceil(Math.random() *1000),
        title,
        description,
        isCompleted: false,
        }
        dummyData.tasks.push(newTask)
        res.status(201).json({success: true, data: newTask})
    }
    catch(err){
        next(err)
    }
}

// updating a task-put
const updateTask = (req, res, next) => {
    const id = Number(req.params.id);
    const { title, description,isCompleted } = req.body;
  
    try {
      if (isNaN(id)) throw new Error("Id should be integer", { errCode: 400 });
      if (!title) throw new Error("Title is required", { errCode: 400 });
      if (!description) throw new Error("Title is required", { errCode: 400 });
  
      const index = dummyData.tasks.findIndex((task) => task.id === id);
  
      if (index === -1)
        throw new Error(`No task with id ${id}`, { errCode: 404 });
  
      dummyData.tasks[index].title = title;
      dummyData.tasks[index].description = description;
      dummyData.tasks[index].isCompleted = isCompleted;
  
      res.json({
        success: true,
        data: dummyData.tasks[index].title,
        message: "Task successfully updated",
      });
    } catch (err) {
      next(err);
    }
  };

  //deleting a task
  const deleteTask = (req, res) => {
    const id = Number(req.params.id);
    try {
      if (isNaN(id)) throw new Error("Id should be integer", { errCode: 400 });
  
      const taskIndex = dummyData.tasks.findIndex((task) => task.id === id);
  
      if (taskIndex === -1)
        throw new Error(`No task with id ${id}`, { errCode: 404 });
  
      dummyData.tasks.splice(taskIndex, 1);
      res
        .status(204)
        .send({ success: true, data: [], message: "Task deleted successfully" });
    } catch (err) {
      next(err);
    }
  };

module.exports = {
    getTasks,
    getTaskById,
    createTask,
    updateTask,
    deleteTask,
}