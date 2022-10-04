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
        res.send({
            statusCode: 200,
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

router.post('/', async(req,res) => {
    await client.connect()
    try {
        const db = await client.db(dbName)
        let student = await db.collection('students').insertOne(req.body)
        students.push(student)
        res.send({
            statusCode: 201,
            message : "Created successfully"
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

