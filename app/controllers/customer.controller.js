const db = require('../models');
const Customer = db.customer;

exports.getAllCustomers = (req, res) => {
    Customer.find((err, customers) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }
        res.send({
            status: 200,
            data: customers
        });
    })
}

exports.addNewCustomer = (req,res)=>{
    let obj = req.body;
       const customer = new Customer();
        for(let p in obj){
            customer[p] = obj[p];
        }
        customer.save((err,result)=>{
            if (err) {
                res.status(500).send({ message: err });
                return;
            }
            res.send({
                status: 200,
                message: "Customer added Successfully"
            }); 
        })

}

exports.removeCustomer =(req,res)=>{
    Customer.deleteOne({_id:req.params.cid},(err,result)=>{
        if (err) {
            res.status(500).send({ message: err });
            return;
        }
        res.send({
            status: 200,
            message: "Customer Deleted Successfully"
        }); 
    })
}

exports.updateCustomer = (req,res)=>{
    Customer.updateOne({_id:req.body._id},req.body,(err,result)=>{
        if (err) {
            res.status(500).send({ message: err });
            return;
        }
        res.send({
            status: 200,
            message: "Customer Updated Successfully"
        });
    })
}