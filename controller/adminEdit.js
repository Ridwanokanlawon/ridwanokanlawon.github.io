import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import AdminRecords from '../model/AdminRecords';
import Admin from '../model/Admin';
import gravatar from 'gravatar';
import utils from '../config/utils';
import admin from './admin';
import moment from 'moment-timezone';



const adminEdit = async (req, res) => {
  try {
    if (!req.payload.admin) {
        res.status(403).json({
          status: 403,
          message: 'Sorry, this service is strictly for the admin',
        });
        return;
      }
        // let { email } = req.body;
        const records = await Admin.findOne({email: req.payload.email});
      
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

export default adminEdit;
