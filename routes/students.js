var express = require('express');
var router = express.Router();
const { mongoDbClient, dbUrl, dbName } = require('../dbConfig');
let students = []
let client = new mongoDbClient(dbUrl)
router.get('/', async(req,res) => {
    await client.connect()
    try {
        const db = await client.db(dbName)
        let student = await db.collection('students').find().toArray()
        let students = []
        student.map((ele) => {
            students.push(ele.name)
        })
        res.send({
            statusCode: 200,
            students
        })
    }
    catch(err){
        console.log(err)
        res.send({
            statusCode:500,
            message:"Internal server error"
        })
    }
    finally{
        client.close()
    }
    
})

router.get('/withoutmentor', async(req,res) => {
    await client.connect()
    try {
        const db = await client.db(dbName)
        let student = await db.collection('students').find().toArray()
        let students = []
        student.map((ele) => {
            if(!ele.mentorAssigned)
                students.push(ele.name)
        })
        res.send({
            statusCode: 200,
            students
        })
    }
    catch(err){
        console.log(err)
        res.send({
            statusCode:500,
            message:"Internal server error"
        })
    }
    finally{
        client.close()
    }
    
})
router.post('/', async(req,res) => {
    await client.connect()
    try {
        const db = await client.db(dbName)
        let student = await db.collection('students').insertOne(req.body)
        res.send({
            statusCode: 200,
            message : "Student created successfully",
            student

        })
    }
    catch(err){
        console.log(err)
        res.send({
            statusCode:500,
            message:"Internal server error"
        })
    }
    finally{
        client.close()
    }
})

module.exports = router;

