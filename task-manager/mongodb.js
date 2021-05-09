// CRUD

// const mongodb = require('mongodb');
// const MongoClient = mongodb.MongoClient;
// const ObjectID = mongodb.ObjectID;

const { MongoClient, ObjectID } = require('mongodb');

const connectionURL = 'mongodb://127.0.0.1:27017';
const database = 'task-manager';

// const id = new ObjectID();
// console.log(id);
// console.log(id.id.length);
// console.log(id.toHexString());
// console.log(id.toHexString().length);

MongoClient.connect(connectionURL, { useNewUrlParser: true, useUnifiedTopology: true }, (error, client) => {
    if (error) {
        return console.log('Unable to connect to database!');
    }
    
    //mongodb will auto create the db just by us calling it in the code
    const db = client.db(database);

    // db.collection('users').insertOne({
    //     name: 'Avril',
    //     age: 30
    // }, (error, result) => {
    //     if(error) {
    //         return console.log('Unable to insert user');
    //     }

    //     console.log(result.ops);
    // });

    // db.collection('users').insertMany([
    //     {
    //         name: 'Jen',
    //         age: 28
    //     }, {
    //         name: 'Blahblah',
    //         age: 29
    //     }
    // ], (error, result) => {
    //     if(error) {
    //         return console.log('Unable to insert document!');
    //     }

    //     console.log(result.ops);
    // });

    // db.collection('tasks').insertMany([
    //     {
    //         description: 'Buy eggs',
    //         completed: false
    //     }, {
    //         description: 'Buy maggie mee',
    //         completed: false
    //     }, {
    //         description: 'Buy tea',
    //         completed: true
    //     }
    // ], (error, result) => {
    //     if(error) {
    //         return console.log('Unable to insert documents!');
    //     }

    //     console.log(result.ops);
    // });

    // ------------------- END OF CREATE ---------------------------

    // db.collection('users').findOne({ _id: new ObjectID('6096342e21b2dc838c287c2c')} , (error, user) => {
    //     if(error) {
    //         return console.log('Unable to fetch!')
    //     }

    //     console.log(user);
    // });

    // db.collection('users').find({ age: 30}).toArray((error, users) => {
    //     if(error) {
    //         return console.log('Unable to fetch!');
    //     }

    //     console.log(users)
    // });

    // db.collection('users').find({ age: 30}).count((error, count) => {
    //     if(error) {
    //         return console.log('Unable to fetch!');
    //     }

    //     console.log(count)
    // });

    // db.collection('tasks').findOne({ _id: new ObjectID("609631af6a22e87c7c609a1f")}, (error, task) => {
    //     if(error) {
    //         return console.log('Unable to fetch data!');
    //     }

    //     console.log(task);
    // });

    // db.collection('tasks').find({ completed: false}).toArray((error, tasks) => {
    //     if(error) {
    //         return console.log('Unable to fetch data!');
    //     }

    //     console.log(tasks);
    // })

    // ------------------- END OF READ / QUERY ---------------------------

    // db.collection('users').updateOne(
    //     { _id: new ObjectID("60962d9f548fc57554f6f6af")
    // }, {
    //     $inc: {
    //         age: 1
    //     }
    // }).then((res) => {
    //     console.log(res);
    // }).catch((err) => {
    //     console.log('Error! ', error);
    // });

    // db.collection('tasks').updateMany({
    //     completed: false
    // }, {
    //     $set: {
    //         completed: true
    //     }
    // }).then((res) => {
    //     console.log(res);
    // }).catch((error) => {
    //     console.log(error);
    // });

    // ------------------- END OF UPDATE ---------------------------
   
    // db.collection('users').deleteMany({
    //     age: 30
    // }).then(res => {
    //     console.log(res);
    // }).catch(err => {
    //     console.log(err);
    // });

    // db.collection('tasks').deleteOne({
    //     description: 'Buy eggs'
    // }).then(res=> {
    //     console.log(res);
    // }).catch(err => {
    //     console.log(err);
    // });

    // ------------------- END OF DELETE ---------------------------
});