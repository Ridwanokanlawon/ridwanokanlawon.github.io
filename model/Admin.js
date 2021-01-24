import mongoose from 'mongoose';
import moment from 'moment';

const AdminSchema = new mongoose.Schema({
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
    avatar:{
        type:String,
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
    admin:{
        type:Boolean,
        default:true
    },
    date:{
        type: Date,
        default:moment().format('YYYY-MM-DD')
    },
    creation_date:{
        type: Date,
        default: new Date()
    }
});

const Admin = mongoose.model("admin", AdminSchema);
export default Admin;
