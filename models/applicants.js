const { v4: uuidv4 } = require('uuid');

const User = require('./users');

const Sequelize = require('./index').Sequelize;
const Datatype = require('./index').DataType;

const Applicant = Sequelize.define('applicants', {
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
	dob: {
		type: Datatype.DATEONLY,
		allowNull: false,
	},
	skill: {
		type: Datatype.STRING,
		allowNull: false,
	},
	status: {
		type: Datatype.STRING,
		allowNull: false,
		defaultValue: 'open', // open, blocked, jobholder
	},
	region: {
		type: Datatype.STRING,
		allowNull: false,
	},
	country: {
		type: Datatype.STRING,
		allowNull: false,
		defaultValue: 'Bangladesh',
	},
	currentCompany: {
		type: Datatype.STRING,
		allowNull: true,
	},
	currentPosition: {
		type: Datatype.STRING,
		allowNull: true,
	},
	isCompleted: {
		type: Datatype.BOOLEAN,
		allowNull: false,
		defaultValue: false,
	},
	isVerified: {
		type: Datatype.BOOLEAN,
		allowNull: false,
		defaultValue: false,
	},
});

Applicant.belongsTo(User, {
	foreignKey: 'uid',
	allowNull: false,
	as: 'jobseekers',

	onUpdate: 'CASCADE',
	onDelete: 'CASCADE',
});

module.exports = Applicant;
