import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import User from '../model/User';
import gravatar from 'gravatar';
import utils from '../config/utils';
import AdminRecords from '../model/AdminRecords';

const adminHistory = async(req, res) => {

    const { page, limit } = req.body;
    try{
        if (!req.payload.admin) {
            res.status(403).json({
              status: 403,
              message: 'Sorry, this service is strictly for the admin',
            });
            return;
          }
        const adminrecords = await AdminRecords.find().sort({date:-1})
        .limit(limit * 1)
        .skip((page - 1) * limit)
        .exec();
        console.log(adminrecords)

        const count = await AdminRecords.find().countDocuments();
        console.log(count)
        if(!adminrecords){
            res.status(404).json({
                status:404,
                error:'no record available'
            })
        }
        res.status(200).json({
            adminrecords,
            totalPages: Math.ceil(count / limit),
            currentPage: page
        })
        console.log(adminrecords)
    }catch(err){
        res.status(500).json({
            status:500,
            err:'server error'
        })
    }
}
export default adminHistory;