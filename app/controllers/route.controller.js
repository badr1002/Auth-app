const routeModel = require('../../db/models/routes.model');

class Route {

    static addRoute = async(req, res) => {
        try {
            const route = await routeModel(req.body)
            await route.save()
            res.status(200).send({
                apiStatus: true,
                msg: "New route added successfully",
                data: {}
            });
         }
        catch (e) {
            res.status(500).send({
                apiStatus: false,
                msg: "addation route faild!",
                data: e.message
            });
        }
    }

    static addRole = async(req, res) => {
        try {
            const route = await routeModel.findById(req.params.id)
            route.roles = route.roles.concat(req.body.role)
            await route.save()
            res.status(200).send({
                apiStatus: true,
                msg: "role added successfully",
                data: {}
            });
         }
        catch (e) {
            res.status(500).send({
                apiStatus: false,
                msg: "addation role faild!",
                data: e.message
            });
        }
    }

}
module.exports = Route