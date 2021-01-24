import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import AdminRecords from '../model/AdminRecords';
import User from '../model/User';
import gravatar from 'gravatar';
import utils from '../config/utils';

const totalUsers = async(req, res) => {
    try{
        const users = await User.find();
        if(!users){
            res.status(404).json({
                status:404,
                error:'no record available'
            })
        }
        res.status(200).json(
            users
        )
        console.log(adminrecords)
    }catch(err){
        res.status(500).json({
            status:500,
            err:'server error'
        })
    }
}
export default totalUsers;