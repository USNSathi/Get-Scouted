const { v4: uuidv4 } = require("uuid");

const Credential = require("./credentials");

const Sequelize = require("./index").Sequelize;
const Datatype = require("./index").DataType;

const User = Sequelize.define("users", {
    id: {
        type: Datatype.UUID,
        defaultValue: () => uuidv4(),
        primaryKey: true,
        allowNull: false,
    },
    firstName: {
        type: Datatype.STRING,
        allowNull: false,
    },
    lastName: {
        type: Datatype.STRING,
        allowNull: true,
    },
    photo: {
        type: Datatype.STRING,
        allowNull: false,
    },
    phone: {
        type: Datatype.STRING,
        allowNull: false,
    },
    address: {
        type: Datatype.STRING,
        allowNull: false,
    },
    cid: {
        type: Datatype.UUID,
        allowNull: false,
        unique: true,

        references: {
            model: Credential,
            key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "RESTRICT",
    },
});

module.exports = User;