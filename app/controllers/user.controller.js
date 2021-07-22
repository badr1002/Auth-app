const userModel = require('../../db/models/user.model');
const bcrypt = require('bcryptjs');
const hepler = require('../../app/helpers/app.helper');



class User {

    static register = async(req, res) => {
        try {
            const checkEmail = await userModel.findOne({ email: req.body.user.email })
            if (checkEmail) throw new Error('this email is already exist!')
            const checkMobile = await userModel.findOne({ mobile: req.body.user.mobile })
            if(checkMobile) throw new Error('this mobile is used before!')
            const user = new userModel(req.body.user);
            await user.save();
            res.status(200).send({
                apiStatus: true,
                msg: "registered successfully",
                data: {}
            });
         }
        catch (e) {
            res.status(500).send({
                apiStatus: false,
                msg: "registered faild!",
                data: e.message
            });
        }
    }

    static login = async (req, res) => {
        try {
            const user = await userModel.findUser(req.body.email, req.body.password);
            if (!user.activate) {
                user.activeKey = user._id
                hepler.sendMailerToActiveAcoount(user.activeKey,user.email)
            }
            await user.save();
            let token = await user.generateToken()
            let mac = await user.generateMac();
            res.status(200).send({
                apiStatus: true,
                msg: "loged in successfully",
                data: {user,mac,token:"bearer " + token}
            });
         }
        catch (e) {
            res.status(500).send({
                apiStatus: false,
                msg: "login faild!",
                data: e.message
            });
        }
    }

   static activateUser = async (req, res) => {
       try {
           const user = await userModel.findOne({activeKey: req.params.key, activate: false});
            if (!user) throw new Error('no user activate');
            user.activeKey = "";
            user.activate = true;
            await user.save();
            res.status(200).redirect('http://localhost:3000/user/me')
           
        }
        catch (e) {
            res.status(500).send({
                apiStatus: false,
                msg: "activation faild!",
                data: e.message
            });
        }
    }

    static logout = async(req, res) => {
        try {
            const user = req.user
            user.tokens.splice(req.headers.authorization, 1)
            user.macs.splice(req.headers.mac,1)
            await user.save();
            res.status(200).send({
                apiStatus: true,
                msg: "loged out successfully",
                data: {}
            });
         }
        catch (e) {
            res.status(500).send({
                apiStatus: false,
                msg: "logout faild!",
                data: e.message
            });
        }
    }

    static logoutAll = async(req, res) => {
        try {
            req.user.tokens = []
            req.user.macs = []
            await req.user.save()
            res.status(200).send({
                apiStatus: true,
                msg: "logedAll out successfully",
                data: {}
            });
         }
        catch (e) {
            res.status(500).send({
                apiStatus: false,
                msg: "logoutAll faild!",
                data: e.message
            });
        }
    }

    static me = async(req,res)=>{
        res.status(200).send({
            apiStatus: true,
            data:req.user,
            message:"data fetched"
        })
    }

   
    static editProfile = async (req, res) => {
        let allowUpdate = ['name', 'mobile','password','oldPassword'] 
        const updates = Object.keys(req.body.user)
        let isAvailable = updates.every(u => allowUpdate.includes(u))
        if (!isAvailable) {
            res.status(500).send({
                apiStatus: false,
                msg: "not avaliable!",
                data: {}
            });
            return;
        }
        
         try {
            const data = req.body.user;
            const user = await userModel.findById(req.user._id)
            let password = user.password
            if (!user) throw new Error('user not found')
            if (await(data.password) ){
                const valid = await bcrypt.compare(data.oldPassword, password)
                if (!valid) throw new Error('invalid password!')
                if (data.oldPassword == data.password) throw new Error("Enter a new password")
                password = data.password
            }
            user.password = password
            user.name = data.name
            user.mobile = data.mobile
            await user.save()
            res.status(200).send({
                apiStatus: true,
                msg: "updaeted successfully",
                data: {}
            });
         }
        catch (e) {
            res.status(500).send({
                apiStatus: false,
                msg: "updaeted faild!",
                data: e.message
            });
        }
    }


     static getPassword = async (req, res) => {
        try {
            const user = await userModel.findOne({ email: req.body.email })
            if (!user) throw new Error('email not found!')
            hepler.sendMailerToSetNewPassword(user._id)
            res.status(200).send({
                apiStatus: true,
                msg: "check your email",
                data: {}
            });
         }
        catch (e) {
            res.status(500).send({
                apiStatus: false,
                msg: "updaeted faild!",
                data: e.message
            });
        }
    }

    static checkCode = async (req, res) => {
        try {
            const user = await userModel.findOne({ _id: req.body.code })
            if (!user) throw new Error('user not found!')
            let token = await user.generateToken();
            let mac = await user.generateMac();
            res.status(200).send({
                apiStatus: true,
                msg: "check your email",
                data: {token,mac}
            });
         }
        catch (e) {
            res.status(500).send({
                apiStatus: false,
                msg: "invalid code!",
                data: e.message
            });
        }
    }

    static setPassword = async (req, res) => {
        try {
            const user = await userModel.findById(req.user._id)
            if (!user) throw new Error('user not found!')
            const valid = await bcrypt.compare(req.body.password, user.password)
            if (valid) throw new Error('User deffirant password!')
            user.password = req.body.password
            user.save();
            res.status(200).send({
                apiStatus: true,
                msg: "password updated successfully",
                data:{}
            })
         }
        catch (e) {
            res.status(500).send({
                apiStatus: false,
                msg: "updaeted faild!",
                data: e.message
            });
        }
    }
    
    

    // static uploadProfileImage = async (req, res) => {
    //     try {
    //         const user = await userModel.findByIdAndUpdate(req.user._id,req.body, {runValidators:true, new:true});
    //         await user.save();
    //         res.status(200).send({
    //             apiStatus: true,
    //             msg: "updaeted successfully",
    //             data: user
    //         });
    //      }
    //     catch (e) {
    //         res.status(500).send({
    //             apiStatus: false,
    //             msg: "updaeted faild!",
    //             data: e.message
    //         });
    //     }
    // }
    
   

    
}

module.exports = User;
