const studentsList = [
    {
        pos: 0,
        age: 22,
        name: "Paul",
        lastName: "Sanchez",
    },
    {
        pos: 1,
        age: 22,
        name: "Mario",
        lastName: "Valarezo",
    },
    {
        pos: 2,
        age: 21,
        name: "Jouse",
        lastName: "Rojas",
    },
];
var studentSchema = {
    "name": "Student",
    "description": "This JSON Schema defines the parameters required to created a Student",
    "properties": {
        "pos": {
            "title": "Position",
            "description": "Your position",
            "type":"number",
            "value": null            
        },
        "age": {
            "title": "Age",
            "description": "PLease enter your age",
            "type": "number",
            "value": null
        },
        "name": {
            "title": "Name",
            "description": "Please enter your name",
            "type": "string",
            "value": "undefined"
        },
        "lastName": {
            "title": "Last Name",
            "description": "Please enter your Last Name",
            "type": "string",
            "value": "undefined"
        },
    }
}

function getStudents(req, res) {
    let result = [];
    studentsList.forEach((student)=>{
        let x = JSON.parse(JSON.stringify(studentSchema))//copia de datos de javascript no referecia
        x.properties.pos.value = student.pos;
        x.properties.age.value = student.age;
        x.properties.name.value = student.name;
        x.properties.lastName.value = student.lastName;
        result.push(x)
    })
    result.forEach((x)=>{
        console.log(x.properties)
    })
    res.status(200).json({result}, [
        { rel: "self", method: "GET", href: 'http://127.0.0.1:3000/students'},
        { rel: "create", method: "POST", title:'Create Student', href: 'http://127.0.0.1:3000/student'}
    ]);
}
function getStudentByPos(req, res) {
    const { pos } = req.params;
    const student = studentsList.find((student) => student.pos == pos);
    if (student) {
        let x = JSON.parse(JSON.stringify(studentSchema))
        x.properties.pos.value = student.pos;
        x.properties.age.value = student.age;
        x.properties.name.value = student.name;
        x.properties.lastName.value = student.lastName;
        res.status(200).json(x,[
            { rel: "self", method: "GET", href: `http://127.0.0.1:3000/student/${pos}`},
            { rel: "edit", method: "PUT", title: 'Edit Student', href: `http://127.0.0.1:3000/student/${pos}`, }
        ]);
    } else {
        //notFound(req, res);
    }
}

function createStudent(req, res) {
    //console.log(req.body)
    const { name, lastName, age } = req.body;
    student = {
        pos: studentsList.length,
        name: name,
        lastName: lastName,
        age: parseInt(age),
    }
    studentsList.push(student)
    res.status(201).json({
        message: "Estudiante creado con éxito",
        
    })
}

function putStudent(req, res){
    const { pos } = req.params;
    const { name, lastName, age } = req.body;
    var student = studentsList.find((student) => student.pos == pos);
    studentsList.in
    if (student) {
        student.name = name
        student.lastName = lastName
        student.age = age
        res.status(200).json({
            pos: student.pos,
            name: student.name,
            lastName: student.lastName,
            age: student.age
        });
    }
}

function deleteStudent(req, res) {
    const { pos } = req.params;
    const student = studentsList.find((student) => student.pos == pos);
    if (student) {
        const index = studentsList.findIndex(function (student) {
            return student.pos == pos;
        })
        studentsList.splice(index, 1);
        res.status(204).json({
            message: "Estudiante elminiado"
        })
    } else {
        notFound(req, res);
    }
}
function filterStudent(req, res) {
    let { name, lastName, age } = req.query;
    filter = []
    if (name) {
        studentsList.forEach(student => {
            if (student.name == name) {
                filter.push(student);
            }
        });
    }
    if (lastName) {
        studentsList.forEach(student => {
            if (student.lastName == lastName) {
                filter.push(student);
            }
        });
    }
    if (age) {
        studentsList.forEach(student => {
            //console.log(student)
            if (student.age == age) {
                filter.push(student);
            }
        });
    }
    res.status(200).json({
        students: filter
    })
}

module.exports = { getStudents, getStudentByPos, createStudent, putStudent, deleteStudent, filterStudent};