var popup_add_OP_div;

function get_popup_add_OP()
{
    popup_add_OP_div = new Basic_popup_Div('popup_add_OP_div','popup_add_OP_div','330px','');
    popup_add_OP_div._popup_div.style.border = '10px solid white';
    const title_text = get_title_d_o();
    const serch_box_div = get_serch_box_d_o();
    const underline = get_underline_d_o();

    popup_add_OP_div.AddControl(title_text);
    popup_add_OP_div.AddControl(serch_box_div);
    popup_add_OP_div.AddControl(underline);

    return popup_add_OP_div;
}

function get_title_d_o()
{
    const title_text = document.createElement('div');
    My_Div.Init(title_text, 'title_add_d_o_div','title_add_d_o_div', '100%', '40px', 'gray');
    My_Div.Set_Text(title_text ,"編輯盤點人資料" , TextAlignEnum.CENTER , "24px", true,"微軟正黑體","white");
    title_text.style.borderRadius = "5px";
    title_text.style.marginBottom = "10px";
    return title_text;
}

function get_serch_box_d_o()
{
    const serch_box_div = document.createElement('div');
    My_Div.Init(serch_box_div,'serch_box_div_popup_serch','serch_box_div_popup_serch', '100%','260px','');
    My_Div.Set_Block(serch_box_div, DisplayEnum.FLEX, FlexDirectionEnum.COLUMN, JustifyContentEnum.CENTER);
    serch_box_div.style.alignItems = "center";
    serch_box_div.style.flexWrap  = "wrap";

    for (let i = 1; i <= 10; i++) {
        const d_o_name_input = document.createElement('input');
        My_Div.Init(d_o_name_input,'d_o_name_input',`d_o_name_input_${i}`, '40%','40px','');
        My_Div.Set_Text(d_o_name_input ,"" , TextAlignEnum.CENTER , "18px", false ,"微軟正黑體","black");
        d_o_name_input.placeholder = `盤點人-${i}`;
        d_o_name_input.style.borderRadius = "3px";
        d_o_name_input.style.border = "1px solid gray";
        d_o_name_input.style.paddingLeft = "10px";
        d_o_name_input.style.marginTop = "10px";

        serch_box_div.appendChild(d_o_name_input);
    }

    return serch_box_div;
}

function get_underline_d_o()
{
    const underline_div = document.createElement('div');
    My_Div.Init(underline_div, 'underline_div_serch_div_popup_serch','underline_div_serch_div_popup_serch', '100%','60px','');
    My_Div.Set_Block(underline_div, DisplayEnum.FLEX, FlexDirectionEnum.ROW, JustifyContentEnum.RIGHT);
    underline_div.style.alignItems = "center";

    const underline_serchtype_div = document.createElement('div');
    My_Div.Init(underline_serchtype_div, 'underline_serchtype_div_popup_serch','underline_serchtype_div_popup_serch', '72%','100%','');
    My_Div.Set_Block(underline_serchtype_div, DisplayEnum.FLEX, FlexDirectionEnum.ROW, JustifyContentEnum.LEFT);
    underline_div.style.alignItems = "center";
    

    const svg_confirm_SVG = Get_confirm_SVG("40px","100%" ,"60%","100%","green");
    My_Div.Init(svg_confirm_SVG, 'svg_confirm_SVG_d_o','svg_confirm_SVG_d_o', '40px', '40px', '');
    svg_confirm_SVG.style.border = "1px solid gray";
    svg_confirm_SVG.style.borderRadius = "3px";
    svg_confirm_SVG.style.marginRight = "5px";
    svg_confirm_SVG.addEventListener('click', function()
    {
        updata_d_o();
    });
    const svg_undo_SVG = Get_undo_SVG("40px","100%" ,"60%","100%","");
    My_Div.Init(svg_undo_SVG, 'svg_undo_SVG_d_o','svg_undo_SVG_d_o', '40px', '40px', '');
    svg_undo_SVG.style.border = "1px solid gray";
    svg_undo_SVG.style.borderRadius = "3px";
    svg_undo_SVG.style.marginRight = "5px";
    svg_undo_SVG.addEventListener('click', function()
    {
        hide_d_o();
    });
    underline_div.appendChild(underline_serchtype_div);

    underline_div.appendChild(svg_undo_SVG);
    underline_div.appendChild(svg_confirm_SVG);
    return underline_div;
}

async function updata_d_o() {
    let title_add_d_o_div = document.querySelector('.title_add_d_o_div');
    let IC_SN = title_add_d_o_div.getAttribute("IC_SN");
    let d_o_name_input = document.querySelectorAll(".d_o_name_input");
    let temp_arr = [];
    d_o_name_input.forEach(element => {
        if(element.value) {
            temp_arr.push(element.value);
        }
    });
    let temp_str;
    if(temp_arr.length > 0) {
        temp_str = temp_arr.join(",");
    } else {
        temp_str = "";
    }
    console.log("temp_str", temp_str);
    console.log("IC_SN", IC_SN);

    await creat_update_default_op_by_IC_SN(IC_SN, temp_str);

    let temp_div = document.querySelector(`#formnnum_div_${IC_SN}`);
    if(temp_str == "") {
        temp_div.innerHTML = `盤點人 : 無`;
    } else {
        temp_div.innerHTML = `盤點人 : ${temp_str}`;
    }
    hide_d_o();
}
 
async function show_d_o(e)
{
    let IC_SN = e.target.getAttribute("IC_SN");
    let data_by_IC_SN = await get_all_d_o(IC_SN);
    let all_d_o = data_by_IC_SN["Data"].DEFAULT_OP;
    let temp_d_o_arr = all_d_o.split(',');
    let title_add_d_o_div = document.querySelector(".title_add_d_o_div");
    title_add_d_o_div.setAttribute("IC_SN", IC_SN);
    popup_add_OP_div.Set_Visible(true);

    let d_o_name_input = document.querySelectorAll(".d_o_name_input");
    if (all_d_o != "") {
        console.log(temp_d_o_arr);
        temp_d_o_arr.forEach((element, i) => {
            d_o_name_input[i].value = element;
        });
    }
}
function hide_d_o()
{
    let d_o_name_input = document.querySelectorAll(".d_o_name_input");
    d_o_name_input.forEach(e => {
        e.value = "";
    })
    let title_add_d_o_div = document.querySelector(".title_add_d_o_div");
    title_add_d_o_div.setAttribute("IC_SN", "");
    popup_add_OP_div.Set_Visible(false);
}

async function get_all_d_o(IC_SN) {
    let temp_data = {
        "Data": {},
        "Value" : IC_SN
    };
    temp_data = JSON.stringify(temp_data);

    try {
        // console.log("postDataToAPI",url);
        const response = await fetch(`${api_ip}api/inventory/creat_get_default_op_by_IC_SN`, {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json'
            },
            body: temp_data
        });

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

async function creat_update_default_op_by_IC_SN(IC_SN, all_d_o) {
    let temp_data = {
        Data: 
        {
           DEFAULT_OP : all_d_o
        },
        Value : IC_SN
    };
    temp_data = JSON.stringify(temp_data);

    try {
        // console.log("postDataToAPI",url);
        const response = await fetch(`${api_ip}api/inventory/creat_update_default_op_by_IC_SN`, {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json'
            },
            body: temp_data
        });

        if (!response.ok) {
            throw new Error('请求失败');
        }

        const responseData = await response.json();
        alert('已更新盤點人');
        return responseData;
    } catch (error) {
        console.error(error);
        //throw error;
    }
}