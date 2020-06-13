
const Joi = require('@hapi/joi');
Joi.objectId = require('joi-objectid')(Joi);
const employeeValidator = {
    addEmployee: {
        body: {
            firstName: Joi.string().min(3).max(15).required(),
            lastName: Joi.string().trim().min(3).max(15).required(),
            seniorityLevel: Joi.string().trim().min(3).max(15).required(),
            employmentDate: Joi.date().iso()
        }
    },
    updateEmployee: {
        params: {
            seniorityLevel: Joi.string().trim().min(3).max(15).required()
        },
        body: {
            id: Joi.objectId(),
            team: Joi.objectId()
        }
    },
    deleteEmployee: {
        body: {
            id: Joi.objectId()
        }
    }
};

module.exports = employeeValidator;
