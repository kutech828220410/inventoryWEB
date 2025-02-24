let popup_confrim_IC_SN;

function get_popup_confrim_IC_SN() {
    popup_confrim_IC_SN = new Basic_popup_Div('popup_confrim_IC_SN','popup_confrim_IC_SN','','');
    popup_confrim_IC_SN._popup_div.style.border = '10px solid white';

    let header = get_pp_confrim_IC_SN_header();
    let main = get_pp_confrim_IC_SN_main();
    let footer = get_pp_confrim_IC_SN_footer();

    popup_confrim_IC_SN.AddControl(header);
    popup_confrim_IC_SN.AddControl(main);
    popup_confrim_IC_SN.AddControl(footer);

    return popup_confrim_IC_SN;
};
function get_pp_confrim_IC_SN_header() {
    let ppcis_header_container = document.createElement("div");
    ppcis_header_container.classList.add("ppcis_header_container");

    let ppcis_h_title = document.createElement("div");
    ppcis_h_title.classList.add("ppcis_h_title");
    ppcis_h_title.innerHTML = `驗收單號確認`;

    let ppcis_h_close_btn = document.createElement("img");
    ppcis_h_close_btn.classList.add("ppcis_h_close_btn");
    ppcis_h_close_btn.src = "../image/close.png";
    ppcis_h_close_btn.addEventListener("click", () => {
        popup_confrim_IC_SN_close();
    });

    ppcis_header_container.appendChild(ppcis_h_title);
    ppcis_header_container.appendChild(ppcis_h_close_btn);

    return ppcis_header_container;
}
function get_pp_confrim_IC_SN_main() {
    let ppcis_main_container = document.createElement("div");
    ppcis_main_container.classList.add("ppcis_main_container");

    let ppcis_select = document.createElement("select");
    ppcis_select.classList.add("ppcis_select");
    ppcis_select.id = "ppcis_select";

    ppcis_main_container.appendChild(ppcis_select);

    return ppcis_main_container;
}
function get_pp_confrim_IC_SN_footer() {
    let ppcis_footer_container = document.createElement("div");
    ppcis_footer_container.classList.add("ppcis_footer_container");

    let ppcis_f_select_btn = document.createElement("div");
    ppcis_f_select_btn.classList.add("ppcis_f_select_btn");
    ppcis_f_select_btn.classList.add("btn");
    ppcis_f_select_btn.innerHTML = `確認`;
    ppcis_f_select_btn.addEventListener("click", async () => {
        let ppcis_select = document.querySelector(".ppcis_select");
        if(ppcis_select.value == "none") {
            alert("未選取請購單號");
            return;
        } else {
            IC_SN = ppcis_select.value;
            popup_confrim_IC_SN_close();
            handleFileInput();
        }
    });

    ppcis_footer_container.appendChild(ppcis_f_select_btn);

    return ppcis_footer_container;
}
function popup_confrim_IC_SN_close() {
    popup_confrim_IC_SN.Set_Visible(false);
}
async function popup_confrim_IC_SN_open() {
    await get_all_IC_SN();
    popup_confrim_IC_SN.Set_Visible(true);
}

async function get_all_IC_SN() {
    let currentDate = new Date();
    let date_end = DateTimeAddDays(currentDate, 1);
    let date_start = DateTimeAddDays(currentDate, -30);
    date_start = getDateStr(date_start);
    date_end = getDateStr(date_end);
    
    let get_ic_sn_return_data = await creat_get_by_CT_TIME_ST_END(date_start, date_end);
    console.log(get_ic_sn_return_data);
    if(get_ic_sn_return_data.Code != -200) {
        get_ic_sn_return_data = get_ic_sn_return_data.Data;
        let ppcis_select = document.querySelector(".ppcis_select");
        ppcis_select.innerHTML = `
        <option value="none">請選擇請購單號</option>
        `
        get_ic_sn_return_data.forEach(element => {
            let option = document.createElement("option");
            option.value = element.IC_SN;
            option.innerHTML = element.IC_SN;

            ppcis_select.appendChild(option);
        });
    } else {
        alert("API Error", `${get_ic_sn_return_data.Result}`);
    }
}

async function creat_get_by_CT_TIME_ST_END(date_ST, date_END)
{
  const post_data = 
  {
    "Data": {
      "GUID": null,
      "IC_SN": null,
      "CT": null,
      "CT_TIME": null,
      "START_TIME": null,
      "END_TIME": null,
      "STATE": null,
      "Contents": []
    },
    "Code": 0,
    "Result": "",
    "Value": `${date_ST},${date_END}`,
    "ServerName" : ServerName,
    "ServerType" : ServerType,
    "TableName" : TableName,
    "TimeTaken": ""
  };
  let _url = `${inspection_url}/creat_get_by_CT_TIME_ST_END`;
  console.log(`Url [${arguments.callee.name}]` , _url);
  console.log(`Post_data [${arguments.callee.name}]`,post_data);
  let response = await postDataToAPI(`${_url}`,post_data);
  return response;
}