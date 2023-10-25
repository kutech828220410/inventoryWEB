function nav_bar_create(html_page, user_data) {
    // 頁面資料儲存區
    let html_pages = [
        {
            html_name: "medGroup",
            html_ctName: "藥品管理",
            html_url: "http://www.ketech.tw:5500/medGroup"
        },
        {
            html_name: "inventory",
            html_ctName: "盤點單管理",
            html_url: "http://www.ketech.tw:5500/inventory/manager"
        },
        {
            html_name: "barcodemanagement",
            html_ctName: "條碼管理",
            html_url: "http://www.ketech.tw:5500/barcodemanagement"
        }
    ]

    // 導覽列環境設定
    document.body.style.position = "relative";

    // 導覽列畫面
        // 導覽列開合按鈕
    const nav_bar_tigger_container = document.createElement("div");
    const nav_line_1 = document.createElement("div")
    const nav_line_2 = document.createElement("div")
    const nav_line_3 = document.createElement("div")
    nav_bar_tigger_container.classList.add('nav_bar_tigger_container')

    nav_bar_tigger_container.style.display = "flex"
    nav_bar_tigger_container.style.flexDirection = "column"
    nav_bar_tigger_container.style.width = "42px"
    nav_bar_tigger_container.style.height = "42px"
    nav_bar_tigger_container.style.justifyContent = "space-evenly"
    nav_bar_tigger_container.style.alignItems = "center"
    nav_bar_tigger_container.style.padding = "2px 0px"
    nav_bar_tigger_container.style.border = "1px solid #1f1f1f"
    nav_bar_tigger_container.style.borderRadius = "5px"
    nav_bar_tigger_container.style.position = "absolute"
    nav_bar_tigger_container.style.top = "12px"
    nav_bar_tigger_container.style.left = "12px"
    nav_bar_tigger_container.style.cursor = "pointer"
    nav_bar_tigger_container.style.transition = "0.2s ease-out"
    nav_bar_tigger_container.style.zIndex = '1'
    nav_bar_tigger_container.style.opacity = 1
    hover_style_change_bgc(nav_bar_tigger_container, "transparent", "#bcbcbc")

    nav_bar_tigger_container.appendChild(nav_line_1)
    nav_bar_tigger_container.appendChild(nav_line_2)
    nav_bar_tigger_container.appendChild(nav_line_3)

    nav_line_1.style.backgroundColor = "#1f1f1f"
    nav_line_2.style.backgroundColor = "#1f1f1f"
    nav_line_3.style.backgroundColor = "#1f1f1f"
    
    nav_line_1.style.width = '32px'
    nav_line_2.style.width = '32px'
    nav_line_3.style.width = '32px'

    nav_line_1.style.height = "4px"
    nav_line_2.style.height = "4px"
    nav_line_3.style.height = "4px"

    nav_line_1.style.borderRadius = "2px"
    nav_line_2.style.borderRadius = "2px"
    nav_line_3.style.borderRadius = "2px"

    const nav_bar_container = document.createElement('div');
    nav_bar_container.style.backgroundColor = "#c7c7c7"
    nav_bar_container.style.position = 'fixed'
    nav_bar_container.style.zIndex = "2"
    nav_bar_container.style.minHeight = '100vh'
    nav_bar_container.style.width = "300px"
    nav_bar_container.style.top = "0px"
    nav_bar_container.style.left = "-300px"
    nav_bar_container.style.transition = "0.3s ease-in"
    nav_bar_container.style.display = "flex"
    

    // 導覽列容器
    const nav_bar_content_container = document.createElement('div')
    nav_bar_content_container.style.flexGrow = 1;
    nav_bar_content_container.style.display = "flex"
    nav_bar_content_container.style.flexDirection = "column"
    nav_bar_content_container.style.paddingBottom = "60px"

    // 使用者容器
    const user_display_container = document.createElement('div');
    user_display_container.style.padding = "16px"

    const user_name_div = document.createElement('div')
    user_name_div.style.textAlign = "center"
    user_name_div.style.fontSize = "1.4rem"
    user_name_div.style.fontWeight = "600"
    user_name_div.innerText = `${user_data.name}`

    user_display_container.appendChild(user_name_div)

    // 關閉導覽按鈕
    const nav_bar_close_button = document.createElement('div');
    nav_bar_close_button.innerHTML = `
        <img 
            style="display: block;box-sizing: border-box;height: 100%; padding: 8px;transform: rotate(180deg);" 
            src="../../image/right-arrow.png" 
            alt="">
            <div>收合</div>
    `
    nav_bar_close_button.style.display = "flex"
    nav_bar_close_button.style.height = "40px"
    nav_bar_close_button.style.textAlign = "center"
    nav_bar_close_button.style.fontSize = "1.2rem"
    nav_bar_close_button.style.display = "flex"
    nav_bar_close_button.style.justifyContent = "center"
    nav_bar_close_button.style.alignItems = "center"
    nav_bar_close_button.style.backgroundColor = "#afafaf"
    nav_bar_close_button.style.cursor = "pointer"
    hover_style_change_bgc(nav_bar_close_button, "#afafaf", "#bababa")

    // 導覽列開合
    nav_bar_close_button.addEventListener("click", () => {
        nav_bar_container.style.left = "-300px"
        nav_bar_tigger_container.style.opacity = 1
    })
    nav_bar_tigger_container.addEventListener("click", () => {
        nav_bar_container.style.left = "0px"
        nav_bar_tigger_container.style.opacity = 0
    })

    nav_bar_container.appendChild(nav_bar_content_container)
    nav_bar_container.appendChild(nav_bar_close_button)

    document.body.appendChild(nav_bar_tigger_container)
    document.body.appendChild(nav_bar_container)

    // 分頁展示
    const nav_bar_content = document.createElement('div');
    nav_bar_content.style.flexGrow = 1
    html_pages.forEach(element => {
        if (element.html_name == html_page) {
            nav_bar_content.innerHTML += `
                <div class="${element.html_name + "_class"}"                
                    style="
                    background-color: rgb(126, 179, 225);
                    border: 2px solid rgb(7, 50, 87);
                    border-radius: 5px;
                    font-size: 1.2rem;
                    text-align: center;
                    padding: 6px 12px;
                    margin: 12px 8px;
                    font-weight: 600;
                ">
                ${element.html_ctName}
                </div>
            `
        } else {
            nav_bar_content.innerHTML += `
            <a class="${element.html_name + "_class"}"
                    style="
                    display: block;
                    background-color: rgb(5, 55, 99);
                    color: rgb(217, 223, 228);
                    border: 2px solid rgb(10, 100, 178);
                    border-radius: 5px;
                    font-size: 1.2rem;
                    text-align: center;
                    padding: 6px 12px;
                    margin: 12px 8px;
                    font-weight: 600;
                    cursor: pointer;
                    text-decoration: none;"
                href="${element.html_url}">
            ${element.html_ctName}
            </a>
        `
        }
    });

    const logout_button = document.createElement('div');
    logout_button.innerHTML = '登出'
    logout_button.style.textAlign = "center"
    logout_button.style.lineHeight = "55px"
    logout_button.style.fontSize = "1.2rem"
    logout_button.style.fontWeight = "600"
    logout_button.style.height = "50px"
    logout_button.style.width = "80px"
    logout_button.style.backgroundColor = "#323232"
    logout_button.style.color = "#ece5e5"
    logout_button.style.margin = "0px auto 46px auto"
    logout_button.style.borderRadius = "5px"
    logout_button.style.cursor = "pointer"
    logout_button.style.margin = "0px auto 46px auto"

    logout_button.addEventListener("click", () => 
    {
        if(confirm("是否登出,返回首頁?"))
        {
            logout();
            location.href = "../../login.html";
        }
    
        // window.alert("登出摟")
    })

    nav_bar_content_container.appendChild(user_display_container)
    nav_bar_content_container.appendChild(nav_bar_close_button)
    nav_bar_content_container.appendChild(nav_bar_content)
    nav_bar_content_container.appendChild(logout_button)

}

// hover動畫改變背景顏色
function hover_style_change_bgc 
(target, before_bgc, after_bgc) {
    target.addEventListener('mouseenter', () => {
        target.style.backgroundColor = after_bgc
        target.style.transition = "0.2s ease-out"
    })
    target.addEventListener('mouseleave', () => {
        target.style.backgroundColor = before_bgc
    })
}

