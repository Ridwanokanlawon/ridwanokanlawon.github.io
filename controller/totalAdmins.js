import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import Admin from '../model/Admin';
import User from '../model/User';
import gravatar from 'gravatar';
import utils from '../config/utils';

const totalAdmins = async(req, res) => {
    try{
        const admins = await Admin.find();
        if(!admins){
            res.status(404).json({
                status:404,
                error:'no record available'
            })
        }
        res.status(200).json(
            admins
        )
        console.log(admins)
    }catch(err){
        res.status(500).json({
            status:500,
            err:'server error'
        })
    }
}
export default totalAdmins;