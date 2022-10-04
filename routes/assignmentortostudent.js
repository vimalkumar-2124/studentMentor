var express = require('express');
const { mongoDbClient, dbUrl, dbName, mongoDb } = require('../dbConfig');
var router = express.Router();

let client = new mongoDbClient(dbUrl)


router.post('/newMentor', async(req,res) => {
    await client.connect()
    try {
        const db = await client.db(dbName)
        let mentor = await db.collection('mentors').findOne({_id:mongoDb.ObjectId(req.body.mentorId)})
        mentor.studentsAssigned = [
            ...mentor.studentsAssigned,
            ...req.body.studentsArray
        ]
        await db.collection('mentors').updateOne({_id:mongoDb.ObjectId(req.body.mentorId)},{$set:{studentsAssigned:mentor.studentsAssigned}})
        req.body.studentsArray.map(async(stud) => {
            const temp = await db.collection('students').find({name:stud})
            temp.mentorAssigned = req.body.mentorId
            await db.collection('students').updateOne({name:stud}, {$set :{mentorAssigned:temp.mentorAssigned}})
        })
        res.send({
            statusCode: 201,
            message: "Mentor added to student",
            mentor
        })
    }
    catch(err){
        console.log(err)
        res.send({
            message: "Not able to create mentor",
            err
        })
    }
    finally{
        client.close()
    }
})

router.post('/modifyMentor', async(req,res) => {
    await client.connect()
    try {
        const db = await client.db(dbName)
        let student = await db.collection('students').findOne({_id:mongoDb.ObjectId(req.body.studentId)})
        const oldMentorId = student.mentorAssigned
        student.mentorAssigned = req.body.newMentorId
        await db.collection('students').updateOne({_id:mongoDb.ObjectId(req.body.studentId)}, {$set :{mentorAssigned:student.mentorAssigned}})
        
        let oldMentor = await db.collection('mentors').findOne({_id:mongoDb.ObjectId(oldMentorId)})
        if(oldMentor.studentsAssigned.length < 0){
            console.log(oldMentor)
            return
        }
        else{
            let newAssigned = oldMentor.studentsAssigned
            const isStudentId = async(element) => {
                const name = await db.collection('students').findOne({name:element})
                return name._id === req.body.studentId
            }
            const indexpos = newAssigned.findIndex(isStudentId)
            newAssigned.splice(indexpos,1)
            oldMentor.studentsAssigned = newAssigned
            // console.log(oldMentor.studentsAssigned)
        }
        await db.collection('mentors').updateOne({_id:mongoDb.ObjectId(oldMentorId)},{$set:{studentsAssigned:oldMentor.studentsAssigned}})

        let newMent = await  db.collection('mentors').findOne({_id:mongoDb.ObjectId(req.body.newMentorId)})
        if(!newMent.studentsAssigned.includes(req.body.studentId)){
            newMent.studentsAssigned = [
                ...newMent.studentsAssigned,
                req.body.studentId
            ]
        }
        await db.collection('mentors').updateOne({_id:mongoDb.ObjectId(req.body.newMentorId)},{$set :{studentsAssigned:newMent.studentsAssigned}})
        res.send({
            statusCode: 200,
            message: "Updated mentor to respective student , updated in oldmentor and new mentor studentsAssigned list",
            
        })
    }
    catch(err){
        console.log(err)
        res.send({
            message: "Not able to create mentor",
            err
        })
    }
    finally{
        client.close()
    }
})

module.exports = router;