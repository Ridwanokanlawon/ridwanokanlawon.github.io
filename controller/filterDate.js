import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import AdminRecords from '../model/AdminRecords';
import User from '../model/User';
import gravatar from 'gravatar';
import utils from '../config/utils';

const filterDate = async(req, res) => {
    try{
        console.log(req.body.startDate);
        let { startDate, endDate, page, limit } = req.body;

        // const adminrecords = await AdminRecords.find({creation_date: new Date(startDate)});
        // console.log(ad)

        // if(startDate === '' || endDate === '') {
        //     return res.status(400).json({
        //         status:'failure',
        //         message: 'Please ensure you pick two dates'
        //          })
        // }
        console.log(req.body.startDate)
        console.log(req.body.page)

        // console.log(new Date(new Date(startDate)))
        // console.log({ startDate, endDate});
        // const records = await AdminRecords.find({ 
        //     creation_date: {
        //           $gte: new Date(startDate),
        //           $lt: new Date(endDate)
        //            }
        //     }).sort({ creation_date: 'asc'}) 
        // const all =  await AdminRecords.find();
        // console.log(all)
        var j = endDate.split('-');
        var m = [];
        var k = m.push(parseInt(j[2], 10));
        console.log(j.splice(2,1))
        var all = Number(m) + 1;
        j.push(all.toString())
        var time = (j.join(','))

        console.log(time)
        

        
       const records = await AdminRecords.find({"email": req.payload.email, "creation_date": {$gte: new Date(startDate), $lt: new Date(time)} }).sort({date: -1})
        .limit(limit * 1)
        .skip((page - 1) * limit)
        .exec();
        console.log(records)

        const count = await AdminRecords.find({"email": req.payload.email,"creation_date": {$gte: new Date(startDate), $lt: new Date(time)} }).countDocuments();
        console.log(count)


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
export default filterDate;