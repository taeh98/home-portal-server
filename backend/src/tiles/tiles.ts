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
        await linkModel.sync();
        const findAllRes = await linkModel.findAll();
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

    await sqTile.increment('clickCount', { by: 1 });
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

async function main() {
    await getAllTiles().then((tiles: TileObject[]) => console.log("first time getting all tiles: ", tiles));

    await incrementOutclicksByTileId(1)
        .then(_r => getAllTiles().then((tiles: TileObject[]) => console.log("after incrementing first tile: ", tiles)));

    await editTile({id: 1, url: 'https://www.google.com', clickCount: 0, name: 'Google'})
        .then(_r => getAllTiles().then((tiles: TileObject[]) => console.log("after setting first tile outclicks to 0: ", tiles)));

    await addNewTile('The Guardian', 'https://www.theguardian.com', 0)
        .then(_r => getAllTiles().then((tiles: TileObject[]) => console.log("after adding new tile to guardian: ", tiles)));

    await deleteTilesById([12])
        .then(_r => getAllTiles().then((tiles: TileObject[]) => console.log("after deleting tile with id of 12: ", tiles)));
}

main();