const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect("mongodb+srv://admin:admin12345@cluster0.a9efd9c.mongodb.net/taskdb?retryWrites=true&w=majority&appName=Cluster0")
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

const TaskSchema = new mongoose.Schema({
    title: String,
    completed: Boolean
});

const Task = mongoose.model("Task", TaskSchema);

app.get("/tasks", async (req, res) => {
    const tasks = await Task.find();
    res.json(tasks);
});

app.post("/tasks", async (req, res) => {
    const newTask = new Task({
        title: req.body.title,
        completed: false
    });

    await newTask.save();
    res.json(newTask);
});

app.put("/tasks/:id", async (req, res) => {
    const updatedTask = await Task.findByIdAndUpdate(
        req.params.id,
        { completed: req.body.completed },
        { new: true }
    );

    res.json(updatedTask);
});

app.delete("/tasks/:id", async (req, res) => {
    await Task.findByIdAndDelete(req.params.id);
    res.json({ message: "Task Deleted" });
});

app.listen(5000, () => {
    console.log("Server running on port 5000");
});