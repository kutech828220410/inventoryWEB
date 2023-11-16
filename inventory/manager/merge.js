function merge_page_init(data) {
    popup_merge_add()
    popup_merge_create()
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
    header_merge_select_select.innerHTML = `
        <option value="1">20231116-1</option>
        <option value="2">20231114</option>
        <option value="3">20231112-2</option>
        <option value="4">20231110</option>
        <option value="5">20231108</option>
    `
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
    merge_display_header_name.innerHTML = `不知道喔`
    merge_display_header_left_container.appendChild(merge_display_header_name)
    
    const merge_display_header_lists_count = document.createElement("div")
    merge_display_header_lists_count.classList.add("merge_display_header_lists_count")
    merge_display_header_lists_count.innerHTML = `合併數量 : ${"4"}`
    merge_display_header_left_container.appendChild(merge_display_header_lists_count)

    const merge_add_button = document.createElement("div")
    merge_add_button.classList.add("merge_add_button")
    merge_add_button.innerHTML = "加入合併單"
    merge_display_header_container.appendChild(merge_add_button)

    merge_add_button.addEventListener("click", () => {
        let popup_merge_add_container = document.querySelector(".popup_merge_add_container").parentElement
        popup_merge_add_container.style.display = "block";
        popup_merge_add_container.style.opacity = "1" ;
        popup_merge_add_container.style.visibility  = "visible";
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
        </tr>
    `

    const merge_display_table_tbody = document.createElement("tbody")
    merge_display_table_tbody.classList.add("merge_display_table_tbody")
    merge_display_table_container.appendChild(merge_display_table_tbody)
    merge_display_table_tbody.innerHTML = `
        <tr>
            <td class="" colspan="5">請先選擇合併單</td>
        </tr>
    `
    merge_display_table_tbody.innerHTML = `
        <tr>
            <td class="">1</td>
            <td class="">盤點單</td>
            <td class="">B886</td>
            <td class="">季盤點</td>
            <td class="">
                <div class="merge_delete_button">刪除</div>
            </td>
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
    merge_display_foot_left_div.appendChild(foot_left_button)

    const merge_display_foot_right_div = document.createElement("div")
    merge_display_foot_right_div.classList.add("merge_display_foot_right_div")
    merge_display_foot_container.appendChild(merge_display_foot_right_div)

    const foot_right_button_1 = document.createElement("div")
    foot_right_button_1.classList.add("foot_right_button_1")
    foot_right_button_1.classList.add("button_style")
    foot_right_button_1.innerHTML = "創建覆盤單"
    merge_display_foot_right_div.appendChild(foot_right_button_1)

    const foot_right_button_2 = document.createElement("div")
    foot_right_button_2.classList.add("foot_right_button_2")
    foot_right_button_2.classList.add("button_style")
    foot_right_button_2.innerHTML = "匯出"
    merge_display_foot_right_div.appendChild(foot_right_button_2)


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

    popup_merge_create_div.Set_Visible(false)

    const close_merge_create_button = document.createElement('div');
    close_merge_create_button.classList.add('close_merge_create_button')
    close_merge_create_button.innerHTML = `<img src="../../image/close.png" alt="">`
    close_merge_create_button.addEventListener('click', () => {
        popup_merge_create_div.Set_Visible(false)
    })

    popup_merge_create_container.appendChild(close_merge_create_button)
}

// 加入合併單彈窗
function popup_merge_add() {
    const popup_merge_add_div = new Basic_popup_Div('popup_merge_add_container','popup_merge_add_container','','')
    let popup_merge_add_container = document.querySelector(".popup_merge_add_container")
    const merge_add_container = document.createElement("div")
    merge_add_container.classList.add("merge_add_container")
    popup_merge_add_container.appendChild(merge_add_container)

    const merge_add_type_select = document.createElement("select")
    merge_add_type_select.classList.add("merge_add_type_select")
    merge_add_type_select.innerHTML = `
        <option value="">請選擇種類</option>
        <option value="">盤點單</option>
        <option value="">消耗單</option>
        <option value="">覆盤單</option>
    `
    merge_add_container.appendChild(merge_add_type_select)

    const merge_add_list_select = document.createElement("select")
    merge_add_list_select.classList.add("merge_add_list_select")
    merge_add_list_select.innerHTML = `
        <option value="">單號 / 名稱</option>
        <option value="">BNS4 / 2022-10-10</option>
        <option value="" disabled>BNS4 / 2022-10-10</option>
        <option value="">BNS4 / 2022-10-10</option>
    `
    merge_add_container.appendChild(merge_add_list_select)

    const merge_add_confirm_button = document.createElement("div")
    merge_add_confirm_button.classList.add("merge_add_confirm_button")
    merge_add_confirm_button.innerHTML = "加入"
    merge_add_container.appendChild(merge_add_confirm_button)

    popup_merge_add_div.Set_Visible(false)

    const close_merge_add_button = document.createElement('div');
    close_merge_add_button.classList.add('close_merge_add_button')
    close_merge_add_button.innerHTML = `<img src="../../image/close.png" alt="">`
    close_merge_add_button.addEventListener('click', () => {
        popup_merge_add_div.Set_Visible(false)
    })

    popup_merge_add_container.appendChild(close_merge_add_button)
}