const mongoose = require('mongoose');
const dotenv = require('dotenv');

function connectTodb(){
    mongoose.connect(process.env.MONGO_URL).then(() => {console.log('Connected to db');
    }).catch(err =>console.log(err)
    );
}
module.exports = connectTodb;
