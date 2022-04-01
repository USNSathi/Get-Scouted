const { v4: uuidv4 } = require("uuid");

const Job = require("./jobs");
const Applicant = require("./applicants");

const Sequelize = require("./index").Sequelize;
const Datatype = require("./index").DataType;

const JobApplication = Sequelize.define("jobApplications", {
    id: {
        type: Datatype.UUID,
        defaultValue: () => uuidv4(),
        primaryKey: true,
        allowNull: false,
    },
    status: {
        type: Datatype.STRING,
        allowNull: false,
        defaultValue: "open", // open, filled, removed, closed
    },
    result: {
        type: Datatype.STRING,
        allowNull: true,
    },
    jobId: {
        type: Datatype.UUID,
        allowNull: false,
        unique: false,

        references: {
            model: Job,
            key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "RESTRICT",
    },
    applicantId: {
        type: Datatype.UUID,
        allowNull: false,
        unique: false,

        references: {
            model: Applicant,
            key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "RESTRICT",
    },
});

module.exports = JobApplication;