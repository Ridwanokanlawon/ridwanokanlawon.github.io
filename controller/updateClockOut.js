import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import User from '../model/User';
import gravatar from 'gravatar';
import utils from '../config/utils';


const updateClockOut = async (req, res) => {
  try {
        const user = await User.findById(req.payload.id).select('-password');
        if(!user){
            res.status(404).json({
                status:404,
                msg:'No user Found'
            })
            return
        }
        user.updateOne({clock_out: new Date().toLocaleDateString()}, user).then(
            () => {
              res.status(200).json({
                user
              });
            }
          )     
    }
    catch(err){
        res.status(500).json({
            status:500,
            err:'server error'
        })
    }
};

export default updateClockOut;
