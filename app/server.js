
const express = require("express");//llamaos a express
const app = express();
const hateoasLinker = require("express-hateoas-links");//importar hateos links

const bodyParser = require("body-parser");
const { getStudents, getStudentByPos, notFound, createStudent, putStudent, deleteStudent, filterStudent } = require("./controler");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())
app.use(hateoasLinker);


app.get('/students', getStudents)
app.get('/student/:pos', getStudentByPos)
app.get('/students/filter',filterStudent)

app.post('/student',createStudent)
app.put('/student/:pos', putStudent)
app.delete('/student/:pos', deleteStudent)
//app.get('/group/7/student/:id', getStudentById)


//app.get('/group/7', getStudents)







app.listen(3000);
console.log("Server on port", 3000);