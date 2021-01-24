import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import AdminRecords from '../model/AdminRecords';
import User from '../model/User';
import gravatar from 'gravatar';
import utils from '../config/utils';

const adminFilter = async(req, res) => {
    try{
        if (!req.payload.admin) {
            res.status(403).json({
              status: 403,
              message: 'Sorry, this service is strictly for the admin',
            });
            return;
          }
        console.log(req.body.startDate);
        let { startDate, endDate, email, department, page, limit } = req.body;
        console.log(req.body.startDate)
        // console.log(req.body.page)

        var j = endDate.split('-');
        var m = [];
        var k = m.push(parseInt(j[2], 10));
        console.log(j.splice(2,1))
        var all = Number(m) + 1;
        j.push(all.toString())
        var time = (j.join(','))

        console.log(time)
        var filter = {"creation_date": {$gte: new Date(startDate), $lt: new Date(time)}};

        console.log(req.body.email);
        console.log(req.body.department);


        var mail = email;
        var depart = department;

        if(depart){
            filter.department = department;
        };
        
        if(mail){
            filter.email = email;
        };
        
        console.log(filter);

       const records = await AdminRecords.find( filter ).sort({date: -1})
        .limit(limit * 1)
        .skip((page - 1) * limit)
        .exec();
        console.log(records)


        const count = await AdminRecords.find( filter ).sort({date: -1}).countDocuments()
        console.log(count)
        console.log(records.length)
        console.log(limit)

        if(!records){
            res.status(404).json({
                status:404,
                error:'no record available'
            })
        }
        res.status(200).json({
            records,
            totalPages: Math.ceil(count / limit),
            currentPage: page
        })
    }catch(err){
        res.status(500).json({
            status:500,
            err:'server error'
        })
    }
}
export default adminFilter;