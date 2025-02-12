async function merge_page_init(data) {
    let records_data = await get_all_records();
    let combine_data = await get_combine_list();
    console.log("combine_data", combine_data);

    let header_title_text = document.querySelector("#header_title_text")
    header_title_text.innerHTML = "合併單設置"

    console.log(data);
    const main_div = document.querySelector('#main_div');
    main_div.innerHTML = "";

    const main_div_container = document.createElement("div")
    main_div_container.classList.add("main_div_container")
    main_div.appendChild(main_div_container)

    // 合併單選擇、新增、刪除
    const main_div_header_container = document.createElement("div")
    main_div_header_container.classList.add('main_div_header_container')
    main_div_container.appendChild(main_div_header_container)

    const header_merge_select_div = document.createElement("div")
    header_merge_select_div.classList.add("header_merge_select_div")
    main_div_header_container.appendChild(header_merge_select_div)

    const header_merge_select_label = document.createElement("div")
    header_merge_select_label.classList.add("header_merge_select_label")
    header_merge_select_label.innerHTML = '請選擇合併單'
    header_merge_select_div.appendChild(header_merge_select_label)

    const header_merge_select_select = document.createElement("select")
    header_merge_select_select.classList.add("header_merge_select_select")
    header_merge_select_select.innerHTML += '<option value="">請選擇合併單</option>'
    combine_data['Data'].forEach(element => {
        header_merge_select_select.innerHTML += `
            <option id="${element.INV_NAME}" value="${element.INV_SN}">${element.INV_NAME}</option>
        `
    });
    header_merge_select_div.appendChild(header_merge_select_select)

    const header_new_del_container = document.createElement("div")
    header_new_del_container.classList.add("header_new_del_container")
    main_div_header_container.appendChild(header_new_del_container)

    const header_new_button = document.createElement("div")
    header_new_button.classList.add("header_new_button")
    header_new_button.innerHTML = '新增合併單'
    header_new_del_container.appendChild(header_new_button)
    header_new_button.addEventListener("click", () => {
        let popup_merge_create_container = document.querySelector(".popup_merge_create_container").parentElement
        popup_merge_create_container.style.display = "block";
        popup_merge_create_container.style.opacity = "1" ;
        popup_merge_create_container.style.visibility  = "visible";
    })

    const header_del_button = document.createElement("div")
    header_del_button.classList.add("header_del_button")
    header_del_button.innerHTML = '刪除合併單'
    header_del_button.addEventListener("click", async () => {
        delete_combine_list(combine_data["Data"]);
    })
    header_new_del_container.appendChild(header_del_button)

    // 合併單細節展示
    const merge_display_container = document.createElement("div")
    merge_display_container.classList.add("merge_display_container")
    main_div_container.appendChild(merge_display_container)

    const merge_display_header_container = document.createElement("div")
    merge_display_header_container.classList.add("merge_display_header_container")
    merge_display_container.appendChild(merge_display_header_container)

    const merge_display_header_left_container = document.createElement("div")
    merge_display_header_left_container.classList.add("merge_display_header_left_container")
    merge_display_header_container.appendChild(merge_display_header_left_container)

    const merge_display_header_name = document.createElement("div")
    merge_display_header_name.classList.add("merge_display_header_name")
    merge_display_header_name.innerHTML = ``
    merge_display_header_left_container.appendChild(merge_display_header_name)
    
    const merge_display_header_lists_count = document.createElement("div")
    merge_display_header_lists_count.classList.add("merge_display_header_lists_count")
    merge_display_header_lists_count.innerHTML = ``
    merge_display_header_left_container.appendChild(merge_display_header_lists_count)

    const merge_add_button = document.createElement("div")
    merge_add_button.classList.add("merge_add_button")
    merge_add_button.innerHTML = "加入合併單"
    merge_display_header_container.appendChild(merge_add_button)

    merge_add_button.addEventListener("click", () => {
        let header_merge_select_select = document.querySelector(".header_merge_select_select");
        if(header_merge_select_select.value == "") {
            alert("請先選擇合併單");
        } else {
            let popup_merge_add_container = document.querySelector(".popup_merge_add_container").parentElement
            popup_merge_add_container.style.display = "block";
            popup_merge_add_container.style.opacity = "1" ;
            popup_merge_add_container.style.visibility  = "visible";
        }
    })

    const merge_display_table_container = document.createElement("table")
    merge_display_table_container.classList.add("merge_display_table_container")
    merge_display_container.appendChild(merge_display_table_container)

    const merge_display_table_thead = document.createElement("thead")
    merge_display_table_thead.classList.add("merge_display_table_thead")
    merge_display_table_container.appendChild(merge_display_table_thead)
    merge_display_table_thead.innerHTML = `
        <tr>
            <th class="merge_display_table_thead_1">項次</th>
            <th class="merge_display_table_thead_2">類別</th>
            <th class="merge_display_table_thead_3">單號</th>
            <th class="merge_display_table_thead_4">名稱</th>
            <th class="merge_display_table_thead_5"></th>
            <th class="merge_display_table_thead_6"></th>
        </tr>
    `

    const merge_display_table_tbody = document.createElement("tbody")
    merge_display_table_tbody.classList.add("merge_display_table_tbody")
    merge_display_table_container.appendChild(merge_display_table_tbody)
    merge_display_table_tbody.innerHTML = `
        <tr>
            <td class="" colspan="6">請先選擇合併單</td>
        </tr>
    `

    const merge_display_foot_container = document.createElement("div")
    merge_display_foot_container.classList.add("merge_display_foot_container")
    merge_display_container.appendChild(merge_display_foot_container)

    const merge_display_foot_left_div = document.createElement("div")
    merge_display_foot_left_div.classList.add("merge_display_foot_left_div")
    merge_display_foot_container.appendChild(merge_display_foot_left_div)

    const foot_left_button = document.createElement("div")
    foot_left_button.classList.add("foot_left_button")
    foot_left_button.classList.add("button_style")
    foot_left_button.innerHTML = "完成定盤"
    // merge_display_foot_left_div.appendChild(foot_left_button)

    const merge_display_foot_right_div = document.createElement("div")
    merge_display_foot_right_div.classList.add("merge_display_foot_right_div")
    merge_display_foot_container.appendChild(merge_display_foot_right_div)

    const foot_right_button_1 = document.createElement("div")
    foot_right_button_1.classList.add("foot_right_button_1")
    foot_right_button_1.classList.add("button_style")
    foot_right_button_1.innerHTML = "創建覆盤單"
    // merge_display_foot_right_div.appendChild(foot_right_button_1)

    const foot_right_button_2 = document.createElement("div");
    foot_right_button_2.classList.add("foot_right_button_2");
    foot_right_button_2.classList.add("button_style");
    foot_right_button_2.innerHTML = "合併單匯出";
    foot_right_button_2.addEventListener("click", async() => {
        showLoadingPopup();
        await inv_download_combine_list();
        hideLoadingPopup();
    });
    merge_display_foot_right_div.appendChild(foot_right_button_2)

    header_merge_select_select.addEventListener('change', async() => {
        if(header_merge_select_select.value == "") {
            merge_display_header_name.innerHTML = ``;
            merge_display_header_lists_count.innerHTML = ``;
            merge_display_table_tbody.innerHTML = `
                <tr>
                    <td class="" colspan="6">請先選擇合併單</td>
                </tr>
            `
        } else {
            console.log(header_merge_select_select.value);
            combine_data["Data"].forEach(item => {
                if(item.INV_SN == header_merge_select_select.value) {
                    merge_display_header_name.innerHTML = `${item.INV_NAME}`;
                    merge_display_header_lists_count.innerHTML = `合併數量 : ${item["records_Ary"].length}`;
                    merge_display_table_tbody.innerHTML = "";
                    if (item['records_Ary'].length == 0) {
                        merge_display_table_tbody.innerHTML = ` 
                            <tr>
                                <td class="" colspan="6">目前合併單沒有加入任何單據</td>
                            </tr>
                        `;
                    } else {
                        item['records_Ary'].forEach((e, index) => {
                            merge_display_table_tbody.innerHTML += `
                                <tr>
                                    <td class="">${index + 1}</td>
                                    <td class="">${e.TYPE}</td>
                                    <td class="">${e.SN}</td>
                                    <td class="">${e.NAME}</td>
                                    <td>
                                        <div class="merge_display_button" SN="${e.SN}" INV_SN="${header_merge_select_select.value}">匯出</div>
                                    </td>
                                    <td class="">
                                        <div class="merge_delete_button" SN="${e.SN}" INV_SN="${header_merge_select_select.value}">刪除</div>
                                    </td>
                                </tr>
                            `
                        });

                        let merge_display_button = document.querySelectorAll('.merge_display_button');
                        merge_display_button.forEach(e => {
                            e.addEventListener("click", async(item) => {
                                inv_download_record(item.target);
                            });
                        });

                        let merge_delete_button = document.querySelectorAll('.merge_delete_button');
                        merge_delete_button.forEach(e => {
                            e.addEventListener("click", async(item) => {
                               await delete_record(item.target);
                            });
                        });
                    }
                }
            })
        }
    })

    // 彈窗加入選擇單子種類後顯示清單
    let merge_add_type_select = document.querySelector('.merge_add_type_select');
    merge_add_type_select.addEventListener("change", async() => {
        let combine_data = await get_combine_list();
        combine_data = combine_data["Data"];
        let temp_combine_data = {};
        combine_data.forEach(e => {
            temp_combine_data[e.INV_SN] = e;
        })
        let header_merge_select_select = document.querySelector(".header_merge_select_select");
        let temp_compare_data = {};
        temp_combine_data[header_merge_select_select.value]['records_Ary'].forEach(item => {
            temp_compare_data[item.SN] = item
        })
        let merge_add_list_select = document.querySelector('.merge_add_list_select');
        let records_data = await get_all_records();
        if (merge_add_type_select.value == "") {
            merge_add_list_select.innerHTML = '<option value="" disabled>單號 / 名稱</option>';
            return;
        } else {
            let temp_arr = records_data["Data"].filter((e) => {
                return e.TYPE === merge_add_type_select.value;
            });
            if(temp_arr.length > 0) {
                merge_add_list_select.innerHTML = '';
                temp_arr.forEach(e => {
                    if(temp_compare_data[e.SN]) {
                        merge_add_list_select.innerHTML += `<option value="${e.SN}" disabled>${e.NAME}</option>`;
                    } else {
                        merge_add_list_select.innerHTML += `<option value="${e.SN}">${e.NAME}</option>`;
                    }
                })
                return;
            }
            merge_add_list_select.innerHTML = `<option value="" disabled>目前${merge_add_type_select.value}沒有單子</option>`;
        }
    });
    await get_merge_search_input_result(records_data, combine_data);
}

// 新增合併單彈窗
function popup_merge_create() {
    const popup_merge_create_div = new Basic_popup_Div('popup_merge_create_container','popup_merge_create_container','','')

    let popup_merge_create_container = document.querySelector(".popup_merge_create_container")
    popup_merge_create_container.innerHTML = `
        <div class="merge_create_container">
            <label for="merge_create">請輸入合併單名稱</label>
            <input type="text" id="merge_create_name">
            <div class="merge_create_button">送出</div>
        </div>
    `

    popup_merge_create_div.Set_Visible(false);

    const close_merge_create_button = document.createElement('div');
    close_merge_create_button.classList.add('close_merge_create_button')
    close_merge_create_button.innerHTML = `<img src="../../image/close.png" alt="">`
    close_merge_create_button.addEventListener('click', () => {
        popup_merge_create_div.Set_Visible(false)
    })
    let merge_create_button = document.querySelector(".merge_create_button");
    merge_create_button.addEventListener('click', async() => {
        let merge_create_name = document.querySelector("#merge_create_name");
        if(merge_create_name.value == "") {
            alert("請輸入合併單名稱!");
            return;
        }

        let temp_INV_SN = await get_new_IC_SN();
        let temp_arr = "[]";
        console.log(temp_INV_SN.Value);
        await inv_creat_update(merge_create_name.value, temp_INV_SN.Value, get_logedName(), temp_arr);

        // 重製畫面
        let combine_data = await get_combine_list();
        let header_merge_select_select = document.querySelector(".header_merge_select_select")
        header_merge_select_select.innerHTML = '<option value="">請選擇合併單</option>'
        combine_data['Data'].forEach(element => {
            header_merge_select_select.innerHTML += `
                <option id="${element.INV_NAME}" value="${element.INV_SN}">${element.INV_NAME}</option>
            `
        });
        header_merge_select_select.value = "";
        popup_merge_create_div.Set_Visible(false);
        merge_create_name.value = "";

        let merge_display_header_name = document.querySelector(".merge_display_header_name");
        let merge_display_header_lists_count = document.querySelector(".merge_display_header_lists_count");
        let merge_display_table_tbody = document.querySelector(".merge_display_table_tbody");

        merge_display_header_name.innerHTML = ``;
        merge_display_header_lists_count.innerHTML = ``;
        merge_display_table_tbody.innerHTML = `
            <tr>
                <td class="" colspan="6">請先選擇合併單</td>
            </tr>
        `
        header_merge_select_select.addEventListener('change', async() => {
            let merge_display_header_name = document.querySelector(".merge_display_header_name");
            let merge_display_header_lists_count = document.querySelector(".merge_display_header_lists_count");
            let merge_display_table_tbody = document.querySelector(".merge_display_table_tbody");

            if(header_merge_select_select.value == "") {
                merge_display_header_name.innerHTML = ``;
                merge_display_header_lists_count.innerHTML = ``;
                merge_display_table_tbody.innerHTML = `
                    <tr>
                        <td class="" colspan="6">請先選擇合併單</td>
                    </tr>
                `
            } else {
                combine_data["Data"].forEach(item => {
                    if(item.INV_SN == header_merge_select_select.value) {
                        merge_display_header_name.innerHTML = `${item.INV_NAME}`;
                        merge_display_header_lists_count.innerHTML = `合併數量 : ${item["records_Ary"].length}`;
                        merge_display_table_tbody.innerHTML = "";
                        if (item['records_Ary'].length == 0) {
                            merge_display_table_tbody.innerHTML = ` 
                                <tr>
                                    <td class="" colspan="6">目前合併單沒有加入任何單據</td>
                                </tr>
                            `;
                        } else {
                            item['records_Ary'].forEach((e, index) => {
                                merge_display_table_tbody.innerHTML += `
                                    <tr>
                                        <td class="">${index + 1}</td>
                                        <td class="">${e.TYPE}</td>
                                        <td class="">${e.SN}</td>
                                        <td class="">${e.NAME}</td>
                                        <td>
                                            <div class="merge_display_button" SN="${e.SN}" INV_SN="${header_merge_select_select.value}">匯出</div>
                                        </td>
                                        <td class="">
                                            <div class="merge_delete_button" SN="${e.SN}" INV_SN="${header_merge_select_select.value}">刪除</div>
                                        </td>
                                    </tr>
                                `
                            })

                            let merge_display_button = document.querySelectorAll('.merge_display_button');
                            merge_display_button.forEach(e => {
                                e.addEventListener("click", async(item) => {
                                    inv_download_record(item.target);
                                });
                            });

                            let merge_delete_button = document.querySelectorAll('.merge_delete_button');
                            merge_delete_button.forEach(e => {
                                e.addEventListener("click", async(item) => {
                                await delete_record(item.target);
                                });
                            });
                        }
                    }
                })
            }
        })
    })

    popup_merge_create_container.appendChild(close_merge_create_button)
}

// 加入合併單彈窗
async function popup_merge_add() {
    const popup_merge_add_div = new Basic_popup_Div('popup_merge_add_container','popup_merge_add_container','','');
    let popup_merge_add_container = document.querySelector(".popup_merge_add_container");
    const merge_add_container = document.createElement("div");
    merge_add_container.classList.add("merge_add_container");
    popup_merge_add_container.appendChild(merge_add_container);

    const merge_add_type_select = document.createElement("select");
    merge_add_type_select.classList.add("merge_add_type_select");
    merge_add_type_select.innerHTML = `
        <option value="">請選擇種類</option>
        <option value="盤點單">盤點單</option>
        <option value="消耗單">消耗單</option>
        <option value="覆盤單">覆盤單</option>
    `;
    merge_add_container.appendChild(merge_add_type_select);

    const merge_add_list_select = document.createElement("select");
    merge_add_list_select.classList.add("merge_add_list_select");
    merge_add_list_select.innerHTML = `<option value="" disabled>單號 / 名稱</option>`;
    merge_add_list_select.style.display = "none";
    merge_add_container.appendChild(merge_add_list_select);
    
    
    // 測試新搜尋方式
    const merge_add_list_input_div = document.createElement("div");
    merge_add_list_input_div.classList.add("merge_add_list_input_div");

    const merge_add_list_input = document.createElement("input");
    merge_add_list_input.id = "merge_add_list_input";
    merge_add_list_input.type = "text";
    merge_add_list_input.autocomplete = "off";
    merge_add_list_input.addEventListener("blur", () => {
        setTimeout(() => {
            let merge_add_list_input_result_container = document.querySelector(".merge_add_list_input_result_container");
            merge_add_list_input_result_container.style.display = "none";
        }, 200);
    });
    merge_add_list_input.addEventListener("focus", () => {
        let merge_add_list_input_result_container = document.querySelector(".merge_add_list_input_result_container");
        merge_add_list_input_result_container.style.display = "block";
    });
    merge_add_list_input.addEventListener("keydown", (event) => {
        if(event.key === 'Enter') {
            if(pp_input_select_index != -1) {
                let input_current_result_div = document.querySelector(".input_current_result_div");
                let merge_add_list_select = document.querySelector(".merge_add_list_select");
                let temp_sn = input_current_result_div.getAttribute("sn");
                merge_add_list_select.value = temp_sn;
                merge_add_list_input.value = input_current_result_div.getAttribute("name");
                merge_add_list_input.blur();
            } else {
                let input_result_div = document.querySelectorAll(".input_result_div");
                if(input_result_div.length < 2) {
                    if(input_result_div[0].getAttribute("sn") == undefined || input_result_div[0].getAttribute("sn") == "") {
                        alert("查無此單");
                        merge_add_list_input.blur();
                    } else {
                        let merge_add_list_select = document.querySelector(".merge_add_list_select");
                        let temp_sn = input_result_div[0].getAttribute("sn");
                        merge_add_list_select.value = temp_sn;
                        merge_add_list_input.value = input_result_div[0].getAttribute("name");
                        merge_add_list_input.blur();
                    }
                }
            }
        } else if(event.key === 'ArrowUp') {
            let input_result_div = document.querySelectorAll(".input_result_div");
            if(input_result_div.length > 0 && pp_input_select_index > -1) {
                pp_input_select_index -= 1;
                input_result_div.forEach(element => {
                    element.classList.remove("input_current_result_div");
                });
                input_result_div[pp_input_select_index].classList.add('input_current_result_div');
            }
        } else if(event.key === 'ArrowDown') {
            let input_result_div = document.querySelectorAll(".input_result_div");
            if(input_result_div.length > 0 && input_result_div.length - 1 > pp_input_select_index) {
                pp_input_select_index += 1;
                input_result_div.forEach(element => {
                    element.classList.remove("input_current_result_div");
                });
                input_result_div[pp_input_select_index].classList.add('input_current_result_div');
            }
        }
    });

    const merge_add_list_input_result_container = document.createElement("div");
    merge_add_list_input_result_container.classList.add("merge_add_list_input_result_container");

    merge_add_list_input_div.appendChild(merge_add_list_input);
    merge_add_list_input_div.appendChild(merge_add_list_input_result_container);

    merge_add_container.appendChild(merge_add_list_input_div);

    const merge_add_confirm_button = document.createElement("div");
    merge_add_confirm_button.classList.add("merge_add_confirm_button");
    merge_add_confirm_button.innerHTML = "加入";
    merge_add_container.appendChild(merge_add_confirm_button);
    merge_add_confirm_button.addEventListener('click',() => {
        add_record();
    })

    popup_merge_add_div.Set_Visible(false);

    const close_merge_add_button = document.createElement('div');
    close_merge_add_button.classList.add('close_merge_add_button');
    close_merge_add_button.innerHTML = `<img src="../../image/close.png" alt="">`;
    close_merge_add_button.addEventListener('click', () => {
        merge_add_type_select.value = "";
        merge_add_list_input.value = "";
        merge_add_list_select.innerHTML = `<option value="" disabled>單號 / 名稱</option>`;
        popup_merge_add_div.Set_Visible(false);
    });

    popup_merge_add_container.appendChild(close_merge_add_button);
}

// 取得所有合併單
async function get_combine_list() {
    try {
        const res = await fetch(`${api_ip}api/inv_combinelist/get_all_inv`,{
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: '{"Data":{}}'
        })

        if (!res.ok) {
            throw new Error('请求失败');
        }

        const responseData = await res.json();
        return responseData;
    } catch(err) {
        console.log(err);
    }
}

async function add_record() {
    let combine_data = await get_combine_list();
    let records_data = await get_all_records();

    let header_merge_select_select = document.querySelector('.header_merge_select_select');
    if(header_merge_select_select.value == '') {
        alert("請先選擇合併單");
        return;
    }

    let merge_add_list_select = document.querySelector(".merge_add_list_select");
    let temp_add_object = records_data["Data"].filter(item => {
        return item.SN === merge_add_list_select.value;
    })

    let temp_add_data = {
        SN : "",
        TYPE : ""
    };
    temp_add_data.SN = temp_add_object[0].SN;
    temp_add_data.TYPE = temp_add_object[0].TYPE;
    console.log(header_merge_select_select.value);

    combine_data["Data"].forEach(async(element) => {
        if(header_merge_select_select.value == element.INV_SN) {
            let temp_arr = [];
            if(element["records_Ary"].length == 0) {
                temp_arr.push(temp_add_data);
            } else {
                element["records_Ary"].forEach(e => {
                    let temp_object = {
                        SN : "",
                        TYPE : ""
                    }
                    temp_object.SN = e.SN;
                    temp_object.TYPE = e.TYPE;
                    temp_arr.push(temp_object)
                })
                temp_arr.push(temp_add_data);
            }
            temp_arr = JSON.stringify(temp_arr);
            // console.log("INV_NAME",element.INV_NAME);
            // console.log("INV_SN",header_merge_select_select.value);
            // console.log("IC",get_logedName());
            // console.log("temp_arr",temp_arr);
            await inv_creat_update(element.INV_NAME, header_merge_select_select.value, get_logedName(), temp_arr);
        }   
    })

    // let merge_add_type_select = document.querySelector(".merge_add_type_select");
    let merge_add_list_input = document.querySelector("#merge_add_list_input");
    // merge_add_type_select.value = "";
    merge_add_list_select.value = "";
    merge_add_list_input.value = "";
    console.log("test");
    console.log(merge_add_list_input.value);

    let temp_SN_for_reset = header_merge_select_select.value;

    setTimeout(async() => {
        let combine_data = await get_combine_list();
        console.log(combine_data["Data"]);
        header_merge_select_select.innerHTML = '<option value="">請選擇合併單</option>'
        combine_data['Data'].forEach(element => {
            header_merge_select_select.innerHTML += `
                <option id="${element.INV_NAME}" value="${element.INV_SN}">${element.INV_NAME}</option>
            `
        });
        header_merge_select_select.value = "";
        header_merge_select_select.addEventListener('change', async() => {
            let merge_display_header_name = document.querySelector(".merge_display_header_name");
            let merge_display_header_lists_count = document.querySelector(".merge_display_header_lists_count");
            let merge_display_table_tbody = document.querySelector(".merge_display_table_tbody");

            if(header_merge_select_select.value == "") {
                merge_display_header_name.innerHTML = ``;
                merge_display_header_lists_count.innerHTML = ``;
                merge_display_table_tbody.innerHTML = `
                    <tr>
                        <td class="" colspan="6">請先選擇合併單</td>
                    </tr>
                `
            } else {
                combine_data["Data"].forEach(item => {
                    if(item.INV_SN == header_merge_select_select.value) {
                        merge_display_header_name.innerHTML = `${item.INV_NAME}`;
                        merge_display_header_lists_count.innerHTML = `合併數量 : ${item["records_Ary"].length}`;
                        merge_display_table_tbody.innerHTML = "";
                        if (item['records_Ary'].length == 0) {
                            merge_display_table_tbody.innerHTML = ` 
                                <tr>
                                    <td class="" colspan="6">目前合併單沒有加入任何單據</td>
                                </tr>
                            `;
                        } else {
                            item['records_Ary'].forEach((e, index) => {
                                merge_display_table_tbody.innerHTML += `
                                    <tr>
                                        <td class="">${index + 1}</td>
                                        <td class="">${e.TYPE}</td>
                                        <td class="">${e.SN}</td>
                                        <td class="">${e.NAME}</td>
                                        <td>
                                            <div class="merge_display_button" SN="${e.SN}" INV_SN="${header_merge_select_select.value}">匯出</div>
                                        </td>
                                        <td class="">
                                            <div class="merge_delete_button" SN="${e.SN}" INV_SN="${header_merge_select_select.value}">刪除</div>
                                        </td>
                                    </tr>
                                `
                            });

                            let merge_display_button = document.querySelectorAll('.merge_display_button');
                            merge_display_button.forEach(e => {
                                e.addEventListener("click", async(item) => {
                                    inv_download_record(item.target);
                                });
                            });
                            
                            let merge_delete_button = document.querySelectorAll('.merge_delete_button');
                            merge_delete_button.forEach(e => {
                                e.addEventListener("click", async(item) => {
                                await delete_record(item.target);
                                });
                            });
                        }
                    }
                })
            }
        })

        header_merge_select_select.value = temp_SN_for_reset;
        combine_data["Data"].forEach(item => {
            let merge_display_header_name = document.querySelector(".merge_display_header_name");
            let merge_display_header_lists_count = document.querySelector(".merge_display_header_lists_count");
            let merge_display_table_tbody = document.querySelector(".merge_display_table_tbody");
            if(item.INV_SN == header_merge_select_select.value) {
                merge_display_header_name.innerHTML = `${item.INV_NAME}`;
                merge_display_header_lists_count.innerHTML = `合併數量 : ${item["records_Ary"].length}`;
                merge_display_table_tbody.innerHTML = "";
                if (item['records_Ary'].length == 0) {
                    merge_display_table_tbody.innerHTML = ` 
                        <tr>
                            <td class="" colspan="6">目前合併單沒有加入任何單據</td>
                        </tr>
                    `;
                } else {
                    item['records_Ary'].forEach((e, index) => {
                        merge_display_table_tbody.innerHTML += `
                            <tr>
                                <td class="">${index + 1}</td>
                                <td class="">${e.TYPE}</td>
                                <td class="">${e.SN}</td>
                                <td class="">${e.NAME}</td>
                                <td>
                                    <div class="merge_display_button" SN="${e.SN}" INV_SN="${header_merge_select_select.value}">匯出</div>
                                </td>
                                <td class="">
                                    <div class="merge_delete_button" SN="${e.SN}" INV_SN="${header_merge_select_select.value}">刪除</div>
                                </td>
                            </tr>
                        `
                    })

                    let merge_display_button = document.querySelectorAll('.merge_display_button');
                    merge_display_button.forEach(e => {
                        e.addEventListener("click", async(item) => {
                            inv_download_record(item.target);
                        });
                    });
                    
                    let merge_delete_button = document.querySelectorAll('.merge_delete_button');
                    merge_delete_button.forEach(e => {
                        e.addEventListener("click", async(item) => {
                           await delete_record(item.target);
                        });
                    });
                }
            }
        });

    }, 1000);
}

// 刪除合併單內的單據
async function delete_record(item) {
    let combine_data = await get_combine_list();
    let INV_SN = item.getAttribute("INV_SN");
    let SN = item.getAttribute("SN");
    let CT = get_logedName();
    console.log(combine_data);
    temp_data = combine_data["Data"].filter(e => {
        return e.INV_SN == INV_SN
    });
    console.log(temp_data);
    let temp_arr = [];
    temp_data[0]["records_Ary"].forEach((e) => {
        if(e.SN != SN) {
            temp_arr.push({
                SN: e.SN,
                TYPE: e.TYPE,
            });
        }
    })

    console.log(temp_arr);
    temp_arr = JSON.stringify(temp_arr);

    let merge_display_header_name = document.querySelector(".merge_display_header_name");
    let _NAME = merge_display_header_name.innerHTML;
    // console.log("_NAME",_NAME);
    // console.log("INV_SN",INV_SN);
    // console.log("CT",CT);
    // console.log("temp_arr",temp_arr);
    // console.log("api_ip", api_ip);

    if(confirm(`是否刪除${SN}?`)) {
        await inv_creat_update(_NAME, INV_SN, CT, temp_arr);
    } else {
        return;
    };


    let merge_add_list_select = document.querySelector(".merge_add_list_select");
    let header_merge_select_select = document.querySelector(".header_merge_select_select");
    let merge_add_type_select = document.querySelector(".merge_add_type_select");
    merge_add_type_select.value = "";
    merge_add_list_select.value = "";

    let temp_SN_for_reset = header_merge_select_select.value;

    setTimeout(async() => {
        let combine_data = await get_combine_list();
        console.log(combine_data["Data"]);
        header_merge_select_select.innerHTML = '<option value="">請選擇合併單</option>'
        combine_data['Data'].forEach(element => {
            header_merge_select_select.innerHTML += `
                <option id="${element.INV_NAME}" value="${element.INV_SN}">${element.INV_NAME}</option>
            `
        });
        header_merge_select_select.value = "";
        header_merge_select_select.addEventListener('change', async() => {
            let merge_display_header_name = document.querySelector(".merge_display_header_name");
            let merge_display_header_lists_count = document.querySelector(".merge_display_header_lists_count");
            let merge_display_table_tbody = document.querySelector(".merge_display_table_tbody");

            if(header_merge_select_select.value == "") {
                merge_display_header_name.innerHTML = ``;
                merge_display_header_lists_count.innerHTML = ``;
                merge_display_table_tbody.innerHTML = `
                    <tr>
                        <td class="" colspan="6">請先選擇合併單</td>
                    </tr>
                `
            } else {
                combine_data["Data"].forEach(item => {
                    // console.log(header_merge_select_select.value);
                    if(item.INV_SN == header_merge_select_select.value) {
                        merge_display_header_name.innerHTML = `${item.INV_NAME}`;
                        merge_display_header_lists_count.innerHTML = `合併數量 : ${item["records_Ary"].length}`;
                        merge_display_table_tbody.innerHTML = "";
                        if (item['records_Ary'].length == 0) {
                            merge_display_table_tbody.innerHTML = ` 
                                <tr>
                                    <td class="" colspan="6">目前合併單沒有加入任何單據</td>
                                </tr>
                            `;
                        } else {
                            item['records_Ary'].forEach((e, index) => {
                                merge_display_table_tbody.innerHTML += `
                                    <tr>
                                        <td class="">${index + 1}</td>
                                        <td class="">${e.TYPE}</td>
                                        <td class="">${e.SN}</td>
                                        <td class="">${e.NAME}</td>
                                        <td>
                                            <div class="merge_display_button" SN="${e.SN}" INV_SN="${header_merge_select_select.value}">匯出</div>
                                        </td>
                                        <td class="">
                                            <div class="merge_delete_button" SN="${e.SN}" INV_SN="${header_merge_select_select.value}">刪除</div>
                                        </td>
                                    </tr>
                                `
                            });

                            let merge_display_button = document.querySelectorAll('.merge_display_button');
                            merge_display_button.forEach(e => {
                                e.addEventListener("click", async(item) => {
                                    inv_download_record(item.target);
                                });
                            });
                            
                            let merge_delete_button = document.querySelectorAll('.merge_delete_button');
                            merge_delete_button.forEach(e => {
                                e.addEventListener("click", async(item) => {
                                await delete_record(item.target);
                                });
                            });
                        }
                    }
                })
            }
        })

        header_merge_select_select.value = temp_SN_for_reset;
        combine_data["Data"].forEach(item => {
            let merge_display_header_name = document.querySelector(".merge_display_header_name");
            let merge_display_header_lists_count = document.querySelector(".merge_display_header_lists_count");
            let merge_display_table_tbody = document.querySelector(".merge_display_table_tbody");
            if(item.INV_SN == header_merge_select_select.value) {
                merge_display_header_name.innerHTML = `${item.INV_NAME}`;
                merge_display_header_lists_count.innerHTML = `合併數量 : ${item["records_Ary"].length}`;
                merge_display_table_tbody.innerHTML = "";
                if (item['records_Ary'].length == 0) {
                    merge_display_table_tbody.innerHTML = ` 
                        <tr>
                            <td class="" colspan="6">目前合併單沒有加入任何單據</td>
                        </tr>
                    `;
                } else {
                    item['records_Ary'].forEach((e, index) => {
                        merge_display_table_tbody.innerHTML += `
                            <tr>
                                <td class="">${index + 1}</td>
                                <td class="">${e.TYPE}</td>
                                <td class="">${e.SN}</td>
                                <td class="">${e.NAME}</td>
                                <td>
                                    <div class="merge_display_button" SN="${e.SN}" INV_SN="${header_merge_select_select.value}">匯出</div>
                                </td>
                                <td class="">
                                    <div class="merge_delete_button" SN="${e.SN}" INV_SN="${header_merge_select_select.value}">刪除</div>
                                </td>
                            </tr>
                        `
                    });

                    let merge_display_button = document.querySelectorAll('.merge_display_button');
                    merge_display_button.forEach(e => {
                        e.addEventListener("click", async(item) => {
                            inv_download_record(item.target);
                        });
                    });
                    
                    let merge_delete_button = document.querySelectorAll('.merge_delete_button');
                    merge_delete_button.forEach(e => {
                        e.addEventListener("click", async(item) => {
                           await delete_record(item.target);
                        });
                    });
                }
            }
        });

    }, 1000);
}

// 取得所有可加入合併的單
async function get_all_records() {
    try {
        const res = await fetch(`${api_ip}api/inv_combinelist/get_all_records`,{
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: '{"Data":{}}'
        })

        if (!res.ok) {
            throw new Error('请求失败');
        }

        const responseData = await res.json();
        return responseData;
    } catch(err) {
        console.log(err);
    }
}

// 確認可創建合併單單號
async function get_new_IC_SN() {
    try {
        const res = await fetch(`${api_ip}api/inv_combinelist/new_IC_SN`,{
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: '{"Data":{}}'
        })

        if (!res.ok) {
            throw new Error('请求失败');
        }

        const responseData = await res.json();
        return responseData;
    } catch(err) {
        console.log(err);
    }
}

// 創建與修改合併單
async function inv_creat_update(NAME, SN, CT, data) {
    try {
        const res = await fetch(`${api_ip}api/inv_combinelist/inv_creat_update`,{
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: `
                {
                    "Data": 
                    {                 
                        "INV_NAME": "${NAME}",
                        "INV_SN": "${SN}",
                        "CT": "${CT}",
                        "NOTE": "",
                        "records_Ary" : ${data}
                    }
                }
            `
        })

        if (!res.ok) {
            console.log(res.ok);
            throw new Error('请求失败');
        }

        console.log("INV_NAME", NAME);
        console.log("CT", SN);
        console.log("SN", CT);
        console.log("records_Ary", data);

        // const responseData = await res.json();
        // return responseData;
    } catch(err) {
        console.log(err);
    }
}

// 刪除合併單func
async function delete_combine_list(data) {
    let header_merge_select_select = document.querySelector('.header_merge_select_select');
    if (header_merge_select_select.value == "") {
        alert("請先選擇合併單");
        return;
    }
    // console.log(header_merge_select_select.innerHTML);
    data.forEach(async(e) => {
        if(header_merge_select_select.value == e.INV_SN) {
            await inv_delete_by_SN(header_merge_select_select.value, e.INV_NAME);
        }
    });

    setTimeout(async() => {
        let combine_data = await get_combine_list();
        // console.log(combine_data["Data"]);
        header_merge_select_select.innerHTML = '<option value="">請選擇合併單</option>'
        combine_data['Data'].forEach(element => {
            header_merge_select_select.innerHTML += `
                <option id="${element.INV_NAME}" value="${element.INV_SN}">${element.INV_NAME}</option>
            `
        });
        header_merge_select_select.value = "";
        merge_create_name.value = "";

        let merge_display_header_name = document.querySelector(".merge_display_header_name");
        let merge_display_header_lists_count = document.querySelector(".merge_display_header_lists_count");
        let merge_display_table_tbody = document.querySelector(".merge_display_table_tbody");

        merge_display_header_name.innerHTML = ``;
        merge_display_header_lists_count.innerHTML = ``;
        merge_display_table_tbody.innerHTML = `
            <tr>
                <td class="" colspan="6">請先選擇合併單</td>
            </tr>
        `

        header_merge_select_select.addEventListener('change', async() => {
            let merge_display_header_name = document.querySelector(".merge_display_header_name");
            let merge_display_header_lists_count = document.querySelector(".merge_display_header_lists_count");
            let merge_display_table_tbody = document.querySelector(".merge_display_table_tbody");

            if(header_merge_select_select.value == "") {
                merge_display_header_name.innerHTML = ``;
                merge_display_header_lists_count.innerHTML = ``;
                merge_display_table_tbody.innerHTML = `
                    <tr>
                        <td class="" colspan="6">請先選擇合併單</td>
                    </tr>
                `
            } else {
                combine_data["Data"].forEach(item => {
                    if(item.INV_SN == header_merge_select_select.value) {
                        merge_display_header_name.innerHTML = `${item.INV_NAME}`;
                        merge_display_header_lists_count.innerHTML = `合併數量 : ${item["records_Ary"].length}`;
                        merge_display_table_tbody.innerHTML = "";
                        if (item['records_Ary'].length == 0) {
                            merge_display_table_tbody.innerHTML = ` 
                                <tr>
                                    <td class="" colspan="6">目前合併單沒有加入任何單據</td>
                                </tr>
                            `;
                        } else {
                            item['records_Ary'].forEach((e, index) => {
                                merge_display_table_tbody.innerHTML += `
                                    <tr>
                                        <td class="">${index + 1}</td>
                                        <td class="">${e.TYPE}</td>
                                        <td class="">${e.SN}</td>
                                        <td class="">${e.NAME}</td>
                                        <td>
                                            <div class="merge_display_button" SN="${e.SN}" INV_SN="${header_merge_select_select.value}">匯出</div>
                                        </td>
                                        <td class="">
                                            <div class="merge_delete_button" SN="${e.SN}" INV_SN="${header_merge_select_select.value}">刪除</div>
                                        </td>
                                    </tr>
                                `
                            });

                            let merge_display_button = document.querySelectorAll('.merge_display_button');
                            merge_display_button.forEach(e => {
                                e.addEventListener("click", async(item) => {
                                    inv_download_record(item.target);
                                });
                            });
                            
                            let merge_delete_button = document.querySelectorAll('.merge_delete_button');
                            merge_delete_button.forEach(e => {
                                e.addEventListener("click", async(item) => {
                                await delete_record(item.target);
                                });
                            });
                        }
                    }
                })
            }
        })
    }, 1000);
}

// 刪除合併單api
async function inv_delete_by_SN(SN, NAME) {
    console.log("SN", SN);
    console.log("NAME", NAME);

    try {
        const res = await fetch(`${api_ip}api/inv_combinelist/inv_delete_by_SN`,{
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: `{
                "Value" : "${SN}",
                "Data": {}
             }`
        })

        if (!res.ok) {
            throw new Error('请求失败');
        }

        alert(`您已刪除合併單:${NAME}`)
    } catch(err) {
        console.log(err);
    }
}

// 下載合併單內的單據func
async function inv_download_record(item) {
    let _TYPE;
    let _SN = item.getAttribute("SN");
    let records_data = await get_all_records();
    records_data["Data"].forEach(e => {
        if(e.SN == _SN) {
            _TYPE = e.TYPE;
        }
    });

    if (_TYPE == "") {
        alert("資料有誤請檢查");
        return;
    }
    console.log(_SN);
    console.log(_TYPE);
    await get_record_Excel_by_SN(_SN, _TYPE);
}

// 下載合併單內的單據api
async function get_record_Excel_by_SN(SN, TYPE) {
    let str = "";
    str += `${SN},${TYPE}`;
    // "Value" : "20240103-1,盤點單",
    try {
        const response = await fetch(`${api_ip}api/inv_combinelist/get_record_Excel_by_SN`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body : ` {
            "Value" : "${str}",
            "Data": 
            {}
         }`
        });
    
        if (!response.ok) {
          throw new Error('Failed to fetch the Excel file.');
        }
    
        const blob = await response.blob();
        const _url = window.URL.createObjectURL(blob);
    
        // 创建下载链接
        let downloadLink = document.createElement('a');
        downloadLink.href = window.URL.createObjectURL(blob);
        downloadLink.download = `${TYPE}-${SN}.xls`;
        downloadLink.click();
      } catch (error) {
        console.error(error);
      }
}

// 下載合併單內的單據func
async function inv_download_combine_list() {

    let header_merge_select_select = document.querySelector(".header_merge_select_select");
    let _INV_SN = header_merge_select_select.value;

    if(header_merge_select_select.value == "") {
        alert("請先選擇合併單!!");
        return;
    } else {
        await get_full_inv_Excel_by_SN(_INV_SN);
    }
}

// 下載合併單內的單據api
async function get_full_inv_Excel_by_SN(INV_SN) {
    // "Value" : "I20240103-14"
    console.log(INV_SN);
    try {
        const response = await fetch(`${api_ip}api/inv_combinelist/get_full_inv_Excel_by_SN`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body : `  {
            "Value" : "${INV_SN}",
            "Data": {}
         }`
        });
    
        if (!response.ok) {
          throw new Error('Failed to fetch the Excel file.');
        }
    
        const blob = await response.blob();
        const _url = window.URL.createObjectURL(blob);
    
        // 创建下载链接
        let downloadLink = document.createElement('a');
        downloadLink.href = window.URL.createObjectURL(blob);
        downloadLink.download = `${INV_SN}.xls`;
        downloadLink.click();
      } catch (error) {
        console.error(error);
      }
}

// 搜尋結果功能
async function get_merge_search_input_result(data, combine_data) {
    let merge_add_type_select = document.querySelector(".merge_add_type_select");
    let merge_add_list_input = document.querySelector("#merge_add_list_input");
    let merge_add_list_input_result_container = document.querySelector(".merge_add_list_input_result_container");

    let inv_data = data["Data"].filter((e) => {
        return e.TYPE == "盤點單";
    });
    let con_data = data["Data"].filter((e) => {
        return e.TYPE == "消耗單";
    });
    let rev_data = data["Data"].filter((e) => {
        return e.TYPE == "覆盤單";
    });

    merge_add_list_input.addEventListener("input", (e) => {
        let input_value = e.target.value;
        if(merge_add_type_select.value == undefined || merge_add_type_select.value == "") {
            alert("請先選擇清單種類!");
            merge_add_list_input.value = "";
        } else {
            switch (merge_add_type_select.value) {
                case "盤點單":
                    get_input_result_option(input_value, inv_data, combine_data);
                    break;
                case "消耗單":
                    get_input_result_option(input_value, con_data, combine_data);
                    break;
                case "覆盤單":
                    get_input_result_option(input_value, rev_data, combine_data);
                    break;
                default:
                    break;
            }
        }
    });
}

function get_input_result_option(value, array, combine_data) {
    let header_merge_select_select = document.querySelector(".header_merge_select_select");
    let merge_add_list_input = document.querySelector("#merge_add_list_input");
    let merge_add_list_select = document.querySelector(".merge_add_list_select");
    let merge_add_list_input_result_container = document.querySelector(".merge_add_list_input_result_container");
    merge_add_list_input_result_container.innerHTML = "";
    pp_input_select_index = -1;
    console.log(pp_input_select_index);

    if(value == "") {
        return;
    };

    let temp_value = value.toUpperCase();

    let disable_array = [];

    let temp_disable_array = combine_data["Data"].filter(e => {
        return e.INV_SN == header_merge_select_select.value;
    })

    temp_disable_array = temp_disable_array[0].records_Ary;

    temp_disable_array.forEach(element => {
        disable_array.push(element["SN"]);
    });

    console.log(disable_array);

    let temp_arr = array.filter(item => !disable_array.includes(item["SN"]));
    
    console.log(temp_arr);

    temp_arr = temp_arr.filter(item => item.NAME.includes(temp_value));

    console.log(temp_arr);

    if(temp_arr.length > 0) {
        temp_arr.forEach(element => {
            let input_result_div = document.createElement("div");
            input_result_div.innerHTML = element["NAME"].replace(temp_value, `<span class="highlight_color">${temp_value}</span>`);
            input_result_div.classList.add("input_result_div");
            input_result_div.setAttribute("sn", element.SN);
            input_result_div.setAttribute("name", element.NAME);

            input_result_div.addEventListener("click", (e) => {
                let temp_SN = e.target.getAttribute("sn");
                merge_add_list_input.setAttribute("sn", temp_SN);
                merge_add_list_input.value = element.NAME;

                merge_add_list_select.value = temp_SN;

                // merge_add_list_input.blur();
                merge_add_list_input_result_container.innerHTML = "";
            });

            merge_add_list_input_result_container.appendChild(input_result_div);
        });
    } else {
        let input_result_div = document.createElement("div");
        input_result_div.innerHTML = "查無此單";
        input_result_div.classList.add("input_result_div");

        merge_add_list_input_result_container.appendChild(input_result_div);
    }
}