const init = async () => {
    //ดึง id || query string มา จาก URL
    let params = new URL(document.location).searchParams;
    let id = params.get("id");
    if (id) {
        try {
            const restaurants = await fetch("http://localhost:5000/apis/restaurants/" + id,
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
            });
            //set ค่าสำหรับ ที่จะแก้ฏ
            document.getElementById("id").value = restaurants.id;
            document.getElementById("name").value = restaurants.name;
            document.getElementById("type").value = restaurants.type;
            document.getElementById("imgURL").value = restaurants.imgURL;
            //ลองเอารูปอกมา
            // const item = document.createElement("img");
            // item.className = "imgURL";
            // item.src = restaurants.imgURL;
        } catch (error) {
            alert(`Restaurants ID:${id} not found`)
        }
    } else {
        // alert(`Restaurants ID is missing`);
    }
};

// แก้ไขข้อมูล อัพเดทข้อมูลใหม่
const edit = async () => {
    const id = document.getElementById("id").value;
    if (id) {
        const params = {
            // id: document.getElementById("id").value,
            name: document.getElementById("name").value,
            type: document.getElementById("type").value,
            imgURL: document.getElementById("imgURL").value,
        };

        const restaurants = await fetch("http://localhost:5000/apis/restaurants/" + id,
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
            alert(`Restaurants ID:${id}is updated!`);
        });
    }
    else {
        // alert(`Restaurants ID is missing!`);
    }
}

init();
edit();