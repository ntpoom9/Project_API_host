const sql = require("./db");
//constructor
const Restaurant = function (restaurant) {  //ใช้ arrow function ไม่สามารถกำหนด คอนสเต็คเตอร์ได้
    //Attributes
    this.id = restaurant.id;
    this.name = restaurant.name;
    this.type = restaurant.type;
    this.imgURL = restaurant.imgURL;
};

//Method insert Data
Restaurant.create = (newRestaurant, result) => {
    //INSERT INTO restaurants SET id, name , type ,imageurl Values ("1","KFC","FastFood","url")
    sql.query("INSERT INTO restaurants SET ?", newRestaurant, (err, res) => {
        if (err) {
            console.log("error", err);
            result(err, null);
            return;
        }
        console.log("created restaurant:", { id: res.insertId, ...newRestaurant });
        result(null, { id: res.insertId, ...newRestaurant });
    })
};

//Getdata byId
Restaurant.getById = (restaurantId, result) => {
    //SELECT * FROM restaurants where id = restaurantId
    sql.query(`SELECT * FROM restaurants WHERE id = ${restaurantId}`,
        (err, res) => {
            if (err) {  //ถ้ามี error ค่าข้อมูลจะว่าง
                console.log("error ", err);
                result(err, null);
                return;
            }
            if (res.length) { //ถ้าหากเจอข้อมูล
                result(null, res[0]); //ส่งข้อมูล array ตำแหน่งที่ 1 กลับมา
                return;
            }
            //restaurant not found  with this Id
            result({ kind: "not_found" }, null);
        }
    );
};

Restaurant.getAll = (result) => {
    // SELECT * FROM restaurants  
    sql.query(" SELECT * FROM restaurants", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        result(null, res);
    });
};

Restaurant.updateById = (id, restaurant, result) => {
    //Update restaurants SET "name = ? , thpe =?. imgURL=? where id=?"

    sql.query("Update restaurants SET name = ? , type =?, imgURL=? WHERE id=?",
        [restaurant.name, restaurant.type, restaurant.imgURL, id],
        (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(err, null);
                return;
            }

            if (res.affectedRows == 0) {
                result({ kind: "not_found" }, null);
                return;
            }

            //เช็คแล้วพ้น ก็ อัพเดท
            result(null, { id: id, ...restaurant });
        }
    );

};

Restaurant.removeById = (id, result) => {
    //DELETE FROM restaurants WHERE id=?
    sql.query("DELETE FROM restaurants WHERE id=?", id, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.affectedRows == 0) {
            result({ kind: "not_found" }, null);
            return;
        }

        console.log("Deleted restaurant with id: ", id);
        result(null, res);
    });
};

Restaurant.removeAll = () => {

};

module.exports = Restaurant;