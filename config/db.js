const db = require('../models');

async function connectDatabase(){
    try {
        await db.sequelize.authenticate();
        console.log('Database connected succesfully');

        await db.sequelize.sync({ alter: true });
        console.log('Database synchronized');
    }
}