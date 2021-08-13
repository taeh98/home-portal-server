import {Sequelize, DataTypes} from "sequelize";

const postgresUri = 'postgres://' + process.env.postgres_tiles_db_user_name + ':' + process.env.postgres_tiles_db_user_password +
    '@' + process.env.postgres_tiles_db_container_name + ':' + process.env.postgres_tiles_db_port + '/' + process.env.postgres_tiles_db_name;

const sequelize = new Sequelize(postgresUri);

const linkModel = sequelize.define('Link', {
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

type TileObject = {
    id: number,
        name: string,
    url: string,
    clickCount: number
};

async function getAllTiles(): Promise<TileObject[]> {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');

        const syncRes = await linkModel.sync();

        console.debug("syncRes = ", syncRes);

        const findAllRes = await linkModel.findAll();

        console.debug("findAllRes = ", findAllRes);

        return findAllRes.map((resItem) => ({
            id: resItem.getDataValue("id"),
            name: resItem.getDataValue("name"),
            url: resItem.getDataValue("url"),
            clickCount: resItem.getDataValue("clickCount")
        }));
    }

    catch (error) {
        console.error('Unable to get tiles from the postgres database:', error);
        return [];
    }
}