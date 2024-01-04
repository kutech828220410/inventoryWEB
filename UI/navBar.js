function nav_bar_create(html_page, user_data) {
    // 頁面資料儲存區
    let html_pages = [
        {
            name: "共同管理",
            engname: "Management",
            pages: [
                {

                    html_name: "inventory",
                    html_ctName: "盤點單管理",
                    html_url: "../../inventory/manager",
                    icon_url: "../../image/icon/inventory.png"
                },
                {
                    html_name: "barcodemanagement",
                    html_ctName: "條碼建置",
                    html_url: "../../barcodemanagement",
                    icon_url: "../../image/icon/barcode.png"
                },
                {
                    html_name: "medGroup",
                    html_ctName: "藥品管理",
                    html_url: "../../medGroup",
                    icon_url: "../../image/icon/medgroup.png"
                },
            ]
        },
        {
            name: "藥庫",
            engname: "Storehouse",
            pages: [
                {
                    html_name: "inspection",
                    html_ctName: "驗收單管理",
                    html_url: "../../storehouse/inspection",
                    icon_url: "../../image/icon/inspection.png"
                },
                {
                    html_name: "pickingpage",
                    html_ctName: "上架",
                    html_url: "../../pickingpage",
                    icon_url: "../../image/icon/assortment.png"
                }
            ]
        
        },
        {
            name: "藥局",
            engname: "Pharmacy",
            pages: [
                {
                    html_name: "drugs_report",
                    html_ctName: "管制結存報表",
                    html_url: "../../controlleddrug/main.html",
                    icon_url: "../../image/icon/assortment.png"
                },
                {
                    html_name: "consumption_report",
                    html_ctName: "藥品消耗量",
                    html_url: "../../consumption/main.html",
                    icon_url: "../../image/icon/assortment.png"
                }
                // {
                //     html_name: "quick_inventory",
                //     html_ctName: "快速盤點",
                //     html_url: ""
                // }
            ]
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
    nav_bar_tigger_container.style.backgroundColor = "transparent"
    nav_bar_tigger_container.style.flexDirection = "column"
    nav_bar_tigger_container.style.width = "42px"
    nav_bar_tigger_container.style.height = "42px"
    nav_bar_tigger_container.style.justifyContent = "space-evenly"
    nav_bar_tigger_container.style.alignItems = "center"
    nav_bar_tigger_container.style.padding = "2px 0px"
    nav_bar_tigger_container.style.border = "1px solid #030501"
    nav_bar_tigger_container.style.borderRadius = "5px"
    nav_bar_tigger_container.style.position = "absolute"
    nav_bar_tigger_container.style.top = "12px"
    nav_bar_tigger_container.style.left = "12px"
    nav_bar_tigger_container.style.cursor = "pointer"
    nav_bar_tigger_container.style.transition = "0.2s ease-out"
    nav_bar_tigger_container.style.zIndex = '999'
    nav_bar_tigger_container.style.opacity = 1
    hover_style_change_bgc(nav_bar_tigger_container, "transparent", "#6B6B63")

    nav_bar_tigger_container.appendChild(nav_line_1)
    nav_bar_tigger_container.appendChild(nav_line_2)
    nav_bar_tigger_container.appendChild(nav_line_3)

    nav_line_1.style.backgroundColor = "#030501"
    nav_line_2.style.backgroundColor = "#030501"
    nav_line_3.style.backgroundColor = "#030501"
    
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
    nav_bar_container.classList.add('nav_bar_container');
    nav_bar_container.style.backgroundColor = "#c7c7c7"
    nav_bar_container.style.position = 'fixed'
    nav_bar_container.style.zIndex = "2"
    nav_bar_container.style.minHeight = '100vh'
    nav_bar_container.style.width = "300px"
    nav_bar_container.style.top = "0px"
    nav_bar_container.style.left = "-300px"
    nav_bar_container.style.transition = "0.3s ease-in"
    nav_bar_container.style.display = "flex"
    nav_bar_container.style.zIndex = "1000"
    

    // 導覽列容器
    const nav_bar_content_container = document.createElement('div')
    nav_bar_content_container.style.flexGrow = 1;
    nav_bar_content_container.style.display = "flex"
    nav_bar_content_container.style.flexDirection = "column"
    nav_bar_content_container.style.paddingBottom = "60px"

    // 使用者容器
    const user_display_container = document.createElement('div');
    user_display_container.classList.add("user_display_container")
    user_display_container.style.padding = "16px"
    user_display_container.style.display = "flex"
    user_display_container.style.justifyContent = "space-between"
    user_display_container.style.alignItems = "center"

    const homepage_btn = document.createElement('div');
    homepage_btn.style.width = "36px"
    homepage_btn.style.cursor = "pointer"

    const homepage_btn_img = document.createElement("img")
    homepage_btn_img.style.display = "block"
    homepage_btn_img.style.width = "100%"
    homepage_btn_img.src = "../../image/homepage.png"

    homepage_btn.appendChild(homepage_btn_img)

    homepage_btn.addEventListener("click", () => 
    {
            location.href = "../../frontpage_new/";
        // window.alert("登出摟")
    })

    const user_name_div = document.createElement('div')
    user_name_div.style.textAlign = "center"
    user_name_div.style.fontSize = "1.4rem"
    user_name_div.style.fontWeight = "600"
    user_name_div.innerText = `${user_data.name}`

    const logout_button = document.createElement('div');
    logout_button.style.width = "36px"
    logout_button.style.cursor = "pointer"

    const logout_button_img = document.createElement("img")
    logout_button_img.style.display = "block"
    logout_button_img.style.width = "100%"
    logout_button_img.src = "../../image/logout.png"

    logout_button.appendChild(logout_button_img)

    logout_button.addEventListener("click", () => 
    {
        if(confirm("是否登出,返回首頁?"))
        {
            logout();
            location.href = "../../login/";
        }
        // window.alert("登出摟")
    })

    user_display_container.appendChild(homepage_btn)
    user_display_container.appendChild(user_name_div)
    user_display_container.appendChild(logout_button)

    // 關閉導覽按鈕
    const nav_bar_close_button = document.createElement('div');
    nav_bar_close_button.classList.add("nav_bar_close_button");
    nav_bar_close_button.innerHTML = `
        <img 
            style="display: block;box-sizing: border-box;height: 100%; padding: 8px;transform: rotate(180deg);" 
            src="../../image/right-arrow.png" 
            alt="">
            <div>收合</div>
    `
    nav_bar_close_button.style.display = "flex"
    nav_bar_close_button.style.height = "40px"
    nav_bar_close_button.style.width = "300px"
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

    if (html_page == "frontpage_new") {
        nav_bar_tigger_container.style.border = "1px solid #ffffff"
        nav_line_1.style.backgroundColor = "#ffffff"
        nav_line_2.style.backgroundColor = "#ffffff"
        nav_line_3.style.backgroundColor = "#ffffff"

        nav_bar_container.style.left = "0px"
        nav_bar_tigger_container.style.opacity = 0
    }

    nav_bar_container.appendChild(nav_bar_content_container)
    nav_bar_container.appendChild(nav_bar_close_button)

    document.body.appendChild(nav_bar_tigger_container)
    document.body.appendChild(nav_bar_container)

    // 分頁展示
    const nav_bar_content = document.createElement('div');
    nav_bar_content.classList.add("nav_bar_content")
    nav_bar_content.style.overflowY = "auto"
    nav_bar_content.style.padding = "16px 20px"

    html_pages.forEach(element => {
        let nav_list_title = document.createElement("div");
        nav_list_title.classList.add("nav_list_title");
        nav_list_title.innerHTML = `${element.name}`;
        nav_list_title.style.fontWeight = "600";
        nav_list_title.style.fontSize = "28px";
        nav_list_title.style.color = "#000000";

        let nav_list_title_span = document.createElement("span");
        nav_list_title_span.classList.add("nav_list_title_span");
        nav_list_title_span.innerHTML = `${element.engname}`;
        nav_list_title_span.style.fontSize = '20px';
        nav_list_title_span.style.paddingLeft = '12px';

        nav_list_title.appendChild(nav_list_title_span);
        nav_bar_content.appendChild(nav_list_title);

        element['pages'].forEach(e => {
            if(e.html_name == html_page) {
                let nav_list_link = document.createElement('div');
                nav_list_link.classList.add("nav_list_link");
                nav_list_link.style.display = 'block';
                nav_list_link.style.margin = '18px 16px';
                nav_list_link.style.fontWeight = '600';
                nav_list_link.style.fontSize = '20px';
                // nav_list_link.style.textDecoration = 'underline';
                nav_list_link.style.color = '#000000';
                nav_list_link.style.lineHeight = '18px';
                nav_list_link.style.height = '22px';
                nav_list_link.style.display = 'flex';
                nav_list_link.style.alignItems = 'center';

                let nav_list_link_icon = document.createElement("img");
                nav_list_link_icon.src = e.icon_url;
                nav_list_link_icon.alt = `${e.html_name}_icon`;
                nav_list_link_icon.style.marginRight = '12px';
                nav_list_link_icon.style.height = '22px';
                nav_list_link_icon.style.objectFit = 'cover';
                nav_list_link_icon.style.display = 'block';

                let nav_list_link_content = document.createElement("span");
                let temp_charArr = e.html_ctName.split('');
                temp_charArr.forEach(item => {
                    nav_list_link_content.innerHTML += `<div>${item}</div>`;
                });
                nav_list_link_content.style.display = 'flex';
                nav_list_link_content.style.justifyContent = 'space-between';
                nav_list_link_content.style.width = '120px';
                nav_list_link_content.style.position = 'relative';

                let nav_list_link_content_underline = document.createElement("div");
                nav_list_link_content_underline.style.position = 'absolute';
                nav_list_link_content_underline.style.width = '100%';
                nav_list_link_content_underline.style.height = '2px';
                nav_list_link_content_underline.style.backgroundColor = '#000000';
                nav_list_link_content_underline.style.bottom = '-2px';
                nav_list_link_content_underline.style.left = '0px';

                nav_list_link_content.appendChild(nav_list_link_content_underline);

                nav_list_link.appendChild(nav_list_link_icon);
                nav_list_link.appendChild(nav_list_link_content);

                nav_bar_content.appendChild(nav_list_link);

            } else {
                let nav_list_link = document.createElement('a');
                nav_list_link.classList.add("nav_list_link");
                nav_list_link.href = `${e.html_url}`;
                nav_list_link.style.display = 'block';
                nav_list_link.style.margin = '18px 16px';
                nav_list_link.style.fontWeight = '600';
                nav_list_link.style.fontSize = '20px';
                nav_list_link.style.textDecoration = 'none';
                nav_list_link.style.color = '#000000';
                nav_list_link.style.lineHeight = '18px';
                nav_list_link.style.height = '22px';
                nav_list_link.style.display = 'flex';
                nav_list_link.style.alignItems = 'center';

                let nav_list_link_icon = document.createElement("img");
                nav_list_link_icon.src = e.icon_url;
                nav_list_link_icon.alt = `${e.html_name}_icon`;
                nav_list_link_icon.style.marginRight = '12px';
                nav_list_link_icon.style.height = '22px';
                nav_list_link_icon.style.objectFit = 'cover';
                nav_list_link_icon.style.display = 'block';

                let nav_list_link_content = document.createElement("span");
                let temp_charArr = e.html_ctName.split('');
                temp_charArr.forEach(item => {
                    nav_list_link_content.innerHTML += `<div>${item}</div>`;
                });
                nav_list_link_content.style.display = 'flex';
                nav_list_link_content.style.justifyContent = 'space-between';
                nav_list_link_content.style.width = '120px';
                
                nav_list_link.appendChild(nav_list_link_icon);
                nav_list_link.appendChild(nav_list_link_content);

                nav_bar_content.appendChild(nav_list_link);
            }
        });
    });

    // html_pages.forEach(element => {
    //     if (element.html_name == html_page) {
    //         nav_bar_content.innerHTML += `
    //             <div class="${element.html_name + "_class"}"                
    //                 style="background-color: #030501;
    //                 color: #F6F7F7;
    //                 border: 2px solid rgb(7, 50, 87);
    //                 border-radius: 5px;
    //                 font-size: 1.2rem;
    //                 text-align: center;
    //                 padding: 6px 12px;
    //                 margin: 12px 8px;
    //                 font-weight: 600;
    //             ">
    //             ${element.html_ctName}
    //             </div>
    //         `
    //     } else {
    //         nav_bar_content.innerHTML += `
    //         <a class="${element.html_name + "_class"}"
    //                 style="display: block;
    //                 background-color: #6B6B63;
    //                 color: #F6F7F7;
    //                 border: 2px solid #030501;
    //                 border-radius: 5px;
    //                 font-size: 1.2rem;
    //                 text-align: center;
    //                 padding: 6px 12px;
    //                 margin: 12px 8px;
    //                 font-weight: 600;
    //                 cursor: pointer;
    //                 text-decoration: none;"
    //             href="${element.html_url}">
    //         ${element.html_ctName}
    //         </a>
    //     `
    //     }
    // });

    // const nav_bar_content_type_container = document.createElement("div")
    // nav_bar_content_type_container.classList.add("nav_bar_content_type_container")
    // nav_bar_content_type_container.style.display = "flex"
    // nav_bar_content_type_container.style.justifyContent = "space-evenly"

    // const nav_bar_content_type_content_container = document.createElement("div")
    // nav_bar_content_type_content_container.classList.add("nav_bar_content_type_content_container")
    // nav_bar_content_type_content_container.style.width = "100%"
    // nav_bar_content_type_content_container.style.height = "0px"
    // nav_bar_content_type_content_container.style.display = "flex"
    // nav_bar_content_type_content_container.style.justifyContent = "space-evenly"
    // nav_bar_content_type_content_container.style.overflow = "hidden"
    // nav_bar_content_type_content_container.style.transition = "all 0.3s ease-in"

    // block_select.forEach(element => {
    //     let type_btn = document.createElement("div")
    //     type_btn.classList.add(`btn_${Object.keys(element)[0]}`)
    //     type_btn.classList.add(`type_btn`)
    //     type_btn.style.display = "flex"
    //     type_btn.style.justifyContent = "space-between"
    //     type_btn.style.alignItems = "center"
    //     type_btn.style.width = "40%"
    //     type_btn.style.padding = "4px 8px"
    //     type_btn.style.cursor = "pointer"
    //     type_btn.style.position = "relative"

    //     let type_btn_name = document.createElement("div")
    //     type_btn_name.classList.add("type_btn_name")
    //     type_btn_name.style.fontSize = "1.2rem"
    //     type_btn_name.style.fontWeight = "600"
    //     type_btn_name.innerHTML = `${element[`${Object.keys(element)[0]}`].name}`

    //     let type_btn_arrow = document.createElement("img")
    //     type_btn_arrow.classList.add("type_btn_arrow")
    //     type_btn_arrow.src = '../../image/left-arrow.png'
    //     type_btn_arrow.style.display = "block"
    //     type_btn_arrow.style.width = "14px"
    //     type_btn_arrow.style.transition = "all 0.3s ease-in"

    //     let bottom_line = document.createElement("div")
    //     bottom_line.classList.add("bottom_line")
    //     bottom_line.style.position = "absolute"
    //     bottom_line.style.width = "90%"
    //     bottom_line.style.height = "2px"
    //     bottom_line.style.backgroundColor = "black"
    //     bottom_line.style.bottom = "0"
    //     bottom_line.style.left = "6px"

    //     type_btn.appendChild(type_btn_name)
    //     type_btn.appendChild(type_btn_arrow)
    //     type_btn.appendChild(bottom_line)
    //     nav_bar_content_type_container.appendChild(type_btn)

    //     let type_content = document.createElement("div")
    //     type_content.classList.add(`type_content`)
    //     type_content.classList.add(`type_content_${Object.keys(element)[0]}`)
    //     type_content.style.width = "40%"
    //     type_content.style.padding = "4px 8px"
    //     type_content.style.opacity = "0"
    //     type_content.style.display = "none"
    //     type_content.style.transition = "all 0.3s ease-in"
    //     element[`${Object.keys(element)[0]}`]["pages"].forEach(e => {
    //         if (e.html_name == html_page) {
    //             type_content.innerHTML += `
    //                 <div class="${e.html_name + "_class"}"                
    //                     style="background-color: #030501;
    //                     color: #F6F7F7;
    //                     border: 2px solid rgb(7, 50, 87);
    //                     border-radius: 5px;
    //                     font-size: 1rem;
    //                     text-align: center;
    //                     padding: 6px;
    //                     margin: 12px 2px;
    //                     font-weight: 600;
    //                 ">
    //                 ${e.html_ctName}
    //                 </div>
    //             `
    //         } else {
    //             type_content.innerHTML += `
    //             <a class="${e.html_name + "_class"}"
    //                     style="display: block;
    //                     background-color: #6B6B63;
    //                     color: #F6F7F7;
    //                     border: 2px solid #030501;
    //                     border-radius: 5px;
    //                     font-size: 1rem;
    //                     text-align: center;
    //                     padding: 6px;
    //                     margin: 12px 2px;
    //                     font-weight: 600;
    //                     text-decoration: none;"
    //                 href="${e.html_url}">
    //             ${e.html_ctName}
    //             </a>
    //         `
    //         }
    //     })

    //     nav_bar_content_type_content_container.appendChild(type_content)
    // });
    
    // nav_bar_content.appendChild(nav_bar_content_type_container)
    // nav_bar_content.appendChild(nav_bar_content_type_content_container)
    
    // user_display_container.appendChild(logout_button)
    nav_bar_content_container.appendChild(user_display_container)
    nav_bar_content_container.appendChild(nav_bar_close_button)
    nav_bar_content_container.appendChild(nav_bar_content)

    // let type_btn = document.querySelectorAll('.type_btn')
    // type_btn.forEach(e => {
    //     e.addEventListener("click", (e) => {
    //         let target_img = e.target.getElementsByTagName('img');
    //         let type_content = document.querySelectorAll('.type_content')
    //         let type_of_select = e.target.classList[0].split("_")[1]

    //         if (e.target.classList[2]) {
    //             type_btn.forEach(element => {
    //                 element.classList.remove("btn_active")
    //             })
    //             target_img[0].style.transform = "rotate(0deg)"
    //             nav_bar_content_type_content_container.style.height = "0px"
    //             type_content.forEach(element => {
    //                 element.style.opacity = "0"
    //                 element.style.pointerEvents = "none"
    //             })

    //         } else {
    //             type_btn.forEach(element => {
    //                 if(element.classList[2]) {
    //                     element.classList.remove("btn_active")
    //                 }
    //             })
    //             e.target.classList.add("btn_active")
    //             let type_btn_arrow = document.querySelectorAll(".type_btn_arrow")
    //             type_btn_arrow.forEach((e) => {
    //                 e.style.transform = "rotate(0deg)";
    //             })
    //             target_img = e.target.getElementsByTagName('img');
    //             type_content.forEach(element => {
    //                 if (type_of_select == element.classList[1].split("_")[2]) {
    //                     let active_div = document.querySelector(`.${element.classList[1]}`)
    //                     active_div.style.display = "block"
    //                     active_div.style.opacity = "1"
    //                     active_div.style.pointerEvents = ""
    //                 } else {
    //                     element.style.display = "block"
    //                     element.style.opacity = "0"
    //                     element.style.pointerEvents = "none"
    //                 }
    //             })
    //             target_img[0].style.transform = "rotate(-90deg)"
    //             nav_bar_content_type_content_container.style.height = "120px"
    //         }
    //     })
    // })
}

// hover動畫改變背景顏色
function hover_style_change_bgc 
(target, before_bgc, after_bgc) {
    target.addEventListener('mouseenter', () => {
        target.style.backgroundColor = after_bgc
        target.style.transition = "0.2s ease-out"
    })
    target.addEventListener('mouseleave', () => {
        target.style.transition = "0.2s ease-out"
        target.style.backgroundColor = before_bgc
    })
}

