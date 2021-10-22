const add = async () => {
  const id = Number.parseInt(document.getElementById("id").value);      //เก็บค่าจาก input+คอนเวิดเป็นตัวเลข
  const name = document.getElementById("name").value;         //เก็บค่าจาก input
  const type = document.getElementById("type").value;
  const imgURL = document.getElementById("imgURL").value;
  if (name && type && imgURL) { //ตรวจสอบค่า ว่ามีค่าส่งมาไหม
    const params = { //set พารามิเตอร์
      // id: id,
      name: name,
      type: type,
      imgURL: imgURL,
    };
    try {
      const restaurant = await fetch( //ส่งไปยัง server
        "http://localhost:5000/apis/restaurants",
        {
          method: "POST",
          mode: "cors",
          cache: "no-cache",
          credentials: "same-origin",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(params), // เพิ่ม data
        }
      ).then((response) => {
        return response.json(); //คอนเวิดให้อยู่ในรูปแบบ json
      }).then(() => {
        alert(`เพิ่มข้อมูลร้านอาหารเรียบร้อยแล้ว`);
        window.location = './all_restaurant.html';
      });
    } catch (error) {
      alert(`เพิ่มข้อมูลร้านอาหารเรียบร้อยแล้ว`);
      window.location = './all_restaurant.html';
    }
  } else {
    alertalert("All fields are required!!");
  }
};