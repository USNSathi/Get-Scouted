const { v4: uuidv4 } = require("uuid");

const Recruiter = require("./recruiters");

const Sequelize = require("./index").Sequelize;
const Datatype = require("./index").DataType;

const Job = Sequelize.define("jobs", {
    id: {
        type: Datatype.UUID,
        defaultValue: () => uuidv4(),
        primaryKey: true,
        allowNull: false,
    },
    title: {
        type: Datatype.STRING,
        allowNull: false,
    },
    description: {
        type: Datatype.STRING,
        allowNull: false,
    },
    deadline: {
        type: Datatype.DATEONLY,
        allowNull: false,
    },
    type: {
        type: Datatype.STRING,
        allowNull: false,
        defaultValue: "fulltime", // fulltime, part-time, internship
    },
    placement: {
        type: Datatype.STRING,
        allowNull: false,
        defaultValue: "remote", // remote, on-site, hybrid
    },
    salary: {
        type: Datatype.STRING,
        allowNull: false,
        defaultValue: "0-100",
    },
    location: {
        type: Datatype.STRING,
        allowNull: false,
        defaultValue: "Dhaka, Bangladesh"
    },
    vacancy: {
        type: Datatype.INTEGER,
        allowNull: false,
        defaultValue: 1,
    },
    status: {
        type: Datatype.STRING,
        allowNull: false,
        defaultValue: "open", // open, filled, removed, closed
    },
    isVerified: {
        type: Datatype.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    },
    rid: {
        type: Datatype.UUID,
        allowNull: false,
        unique: true,

        references: {
            model: Recruiter,
            key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "RESTRICT",
    },
});

module.exports = Job;