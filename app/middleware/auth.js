const userModel = require('../../db/models/user.model');
const routeModel = require('../../db/models/routes.model');
const jwt = require('jsonwebtoken');

// check user  
checkUser = (token, decodedToken,mac) => {
    const user =  userModel.findOne({
        _id: decodedToken._id,
        activate: true,
        'tokens.token': token,
        'macs.mac':mac
    })
    return user
}
// check permition
checkPermition = async (url,userRole) => {
    let route = await routeModel.findOne({ url })
    let role = await route.roles.find(r => r == userRole)
    if(!role) throw new Error('you are not have a permition to access this page');
    return route
}

auth = async (req, res, next) => {
    try {
        // get token
        let token = req.header('Authorization').replace('bearer ', '')
        let decodedToken = jwt.verify(token, process.env.JWTKEY)

        // get mac
        let mac = req.header('Mac');
        // check user    
        let user = await checkUser(token, decodedToken,mac)
        if (!user) throw new Error('user is not found')

        // check permition   
        let route = await checkPermition(req.originalUrl,user.role)
        if (!route) throw new Error('page is not found')

        // return user and token
        req.user = user
        req.token = token
        // go
        next()
    }catch (e) {
        res.status(500).send({
            apiStatus: false,
            data: e.message,
            message: 'unauthorized user'
        })
    }
    }


    


module.exports = auth;