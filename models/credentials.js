"use strict";

const bcrypt = require("bcrypt");
const { v4: uuidv4 } = require("uuid");

const Sequelize = require("./index").Sequelize;
const Datatype = require("./index").DataType;

const Credential = Sequelize.define("credentials", {
    id: {
        type: Datatype.UUID,
        defaultValue: () => uuidv4(),
        primaryKey: true,
        allowNull: false,
    },
    email: {
        type: Datatype.STRING,
        unique: true,
        validate: {
            isEmail: true,
        },
        allowNull: false,
    },
    password: {
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
},
    {
        hooks: {
            beforeCreate: (credential) => {
                credential.password = bcrypt.hashSync(credential.password, 10);
            },
        },
    }
);

// instance methods
Credential.prototype.validPassword = function (password) {
    return bcrypt.compareSync(password, this.password);
};

module.exports = Credential;