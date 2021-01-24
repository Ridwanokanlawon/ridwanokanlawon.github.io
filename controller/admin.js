import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import Admin from '../model/Admin';
import gravatar from 'gravatar';
import utils from '../config/utils';

dotenv.config();

const admin = async (req, res) => {
    try{ 
        const {name, email, password} = req.body;
        console.log(req.body.name);
        console.log(email);
        console.log(password);

        let admin = await Admin.findOne({ email });
        // console.log(user)
        console.log(admin);

        if(admin){
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
// console.log(salt);

        const hashed = await bcrypt.hash(password, salt);
// console.log(hashed);

        admin = new Admin({
            name: req.body.name,
            email: req.body.email,
            avatar,
            password: hashed
        });
console.log(admin);

// console.log(user);
        await admin.save();
        const token = utils.encodeToken( admin.id, admin.email, admin.admin )
        console.log(token);
        res.status(201).json({
            status: 201,
            token,
            admin
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

export default admin;
