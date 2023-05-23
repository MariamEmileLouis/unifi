const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const ToDo = require('../models/to-do');
const fetchUser= require('../middleware/fetchUser')


router.post(
  "/addToDoList",
  fetchUser,
  async (req, res) => {
    try {
      let { name, description, list } = req.body;
      const toDo = await ToDo.insertOne({
        name,
        description,
        user: req.user.id,
        list
      });

      res.status(200).json(toDo);
    } catch (error) {
      res
        .status(500)
        .json({ error: "Internal Server Error", message: error.message });
      console.error(error.message);
    }
  }
);

router.put("/updateTodoList/:id", fetchUser, async (req, res) => {
  try {
    let { name, description, list } = req.body;

    let newToDo = {};
    if (title) {
      newToDo.name = name;
    }
    if (description) {
      newToDo.description = description;
    }
    if (list) {
      newToDo.list = list;
    }

    let toDo = await ToDo.findOne({ _id: req.params.id });
    if (!toDo) {
      return res.status(404).json({ error: "ToDo not found" });
    }

    if (toDo.user.toString() !== req.user.id) {
      return res.status(401).json({ error: "Not allowed to update this toDo" });
    }

    toDo = await ToDo.findByIdAndUpdate(
      req.params.id,
      { $set: newToDo },
      { new: true }
    );

    res.status(200).json(toDo);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Internal Server Error", message: error.message });
    console.error(error.message);
  }
});


router.delete("/deleteTodoList/:id", fetchUser, async (req, res) => {
  try {
    let toDo = await ToDo.findOne({ _id: req.params.id });
    if (!toDo) {
      return res.status(404).json({ error: "ToDo not found" });
    }
    if (toDo.user.toString() !== req.user.id) {
      return res.status(401).json({ error: "Not allowed to update this toDo" });
    }

    toDo = await ToDo.findByIdAndDelete(req.params.id);

    res
    .status(200)
    .json({
      message: "Success: ToDo has been deleted",
      toDo
    });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Internal Server Error", message: error.message });
    console.error(error.message);
  }
});

router.get("/getToDoById/:id", fetchUser, async (req, res) => {
  try {

    const toDo = await ToDo.findOne({ id: req.params.id  });

    res.status(200).json(toDo);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Internal Server Error", message: error.message });
    console.error(error.message);
  }
});

router.get("/getAllToDosForUser/:userId", fetchUser, async (req, res) => {
  try {

    const toDos = await ToDo.find({ user: req.params.userId  });

    res.status(200).json(toDos);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Internal Server Error", message: error.message });
    console.error(error.message);
  }
});

module.exports = router;
