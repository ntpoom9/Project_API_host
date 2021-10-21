//แก้ไข ข้อมูล ผ่าน API(Postman)
const editRestaurants = async (id) => {
    if (id) {
        try {
            const restaurants = await fetch("http://localhost:5000/apis/restaurants/" + id,
                {
                    method: "PUT",
                    mode: "cors",
                    cache: "no-cache",
                    credentials: "same-origin",
                    headers: {
                        "Content-Type": "application/json",
                    },
                }).then((response) => {
                    return response.json();
                }).then(() => {
                    alert(`แก้ไขข้อมูลของ id:${id} เรียบร้อย`)
                    location.reload();
                });

        } catch (error) {
            alert(`ไม่มี id:${id}`)
        }
    } else {
        alert("ไม่มี id นะ")
    }
};


//ลบ ข้อมูล
const deleteRestaurants = async (id) => {
    if (id) {
        try {
            const restaurants = await fetch("http://localhost:5000/apis/restaurants/" + id,
                {
                    method: "DELETE",
                    mode: "cors",
                    cache: "no-cache",
                    credentials: "same-origin",
                    headers: {
                        "Content-Type": "application/json",
                    },
                }).then((response) => {
                    return response.json();
                }).then(() => {
                    alert(`ลบ id:${id} ลบแล้วจ้า`)
                    location.reload();
                });

        } catch (error) {
            alert(`ไม่มี id:${id}`)
        }
    } else {
        alert("ไม่มี id นะ ius")
    }
};

//สร้าง div card สำหรับนำข้อมูลมาโชว์
const add = (element) => {
    const item = document.createElement("div");
    item.className = "card";
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
    item.innerHTML = card;
    const customerElement = document.querySelector(".customer");
    customerElement.appendChild(item);


}

// ลบรูปเก่าที่ค้นหา
const removePre = () => {
    const customerElement = document.querySelector(".customer");
    customerElement.innerHTML = "";

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
        console.log(result);

        //ใช้ forEach ส่ง element ไป ในmetthod เพื่อสร้างข้อมูลออกมา
        removePre();
        result.forEach((element) => add(element));
    }
}

const main = () => {
    const inputElement = document.querySelector("#search")
    inputElement.addEventListener("keydown", searchCustomer)

};

main();
