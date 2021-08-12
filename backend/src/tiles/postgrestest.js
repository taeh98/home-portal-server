const { Sequelize, DataTypes } = require('sequelize');

console.log("in postgrestest.js");

const postgresUri = 'postgres://' + process.env.postgres_tiles_db_user_name + ':' + process.env.postgres_tiles_db_user_password +
    '@' + process.env.postgres_tiles_db_container_name + ':' + process.env.postgres_tiles_db_port + '/' + process.env.postgres_tiles_db_name;

const sequelize = new Sequelize(postgresUri); // Example for postgres

console.debug("postgresUri = ", postgresUri);

const Link = sequelize.define('Link', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    url: {
        type: DataTypes.STRING,
        allowNull: false
    },
    clickCount: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: "click_count"
    },
}, {
    tableName: "links",
    timestamps: false
});

async function main() {
    console.log("in main() in postgrestest.js");

    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');

        const syncRes = await Link.sync();

        console.debug("syncRes = ", syncRes);

        const findAllRes = await Link.findAll();

        console.debug("findAllRes = ", findAllRes);

    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

main();