const init = async () => {
    //ดึง id || query string มา จาก URL
    let params = new URL(document.location).searchParams;
    let customer_id = params.get("customer_id");
    if (customer_id) {
        try {
            const customer = await fetch("http://localhost:5000/apis/customer/" + customer_id,
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
            document.getElementById("customer_id").value = customer.customer_id;
            document.getElementById("customer_name").value = customer.customer_name;
            document.getElementById("phonenumber").value = customer.phonenumber;
            document.getElementById("email").value = customer.email;
            document.getElementById("address").value = customer.address;

            //ลองเอารูปอกมา
            // const item = document.createElement("img");
            // item.className = "imgURL";
            // item.src = customer.imgURL;

        } catch (error) {
            alert(`customer ID:${customer_id} not found`)
        }
    } else {
        // alert(`customer ID is missing`);
    }
};

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

init();
edit();