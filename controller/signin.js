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
    const{email, password} = req.body
     const user = await User.findOne({ email });
     console.log(user);
     if(!user){
         res.status(404).json({
             status: 404,
             error: 'Incorrect Email or Password'
         })
         return;
     }
    //  var macAddress =  macaddress.one(function (err, mac) {
    //     return mac; 
    //   });
    //   console.log(macAddress);
    //   console.log(user.mac_address);


    //  if(user.mac_address !== macAddress){
    //     res.status(403).json({
    //         status: 403,
    //         error: 'You can only login with the system you registerd with'
    //     })
    //     return;
    // // }
    //  let clockOut = moment().tz('Africa/Lagos').format('YYYY-MM-DD');
    //  console.log(clockOut);
    //  console.log(user.date);
    // //  console.log(user.clock_out_time.format('YYYY-MM-DD'));
    //  console.log(moment().tz('Africa/Lagos').format('YYYY-MM-DD'));

    // const history = await AdminRecords.findOne({ email, date: moment().tz('Africa/Lagos').format('YYYY-MM-DD') });


    //     // if(history){
    //     //     res.status(403).json({
    //     //         status:403,
    //     //         error:"You can't clock in more than once in a day"
    //     //     })
    //     //     return;
    //     // }
       
        
    // //  console.log(user)
    //  const isMatch = await bcrypt.compare(password, user.password);
    //  if(!isMatch){
    //     res.status(404).json({
    //         status: 404,
    //         error: 'Invalid login credentials'
    //     })
    //  }
    // //  console.log(user)
  
    //  let adminrecords = new AdminRecords({
    //     user_id: user._id,
    //     name: user.name,
    //     email: user.email,
    //     avatar: user.avatar,
    //     mac_address: user.mac_address,
    //     department: user.department,
    //     gender: user.gender,
    //     address: user.address,
    //     age: user.age,
    //     state_of_origin: user.state_of_origin,
    //     password: user.password,
    //     date: moment().tz('Africa/Lagos').format('YYYY-MM-DD'),
    //     clock_in_time: moment().tz('Africa/Lagos').format('hh:mm a'),
    //     // clock_out: user.date
    // });
    // console.log(adminrecords.date);
    // console.log(adminrecords.clock_in_time);

    
    // const adminrecord = await AdminRecords.findOne({ email, date: moment().tz('Africa/Lagos').format('YYYY-MM-DD') });
    // //  console.log(adminrecord);

    //  if(adminrecord){
    //     res.status(403).json({
    //         status:403,
    //         error:"You ve already logged in on this device"
    //     })
    //     return;
    // }



    // await adminrecords.save();
    // console.log('okay')
    // const adminrecordd = await AdminRecords.findOne({ email, date: moment().tz('Africa/Lagos').format('YYYY-MM-DD') });
    // console.log(adminrecordd);



    //  if(!adminrecordd){
    //      res.status(404).json({
    //          status: 404,
    //          error: 'Invalid Login Credentials'
    //      })
    //      return;
    //  }
     

     
    //  if(adminrecordd.clock_out){
    //     res.status(404).json({
    //         status: 404,
    //         error: 'You ve already logged in today'
    //     })
    //     return;
    // }
   
     const token = utils.encodeToken( user.id, user.name, user.email );
     res.status(200).json({
         status: 200,
         token,
         user,
         clock_in_time: moment().tz('Africa/Lagos').format('hh:mm a')
     })
     console.log(token);
 }catch(err){
     res.status(500).json({
         status:500,
         err:'server error'
     })
 }
}
export default signin;