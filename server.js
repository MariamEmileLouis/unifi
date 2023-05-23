const connectToMongoDB = require('./mongodb');
const express = require('express')
const path = require('path');
var cors = require('cors')
connectToMongoDB();



const app = express();
const port = 5000;

app.use(cors())
app.use(express.json());

app.use('/app/auth', require('./routes/auth'));
app.use('/app', require('./routes/toDo'));

if(process.env.NODE_ENV === 'production'){
  app.use(express.static(path.join(__dirname, '/client/build')))
  app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
    });
}
else{
  app.get('/', (res, req)=>{
    console.log("Api Running");
  })
}

app.listen(port, () => {
  console.log(`ToDo app listening on port ${port}`);
})