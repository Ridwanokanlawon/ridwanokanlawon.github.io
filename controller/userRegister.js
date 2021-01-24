import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import User from '../model/User';
import gravatar from 'gravatar';
import utils from '../config/utils';
import macaddress from 'macaddress';
import moment from 'moment-timezone';

// var macaddress = require('macaddress');

dotenv.config();

const userRegister = async (req, res) => {
    try{ 

        // if (!req.payload.admin) {
        //     res.status(403).json({
        //       status: 403,
        //       message: 'Sorry, this service is strictly for the admin',
        //     });
        //     return;
        //   }

        const {name, email, password, department} = req.body;
        // console.log(req.body.name);
        // console.log(email);
        // console.log(password);
        
      var macAddress =  macaddress.one(function (err, mac) {
            return mac; 
          });
          console.log(macAddress);
          console.log(moment().tz('Africa/Lagos').format('YYYY-MM-DD'));

        let user = await User.findOne({ email });
        // console.log(user)
        // console.log(admin);

        if(user){
            res.status(400).json({
                status: 400,
                error: 'This email address already exists'
            })
            return;
        }

        const avatar = gravatar.url(email, {
            s: '200',
            r: 'pg',
            d: 'mm'
        })
        // console.log(avatar);
        const salt = await bcrypt.genSalt(10);
        console.log(salt);

        const hashed = await bcrypt.hash(password, salt);
        // console.log(hashed);

        user = new User({
            name: req.body.name,
            email: req.body.email,
            avatar,
            department:req.body.department,
            mac_address: macAddress,
            password: hashed, 
            date: moment().tz('Africa/Lagos').format('YYYY-MM-DD')
        });
// console.log(admin);

console.log(user);
        await user.save();
        const token = utils.encodeToken( user.id, user.email )
        // console.log(token);
        res.status(201).json({
            status: 201,
            token,
            user
            // data: {
            //  token,
            //  name,
            //  email,
            //  avatar
            // }
          })
    }catch(err){
        res.status(500).json({
            status:500,
            err:'server error'
        })

    }
}

export default userRegister;
