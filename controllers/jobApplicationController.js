const Job = require("../models/jobs");
const Applicant = require("../models/applicants");
const User = require("../models/users");
const JobApplication = require("../models/jobApplications");

const apply = async (req, res) => {
    const data = res.locals.data;
    const jobId = req.params.jobId;

    // console.log(data.applicant);

    await JobApplication.upsert({
        jobId: jobId,
        applicantId: data.applicant.id,
    }).then(([app, isCreated]) => {
        // console.log(app.dataValues, isCreated);
        if (isCreated) {
            res.status(201);
            res.send({
                message: "Application successful"
            });
        } else {
            res.status(200);
            res.send({
                message: "Already applied"
            });
        }
    }).catch(err => {
        res.status(200);
        console.log(err);
        res.send({
            message: "Application failed",
        });
    });
}

const getAppliedJobs = async (req, res) => {
    const data = res.locals.data;

    const result = await Job.findAll({
        include: [{
            model: Applicant,
            as: "individualApplicant",
            where: {
                id: data.applicant.id
            }
        }],
        attributes: {
            exclude: ["rid", "vacancy"]
        },
        order: [
            ['updatedAt', 'DESC']
        ]

    }).then(data => {

        // data.forEach(job => {
        //     delete job.dataValues.individualApplicant;
        // });

        return data;
    }).catch(err => {
        return [];
    });

    return result;
}

const getApplicants = async (req, res) => {
    const data = res.locals.data;

    const result = await Job.findAll({
        include: [{
            model: Applicant,
            as: "individualApplicant",

            include: [{
                model: User,
                as: "jobseekers",
            }]
        }],
    }).then(data => {
        return data;
    }).catch(err => {
        console.log(err);
        return [];
    });

    return result;

}

// find total applications for a recruiter


module.exports = {
    apply,
    getAppliedJobs,
    getApplicants,
}