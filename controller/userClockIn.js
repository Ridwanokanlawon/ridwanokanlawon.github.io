import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import User from '../model/User';
import AdminRecords from '../model/AdminRecords';
import utils from '../config/utils';
import macaddress from 'macaddress';
import moment from 'moment-timezone';

dotenv.config();

const signin = async(req, res) => {
 try{
    const user = await User.findOne({email: req.payload.email});
     var macAddress =  macaddress.one(function (err, mac) {
        return mac; 
      });
      console.log(macAddress);

    //  let clockOut = moment().tz('Africa/Lagos').format('YYYY-MM-DD');
    //  console.log(clockOut);
    //  console.log(user.date);
    console.log(moment().tz('Africa/Lagos').format('YYYY-MM-DD'));

    const history = await AdminRecords.findOne({ email: req.payload.email, date: moment().tz('Africa/Lagos').format('YYYY-MM-DD') });


        if(history){
            res.status(403).json({
                status:403,
                error:"You can't clock in more than once per day"
            })
            return;
        }

     let adminrecords = new AdminRecords({
        user_id: user._id,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
        mac_address: user.mac_address,
        department: user.department,
        gender: user.gender,
        address: user.address,
        age: user.age,
        state_of_origin: user.state_of_origin,
        password: user.password,
        date: moment().tz('Africa/Lagos').format('YYYY-MM-DD'),
        clock_in_time: moment().tz('Africa/Lagos').format('hh:mm a'),
    });
    console.log(adminrecords.date);
    console.log(adminrecords.clock_in_time);



    await adminrecords.save();
    // const adminrecordd = await AdminRecords.findOne({ email, date: moment().tz('Africa/Lagos').format('YYYY-MM-DD') });
    // console.log(adminrecordd);

     

     
    //  if(adminrecordd.clock_out){
    //     res.status(404).json({
    //         status: 404,
    //         error: 'You ve already logged in today'
    //     })
    //     return;
    // }

    res.status(200).json({
        status: 200,
        adminrecords,
        clock_in_time: moment().tz('Africa/Lagos').format('hh:mm a')
    })

 }catch(err){
     res.status(500).json({
         status:500,
         err:'server error'
     })
 }
}
export default signin;