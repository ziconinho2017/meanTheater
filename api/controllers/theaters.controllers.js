const mongoose = require("mongoose");
const Theater = mongoose.model(process.env.THEATER_MODEL);

const getAll = function (req, res) {
    Theater.find().exec(function (err, theaters) {
        const response = {
            status: parseInt(process.env.REST_API_OK, 10),
            message: theaters
        };
        if (err) {
            response.status= parseInt(process.env.REST_API_SYSTEM_ERROR, 10);
            response.message= err;
        }
        res.status(response.status).json(response.message);
    });
}

const getOne = function (req, res) {
    const theaterId = req.params.theaterId;
    Theater.findById(theaterId).exec(function (err, theater) {
        const response = {
            status: parseInt(process.env.REST_API_OK, 10),
            message: theater
        };
        if (err) {
            response.status = parseInt(process.env.REST_API_SYSTEM_ERROR, 10);
            response.message = err;
        } else if (!theater) {
            response.status = parseInt(process.env.REST_API_RESOURCE_NOT_FOUND_ERROR, 10);
            response.message = {
                "message": process.env.REST_API_RESOURCE_NOT_FOUND_MESSAGE
            };
        }
        res.status(response.status).json(response.message);
    });
}

module.exports = {
    getAll: getAll,
    getOne: getOne
};