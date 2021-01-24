import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import AdminRecords from '../model/AdminRecords';
import Admin from '../model/Admin';
import gravatar from 'gravatar';
import utils from '../config/utils';
import admin from './admin';
import moment from 'moment-timezone';



const adminPassword = async (req, res) => {
  try {
    if (!req.payload.admin) {
        res.status(403).json({
          status: 403,
          message: 'Sorry, this service is strictly for the admin',
        });
        return;
      }
        let { password, new_password } = req.body;
        const admin = await Admin.findOne({email: req.payload.email});
        console.log(admin)
      
        if(!admin){
            res.status(404).json({
                status:404,
                error:'No user Found'
            })
            return
        }
        const isMatch = await bcrypt.compare(password, admin.password);
        if(!isMatch){
        res.status(404).json({
        status: 404,
        error: 'Wrong Password'
      })
      return;
    }

    const salt = await bcrypt.genSalt(10);
    console.log(salt);

    const hashed = await bcrypt.hash(new_password, salt);
        console.log(admin)
         admin.updateOne({
         password: hashed,
        },    
         admin).then(
            () => {
              res.status(200).json({
              status:200,
              msg:"Password successfully changed"
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

export default adminPassword;





