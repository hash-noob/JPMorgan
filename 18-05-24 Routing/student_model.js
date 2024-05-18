const mongoose = require('mongoose');

const studentModel = mongoose.Schema({
                        Name : String,
                        ID : {
                                type : Number,
                                required : true
                             },
                        Branch : String
                    })

const student = mongoose.model("student",studentModel);


module.exports = student