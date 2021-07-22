const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');


const routeSchema = mongoose.Schema({
    roles: [
        {
              type: mongoose.Schema.Types.ObjectId ,ref:'Roles'
        }
    ],
    url: {
        type: String, trim: true, required: true, unique: true
    }
})

// roleSchema.pre('save', async function () {
//     const role = this
//     if (role.isModified('role'))
//         role.role = await jwt.sign(role.role, process.env.JWTKEY)
// });

const Route = mongoose.model('Routes', routeSchema);
module.exports = Route;