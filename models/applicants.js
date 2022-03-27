const { v4: uuidv4 } = require("uuid");

const User = require("./users");

const Sequelize = require("./index").Sequelize;
const Datatype = require("./index").DataType;

const Applicant = Sequelize.define("applicants", {
    id: {
        type: Datatype.UUID,
        defaultValue: () => uuidv4(),
        primaryKey: true,
        allowNull: false,
    },
    cv: {
        type: Datatype.STRING,
        allowNull: false,
    },
    status: {
        type: Datatype.STRING,
        allowNull: false,
        defaultValue: "open", // open, blocked, jobholder
    },
    location: {
        type: Datatype.STRING,
        allowNull: false,
        defaultValue: "Dhaka, Bangladesh"
    },
    currentCompany: {
        type: Datatype.STRING,
        allowNull: true,
    },
    currentPosition: {
        type: Datatype.STRING,
        allowNull: true,
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

module.exports = Applicant;