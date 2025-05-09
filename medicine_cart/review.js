let op_list = [
    {
        id: "123441",
        name: "安俞真"
    },
    {
        id: "12342341",
        name: "方大同"
    },
    {
        id: "12341541",
        name: "李永知"
    },
    {
        id: "1234513241",
        name: "周傳雄"
    },
    {
        id: "112323441",
        name: "孫協志"
    },
];
let time_list = [
    {
        time: "13:32",
    },
    {
        time: "13:32",
    },
    {
        time: "13:32",
    },
    {
        time: "13:32",
    },
    {
        time: "13:32",
    },
    {
        time: "13:32",
    },
]
let fake_review_data;
async function display_revise_func() {
    func_display_init();
    let function_display_container = document.querySelector(".function_display_container");

    let review_search_container = document.createElement("div");
    review_search_container.classList.add("review_search_container");

    let today = new Date();
    let day = String(today.getDate()).padStart(2, '0');
    let month = String(today.getMonth() + 1).padStart(2, '0'); // 一月是0
    let year = today.getFullYear();

    // 格式化日期為 YYYY-MM-DD
    today = year + '-' + month + '-' + day;

    let rs_date_input = document.createElement("input");
    rs_date_input.id = "rs_date_input";
    rs_date_input.type = "date";
    rs_date_input.value = today;
    rs_date_input.max = today;
    rs_date_input.addEventListener("change", async () => {
        let op_list_post_data = {
            ValueAry:[current_cart.phar, current_cart.hnursta, rs_date_input.value]
        }
        op_list = await get_opid_by_time(op_list_post_data);
        op_list = op_list.Data;
        console.log("這邊給出操作人清單");
        rs_op_select.innerHTML = `
            <option value="">請選擇操作人</option>
        `;
        op_list.forEach(element => {
            rs_op_select.innerHTML += `
                <option value="${element.op_id}">${element.op_name}</option>
            `;
        });
        rs_time_select.innerHTML = `
            <option value="">尚未選取操作人</option>
        `
    });

    let op_list_post_data = {
        ValueAry:[current_cart.phar, current_cart.hnursta, today]
    }
    op_list = await get_opid_by_time(op_list_post_data);
    op_list = op_list.Data;

    let rs_op_select = document.createElement("select");
    rs_op_select.id = "rs_op_select";
    rs_op_select.innerHTML = `<option value="">請選擇操作人</option>`;
    op_list.forEach(element => {
        rs_op_select.innerHTML += `
            <option value="${element.op_id}">${element.op_name}</option>
        `;
    });
    rs_op_select.addEventListener("change", async () => {
        if(rs_op_select.value == "") {
            rs_time_select.innerHTML = `
                <option value="">尚未選取操作人</option>
            `;
            return;
        }
        let loggedID = sessionStorage.getItem('login_json'); 
        loggedID = JSON.parse(loggedID);
        let time_list_post_data = {
            Data: [
                {
                "pharm":current_cart.phar,
                "nurnum":current_cart.hnursta,
                "op_id": rs_op_select.value,
                "op_time": today
                }
            ]
        };
        time_list = await get_time_by_op_id(time_list_post_data);
        time_list = time_list.Data;
        rs_time_select.innerHTML = `<option value="">選取操作時間</option>`;
        time_list.forEach(element => {
            rs_time_select.innerHTML += `<option value="${element.op_time}">${element.op_time}</option>`;
        });
    });

    let rs_time_select = document.createElement("select");
    rs_time_select.id = "rs_time_select";
    rs_time_select.innerHTML = `<option value="">尚未選取操作人</option>`;
    rs_time_select.addEventListener("change", async () => {
        if(rs_time_select.value == "") return;
        let post_data = {
            Data: [
                {
                    "pharm":current_cart.phar,
                    "nurnum":current_cart.hnursta,
                    "op_id": rs_op_select.value,
                    "op_time": `${today}T${rs_time_select.value}`
                }
            ]
        }
        fake_review_data = await get_logtime_by_opid(post_data);
        fake_review_data = fake_review_data.Data;
        set_review_display_list(fake_review_data);
    });

    review_search_container.appendChild(rs_date_input);
    review_search_container.appendChild(rs_op_select);
    review_search_container.appendChild(rs_time_select);

    let review_search_result_container = document.createElement("div");
    review_search_result_container.classList.add("review_search_result_container");

    function_display_container.appendChild(review_search_container);
    function_display_container.appendChild(review_search_result_container);
}
function set_review_display_list(array) {
    let review_search_result_container = document.querySelector(".review_search_result_container");
    review_search_result_container.innerHTML = "";

    array.forEach(element => {
        let patient_bed_card = document.createElement("table");
        patient_bed_card.classList.add("patient_bed_card");
        patient_bed_card.innerHTML = `
            <tr>
                <td colspan="5" class="review_table_title">${element.nurnum}-${element.bednum}</td>
            </tr>
            <tr>
                <th>藥碼</th>
                <th>藥名</th>
                <th>中文名</th>
                <th>劑量</th>
                <th>單位</th>
            </tr>
        `;

        element["dispense_med"].forEach((item, index) => {
            if(index % 2 != 0) {
                if(item.cht_name != "" || item.cht_name != undefined) {
                    patient_bed_card.innerHTML += `
                        <tr class="review_tr_bgc">
                            <td class="review_td_0">${item.code}</td>
                            <td class="review_td_1">${item.name}</td>
                            <td class="review_td_2">${item.cht_name}</td>
                            <td class="review_td_3">${+item.qty}</td>
                            <td class="review_td_4">${item.dunit}</td>
                        </tr>
                    `;
                } else {
                    patient_bed_card.innerHTML += `
                        <tr class="review_tr_bgc">
                            <td class="review_td_0">${item.code}</td>
                            <td class="review_td_1">${item.name}</td>
                            <td class="">無</td>
                            <td class="review_td_3">${+item.qty}</td>
                            <td class="review_td_4">${item.dunit}</td>
                        </tr>
                    `;
                }
            } else {
                if(item.cht_name != "" || item.cht_name != undefined) {
                    patient_bed_card.innerHTML += `
                        <tr>
                            <td class="review_td_0">${item.code}</td>
                            <td class="review_td_1">${item.name}</td>
                            <td class="review_td_2">${item.cht_name}</td>
                            <td class="review_td_3">${+item.qty}</td>
                            <td class="review_td_4">${item.dunit}</td>
                        </tr>
                    `;
                } else {
                    patient_bed_card.innerHTML += `
                        <tr>
                            <td class="review_td_0">${item.code}</td>
                            <td class="review_td_1">${item.name}</td>
                            <td class="">無</td>
                            <td class="review_td_3">${+item.qty}</td>
                            <td class="review_td_4">${item.dunit}</td>
                        </tr>
                    `;
                }
            }
        });

        review_search_result_container.appendChild(patient_bed_card);
    });
}