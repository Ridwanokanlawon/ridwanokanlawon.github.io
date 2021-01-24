import mongoose from 'mongoose';

const AdminRecordsSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true
    },
    user_id:{
       type:String,
       required:true
    },
    avatar:{
        type:String,
        required:true
    },
    mac_address:{
        type:String,
        required:true
    },
    department:{
        type:String,
        required:true
    },
    clock_out:{
        type:Date,
    },
    date:{
        type: String,
        required:true
    },
    gender:{
        type:String,
    },
    address:{
        type:String,
    },
    age:{
        type:String,
    },
    state_of_origin:{
        type:String,
    },
    clock_in_time:{
        type: String,
    },
    clock_out_time:{
        type: String,
    },
    creation_date:{
        type: Date,
        default: new Date()
    }
});

const AdminRecords = mongoose.model("adminrecords", AdminRecordsSchema);
export default AdminRecords;
