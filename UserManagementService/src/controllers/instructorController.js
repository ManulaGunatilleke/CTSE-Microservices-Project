const Instructor = require('../models/instructor');
const bodyParser = require('body-parser');
const router = require("express").Router();

// Get all instructors
const allInstructor= async (req, res) => {
    try {
        const instructors = await Instructor.find();
        res.json(instructors);
    } catch (error) {
        res.status(500).json({ status: "Error with fetching data", error: error.message });
    }
}

// Updating a instructor
const updateInstructor = async (req, res) => {
    try{
        let instructorId = req.params.id;
        const  { Instructorname, Email, Password } = req.body;

        const updateInstructor = {
            Instructorname,
            Email,
            Password
        }

        await Instructor.findByIdAndUpdate(instructorId, updateInstructor);
        res.status(200).send({status: "Instructor Updated"});
    } catch (error){
        res.status(500).send({ status: "Error with updating data", error: error.message });
    }
}

// Deleting a single instructor
const deleteiIstructor = async (req, res) => {
    try {
        let instructorId = req.params.id;

        await Instructor.findByIdAndDelete(instructorId);
        res.status(200).send({ status: "Instructor deleted" });
    } catch (error) {
        res.status(500).send({ status: "Error with delete instructor", error: error.message });
    }
}

// Get the details of a single instructor
const singleInstructor = async (req, res) => {
    try {
        let instructorId = req.params.id;

        const instructor = await Instructor.findById(instructorId);
        res.status(200).send({ status: "Instructor fetched", instructor });
    } catch (error) {
        res.status(500).send({ status: "Error with fetching instructor", error: error.message });
    }
}

// Handle searching users
const searchInstructors = async (req, res) => {
    try {
        let result = await Instructor.find({
            $or: [
                {
                    Instructorname: { $regex: req.params.key },
                },
            ],
        });
        res.send(result);
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
}

module.exports = {
    allInstructor,
    updateInstructor,
    deleteiIstructor,
    singleInstructor,
    searchInstructors
};

