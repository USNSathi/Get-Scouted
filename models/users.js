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
    role: {
        type: Datatype.STRING,
        allowNull: false,
        defaultValue: "applicant", // applicant, admin, recruiter
    },
    isBan: {
        type: Datatype.BOOLEAN,
        allowNull: false,
        defaultValue: false,
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