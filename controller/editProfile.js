import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import AdminRecords from '../model/AdminRecords';
import User from '../model/User';
import gravatar from 'gravatar';
import utils from '../config/utils';
import admin from './admin';
import moment from 'moment-timezone';



const editProfile = async (req, res) => {
  try {
        // let { email } = req.body;
        const records = await User.findOne({email: req.payload.email});
      
        if(!records){
            res.status(404).json({
                status:404,
                error:'No user Found'
            })
            return
        }
        console.log(records)
         records.updateOne({
         name:req.body.name,
         department: req.body.department,
         gender: req.body.gender,
         marital_staus: req.body.marital_staus,
         address: req.body.address,
         age: req.body.age,
         state_of_origin: req.body.state_of_origin

        },    
         records).then(
            () => {
              res.status(200).json({
                name:req.body.name,
                department: req.body.department,
                gender: req.body.gender,
                marital_staus: req.body.marital_staus,
                address: req.body.address,
                age: req.body.age,
                state_of_origin: req.body.state_of_origin
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

export default editProfile;
