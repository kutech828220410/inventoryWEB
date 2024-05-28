let web_info = {
    company_name: "鴻森智能科技有限公司",
    system_name: "次世代智慧藥局整合平台",
    logo_url: "../image/hs_logo.png",
    tel: "02-82822040",
    fax: "02-82821373",
    mail: "kutech@outlook.com",
    GUI_number: "66437068",
    location: "新北市蘆洲區和平路114巷8號6樓",
    business: ["自動化控制", " | ", "工聯網規劃", " | ", "智慧醫療"],
    product: [
        {
            name: "智慧調劑台",
            small_pic_url: "../image/about/table.jpg",
            content: "實現智慧藥局的第一步"
        },
        {
            name: "FADC全自動智能管制藥櫃",
            small_pic_url: "../image/about/FADC.jpg",
            content: "依據處方籤自動給藥，自動取藥無需點數量"
        },
        {
            name: "癌症藥局備藥機",
            small_pic_url: "../image/about/RFADC.jpg",
            content: "節省人力、全自動備藥系統"
        },
        {
            name: "智慧庫儲藥庫",
            small_pic_url: "../image/about/storehouse.jpg",
            content: "完美媒合原有流程，搭載智慧行動盤點"
        }
    ]
};
let popup_info_div;

function get_popup_info()
{
    popup_info_div = new Basic_popup_Div('popup_info_div','popup_info_div','','');
    popup_info_div._popup_div.style.border = '10px solid white';

    let header = get_ppi_header();
    let main = get_ppi_main();
    let footer = get_ppi_footer();

    popup_info_div.AddControl(header);
    popup_info_div.AddControl(main);
    popup_info_div.AddControl(footer);

    return popup_info_div;
};
function get_ppi_header() {
    let ppi_header_container = document.createElement("div");
    ppi_header_container.classList.add("ppi_header_container");

    let ppi_header_content = document.createElement("div");
    ppi_header_content.classList.add("ppi_header_content");
    ppi_header_content.innerHTML = web_info.system_name;

    let ppi_close_btn = document.createElement("img");
    ppi_close_btn.classList.add("ppi_close_btn");
    ppi_close_btn.src = "../image/close.png";
    ppi_close_btn.alt = "close popup window";
    ppi_close_btn.addEventListener("click", () => {
        popup_info_div_close();
    });

    ppi_header_container.appendChild(ppi_header_content);
    ppi_header_container.appendChild(ppi_close_btn);

    return ppi_header_container;
}
function get_ppi_main() {
    let ppi_main_container = document.createElement("div");
    ppi_main_container.classList.add("ppi_main_container");

    let top_main_div = set_company_info();
    let mid_main_div = set_business_list();
    let bottom_main_div = set_product_list();

    ppi_main_container.appendChild(top_main_div);
    ppi_main_container.appendChild(mid_main_div);
    ppi_main_container.appendChild(bottom_main_div);

    return ppi_main_container;
}

function get_ppi_footer() {
    let ppi_footer_container = document.createElement("div");
    ppi_footer_container.classList.add("ppi_footer_container");

    let version_download_btn = document.createElement("div")
    version_download_btn.classList.add("btn");
    version_download_btn.innerHTML = "版本";
    version_download_btn.addEventListener("click", () => {
        if(confirm("是否下載版本檔案")) {
            download_api_version_txt();
            download_web_version_txt();
        }
    });

    ppi_footer_container.appendChild(version_download_btn);

    return ppi_footer_container;
}

function set_company_info() {
    let main_info = document.createElement("div");
    main_info.classList.add("main_info");

    let logo_div = document.createElement("div");
    logo_div.classList.add("logo_div");
    logo_div.innerHTML = `
        <img class="logo_div_img" src="${web_info.logo_url}" alt="鴻森logo">
        <div class="logo_div_c_name">${web_info.company_name}</div>
    `;

    let i_am_line = document.createElement("div");
    i_am_line.classList.add("i_am_line");

    let company_info_div = document.createElement("div");
    company_info_div.classList.add("company_info_div");
    company_info_div.innerHTML = `
        <div class="company_info_container">
            <img class="company_info_icon" src="../image/about/telephone.png" alt="電話icon">
            <div class="company_info_content">${web_info.tel}</div>
        </div>
        <div class="company_info_container">
            <img class="company_info_icon" src="../image/about/fax.png" alt="傳真icon">
            <div class="company_info_content">${web_info.fax}</div>
        </div>
        <div class="company_info_container">
            <img class="company_info_icon" src="../image/about/mail.png" alt="信箱icon">
            <div class="company_info_content">${web_info.mail}</div>
        </div>
        <div class="company_info_container">
            <img class="company_info_icon" src="../image/about/location.png" alt="地址icon">
            <div class="company_info_content">${web_info.location}</div>
        </div>
        <div class="company_info_container">
            <span>統編：</span>
            <div class="company_info_content">${web_info.GUI_number}</div>
        </div>
    `;


    main_info.appendChild(logo_div);
    main_info.appendChild(i_am_line);
    main_info.appendChild(company_info_div);

    return main_info
}

function set_business_list() {
    let business_div = document.createElement("div");
    business_div.classList.add("business_div");

    web_info["business"].forEach(element => {
        let business_content = document.createElement("div");
        business_content.classList.add("business_content");
        business_content.innerHTML = element;

        business_div.appendChild(business_content);
    });

    return  business_div;
}

function set_product_list() {
    let product_div = document.createElement("div");
    product_div.classList.add("product_div");

    web_info["product"].forEach(element => {
        let proudct_container = document.createElement("div");
        proudct_container.classList.add("proudct_container");
        proudct_container.innerHTML = `
            <img class="proudct_icon" src="${element.small_pic_url}" alt="product icon">
            <div class="proudct_name">${element.name}</div>
        `

        product_div.appendChild(proudct_container);
    });

    return product_div;
}

function popup_info_div_close() {
    popup_info_div.Set_Visible(false);
}

function popup_info_div_open() {
    popup_info_div.Set_Visible(true);
}

function download_web_version_txt() {
    let protocol = window.location.protocol;
    // 設置文件的URL，根據頁面的協議動態設置
    // const fileUrl = protocol + '//your-server-address/path/to/text.txt';
    let file_url = protocol + "../version.txt";
    // 創建一個隱藏的<a>元素，設置其href屬性指向文件URL
    let a = document.createElement('a');
    a.style.display = 'none';
    a.href = file_url;
    a.download = 'web_version.txt';  // 這個屬性確保文件會被下載而不是打開
    // 將<a>元素添加到DOM中
    document.body.appendChild(a);
    // 觸發點擊事件下載文件
    a.click();
    // 下載後移除<a>元素
    document.body.removeChild(a);
}
async function download_api_version_txt() {
    let api_version_data = await get_api_version();
    console.log(api_version_data);
    // 定義要下載的TXT文件內容
    let text = `當前API_${api_version_data.Data[4]}版本。`;

    // 創建一個Blob對象來保存文本內容
    let blob = new Blob([text], { type: 'text/plain' });

    // 創建一個URL指向Blob對象
    let url = URL.createObjectURL(blob);

    // 創建一個隱藏的<a>元素，設置其下載屬性
    let a = document.createElement('a');
    a.style.display = 'none';
    a.href = url;
    a.download = 'api_version.txt';

    // 將<a>元素添加到DOM中
    document.body.appendChild(a);

    // 觸發點擊事件下載文件
    a.click();

    // 下載後移除<a>元素並釋放URL對象
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}
