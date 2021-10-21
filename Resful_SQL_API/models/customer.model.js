const sql = require("./db");
//constructor
const Customer = function (customer) {  //ใช้ arrow function ไม่สามารถกำหนด คอนสเต็คเตอร์ได้

    //Attributes customer
    this.customer_id = customer.customer_id;
    this.customer_name = customer.customer_name;
    this.phonenumber = customer.phonenumber;
    this.email = customer.email;
    this.address = customer.address;


};

//Method insert Data
Customer.create = (newCustomer, result) => {
    //INSERT INTO customer SET id, name , type ,imageurl Values ("1","KFC","FastFood","url")
    sql.query("INSERT INTO customer SET ?", newCustomer, (err, res) => {
        if (err) {
            console.log("error", err);
            result(err, null);
            return;
        }
        console.log("created customer:", { customer_id: res.insertId, ...newCustomer });
        result(null, { customer_id: res.insertId, ...newCustomer });
        // console.log("created customer:", { customer_name: res.insertName, ...newCustomer });
        // result(null, { customer_name: res.insertName, ...newCustomer });
    })
};

//Getdata byId
Customer.getById = (CustomerId, result) => {
    //SELECT * FROM customer where customer_id = CustomerId
    sql.query(`SELECT * FROM customer WHERE customer_id = ${CustomerId}`,
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

Customer.getAll = (result) => {
    // SELECT * FROM customer  
    sql.query(" SELECT * FROM customer", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        result(null, res);
    });
};

Customer.updateById = (customer_id, customer, result) => {
    //Update customer SET "name = ? , thpe =?. imgURL=? where customer_id=?"

    sql.query("UPDATE customer SET customer_name=?,phonenumber=?,email=?,address=? WHERE customer_id=?",
        [customer.customer_name, customer.phonenumber, customer.email, customer.address, customer_id],
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
            result(null, { customer_id: customer_id, ...customer });
        }
    );

};

Customer.removeById = (customer_id, result) => {
    //DELETE FROM customer WHERE customer_id=?
    sql.query("DELETE FROM customer WHERE customer_id=?", customer_id, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.affectedRows == 0) {
            result({ kind: "not_found" }, null);
            return;
        }

        console.log("Deleted customer with id: ", customer_id);
        result(null, res);
    });
};

Customer.removeAll = () => {

};

module.exports = Customer;