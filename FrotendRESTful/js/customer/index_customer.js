// แก้ไขข้อมูล อัพเดทข้อมูลใหม่
const edit = async () => {
    const customer_id = document.getElementById("customer_id").value;
    if (customer_id) {
        const params = {
            // id: document.getElementById("id").value,
            customer_name: document.getElementById("customer_name").value,
            phonenumber: document.getElementById("phonenumber").value,
            email: document.getElementById("email").value,
            address: document.getElementById("address").value,
        };

        const customer = await fetch("http://localhost:5000/apis/customer/" + customer_id,
            {
                method: "PUT",
                mode: "cors",
                cache: "no-cache",
                credentials: "same-origin",
                headers: {
                    "Content-Type": "application/json",
                },
                //เพิ่ม body แปลง json เป็น text เข้าไปใน DB
                body: JSON.stringify(params),
            }
        ).then((response) => {
            return response.json();
        }).then(() => {
            alert(`อัพเดทข้อมูลผู้ใช้ ไอดีผู้ใช้ที่ ${customer_id} เรียบร้อยแล้ว!`);
            window.location = './all_customer.html';
        });
    }
    else {
        // alert(`customer ID is missing!`);
    }
}

//ลบ ข้อมูล
const deleteCustomer = async (customer_id) => { //รับไอดีที่ส่งมา
    if (customer_id) { //เช็ค customer_id
        try {
            const restaurant = await fetch(
                "http://localhost:5000/apis/customer/" + customer_id, { //ต่อไอดีที่ส่งมาจากการกำปุ่ม Delete 
                method: "DELETE",          //DELETE
                mode: "cors",
                cache: "no-cache",               //6-8 บอกว่า server อยู่ที่เดียวกัน
                credentals: "same-origin",
                headers: {
                    "Content-type": "application/json"  //ข้อมุลอยู่ในรูปแบบ json
                },
            }).then((response) => {
                return response.json();  //ส่งค่าในรูปแบบ json
            }).then(() => {
                alert(`ลบข้อมูลผู้ใช้ ไอดีที่ ${customer_id} เรียบร้อยแล้ว`); //แสดง alter ว่าลบแล้ว
                location.reload(); //load หน้าใหม่หลัง Delete
            }
            );
        } catch (error) {
            alert(`Customer customer_id:${customer_id} not found!!`);
        }
    } else {
        alert("Customer customer_id is missing")
    }
}

//สร้าง div card สำหรับนำข้อมูลมาโชว์
const addCustomerByName = (element) => {
    const item = document.createElement("div"); //สร้าง div
    item.className = "card"; //กำหนดชื่อ class
    const card = `    
    <div class="card-body">
      <h5 class="card-title">ชื่อผู้ใช้ : ${element.customer_name}</h5>
      <div class="content-data">
      <p class="topic-cus">เบอร์โทร : <span class="content-cus">${element.phonenumber}</span></p>
      <p class="topic-cus">อีเมล : <span class="content-cus">${element.email}</span></p>
      <p class="topic-cus">ที่อยู่ : <span class="content-cus">${element.address}</span></p>
      </div>
      

      <a href="#" class="btn btn-danger" onclick="deleteCustomer(${element.customer_id})">ลบข้อมูล</a>
      <a href="edit_customer.html?customer_id=${element.customer_id}" class="btn btn-warning">แก้ไขข้อมูล</a>
    </div>
    `;
    item.innerHTML = card;  //เอาไปแทรกที่card ลงใน div
    const customerElement = document.querySelector(".customer"); //เข้าถึง class หน้า HTML
    customerElement.appendChild(item); //เพิ่มลงไป


}

// ลบรูปเก่าที่ค้นหา
const removePreCustomer = () => {
    const restaurantsElement = document.querySelector(".customer");
    restaurantsElement.innerHTML = "";

}
//ค้นหารูป
const searchCustomer = async (event) => {

    const keyword = event.target.value;

    if (event.key === "Enter" && keyword) {
        const allCustomer = await fetch('http://localhost:5000/apis/customer',
            {
                method: "GET",
                mode: "cors",
                cache: "no-cache",
                credentials: "same-origin",
                headers: {
                    "Content-Type": "application/json",
                },
            }
        ).then((response) => {
            return response.json();
        }
        );
        console.log(keyword);
        // console.log(allCustomer);

        // ค้นหา 2 อย่าง จากคำที่พิมมา
        const result = allCustomer.filter(
            (item) => item.customer_name.includes(keyword)
        );
        // console.log(result);

        //ใช้ forEach ส่ง element ไป ในmetthod เพื่อสร้างข้อมูลออกมา
        removePreCustomer();
        result.forEach((element) => addCustomerByName(element));
    }
}

const main = () => {
    const inputElement = document.querySelector("#search")
    inputElement.addEventListener("keydown", searchCustomer)

};

main();
