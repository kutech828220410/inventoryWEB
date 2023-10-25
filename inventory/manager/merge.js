function merge_page_init(data) {
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
        <option value="1">不知道-1</option>
        <option value="2">不知道-2</option>
        <option value="3">不知道-3</option>
        <option value="4">不知道-4</option>
        <option value="5">不知道-5</option>
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

}

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