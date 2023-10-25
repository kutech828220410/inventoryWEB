window.onload = load;
async function load()
{
    const serverName ="";
    const serverType = "網頁";
    APIServer = await LoadAPIServer();
    const API01 = serch_APIServer(serverName,serverType,"API01");
    const API02 = serch_APIServer(serverName,serverType,"API02");
    console.log("API01",API01);
    console.log("API02",API02);
    await check_ip(API01[0].server,API02[0].server);
    console.log("inventory_url",inventory_url);

    // const test_user_data = {
    //     name: "王曉明",
    // }

    var loggedID = sessionStorage.getItem('loggedID');  
    var loggedName = sessionStorage.getItem('loggedName');  
    const test_user_data = {
      id: loggedID,
      name: loggedName,
    }

    popup_group_create()
    nav_bar_create("medGroup", test_user_data)
    current_funtion_check()
}

function current_funtion_check() {
    let bottom_gm_nav_card = document.querySelectorAll(".bottom_gm_nav_card")

    // 預設畫面
    if (bottom_gm_nav_card[0].classList[1] != "current_funtion") {
        groups_manage_get_data("")
        bottom_gm_nav_card[0].classList.add("current_funtion")
    } else {
        return
    }

    bottom_gm_nav_card.forEach(e => {
        e.addEventListener("click", () => {
            switch (e.innerHTML) {
                case "藥品群組":
                    current_function_trgger(bottom_gm_nav_card, e) 
                    break;

                case "藥檔管理":
                    current_function_trgger(bottom_gm_nav_card, e)
                    break;

                default:
                    break;
            }
        })
    });
}

// 頁面功能
function current_function_trgger(div_array, target) {
    // 切換功能
    if (target.classList[1] != "current_funtion") {
        div_array.forEach(e => {
            e.classList.remove("current_funtion")
            target.classList.add("current_funtion")
        });
    } else {
        return
    }

    switch (target.innerHTML) {
        case "藥品群組":
            groups_manage_get_data("") 
            break;

        case "藥檔管理":
            med_manage_get_data()
            window.alert("功能開發中!!")
            break;

        default:
            break;
    }
}
// 藥品群組功能
    // 藥品群組API
async function groups_manage_get_data(guid) {
    fetch('http://220.135.128.247:4433/api/medGroup/get_all_group', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({}),
      }).catch(e => {
        console.log(e);
      }).then(res => {
        return res.json()
      }).then(res => {
        gm_display(res, guid)
      });
}

// 藥品群組展示功能列
async function gm_display(all_g_data, guid) {
    let gm_main_container = document.querySelector('.gm_main_container')

    container_display_init(gm_main_container)

    const gm_header_display_container = document.createElement('div')
    gm_header_display_container.classList.add('gm_header_display_container')
    gm_main_container.appendChild(gm_header_display_container)
    gm_header_display_container.innerHTML = '<h2>藥品群組操作頁面</h2>'

    // 選擇群組容器
    const current_group_select_container = document.createElement('div')
    current_group_select_container.classList.add("current_group_select_container")
    gm_header_display_container.appendChild(current_group_select_container)

    const current_group_select = document.createElement('select')
    current_group_select.id = "current_group_select"
    current_group_select.name = "current_group_select"
    current_group_select.innerHTML = `
        <option value="">
            請選擇藥品群組名稱
        </option>
    `
    all_g_data["Data"].forEach((element) => {
        current_group_select.innerHTML += `
            <option value="${element.GUID}">${element.NAME}</option>
        `
    });
    current_group_select_container.appendChild(current_group_select);
    current_group_select.value = guid

    // 新增群組按鈕
    const new_group_creat_button = document.createElement("div")
    new_group_creat_button.classList.add('new_group_creat_button')
    new_group_creat_button.innerHTML = "新增群組"
    gm_header_display_container.appendChild(new_group_creat_button)

    // 新增群組彈跳視窗開關
    new_group_creat_button.addEventListener('click', () => {
        let pop_group_create_div = document.querySelector(".pop_group_create_container").parentElement
        pop_group_create_div.style.display = "block";
        pop_group_create_div.style.opacity = "1" ;
        pop_group_create_div.style.visibility  = "visible";
        document.body.style.overflow = "hidden";
    })

    const group_delete_button = document.createElement("div")
    group_delete_button.classList.add('new_group_creat_button')
    group_delete_button.classList.add("group_delete_button")
    group_delete_button.classList.add("group_delete_button")
    group_delete_button.classList.add("banned_to_use")
    group_delete_button.innerHTML = "刪除群組"
    gm_header_display_container.appendChild(group_delete_button)
    group_delete_button.addEventListener("click", () => {
        console.log(current_group_select.value);
        group_delete_api(current_group_select.value)
    })

    // 展示群組容器
    const gm_content_display_container = document.createElement("div")
    gm_content_display_container.classList.add('gm_content_container')
    gm_main_container.appendChild(gm_content_display_container)


    let temp_group_all_data = {}
    all_g_data["Data"].forEach(element => {
        temp_group_all_data[element.GUID] = element
    });
    console.log(temp_group_all_data);

    if(guid) {
        gm_content_show(guid, temp_group_all_data, gm_content_display_container, all_g_data)
    }

    // 展示群組細項功能
    current_group_select.addEventListener("change", e => {

        // 內容產生初始化
        container_display_init(gm_content_display_container)

        // 內容產生
        if (e.target.value) {
            group_delete_button.classList.remove('banned_to_use')
            gm_content_show(e.target.value, temp_group_all_data, gm_content_display_container, all_g_data)
        } else {
            group_delete_button.classList.add("banned_to_use")
            container_display_init(gm_content_display_container)
        }
    })
}

async function gm_content_show(guid, temp_group_all_data, append_div, all_g_data) {
    // 資料變數
    let temp_group_name = temp_group_all_data[`${guid}`].NAME
    let temp_selected_med = []
    temp_group_all_data[`${guid}`].MedClasses.forEach(e => {
        temp_selected_med.push(e.CODE)
    })
    temp_selected_med = temp_selected_med.sort()
    let page = 1;
    let temp_searhing_arr_for_display = []

    var med_data = await get_medicine_cloud()
    var temp_med_data = {}
    med_data["Data"].forEach(element => {
        temp_med_data[element.CODE] = element
    });
    console.log(med_data.Data);
    console.log(temp_med_data);

    let gm_content = document.createElement('div')
    gm_content.classList.add("gm_content")
    append_div.appendChild(gm_content)
    console.log(guid);
    console.log(temp_group_all_data);
    console.log(temp_group_name);
    console.log(temp_selected_med);

    // 關閉群組細節按鈕
    let gm_content_close_button = document.createElement("div")
    gm_content_close_button.innerHTML = '<img src="../../image/close.png" alt="">'
    gm_content_close_button.style.width = "36px"
    gm_content_close_button.style.position = "absolute"
    gm_content_close_button.style.top = "8px"
    gm_content_close_button.style.right = "8px"
    gm_content_close_button.style.height = "36px"
    gm_content_close_button.style.cursor = "pointer"
    gm_content_close_button.style.backgroundColor = "white"
    gm_content_close_button.style.borderRadius = "50%"
    gm_content_close_button.childNodes[0].style.width = "100%"
    gm_content_close_button.childNodes[0].style.display = "block"
    gm_content_close_button.addEventListener("click", () => {
        gm_display(all_g_data, "")
    })
    gm_content.appendChild(gm_content_close_button)

    // 群組細節title容器
    const gm_content_header_container = document.createElement("div")
    gm_content_header_container.classList.add("gm_content_header_container")
    gm_content.appendChild(gm_content_header_container)

    // 群組名稱容器
    const gm_content_name_container = document.createElement("div")
    gm_content_name_container.classList.add("gm_content_name_container")
    gm_content_header_container.appendChild(gm_content_name_container)
    // 群組名稱前綴
    const gm_content_name_title = document.createElement("div")
    gm_content_name_title.classList.add("gm_content_name_title")
    gm_content_name_container.appendChild(gm_content_name_title)
    gm_content_name_title.innerHTML = "群組名稱:"
    // 群組名稱input 並加入監聽修改功能
    const gm_content_name_input = document.createElement("input")
    gm_content_name_input.value = temp_group_name
    gm_content_name_input.disabled = true
    gm_content_name_input.classList.add("gm_content_name_input")
    gm_content_name_container.appendChild(gm_content_name_input)
    if ('ontouchstart' in window) {
        // 处理触摸屏设备
        gm_content_name_input.disabled = false
        gm_content_name_input.addEventListener("click", () => {
            gm_content_name_input.value = ""
            gm_content_name_input.value = temp_group_name
            gm_content_name_input.addEventListener("change", () => {
                console.log(gm_content_name_input.value);
            })
        })
    } else {
        // 处理非触摸屏设备
        gm_content_name_input.addEventListener("dblclick", () => {
            gm_content_name_input.value = ""
            gm_content_name_input.value = temp_group_name
            gm_content_name_input.disabled = false
            gm_content_name_input.addEventListener("change", () => {
                console.log(gm_content_name_input.value);
            })
        })
        // 修改群組名稱按下Enter離開input tag功能
        gm_content_name_input.addEventListener("keydown", (e) => {
            if(e.key == "Enter") {
                gm_content_name_input.disabled = true
            } else {
                return
            }
        })
    }
    // 修改群組觸發功能
    gm_content_name_input.addEventListener("blur", () => {
        if ('ontouchstart' in window) {
            // 处理触摸屏设备
            if (gm_content_name_input.value != temp_group_name) {
                if(confirm(`是否修改群組名稱為${gm_content_name_input.value}`)) {
                    temp_group_name = gm_content_name_input.value
                    group_name_change(guid, temp_group_name)
                    let current_group_select_option = document.querySelectorAll("#current_group_select > option")
                    current_group_select_option.forEach(element => {
                        if(element.value == guid) {
                            element.innerHTML = temp_group_name
                        }
                    });
                    return
                } else {
                    gm_content_name_input.value = temp_group_name
                    return
                }
            }
        } else {
            // 处理非触摸屏设备
            if (gm_content_name_input.value != temp_group_name) {
                if(confirm(`是否修改群組名稱為${gm_content_name_input.value}`)) {
                    temp_group_name = gm_content_name_input.value
                    group_name_change(guid, temp_group_name)
                    gm_content_name_input.disabled = true
                    let current_group_select_option = document.querySelectorAll("#current_group_select > option")
                    current_group_select_option.forEach(element => {
                        if(element.value == guid) {
                            element.innerHTML = temp_group_name
                        }
                    });
                    return
                } else {
                    gm_content_name_input.value = temp_group_name
                    gm_content_name_input.disabled = true
                    return
                }
            } else {
                gm_content_name_input.disabled = true
                return
            }
        }
    })

    const gm_content_med_selection_quantity = document.createElement("div")
    gm_content_med_selection_quantity.classList.add("gm_content_med_selection_quantity")
    gm_content_header_container.appendChild(gm_content_med_selection_quantity)
    gm_content_med_selection_quantity.innerHTML = `
    已選取藥品數量 : ${temp_selected_med.length}
    `

    // 群組藥品顯示控制區
    const gm_content_med_control_container = document.createElement("div")
    gm_content_med_control_container.classList.add("gm_content_med_control_container")
    gm_content.appendChild(gm_content_med_control_container)

    // 顯示藥品群組
    const gm_content_med_select_show_button = document.createElement("div")
    gm_content_med_select_show_button.classList.add("gm_content_med_select_show_button")
    gm_content_med_select_show_button.innerHTML = '顯示群組藥品'
    gm_content_med_control_container.appendChild(gm_content_med_select_show_button)

    const gm_content_med_search_container = document.createElement("div")
    gm_content_med_search_container.classList.add("gm_content_med_search_container")
    gm_content_med_control_container.appendChild(gm_content_med_search_container)

    const gm_content_med_search_type = document.createElement('select')
    gm_content_med_search_type.classList.add("gm_content_med_search_type")
    gm_content_med_search_container.appendChild(gm_content_med_search_type)
    gm_content_med_search_type.innerHTML = `
        <option value="code">藥碼/料號/條碼</option>
        <option value="drug_name">藥名</option>
        <option value="dia_name">商品名</option>
        <option value="cht_name">中文名</option>
        <option value="drug_kind">管制級別</option>
    `

    const gm_content_med_search_input_container = document.createElement("div")
    gm_content_med_search_input_container.classList.add("gm_content_med_search_input_container")
    gm_content_med_search_container.appendChild(gm_content_med_search_input_container)

    const gm_content_med_search_input = document.createElement("input")
    gm_content_med_search_input.classList.add("gm_content_med_search_input")
    med_search_input_func("code", gm_content_med_search_input_container, gm_content_med_search_input)

    const gm_content_med_search_select = document.createElement("select")
    gm_content_med_search_select.classList.add("gm_content_med_search_select")
    gm_content_med_search_select.innerHTML = `
        <option value="N">N</option>
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
    `

    // 更換搜尋類別事件
    gm_content_med_search_type.addEventListener("change", () => {
        container_display_init(gm_content_med_search_input_container)
        switch (gm_content_med_search_type.value) {
            case "code":
                med_search_input_func("code", gm_content_med_search_input_container, gm_content_med_search_input)
                break;
        
            case "drug_name":
                med_search_input_func("drug_name", gm_content_med_search_input_container, gm_content_med_search_input)
                break;
        
            case "dia_name":
                med_search_input_func("dia_name", gm_content_med_search_input_container, gm_content_med_search_input)
                break;
        
            case "cht_name":
                med_search_input_func("cht_name", gm_content_med_search_input_container, gm_content_med_search_input)
                break;
        
            case "drug_kind":
                med_search_input_func("drug_kind", gm_content_med_search_input_container, gm_content_med_search_select)
                break;
        
            default:
                break;
        }
    })

    const gm_content_med_search_button = document.createElement("div")
    gm_content_med_search_button.classList.add("gm_content_med_search_button")
    gm_content_med_search_button.innerHTML = "搜尋"
    gm_content_med_search_container.appendChild(gm_content_med_search_button)

    gm_content_med_search_button.addEventListener("click", () => {
        if (gm_content_med_search_type.value != "drug_kind") {
            let gm_content_med_search_type = document.querySelector(".gm_content_med_search_type")
            let gm_content_med_search_input = document.querySelector(".gm_content_med_search_input")
            let temp_type = gm_content_med_search_type.value
            let temp_value = gm_content_med_search_input.value
            page = 1
            temp_searhing_arr_for_display = med_searching_func(temp_type, temp_value, med_data["Data"])
            console.log(temp_searhing_arr_for_display);
            gm_content_med_display_func(
                temp_searhing_arr_for_display, 
                temp_selected_med, temp_med_data, 
                gm_content_med_display_tbody,
                gm_content_med_display_tfoot,
                page,
                group_original_temp_array)
        } else {
            let gm_content_med_search_type = document.querySelector(".gm_content_med_search_type")
            let gm_content_med_search_select = document.querySelector(".gm_content_med_search_select")
            let temp_type = gm_content_med_search_type.value
            let temp_value = gm_content_med_search_select.value
            page = 1
            temp_searhing_arr_for_display = med_searching_func(temp_type, temp_value, med_data["Data"])
            console.log(temp_searhing_arr_for_display);
            gm_content_med_display_func(
                temp_searhing_arr_for_display, 
                temp_selected_med, temp_med_data, 
                gm_content_med_display_tbody,
                gm_content_med_display_tfoot, 
                page,
                group_original_temp_array)
        }
    })

    // 藥品展示區
    const gm_content_med_display_container = document.createElement("div")
    gm_content_med_display_container.classList.add("gm_content_med_display_container")
    gm_content.appendChild(gm_content_med_display_container)

    const gm_content_med_display_table = document.createElement("table")
    gm_content_med_display_table.classList.add("gm_content_med_display_table")
    gm_content_med_display_container.appendChild(gm_content_med_display_table)

    const gm_content_med_display_thead = document.createElement("thead")
    gm_content_med_display_thead.classList.add("gm_content_med_display_thead")
    gm_content_med_display_table.appendChild(gm_content_med_display_thead)
    gm_content_med_display_thead.innerHTML = `
        <tr>
            <th class="th_1">選<br>取</th>
            <th class="th_2">藥碼</th>
            <th class="th_3">料號</th>
            <th class="th_4">管制<br>級別</th>
            <th class="th_5">藥名</th>
        </tr>
    `

    const gm_content_med_display_tbody = document.createElement("tbody")
    gm_content_med_display_tbody.classList.add("gm_content_med_display_tbody")
    gm_content_med_display_table.appendChild(gm_content_med_display_tbody)
    
    const gm_content_med_display_tfoot = document.createElement("tfoot")
    gm_content_med_display_tfoot.classList.add("gm_content_med_display_tfoot")
    gm_content_med_display_table.appendChild(gm_content_med_display_tfoot)

    gm_content_med_display_tfoot.innerHTML = `
        <tr>
            <td colspan="5">
                <div>
                    <div class="med_display_page_control_container">
                        <div class="med_display_page_control_style pre_page">
                            <img src="../../image/right-arrow.png" alt="">
                        </div>
                        <div class="med_display_page_control_style next_page">
                            <img src="../../image/right-arrow.png" alt="">
                        </div>
                    </div>
                    <div class="med_display_page_show">0 / 0 頁</div>
                </div>
            </td>
        </tr>
    `

    // 點選群組藥品顯示
    let group_original_temp_array = []

    temp_group_all_data[`${guid}`].MedClasses.forEach(e => {
        group_original_temp_array.push(e.CODE)
    })
    gm_content_med_select_show_button.addEventListener("click", () => {
        page = 1
        temp_searhing_arr_for_display = group_original_temp_array
        console.log(group_original_temp_array);
        console.log(temp_selected_med);
        gm_content_med_display_func(
            temp_searhing_arr_for_display,
            temp_selected_med, temp_med_data,
            gm_content_med_display_tbody,
            gm_content_med_display_tfoot,
            page,
            group_original_temp_array)
    })

    temp_searhing_arr_for_display = group_original_temp_array
    gm_content_med_display_func(temp_selected_med,
        temp_selected_med,
        temp_med_data,
        gm_content_med_display_tbody,
        gm_content_med_display_tfoot,
        1,
        group_original_temp_array)

    // 換頁事件
    let pre_page = document.querySelector(".pre_page")
    let next_page = document.querySelector(".next_page")
    pre_page.addEventListener("click", () => {
        if(page <= 1) {
            console.log("第一頁");
            return
        } else {
            page = page - 1
            gm_content_med_display_func(
                temp_searhing_arr_for_display,
                temp_selected_med,
                temp_med_data,
                gm_content_med_display_tbody,
                gm_content_med_display_tfoot,
                page,
                group_original_temp_array)
            
                group_med_save_button_compare(group_original_temp_array, temp_selected_med)
        }
    })
    
    next_page.addEventListener("click", () => {
        let temp_pages = Math.ceil(temp_searhing_arr_for_display.length / 10)
        if (page == temp_pages) {
            console.log("最後一頁");
            return
        } else {
            page = page + 1
            gm_content_med_display_func(
                temp_searhing_arr_for_display,
                temp_selected_med,
                temp_med_data,
                gm_content_med_display_tbody,
                gm_content_med_display_tfoot,
                page,
                group_original_temp_array)
            group_med_save_button_compare(group_original_temp_array, temp_selected_med)
        }
    })

    // 藥品數量比對及修改區
    const gm_content_med_quantity_save_container = document.createElement("div")
    gm_content_med_quantity_save_container.classList.add("gm_content_med_quantity_save_container")
    gm_content.appendChild(gm_content_med_quantity_save_container)
    
    let gm_content_group_save_button = document.createElement("div")
    gm_content_group_save_button.classList.add("gm_content_group_save_button")
    gm_content_med_quantity_save_container.appendChild(gm_content_group_save_button)
    gm_content_group_save_button.innerHTML = "儲存"
    gm_content_group_save_button.addEventListener("click", () => {
        if(gm_content_group_save_button.classList[1] == "save_button_active") {
            all_g_data["Data"].forEach(element => {
                if(element.GUID == guid) {
                    group_med_save_func(guid, element.NAME, temp_selected_med)
                }
            });
        } else {
            return
        }
    })
}

// 以選藥品及搜尋藥品比對展示區
// gm_content_med_display_func(
    // 要顯示的陣列, 
    // 原有已選藥品陣列, 
    // 所有藥品細節資料, 
    // div容器, 
    // 換頁容器,
    // 比對用陣列)
function gm_content_med_display_func
    (array, 
    temp_selected_med,
    temp_med_data,
    gm_content_med_display_tbody,
    gm_content_med_display_tfoot,
    page,
    group_original_temp_array) {
    // array 只能以["code", "code", "code", "code", "code"]傳遞進來，
    // 所以用搜尋的時候要先預處理資料
    array = array.sort()
    let temp_pages = Math.ceil(array.length / 10)
    let temp_set_array = new Set(temp_selected_med)
    container_display_init(gm_content_med_display_tbody)
    gm_content_med_display_tbody.innerHTML += `
        <tr>
            <td colspan="5">
                <div class="med_selected_all_or_not_container">
                    <div class="all_selected">全部選取</div>
                    <div class="all_not_selected">全部取消</div>
                </div>
            </td>
        </tr>
    `
    if (array.length == 0) {
        return
    } else {
        if (page == temp_pages) {
            for (let i = (page - 1) * 10; i < array.length; i++) {
                if(i % 2 == 0) {
                    if(temp_set_array.has(array[i])) {
                        gm_content_med_display_tbody.innerHTML += `
                            <tr>
                                <td>
                                    <input 
                                        type="checkbox" 
                                        name="" 
                                        id=""
                                        class="check_box_code"
                                        data-code="${array[i]}" 
                                        checked
                                    >
                                </td>
                                <td>${array[i]}</td>
                                <td>${temp_med_data[array[i]].SKDIACODE}</td>
                                <td>${temp_med_data[array[i]].DRUGKIND}</td>
                                <td>
                                    (中)${temp_med_data[array[i]].CHT_NAME}
                                    <br>
                                    (英)${temp_med_data[array[i]].NAME}
                                </td>
                            </tr>
                        `
                    } else {
                        gm_content_med_display_tbody.innerHTML += `
                            <tr>
                                <td>
                                    <input 
                                        type="checkbox" 
                                        name="" 
                                        id=""
                                        class="check_box_code"
                                        data-code="${array[i]}"
                                    >
                                </td>
                                <td>${array[i]}</td>
                                <td>${temp_med_data[array[i]].SKDIACODE}</td>
                                <td>${temp_med_data[array[i]].DRUGKIND}</td>
                                <td>
                                    (中)${temp_med_data[array[i]].CHT_NAME}
                                    <br>
                                    (英)${temp_med_data[array[i]].NAME}
                                </td>
                            </tr>
                        `
                    }
                } else {
                    if(temp_set_array.has(array[i])) {
                        gm_content_med_display_tbody.innerHTML += `
                            <tr class="cardinality_item">
                                <td>
                                    <input 
                                        type="checkbox" 
                                        name="" 
                                        id=""
                                        class="check_box_code"
                                        data-code="${array[i]}" 
                                        checked
                                    >
                                </td>
                                <td>${array[i]}</td>
                                <td>${temp_med_data[array[i]].SKDIACODE}</td>
                                <td>${temp_med_data[array[i]].DRUGKIND}</td>
                                <td>
                                    (中)${temp_med_data[array[i]].CHT_NAME}
                                    <br>
                                    (英)${temp_med_data[array[i]].NAME}
                                </td>
                            </tr>
                        `
                    } else {
                        gm_content_med_display_tbody.innerHTML += `
                            <tr class="cardinality_item">
                                <td>
                                    <input 
                                        type="checkbox" 
                                        name="" 
                                        id=""
                                        class="check_box_code"
                                        data-code="${array[i]}"
                                    >
                                </td>
                                <td>${array[i]}</td>
                                <td>${temp_med_data[array[i]].SKDIACODE}</td>
                                <td>${temp_med_data[array[i]].DRUGKIND}</td>
                                <td>
                                    (中)${temp_med_data[array[i]].CHT_NAME}
                                    <br>
                                    (英)${temp_med_data[array[i]].NAME}
                                </td>
                            </tr>
                        `
                    }
                }
            }
        } else {
            for (let i = (page - 1) * 10; i < ((page - 1) * 10) + 10; i++) {
                if(i % 2 == 0) {
                    if(temp_set_array.has(array[i])) {
                        gm_content_med_display_tbody.innerHTML += `
                            <tr>
                                <td>
                                    <input 
                                        type="checkbox" 
                                        name="" 
                                        id=""
                                        class="check_box_code"
                                        data-code="${array[i]}" 
                                        checked
                                    >
                                </td>
                                <td>${array[i]}</td>
                                <td>${temp_med_data[array[i]].SKDIACODE}</td>
                                <td>${temp_med_data[array[i]].DRUGKIND}</td>
                                <td>
                                    (中)${temp_med_data[array[i]].CHT_NAME}
                                    <br>
                                    (英)${temp_med_data[array[i]].NAME}
                                </td>
                            </tr>
                        `
                    } else {
                        gm_content_med_display_tbody.innerHTML += `
                            <tr>
                                <td>
                                    <input 
                                        type="checkbox" 
                                        name="" 
                                        id=""
                                        class="check_box_code"
                                        data-code="${array[i]}"
                                    >
                                </td>
                                <td>${array[i]}</td>
                                <td>${temp_med_data[array[i]].SKDIACODE}</td>
                                <td>${temp_med_data[array[i]].DRUGKIND}</td>
                                <td>
                                    (中)${temp_med_data[array[i]].CHT_NAME}
                                    <br>
                                    (英)${temp_med_data[array[i]].NAME}
                                </td>
                            </tr>
                        `
                    }
                } else {
                    if(temp_set_array.has(array[i])) {
                        gm_content_med_display_tbody.innerHTML += `
                            <tr class="cardinality_item">
                                <td>
                                    <input 
                                        type="checkbox" 
                                        name="" 
                                        id=""
                                        class="check_box_code"
                                        data-code="${array[i]}" 
                                        checked
                                    >
                                </td>
                                <td>${array[i]}</td>
                                <td>${temp_med_data[array[i]].SKDIACODE}</td>
                                <td>${temp_med_data[array[i]].DRUGKIND}</td>
                                <td>
                                    (中)${temp_med_data[array[i]].CHT_NAME}
                                    <br>
                                    (英)${temp_med_data[array[i]].NAME}
                                </td>
                            </tr>
                        `
                    } else {
                        gm_content_med_display_tbody.innerHTML += `
                            <tr class="cardinality_item">
                                <td>
                                    <input 
                                        type="checkbox" 
                                        name="" 
                                        id=""
                                        class="check_box_code"
                                        data-code="${array[i]}"
                                    >
                                </td>
                                <td>${array[i]}</td>
                                <td>${temp_med_data[array[i]].SKDIACODE}</td>
                                <td>${temp_med_data[array[i]].DRUGKIND}</td>
                                <td>
                                    (中)${temp_med_data[array[i]].CHT_NAME}
                                    <br>
                                    (英)${temp_med_data[array[i]].NAME}
                                </td>
                            </tr>
                        `
                    }
                }
            }
        }
    }

    let check_box_code = document.querySelectorAll('.check_box_code')
    check_box_code.forEach(e => {
        e.addEventListener("click", () => {
            if (!e.checked) {
                console.log(temp_selected_med.indexOf(e.dataset.code));
                if(temp_selected_med.indexOf(e.dataset.code) !== -1) {
                    temp_selected_med.splice(temp_selected_med.indexOf(e.dataset.code), 1)
                    console.log(temp_selected_med);
                    med_selection_quantity_control(temp_selected_med)
                }
            } else {
                console.log(temp_selected_med.indexOf(e.dataset.code));
                temp_selected_med.push(e.dataset.code)
                temp_selected_med = temp_selected_med.sort()
                console.log(temp_selected_med);
                med_selection_quantity_control(temp_selected_med)
            }
            group_med_save_button_compare(group_original_temp_array, temp_selected_med)
        })
    })

    let all_selected = document.querySelector(".all_selected")
    let all_not_selected = document.querySelector(".all_not_selected")
    all_selected.addEventListener("click", () => {
        check_box_code.forEach(element => {
            element.checked = true
            // if (temp_selected_med.indexOf(element.dataset.code) == -1) {
            //     temp_selected_med.push(element.dataset.code)
            //     temp_selected_med = temp_selected_med.sort()
            // }
            group_med_save_button_compare(group_original_temp_array, temp_selected_med)
        });
        array.forEach(element => {
            if (temp_selected_med.indexOf(element) == -1) {
                temp_selected_med.push(element)
                temp_selected_med = temp_selected_med.sort()
            }
        });
        group_med_save_button_compare(group_original_temp_array, temp_selected_med)
    })
    all_not_selected.addEventListener("click", () => {
        check_box_code.forEach(element => {
            element.checked = false
        });
        array.forEach(element => {
            if (temp_selected_med.indexOf(element) !== -1) {
                temp_selected_med.splice(temp_selected_med.indexOf(element), 1)
            }
            group_med_save_button_compare(group_original_temp_array, temp_selected_med)
        });
    })

    let pre_page = document.querySelector(".pre_page")
    let next_page = document.querySelector(".next_page")

    if (temp_pages <= 1) {
        pre_page.style.opacity = 0.3
        pre_page.style.cursor = "not-allowed"
        next_page.style.opacity = 0.3
        next_page.style.cursor = "not-allowed"
    } else if(temp_pages != 1 && page == 1) {
        pre_page.style.opacity = 0.3
        pre_page.style.cursor = "not-allowed"
        next_page.style.opacity = 1
        next_page.style.cursor = "pointer"
    } else if(temp_pages != 1 && page == temp_pages) {
        pre_page.style.opacity = 1
        pre_page.style.cursor = "pointer"
        next_page.style.opacity = 0.3
        next_page.style.cursor = "not-allowed"
    } else if(temp_pages != 1 && page != temp_pages) {
        pre_page.style.opacity = 1
        pre_page.style.cursor = "pointer"
        next_page.style.opacity = 1
        next_page.style.cursor = "pointer"
    }

    let med_display_page_show = document.querySelector('.med_display_page_show')
    med_display_page_show.innerHTML = ''
    med_display_page_show.innerHTML = `${page} / ${temp_pages} 頁`
}

// 已選取藥品數量控制器
function med_selection_quantity_control(array) {
    let gm_content_med_selection_quantity = document.querySelector('.gm_content_med_selection_quantity')
    gm_content_med_selection_quantity.innerHTML = `
        已選取藥品數量 : ${array.length}
    `
}

// 藥品搜尋欄位展示
function med_search_input_func(type, parent_div, append_type) {
    let temp_type = {
        "code": "藥碼/料號/條碼",
        "drug_name": "藥名",
        "dia_name": "商品名",
        "cht_name": "中文名",
        "drug_kind": "管制級別",
    }

    if (type == "drug_kind") {
        parent_div.appendChild(append_type)
    } else {
        append_type.value = `請輸入 ${temp_type[type]}`
        parent_div.appendChild(append_type)
        append_type.addEventListener("focus", () => {
            append_type.classList.add("gm_content_med_search_input_focus")
            append_type.value = ""
        })
        append_type.addEventListener("blur", () => {
            if (!append_type.value) {
                append_type.value = `請輸入 ${temp_type[type]}`
            }

            append_type.classList.remove("gm_content_med_search_input_focus")
        })
        parent_div.appendChild(append_type)
    }
}

// 群組建立api
async function create_group_submit_api(create_group_name_temp) {
    if (create_group_name_temp) {
        fetch('http://220.135.128.247:4433/api/medGroup/add_group', {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            "Data": 
            {
                "GUID": "",
                "NAME": create_group_name_temp,
                "MedClasses": 
                    []
            },
            "Value": "",
            "TableName": "",
            "ServerName": "",
            "ServerType": "",
            "TimeTaken": ""
        }),
        }).catch(e => {
        console.log(e);
        }).then(res => {
        return res.json()
        }).then((res) => {
        if (res.Code == 200) {
            window.alert('群組建立成功')
            groups_manage_get_data()
        }
        });
    } else {
        window.alert('請輸入群組名稱')
    }

}

// 刪除群組api
function group_delete_api(guid) {
    if (guid) {
        if(confirm('是否刪除群組')) {
            fetch('http://220.135.128.247:4433/api/medGroup/delete_group_by_guid', {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    "Data": {},
                    "Value": guid,
                    "TableName": "",
                    "ServerName": "",
                    "ServerType": "",
                    "TimeTaken": ""
                  }),
              }).catch(e => {
                console.log(e);
              }).then(res => {
                return res.json()
              }).then(res => {
                    console.log(res);
                    groups_manage_get_data()
            });
        } else {
            return
        }
    } else {
        return
    }
}

// 群組改名api
function group_name_change(guid, gName) {
    fetch('http://220.135.128.247:4433/api/medGroup/group_rename_by_guid', {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    "Data": {
                        "NAME":gName
                    },
                    "Value": guid,
                    "TableName": "",
                    "ServerName": "",
                    "ServerType": "",
                    "TimeTaken": ""
                  }),
              }).catch(e => {
                console.log(e);
              }).then(res => {
                return res.json()
              }).then(res => {
                    console.log(res);
            });
}

// 比對儲存群組藥品及已選藥品儲存按鈕控制
function group_med_save_button_compare(arr1, arr2) {
    let temp_arr1 = arr1.sort()
    let temp_arr2 = arr2.sort()
    let gm_content_group_save_button_temp = document.querySelector(".gm_content_group_save_button")
    if (temp_arr1.length == temp_arr2.length) {
        for (let i = 0; i < temp_arr1.length; i++) {
            if (temp_arr1[i] != temp_arr2[i]) {
                gm_content_group_save_button_temp.classList.add("save_button_active")
                return
            }
        }
        gm_content_group_save_button_temp.classList.remove("save_button_active")
    } else {
        gm_content_group_save_button_temp.classList.add("save_button_active")
    }
}

// 搜尋藥品
function med_searching_func(type, value, data) {
    let temp_searhing_arr = []
    console.log(type + "--" + value);
    if (type != "drug_kind") {
        switch (type) {
            case "code":
                if(value == "請輸入 藥碼/料號/條碼") {
                    data.forEach(element => {
                        temp_searhing_arr.push(element.CODE)
                    });
                } else {
                    console.log(data[3].CODE.toUpperCase());
                    console.log(type.toUpperCase());
                    for (let i = 0; i < data.length; i++) {
                        // BarCode1
                        if (data[i].BARCODE1 == value) {
                            temp_searhing_arr.push(data[i].CODE)
                            continue
                        }
                        // barCode array
                        for (let j = 0; j < data[i]["BARCODE"].length; j++) {
                            if(data[i]["BARCODE"][j] == value) {
                                temp_searhing_arr.push(data[i].CODE)
                                continue
                            }
                        }
                        // SKDIACODE
                        if(data[i]["SKDIACODE"].includes(value.toUpperCase())) {
                            temp_searhing_arr.push(data[i].CODE)
                            continue
                        }
                        // CODE
                        if(data[i]["CODE"].includes(value.toUpperCase())) {
                            temp_searhing_arr.push(data[i].CODE)
                            continue
                        }
                    }
                }
                break;

            case "drug_name":
                if(value == "請輸入 藥名") {
                    data.forEach(element => {
                        temp_searhing_arr.push(element.CODE)
                    });
                } else {
                    let temp_code_result = data.filter(item => item["NAME"].toUpperCase().includes(value.toUpperCase()));
                    console.log(temp_code_result);
                    temp_code_result.forEach(element => {
                        temp_searhing_arr.push(element.CODE)
                    })
                }
                break;

            case "dia_name":
                if(value == "請輸入 商品名") {
                    data.forEach(element => {
                        temp_searhing_arr.push(element.CODE)
                    });
                } else {
                    let temp_code_result = data.filter(item => item["DIANAME"].toUpperCase().includes(value.toUpperCase()));
                    console.log(temp_code_result);
                    temp_code_result.forEach(element => {
                        temp_searhing_arr.push(element.CODE)
                    })
                }
                break;

            case "cht_name":
                if(value == "請輸入 中文名") {
                    data.forEach(element => {
                        temp_searhing_arr.push(element.CODE)
                    });
                } else {
                    let temp_code_result = data.filter(item => item["CHT_NAME"].toUpperCase().includes(value.toUpperCase()));
                    console.log(temp_code_result);
                    temp_code_result.forEach(element => {
                        temp_searhing_arr.push(element.CODE)
                    })
                }
                break;
        
            default:
                break;
        }
    } else {
            let temp_code_result = data.filter(item => item["DRUGKIND"].toUpperCase().includes(value.toUpperCase()));
            console.log(temp_code_result);
            temp_code_result.forEach(element => {
                temp_searhing_arr.push(element.CODE)
            })
    }

    return temp_searhing_arr
}

// 彈跳視窗建立
    //新增群組彈窗
function popup_group_create() {
    const pop_group_create_div = new Basic_popup_Div('pop_group_create_container','pop_group_create_container','','')

    let pop_group_create_container = document.querySelector(".pop_group_create_container")
    pop_group_create_container.innerHTML = `
        <div class="create_group_container">
            <label for="create_group">請輸入群組名稱</label>
            <input type="text" id="create_group_name">
            <div class="create_group_button">送出</div>
        </div>    
    `

    pop_group_create_div.Set_Visible(false)

    const close_create_group_button = document.createElement('div');
    close_create_group_button.classList.add('close_create_group_button')
    close_create_group_button.innerHTML = `<img src="../../image/close.png" alt="">`
    close_create_group_button.addEventListener('click', () => {
        pop_group_create_div.Set_Visible(false)
    })

    pop_group_create_container.appendChild(close_create_group_button)

    // 送出新增群組按鈕功能
    let create_group_button = document.querySelector('.create_group_button')
    create_group_button.addEventListener("click", () => {
        let create_group_name = document.querySelector('#create_group_name');
        let create_group_name_temp = create_group_name.value
        create_group_submit_api(create_group_name_temp)
        pop_group_create_div.Set_Visible(false)
    })
}

// 修改群組api
function group_med_save_func(guid, gName, array) {
    let temp_arr_for_save = []
    array.forEach(element => {
        temp_arr_for_save.push({"CODE": element})
    });
    fetch('http://220.135.128.247:4433/api/medGroup/add_group', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
                "Data": 
                {
                    "GUID": guid,
                    "NAME": gName,
                    "MedClasses": temp_arr_for_save
                },
                "Value": "",
                "TableName": "",
                "ServerName": "",
                "ServerType": "",
                "TimeTaken": ""
              
          }),
      }).catch(e => {
        console.log(e);
      }).then(res => {
        return res.json()
      }).then(res => {
            console.log(res);
            window.alert("儲存成功!!")
    });
    groups_manage_get_data(guid)
}



// 藥檔管理功能
function med_manage_get_data() {
    let gm_main_container = document.querySelector('.gm_main_container')
    container_display_init(gm_main_container)
}

// 頁面功能畫面初始化
function container_display_init(div_container) {
    while (div_container.firstChild) {
        div_container.removeChild(div_container.firstChild)
    }
}