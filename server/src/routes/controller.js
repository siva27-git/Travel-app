const CxDetails = require('../models/CxDetails');

const addCxDetails = async (body) => {
    try {
        const { name, email, amount, destination, headCount, totalAmount } = body;

        if (!name || !email || !destination || !headCount || !amount || !totalAmount) {
            return { status: "fail", message: "mandatory fields are missing" }
        };

        const obj = {
            name: name.toLowerCase().trim(),
            email: email.trim(),
            destination: destination.toLowerCase().trim(),
            headCount,
            amount,
            totalAmount,
            createdBy: "user",
            updatedBy: "user"
        }
        const result = await CxDetails.create(obj);
        return { status: "success", message: "record added successfully" }
    } catch (error) {
        console.log(error.message);
        return { status: "fail", message: error.message }
    }
};

const getAllCxDetails = async (req, res) => {
    try {
        const result = await CxDetails.find({})
        return { status: "success", data: result }

    } catch (error) {
        console.log(error.message);
        return { status: "fail", message: error.message }
    }
};

module.exports = { addCxDetails, getAllCxDetails };