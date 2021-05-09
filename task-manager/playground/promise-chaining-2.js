require('../src/db/mongoose');
const Task = require('../src/models/task');

// Task.deleteOne({
//     _id: '609655a109021d04a4f9578d'
// }).then(task => {
//     console.log(task);

//     return Task.countDocuments({
//         completed: false
//     });
// }).then(count => {
//     console.log('Number of incomplete tasks left: ', count);
// }).catch(e => {
//     console.log(e);
// });

const deleteTaskAndCount = async(id) => {
    const deleteTask = await Task.deleteOne({_id: id});
    const count = await Task.countDocuments({ completed: false});

    return count;
};

deleteTaskAndCount('60966f9cef1c8c4fd0d40c36').then(count => {
    console.log('Count of incomplete tasks: ', count);
}).catch(e => {
    console.log(e);
});