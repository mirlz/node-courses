require('../src/db/mongoose');
const User = require('../src/models/user');

//609667789b97346b744742b2

// User.findByIdAndUpdate('6096678592cfe26de453a2ac', { age: 1}).then((user) => {
//     console.log(user);

//     return User.countDocuments({ age: 1})
// }).then((count) => {
//     console.log('Count: ', count);
// }).catch (e => {
//     console.log(e);
// });

const updateAgeAndCount = async(id, age) => {
    const user = await User.findByIdAndUpdate(id, { age });
    const count = await User.countDocuments({ age });

    return count;
};

updateAgeAndCount('6096678592cfe26de453a2ac', 2).then((count) => {
    console.log('Count: ', count);
}).catch(e => {
    console.log('e: ', e);
});