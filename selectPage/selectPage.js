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

    var med_data = await get_medicine_cloud()
    var temp_med_data = {}
    med_data["Data"].forEach(element => {
        temp_med_data[element.CODE] = element
    });
    console.log(temp_med_data);

    popup_create()

    med_all_group_display(temp_med_data)
}

function popup_create() {
    // 彈出視窗
    const add_group_button = document.querySelector('.add_group_button');
    const pop_group = new Basic_popup_Div('popup_create_group_popup','popup_create_group_popup','','')

    let popup_create_group_popup = document.querySelector('.popup_create_group_popup')

    popup_create_group_popup.innerHTML = `
        <div class='create_group_container'>
            <label for="create_group">請輸入群組名稱</label>
            <input type="text" id="create_group_name">
            <div class="create_group_button">送出</div>
        </div>
    `

    popup_create_group_popup_init("create_group_name")
    create_group_submit()

    // 關閉按鈕
    const close_create_group_button = document.createElement('div');
    close_create_group_button.classList.add('close_create_group_button')
    close_create_group_button.innerHTML = `<img src="./close.png" alt="">`
    close_create_group_button.addEventListener('click', (e) => {
        hide_popup_add()
    })
    
    popup_create_group_popup.appendChild(close_create_group_button)
    hide_popup_add();

    add_group_button.addEventListener('click', () => {
        show_popup_add()
    })

    // 彈跳視窗開關
    function show_popup_add()
    {
        pop_group.Set_Visible(true);
    }
    function hide_popup_add()
    {
        pop_group.Set_Visible(false);
    }
}

// 彈出視窗初始化
function popup_create_group_popup_init(div_id){
    document.querySelector(`#${div_id}`).value = ''
}

function med_all_group_data_show(data, temp_med_data) {
    console.log(data);
    let display_groups_card_container = document.querySelector('.display_groups_card_container');
    display_groups_card_container.innerHTML = ``
    data['Data'].forEach(i => {
        display_groups_card_container.innerHTML += `
            <div class="group_card" data-GUID="${i.GUID}">
                ${i.NAME}
                <div class="group_card_del_button">刪除</div>
            </div>
        `
    });
    // 卡片動畫功能
    let group_card = document.querySelectorAll('.group_card')
    group_card.forEach(i => {
        i.addEventListener('click', (e) => {
            let display_guid = e.target.dataset.guid;
            if(e.target.classList[0] == 'group_card' ) {
                remove_cards_focus(group_card)
                e.target.classList.add("group_card_select")
                display_card_detail(data, display_guid, temp_med_data)
            } else if (e.target.classList[0] == 'group_card_del_button') {
                // 擷取GUID變數
                let del_guid = document.querySelector('.group_card_del_button').parentElement.dataset.guid;
                let temp = e.target.parentElement.innerText.replace('\n刪除', '');
                console.log(temp);
                // 刪除群組功能
                if (confirm(`您確定要刪除 : ${temp} 群組`)) {
                    delete_group_post(temp, del_guid)
                } else {
                    e.preventDefault;
                }
            }
        })
    });
}

// 新增群組按鈕功能
function create_group_submit() {
    let create_group_button = document.querySelector('.create_group_button')
    create_group_button.addEventListener('click', (e) => {
        let create_group_name = document.querySelector('#create_group_name').value
        if(create_group_name) {
            create_group_post(create_group_name)
            popup_create_group_popup_init("create_group_name")
        } else {
            window.alert('請輸入群組名稱')
        }
    })
}

async function delete_group_post(gName, gUID, temp_med_data) {
    fetch('http://220.135.128.247:4433/api/medGroup/delete_group_by_guid', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
            "Data": {},
            "Value": gUID,
            "TableName": "",
            "ServerName": "",
            "ServerType": "",
            "TimeTaken": ""
        }),
      }).catch(e => {
        console.log(e);
      }).then(res => {
        return res.json()
      }).then(() => {
        window.alert(`群組 ${gName} 已刪除`)
        med_all_group_display(temp_med_data);
      });
}

async function create_group_post(data, temp_med_data) {
    fetch('http://220.135.128.247:4433/api/medGroup/add_group', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
            "Data": 
            {
                "GUID": "",
                "NAME": data,
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
      }).then(() => {
        window.alert('群組建立成功')
        med_all_group_display(temp_med_data)
      });
}

// 移除卡片焦點
function remove_cards_focus (arr) {
    arr.forEach(e => {
        e.classList.remove("group_card_select")
    });
}

// 群組卡片細節初始化
function display_card_detail_init() {
    let display_group_detail_container = document.querySelector('.display_group_detail_container');
    display_group_detail_container.innerHTML = `
        <div class="display_group_title_container">請點選上方群組</div>
    `
}

// 顯示群組卡片細節清單
async function display_card_detail(data, guid, temp_med_data) {

    display_card_detail_init()
    let display_group_detail_container = document.querySelector('.display_group_detail_container');
    
    await data['Data'].forEach(index => {
        if(index.GUID == guid) {
            display_group_detail_container.innerHTML = '';
            display_group_detail_container.innerHTML = `
                <div class="display_group_title_container">
                    <div class="display_group_title">
                        ${index.NAME}
                    </div>
                    <div class="change_g_title_button">
                        修改群組名稱
                    </div>
                </div>
                <div class="med_group_display_container">
                    <div class="med_group_selected_zone">
                        <div class="med_item_container">
                        </div>
                        <div class="page_change_container">
                            <div class="med_selected_previous_page grayscale">
                                <img src="./right-arrow.png" alt="">  
                            </div>
                            <div class="med_selected_next_page grayscale">
                                <img src="./right-arrow.png" alt="">
                            </div>
                        </div>
                    </div>
                    <div class="i_am_middle_line"></div>
                    <div class="med_group_search_zone"></div>
                </div>
            `

            let control_page = 0;
            let med_item_card_array = med_group_selected_detail(index, temp_med_data)
            let med_card_pages = Math.ceil(med_item_card_array.length / 5)
            console.log(med_card_pages);

            let med_selected_previous_page = document.querySelector('.med_selected_previous_page');
            let med_selected_next_page = document.querySelector('.med_selected_next_page');

            if (med_card_pages > 1) {
                med_selected_next_page.classList.remove("grayscale")
            }

            med_group_selected_detail_display(data, med_item_card_array, control_page, index, temp_med_data)

            med_selected_previous_page.addEventListener('click', (e) => {
                if (control_page == 0) {
                    e.preventDefault
                } else {
                    control_page = control_page - 1
                    med_group_selected_detail_display(data, med_item_card_array, control_page, index, temp_med_data)
                    med_selected_next_page.classList.remove("grayscale")
                    if (control_page == 0) {
                        med_selected_previous_page.classList.add("grayscale")
                    }
                }
            })

            med_selected_next_page.addEventListener("click", (e) => {
                if(med_card_pages <= 1) {
                    e.preventDefault
                } else if (med_card_pages == (control_page + 1)) {
                    e.preventDefault
                } else {
                    control_page = control_page + 1
                    med_group_selected_detail_display(data, med_item_card_array, control_page, index, temp_med_data)
                    med_selected_previous_page.classList.remove("grayscale")
                    if(med_card_pages == (control_page + 1)) {
                        med_selected_next_page.classList.add("grayscale")
                    }
                }
            })
        }
    });
}

function med_group_selected_detail(index ,temp_med_data) {
    let med_item_card_array = [];

    index["MedClasses"].forEach(i => {
        let temp_med_item_card = 
        `
            <div class="med_item_card">
                <div class="med_item_display">
                    <div>${temp_med_data[i.CODE].CHT_NAME}</div>
                    <div>${temp_med_data[i.CODE].CODE}</div>
                </div>
                <div class="med_item_delete_button" data-guid="${i.GUID}">刪除</div>
            </div>
        `

        med_item_card_array.push(temp_med_item_card)
    });

    return med_item_card_array
}

function med_group_selected_detail_display(data, array, control_page, g_data, temp_med_data) {
    let med_item_container = document.querySelector('.med_item_container')
    med_item_container.innerHTML= ''
    for (let i = control_page * 5; i < (control_page * 5) + 5; i++) {
        if (array[i]) {
            med_item_container.innerHTML += array[i]
        }
    }

    med_item_delete(data, g_data, temp_med_data)
}

function med_item_delete(data, g_data, temp_med_data) {
    let med_item_delete_button = document.querySelectorAll('.med_item_delete_button')
    med_item_delete_button.forEach(index => {
        index.addEventListener("click", (e) => {
            for (let i = 0; i < g_data.MedClasses.length; i++) {
                if (g_data.MedClasses[i].GUID === index.dataset.guid) {
                    if(confirm(`是否刪除`)) {
                        g_data.MedClasses.splice(i, 1);
                        med_item_delete_api(data, g_data, temp_med_data)
                        break; // 找到并移除后跳出循环
                    }
                }
            }
            console.log(g_data);
            console.log(index.dataset.guid);
        })
    });
}

async function med_item_delete_api(data, g_data, temp_med_data) {
    let med_classes_array = []
    g_data["MedClasses"].forEach(e => {
        med_classes_array.push({"CODE": e.CODE})
    })

    let post_data = {
        "GUID": g_data.GUID,
        "NAME": g_data.NAME,
        "MedClasses": med_classes_array
    }

    console.log(post_data);

    fetch('http://220.135.128.247:4433/api/medGroup/add_group', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
            "Data": post_data,
            "Value": g_data.GUID,
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
        window.alert('刪除藥品成功!')
    });
    display_card_detail(data, g_data.GUID, temp_med_data)
}

async function med_all_group_display(temp_med_data) {
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
        med_all_group_data_show(res, temp_med_data)
      });
}
