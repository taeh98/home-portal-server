import {Sequelize, DataTypes, WhereOptions, Op} from "sequelize";

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

// CREATE

async function addNewTile(name: string, url: string, clickCount: number): Promise<void> {
    await linkModel.create({name: name, url: url, clickCount: clickCount});
}

// READ

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

// UPDATE

async function editTile(tile: TileObject): Promise<void> {
    const sqTile = await linkModel.findByPk(tile.id);
    if (sqTile === null) return;

    sqTile.setDataValue("name", tile.name);
    sqTile.setDataValue("url", tile.url);
    sqTile.setDataValue("clickCount", tile.clickCount);
    await sqTile.save();
}

async function incrementOutclicksByTileId(id: number): Promise<void> {
    const sqTile = await linkModel.findByPk(id);
    if (sqTile === null) return;

    sqTile.setDataValue("clickCount", Number.parseInt(sqTile.getDataValue("clickCount"), 10) + 1);
    await sqTile.save();
}

// DELETE

async function deleteTilesById(ids: number[]): Promise<void> {
    const wo: WhereOptions = {
        id: {
            [Op.or]: ids
        }
    };
    await linkModel.destroy({where: wo});
}

// TESTING

function main() {
    getAllTiles().then((tiles: TileObject[]) => console.log("got all tiles: ", tiles));

    console.log("incrementing first tile");
    incrementOutclicksByTileId(0)
        .then(_r => getAllTiles().then((tiles: TileObject[]) => console.log("got all tiles: ", tiles)));

    console.log("setting first tile outclicks to 0");
    editTile({id: 0, url: 'https://www.google.com', clickCount: 0, name: 'Google'})
        .then(_r => getAllTiles().then((tiles: TileObject[]) => console.log("got all tiles: ", tiles)));

    console.log("adding new tile to guardian");
    addNewTile('The Guardian', 'https://www.theguardian.com', 0)
        .then(_r => getAllTiles().then((tiles: TileObject[]) => console.log("got all tiles: ", tiles)));

    console.log("deleting tile with id of 12");
   deleteTilesById([12])
        .then(_r => getAllTiles().then((tiles: TileObject[]) => console.log("got all tiles: ", tiles)));
}

main();