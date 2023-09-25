const router = require('express').Router();
let Student = require('../models/Student');


// Add Student
router.post('/add',(req,res)=>{
    const name = req.body.name;
    const age = Number(req.body.age);
    const gender = req.body.gender;

    const newStudent = new Student({name,age,gender});

    //save we got data in the db
    newStudent.save()
        .then(()=>{
            res.status(200).send({status:"Student added !"})
        })
        .catch((err)=>{
            res.status(500).send({status:"Student added failed ! "})
        })
});


//Get All Students
router.get('/', async (req,res)=>{
    //Find Data from db
   await Student.find()

        .then((students)=>{
            res.json(students)
        })

       .catch((err)=>{
            res.json({status:"Student Searching Failed !!"})
    })
});



// Update a Student
router.put('/update/:id',async (req,res)=>{
    let userId = req.params.id;

    const {name , age , gender} = req.body;

    const updateStudent = {
        name,
        age,
        gender
    }
    const update = await Student.findByIdAndUpdate(userId,updateStudent)
        .then((student)=>{
            res.status(200).send({status:"Student updated !" , student})
        })
        .catch((err)=>{
            res.status(500).send({status:"Update Failed !" , error: err.message})
        })
})



// Delete a Student
router.delete('/delete/:id',async (req,res)=>{
    const userId = req.params.id;
    await Student.findByIdAndDelete(userId)
        .then(()=>{
            res.status(200).send({status:"User Deleted !"})
        })
        .catch((err)=>{
            res.status(500).send({status:"User Delete Failed !", error: err.message});
        })
})


// Find a student
router.get('/get/:id', async (req,res)=>{
    const userId = req.params.id;

  const userData = await  Student.findById(userId)
      .then((student)=>{
          res.status(200).send({status:"Student Found ! ", student});

      })
      .catch((err)=>{
          res.status(500).send({status:"User Find Failed" , error: err.message})
      })

    res.send(userData);
})

module.exports=router;



