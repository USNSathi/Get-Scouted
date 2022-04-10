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

    result: {
        type: Datatype.STRING,
        allowNull: false,
        defaultValue: 'pending',       // 'pending', 'rejected', 'accepted'
    },
});

Job.belongsToMany(Applicant, {
    through: JobApplication,
    as: 'individualApplicant',
    foreignKey: 'jobId',

    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
});

Applicant.belongsToMany(Job, {
    through: JobApplication,
    as: 'individualJob',
    foreignKey: 'applicantId',

    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
});

module.exports = JobApplication;