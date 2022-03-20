const { v4: uuidv4 } = require("uuid");

const User = require("./users");

const Sequelize = require("./index").Sequelize;
const Datatype = require("./index").DataType;

const Admin = Sequelize.define("admins", {
    id: {
        type: Datatype.UUID,
        defaultValue: () => uuidv4(),
        primaryKey: true,
        allowNull: false,
    },
    name: {
        type: Datatype.STRING,
        allowNull: false,
    },
    photo: {
        type: Datatype.STRING,
        allowNull: false,
    },
    phone: {
        type: Datatype.STRING,
        allowNull: false,
    },
    uid: {
        type: Datatype.UUID,
        allowNull: false,
        unique: true,

        references: {
            model: User,
            key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "RESTRICT",
    },
});

module.exports = Admin;