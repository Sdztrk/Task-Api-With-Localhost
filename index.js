//importing express
const express = require("express")
const app = express()
//importing middleware
const errorHandler = require("./middlewares/errorHandler")

//color
require("colors")

//dotenv 
require("dotenv").config()
const PORT = process.env.PORT

//importing taskrouter
const taskRoutes = require("./routes/taskRouter")


//middlewares
app.use(express.json())
app.use(errorHandler.errorHandler)

//routing
app.use("/", taskRoutes)

//listening to port
app.listen(PORT, ()=> {
    console.log(`App is runnig on port ${PORT}`.yellow.underline)
})
