const express = require('express');
const router = express.Router();
const Customer = require("../models/customer.model");

//Create a customer
// http://localhost:5000/apis/customer
router.post("/customer", (req, res) => {

    const newCustomer = new Customer({
        customer_id: req.body.customer_id,
        customer_name: req.body.customer_name,
        phonenumber: req.body.phonenumber,
        email: req.body.email,
        address: req.body.address,
    });

    //Save to database
    Customer.create(newCustomer, (err, data) => {
        if (err)
            res.status(500).send({
                message: err.message || "Some error occurred while creating the customer"
            })
        else res.send(data);
    })

});

// GetByid customer
// http://localhost:5000/apis/customer/1
router.get('/customer/:customer_id', (req, res) => {
    //แปลงจาก string to num
    const CustomerId = Number.parseInt(req.params.customer_id);  //แปลงให้เป็นจำนวนเต็ม
    Customer.getById(CustomerId, (err, data) => {
        if (err) {
            if (err.kind === 'not_found') {
                res.status(404).send({
                    message: `Customer not found with this id ${CustomerId}`,
                });
            }
            else {
                res.status(500).send({
                    message: "Error retriveving with this id " + CustomerId,
                })
            }
        }
        else {
            res.send(data);
        }
    });
});


// Get all restaurants 
// http://localhost:5000/apis/customer
router.get('/customer', (req, res) => {
    Customer.getAll((err, data) => {
        if (err) {
            res.status(5000)({
                // ถ้า err.message เป็นจริงก็โชว์ ถ้าไม่ก็โชว์ หลัง ||
                message: err.message || "Some erroe"
            });
        } else {
            res.send(data);
        }
    });
});


//Update restaurants
// http://localhost:5000/apis/customer/1 

router.put('/customer/:customer_id', (req, res) => {
    const CustomerId = Number.parseInt(req.params.customer_id);  //แปลงให้เป็นจำนวนเต็ม
    //เช็คว่า body เป็น object ไหม แล้วเป็นค่าว่างรึป่าว
    if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
        res.status(400).send({
            message: "Content Can not be empty!",
        });
    }

    Customer.updateById(CustomerId, new Customer(req.body), (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Restaurant not found with this id: ${CustomerId}`,
                });
            } else {
                res.status(500).send({
                    message: "Error updating restaurant data with this id" + CustomerId,
                });
            }
        } else {
            res.send(data);
        }
    });
});

//Delete by id
// http://localhost:5000/apis/customer/1 
router.delete('/customer/:customer_id', (req, res) => {
    const CustomerId = Number.parseInt(req.params.customer_id);  //แปลงให้เป็นจำนวนเต็ม
    //เช็คว่า body เป็น object ไหม แล้วเป็นค่าว่างรึป่าว
    Customer.removeById(CustomerId, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Customer not found with this id: ${CustomerId}`,
                });
            } else {
                res.status(500).send({
                    message: "Error deleting Customer data with this id" + CustomerId,
                });
            }
        } else {
            res.send({ message: "Customer is deleted successfully" });
        }

    });
});
module.exports = router;