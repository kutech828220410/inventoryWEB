var popup_add_med_div;

function get_popup_add_med()
{
    popup_add_med_div = new Basic_popup_Div('popup_add_med_div','popup_add_med_div','330px','');
    popup_add_med_div._popup_div.style.border = '10px solid white';
    const title_text = get_title_add_med();
    const serch_box_div = get_serch_box_add_med();
    const underline = get_underline_add_med();

    popup_add_med_div.AddControl(title_text);
    popup_add_med_div.AddControl(serch_box_div);
    popup_add_med_div.AddControl(underline);

    return popup_add_med_div;
}

function get_title_add_med()
{
    const title_text = document.createElement('div');
    My_Div.Init(title_text, 'title_add_med_div','title_add_med_div', '100%', '40px', 'gray');
    My_Div.Set_Text(title_text ,"新增藥品" , TextAlignEnum.CENTER , "24px", true,"微軟正黑體","white");
    title_text.style.borderRadius = "5px";
    title_text.style.marginBottom = "10px";
    return title_text;
}

function get_serch_box_add_med()
{
    const serch_box_add_med_div = document.createElement('div');
    My_Div.Init(serch_box_add_med_div,'serch_box_add_med_div','serch_box_add_med_div', '100%','','');
    My_Div.Set_Block(serch_box_add_med_div, DisplayEnum.FLEX, FlexDirectionEnum.COLUMN, JustifyContentEnum.CENTER);
    serch_box_add_med_div.style.alignItems = "center";
    serch_box_add_med_div.style.flexWrap  = "wrap";

    const search_med_for_add_div = document.createElement("div");
    search_med_for_add_div.classList.add("search_med_for_add_div");
    search_med_for_add_div.style.display = "flex";
    search_med_for_add_div.style.justifyContent = "space-between";
    search_med_for_add_div.style.width = "100%";
    search_med_for_add_div.style.padding = "4px 4px";
    search_med_for_add_div.style.boxSizing = "border-box";


    const search_med_input = document.createElement("input");
    search_med_input.classList.add("search_med_input");
    search_med_input.placeholder = "輸入藥品資訊";
    search_med_input.style.display = "block";
    search_med_input.style.padding = "2px 8px";
    search_med_input.style.fontSize = "20px";
    search_med_input.style.boxSizing = "border-box";
    search_med_input.style.width = "248px";
    search_med_input.style.textAlign = "center";
    search_med_input.addEventListener("keydown", async(e) => {
        if (e.keyCode === "Enter" || e.keyCode == 13) {
            if(search_med_input.value == "") {
                return;
            } else {
                let response = await serch_by_BarCode(search_med_input.value ,med_data.Data);
                console.log("serch_by_BarCode",response);
        
                if(response['Data'].length == 0) {
                    console.log(search_med_input.value);
                    let temp_med_data_for_search = med_data["Data"].filter(e => {
                        return e["NAME"].includes(search_med_input.value);
                    });
    
                    if(temp_med_data_for_search.length != 0) {
                        console.log(temp_med_data_for_search);
                        get_search_med_result_div_row(temp_med_data_for_search);
                    } else {
                        alert('查無此藥品');
                        return;
                    }
                } else {
                    let temp_med_data_for_search = med_data["Data"].filter(e => {
                        return e.CODE == response['Data'][0].CODE;
                    })
                    console.log(temp_med_data_for_search);
                    get_search_med_result_div_row(temp_med_data_for_search);
                }
                search_med_input.value = "";
            }
        }
    });

    const search_med_button = document.createElement("div");
    search_med_button.classList.add("search_med_button");
    search_med_button.innerHTML = "搜尋";
    search_med_button.style.boxSizing = "border-box";
    search_med_button.style.padding = "4px 12px";
    search_med_button.style.border = "1px solid #000000";
    search_med_button.style.borderRadius = "5px"; 
    search_med_button.style.fontWeight = "600"; 
    search_med_button.style.backgroundColor = "#696969";
    search_med_button.style.color = "#ffffff";
    search_med_button.style.cursor = "pointer";
    search_med_button.style.minWidth = "60px";
    search_med_button.style.textAlign = "center";

    search_med_button.addEventListener("click", async() => {
        if(search_med_input.value == "") {
            return;
        } else {
            // 以barcode或code搜尋結果
            let response = await serch_by_BarCode(search_med_input.value ,med_data.Data);
            console.log("serch_by_BarCode",response);
    
            if(response['Data'].length == 0) {
                let temp_med_data_for_search = med_data["Data"].filter(e => {
                    return e["NAME"].includes(search_med_input.value);
                });

                if(temp_med_data_for_search.length != 0) {
                    console.log(temp_med_data_for_search);
                    get_search_med_result_div_row(temp_med_data_for_search);
                } else {
                    alert('查無此藥品');
                    return;
                }
            } else {
                let temp_med_data_for_search = med_data["Data"].filter(e => {
                    return e.CODE == response['Data'][0].CODE;
                });
                console.log(temp_med_data_for_search);
                get_search_med_result_div_row(temp_med_data_for_search);
            }
            search_med_input.value = "";
            search_med_input.blur();
        }
    })

    search_med_for_add_div.appendChild(search_med_input);
    search_med_for_add_div.appendChild(search_med_button);

    const search_result_div_container = document.createElement("div");
    search_result_div_container.classList.add('search_result_div_container');
    search_result_div_container.style.boxSizing = "border-box";
    search_result_div_container.style.overflowY = "auto";
    search_result_div_container.style.height = "220px";
    search_result_div_container.style.width = "100%";
    search_result_div_container.style.boxSizing = "border-box";
    search_result_div_container.style.padding = "4px 12px 4px 2px";

    
    serch_box_add_med_div.appendChild(search_med_for_add_div);
    serch_box_add_med_div.appendChild(search_result_div_container);

    return serch_box_add_med_div;
}

function get_underline_add_med()
{
    const underline_div = document.createElement('div');
    My_Div.Init(underline_div, 'underline_div_serch_div_popup_serch','underline_div_serch_div_popup_serch', '100%','60px','');
    My_Div.Set_Block(underline_div, DisplayEnum.FLEX, FlexDirectionEnum.ROW, JustifyContentEnum.RIGHT);
    underline_div.style.alignItems = "center";

    const underline_serchtype_div = document.createElement('div');
    My_Div.Init(underline_serchtype_div, 'underline_serchtype_div_popup_serch','underline_serchtype_div_popup_serch', '90%','100%','');
    My_Div.Set_Block(underline_serchtype_div, DisplayEnum.FLEX, FlexDirectionEnum.ROW, JustifyContentEnum.LEFT);
    underline_div.style.alignItems = "center";

    const close_add_med_div = document.createElement("div");
    close_add_med_div.classList.add("close_add_med_div");
    close_add_med_div.innerHTML = '關閉設定';
    close_add_med_div.style.padding = '7px 12px';
    close_add_med_div.style.borderRadius = "5px";
    close_add_med_div.style.border = "2px solid gray";
    close_add_med_div.style.backgroundColor = "#454545";
    close_add_med_div.style.color = "#F0F0F0";
    close_add_med_div.style.fontWeight = "600";
    close_add_med_div.style.cursor = "pointer";

    close_add_med_div.addEventListener("click", () => {
        hide_add_med();
    });

    underline_serchtype_div.appendChild(close_add_med_div);
    
    const svg_undo_SVG = Get_undo_SVG("40px","100%" ,"60%","100%","");
    My_Div.Init(svg_undo_SVG, 'svg_undo_SVG_d_o','svg_undo_SVG_d_o', '40px', '40px', '');
    svg_undo_SVG.style.border = "1px solid gray";
    svg_undo_SVG.style.borderRadius = "3px";
    svg_undo_SVG.style.marginRight = "5px";
    svg_undo_SVG.addEventListener('click', function()
    {
        let title_add_med_div = document.querySelector(".title_add_med_div");
        let IC_SN = title_add_med_div.getAttribute('IC_SN')
        let GUID = title_add_med_div.getAttribute('_GUID')
        return_setting(IC_SN, GUID);
    });
    underline_div.appendChild(underline_serchtype_div);

    underline_div.appendChild(svg_undo_SVG);
    // underline_div.appendChild(svg_confirm_SVG);
    return underline_div;
}

async function show_add_med(_IC_SN, _GUID)
{
    showLoadingPopup();
    let IC_SN = _IC_SN;
    let GUID = _GUID;
    // let IC_SN = e.target.getAttribute("IC_SN");
    // 取得盤點單資料
    let data_by_IC_SN = await get_all_d_o(IC_SN);
    // 取得所有藥品資料
    // let med_data = await get_medicine_cloud();
    let temp_med_data = {}
    med_data["Data"].forEach(element => {
        temp_med_data[element.CODE] = element
    });
    console.log("data_by_IC_SN",data_by_IC_SN);
    // console.log("med_data",med_data.Data);
    console.log(temp_med_data);
    
    let title_add_med_div = document.querySelector(".title_add_med_div");
    title_add_med_div.setAttribute("IC_SN", IC_SN);
    title_add_med_div.setAttribute("GUID", GUID);

    med_add_event = true;
    // console.log("med_add_event",med_add_event);
    popup_add_med_div.Set_Visible(true);
    hideLoadingPopup();
}

function hide_add_med()
{
    let title_add_med_div = document.querySelector(".title_add_med_div");
    title_add_med_div.setAttribute("IC_SN", "");
    title_add_med_div.setAttribute("GUID", "");
    med_add_event = false;
    init_search_add_med_div();
    // console.log("med_add_event",med_add_event);
    popup_add_med_div.Set_Visible(false);
}

BarcodeKeyinEvent = BarcodeKeyin;
async function BarcodeKeyin(parsedCode)
{
    if(med_add_event) {
        let search_med_input = document.querySelector(".search_med_input");
        if(document.activeElement == search_med_input) return;
    
        const response = await serch_by_BarCode(parsedCode ,med_data.Data);
        console.log("serch_by_BarCode",response);

        if(response['Data'].length == 0) {
            let temp_med_data_for_search = med_data["Data"].filter(e => {
                return e["NAME"].includes(parsedCode);
            });

            if(temp_med_data_for_search.length != 0) {
                console.log(temp_med_data_for_search);
                get_search_med_result_div_row(temp_med_data_for_search);
            } else {
                alert('查無此藥品');
                return;
            }
        } else {
            let temp_med_data_for_search = med_data["Data"].filter(e => {
                return e.CODE == response['Data'][0].CODE;
            })
            console.log(temp_med_data_for_search);
            get_search_med_result_div_row(temp_med_data_for_search);
        }
    } else {
        return;
    }
}

function init_search_add_med_div() {
    let search_result_div_container = document.querySelector(".search_result_div_container");
    search_result_div_container.innerHTML = "";
};

async function get_search_med_result_div_row(arr) {
    init_search_add_med_div();
    let search_result_div_container = document.querySelector(".search_result_div_container");

    arr.forEach(element => {
        let med_add_item_div = document.createElement("div");
        med_add_item_div.classList.add('med_add_item_div');

        let med_add_item_title = document.createElement("div");
        med_add_item_title.classList.add("med_add_item_title");
        med_add_item_title.innerHTML = `(英）${element.NAME}`;

        let med_add_item_CT_title = document.createElement("div");
        med_add_item_CT_title.classList.add("med_add_item_CT_title");
        if(element.CHT_NAME == "") {
            med_add_item_CT_title.innerHTML = "(中）無";
        } else {
            med_add_item_CT_title.innerHTML = `(中）${element.CHT_NAME}`;
        }

        let med_add_item_CODE_title = document.createElement("div");
        med_add_item_CODE_title.classList.add("med_add_item_CODE_title");
        med_add_item_CODE_title.innerHTML = `藥碼：${element.CODE}`;

        med_add_item_div.appendChild(med_add_item_title);
        med_add_item_div.appendChild(med_add_item_CT_title);
        med_add_item_div.appendChild(med_add_item_CODE_title);

        med_add_item_div.addEventListener("click", () => {
            if(confirm(`是否新增藥品：${element.NAME}?`)) {
                content_add_by_IC_SN(element);
            }
        })

        search_result_div_container.appendChild(med_add_item_div);
    });
}

async function content_add_by_IC_SN(add_data) {
    let title_add_med_div = document.querySelector(".title_add_med_div");
    let _IC_SN = title_add_med_div.getAttribute("IC_SN");

    let temp_data = {
        CODE: "",
        SKDIACODE: "",
        CHT_NAME: "",
        NAME: "",
        PAKAGE: "",
        BARCODE1: "",
        BARCODE2: "[]",
        START_QTY: "0",
        END_QTY: "0",
        NOTE: "",
        Sub_content: []
    };
    
    temp_data.CODE = add_data.CODE;
    temp_data.SKDIACODE = add_data.SKDIACODE;
    temp_data.CHT_NAME = add_data.CHT_NAME;
    temp_data.NAME = add_data.NAME;
    temp_data.PAKAGE = add_data.PAKAGE;
    temp_data.BARCODE1 = add_data.BARCODE1;
    temp_data.BARCODE2 = add_data.BARCODE2;

    console.log(temp_data.CODE);
    console.log(temp_data.SKDIACODE);
    console.log(temp_data.CHT_NAME);
    console.log(temp_data.NAME);
    console.log(temp_data.PAKAGE);
    console.log(temp_data.BARCODE1);
    console.log(temp_data.BARCODE2);

    console.log("IC_SN",_IC_SN);
    console.log("temp_data",temp_data);
    temp_data = JSON.stringify(temp_data);

    try {
        const response = await fetch(`${api_ip}api/inventory/content_add_by_IC_SN`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: {
                "Data": {"Contents": [ {temp_data} ] },
                "Value" : `${_IC_SN}`
            }
        });

        // [
        //     {
        //         "CODE": `${add_data.CODE}`,
        //         "SKDIACODE": `${add_data.SKDIACODE}`,
        //         "CHT_NAME": `${add_data.CHT_NAME}`,
        //         "NAME": `${add_data.NAME}`,
        //         "PAKAGE": `${add_data.PAKAGE}`,
        //         "BARCODE1": `${add_data.BARCODE1}`,
        //         "BARCODE2": `${add_data.BARCODE2}`,
        //         "START_QTY": "0",
        //         "END_QTY": "0",
        //         "NOTE": "",
        //         "Sub_content": []
        //     }
        // ]

        if (!response.ok) {
            throw new Error('请求失败');
        }

        const responseData = await response.json();
        return responseData;
    } catch (error) {
        console.error(error);
        //throw error;
    }
}
