const controller = require('../controllers/customer.controller');

module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    app.get('/api/customers/getAllCustomers',controller.getAllCustomers);
    app.post('/api/customers/addNewCustomer',controller.addNewCustomer);
    app.delete('/api/customers/removeCustomer/:cid',controller.removeCustomer);
    app.put('/api/customers/updateCustomer',controller.updateCustomer);
    app.get('/api/customers/getCustomersbySort/:p/:o',controller.getCustomersbySort);
}