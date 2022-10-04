var express = require('express');
const { mongoDbClient, dbUrl, dbName, mongoDb } = require('../dbConfig');
var router = express.Router();

let client = new mongoDbClient(dbUrl)

router.get('/', async(req,res) => {
    await client.connect()
    try {
        const db = await client.db(dbName)
        let mentors = await db.collection('mentors').find().toArray()

        res.send({
            statusCode: 200,
            mentors
        })
    }
    catch(err){
        console.log(err)
        res.send({
            statusCode:500,
            message: err
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
        let mentors = await db.collection('mentors').insertOne(req.body)
        
        res.send({
            statusCode: 201,
            message: "Mentor created successfully",
            mentors
        })
    }
    catch(err){
        console.log(err)
        res.send({
            message: "Not able to create mentor",err
        })
    }
    finally{
        client.close()
    }
})

router.get('/:id', async(req,res) => {
    await client.connect()
    try {
        const db = await client.db(dbName)
        let mentor = await db.collection('mentors').findOne({_id:mongoDb.ObjectId(req.params.id)})

        res.send({
            statusCode: 200,
            mentor
        })
    }
    catch(err){
        console.log(err)
        res.send({
            statusCode:500,
            message: err
        })
    }
    finally{
        client.close()
    }
})

module.exports = router;