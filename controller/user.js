import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import User from '../model/User';
import gravatar from 'gravatar';
import utils from '../config/utils';

dotenv.config();

const user = async (req, res) => {

    try{ 
        const {name, email, password} = req.body;
        let user = await User.findOne({ email });
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
        const salt = await bcrypt.genSalt(10);
        const hashed = await bcrypt.hash(password, salt);
        user = new User({
            name: req.body.name,
            email: req.body.email,
            avatar,
            password: hashed
        });

        await user.save();
        const token = utils.encodeToken( user.id, user.name )
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
export default user;
