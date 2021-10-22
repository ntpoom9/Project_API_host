const init = async () => {
    const allRestuarants = await fetch(
        "http://localhost:5000/apis/restaurants", {
        method: "GET",
        mode: "cors",
        cache: "no-cache",
        credentials: "same-origin",
        headers: {
            "Content-Type": "application/json",
        },
    }).then((response) => response.json());
    allRestuarants.forEach((element) => addRestaurants(element));
}

const addRestaurants = (element) => {
    const item = document.createElement("div"); //สร้าง div
    item.className = "card"; //กำหนดชื่อ class
     
    //6-14 เป็นการกำหนด HTML มีการแทรก ข้อมูลลงไปด้วย
    const card = `    
    <img src="${element.imgURL}" class="card__img" alt="${element.name}">
    <div class="card-body">
      <h5 class="card-title">${element.name}</h5>
      <p class="card-text">${element.type}</p>
      <a href="#" class="btn btn-danger" onclick="deleteRestaurant(${element.id})">ลบ</a>
      <a href="edit_restaurant.html?id=${element.id}" class="btn btn-warning">แก้ไข</a>
    </div>
    `;
    item.innerHTML = card;  //เอาไปแทรกที่card ลงใน div
    const restaurantsElement = document.querySelector(".restaurants"); //เข้าถึง class หน้า HTML
    restaurantsElement.appendChild(item); //เพิ่มลงไป
}

const removeAllResult = () => {
    const restaurantsElement = document.querySelector(".restaurants");
    restaurantsElement.innerHTML = "";
}

const deleteRestaurant = async (id) => { //รับไอดีที่ส่งมา
    if (id) { //เช็ค id
        try {
            const restaurant = await fetch(
                "http://localhost:5000/apis/restaurants/" + id, { //ต่อไอดีที่ส่งมาจากการกำปุ่ม Delete 
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
                alert(`Restaurant id:${id} is Delete`); //แสดง alter ว่าลบแล้ว
                location.reload(); //load หน้าใหม่หลัง Delete
            }
            );
        } catch (error) {
            alert(`Restaurant id:${id} not found!!`);
        }
    } else {
        alert("Restaurant ID is missing")
    }
}