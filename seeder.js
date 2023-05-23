const mongoose =require('mongoose');
const ToDo = require('./models/to-do')

mongoose.connect(process.env.MONGO_URI,{useNewUrlParser:true, useUnifiedTopology:true})
.then(()=> {console.log('Mongo connection is open!!');})
.catch((err)=>{console.log(err);})


const seedData= [
    {
        "name":"toDo1",
        "description": "toDo1",
        "tasks": [{ "name":"task1","dueDate":"2023-06-01","isDone":true}]
    },
    {
        "name":"toDo2",
        "description": "toDo2",
        "tasks": [{ "name":"task1","dueDate":"2023-06-01","isDone":false},{ "name":"task2","dueDate":"2023-06-02","isDone":true}]
    },
    {
        "name":"toDo3",
        "description": "toDo3",
        "tasks": [{ "name":"task3","dueDate":"2023-06-07","isDone":false},{ "name":"task4","dueDate":"2023-06-02","isDone":true}]
    }
]

const seedDB = async()=>{
    await ToDo.insertMany(seedData);
}

seedDB().then(()=>{mongoose.connection.close()})