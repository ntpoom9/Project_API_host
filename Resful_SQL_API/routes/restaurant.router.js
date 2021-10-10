const express = require('express');
const router = express.Router();
const Restaurant = require("../models/restaurant.model");

// http://localhost:5000/apis/restaurants
router.post("/restaurants", (req, res) => {
    //Create a restaurant
    const newRestaurant = new Restaurant({
        name: req.body.name,
        type: req.body.type,
        imgURL: req.body.imgURL,
    });

    //Save to database
    Restaurant.create(newRestaurant, (err, data) => {
        if (err)
            res.status(500).send({
                message: err.message || "Some error occurred while creating the restaurant"
            })
        else res.send(data);
    })

});

// GetByid restaurants 
// http://localhost:5000/apis/restaurants/1
router.get('/restaurants/:id', (req, res) => {
    //แปลงจาก string to num
    const restaurantId = Number.parseInt(req.params.id);  //แปลงให้เป็นจำนวนเต็ม
    Restaurant.getById(restaurantId, (err, data) => {
        if (err) {
            if (err.kind === 'not_found') {
                res.status(404).send({
                    message: `Restaurant not found with this id ${restaurantId}`,
                });
            }
            else {
                res.status(500).send({
                    message: "Error retriveving with this id " + restaurantId,
                })
            }
        }
        else {
            res.send(data);
        }
    });
});


// Get all restaurants 
// http://localhost:5000/apis/restaurants
router.get('/restaurants', (req, res) => {
    Restaurant.getAll((err, data) => {
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
// http://localhost:5000/apis/restaurants/1 

router.put('/restaurants/:id', (req, res) => {
    const restaurantId = Number.parseInt(req.params.id);  //แปลงให้เป็นจำนวนเต็ม
    //เช็คว่า body เป็น object ไหม แล้วเป็นค่าว่างรึป่าว
    if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
        res.status(400).send({
            message: "Content Can not be empty!",
        });
    }

    Restaurant.updateById(restaurantId, new Restaurant(req.body), (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Restaurant not found with this id: ${restaurantId}`,
                });
            } else {
                res.status(500).send({
                    message: "Error updating restaurant data with this id" + restaurantId,
                });
            }
        } else {
            res.send(data);
        }
    });
});

//Delete by id
// http://localhost:5000/apis/restaurants/1 
router.delete('/restaurants/:id', (req, res) => {
    const restaurantId = Number.parseInt(req.params.id);  //แปลงให้เป็นจำนวนเต็ม
    //เช็คว่า body เป็น object ไหม แล้วเป็นค่าว่างรึป่าว
    Restaurant.removeById(restaurantId, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Restaurant not found with this id: ${restaurantId}`,
                });
            } else {
                res.status(500).send({
                    message: "Error deleting restaurant data with this id" + restaurantId,
                });
            }
        } else {
            res.send({ message: "Restaurant is deleted successfully" });
        }

    });
});
module.exports = router;