import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import User from '../model/User';
import AdminRecords from '../model/AdminRecords';
import gravatar from 'gravatar';
import utils from '../config/utils';


const adminRecords = async (req, res) => {
  try {
        const user = await User.findById(req.payload.id);
        if(!user){
            res.status(404).json({
                status:404,
                msg:'No user Found'
            })
            return
        }
        console.log(user._id);
        let adminrecords = new AdminRecords({
            user_id: user._id,
            name: user.name,
            email: user.email,
            avatar: user.avatar,
            mac_address: user.mac_address,
            password: user.password,
            date: user.date,
            // clock_out: user.date
        });
        await adminrecords.save();

        console.log(adminrecords)
        res.status(200).json({
            adminrecords
        })
    }
    catch(err){
        res.status(500).json({
            status:500,
            err:'server error'
        })
    }
};

export default adminRecords;
