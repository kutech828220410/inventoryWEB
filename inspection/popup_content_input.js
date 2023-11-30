var popup_input_div;
var popup_input_div_Content;
var popup_input_div_SubContent;
var popup_input_NumOfPageRows = 1;
var popup_input_PageIndex = 0;
var popup_input_MaxfPage = 0;

var popup_input_END_QTY_input = null;
async function show_popup_input(Content , page_Initial , show_all_user)
{
    // console.log(temp_med_data[`${Content.CODE}`]);
    if(Content == undefined) return;
    if(popup_input_div == undefined) page_Initial = false;
    const OP = sessionData.Name;
    if(show_all_user == undefined)
    {
        popup_input_div_SubContent = Content.Sub_content.filter(function(subItem) 
        {
            return subItem.OP === OP;
        });
    }
    else
    {
        popup_input_div_SubContent = Content.Sub_content;
    }
    
    popup_input_div_Content = Content;
    // popup_input_div_Content.Sub_content = Items;
    popup_input_MaxfPage = Math.floor(popup_input_div_SubContent.length / popup_input_NumOfPageRows);
    if(popup_input_div_SubContent.length % popup_input_NumOfPageRows > 0) popup_input_MaxfPage ++;
    if(page_Initial) popup_input_PageIndex = popup_input_MaxfPage - 1;
    if(popup_input_PageIndex >= popup_input_MaxfPage) popup_input_PageIndex = 0;
    edit_title_popup_input(popup_input_div_Content);
    edit_rows_popup_input(popup_input_div_Content);
    edit_underline_popup_input();
    edit_rows_page_control_popup_input();
    await popup_input_div.Show();
    
    const END_QTY_input = document.querySelector('#END_QTY_input_popup_input');
    // END_QTY_input.focus();

}
function hide_popup_input()
{
     popup_input_div.Close();
}

function next_page_popup_input() 
{
    if((popup_input_PageIndex + 1) < popup_input_MaxfPage) popup_input_PageIndex++;      
    edit_rows_popup_input(popup_input_div_Content);
    edit_rows_page_control_popup_input();
    let content_cards_display = document.querySelector(".content_cards_display")
    content_cards_display.innerHTML = `${popup_input_PageIndex + 1 + "/" + popup_input_MaxfPage}`
}
function previous_page_popup_input() 
{
    popup_input_PageIndex--;
    if(popup_input_PageIndex < 0) popup_input_PageIndex = 0;
    edit_rows_popup_input(popup_input_div_Content);
    edit_rows_page_control_popup_input();
    let content_cards_display = document.querySelector(".content_cards_display")
    content_cards_display.innerHTML = `${popup_input_PageIndex + 1 + "/" + popup_input_MaxfPage}`
}
async function confirm_popup_input()
{
    const LOT_input_popup_input = document.querySelector('.batch_input');
    const VAL_input_popup_input = document.querySelector('.deadline_input');
    const END_QTY_input = document.querySelector('#END_QTY_input_popup_input');
    if(!END_QTY_input.value) return;
    if(isNaN(END_QTY_input.value))
    {
        alert("請輸入算式後按'=' 或 輸入數量");
        return;
    }
    if(!VAL_input_popup_input.value)
    {
        alert("請輸入效期");
        return;
    }
    const GUID = popup_input_div_Content.GUID;
    const VAL = VAL_input_popup_input.value;
    const LOT = LOT_input_popup_input.value;
    var END_QTY = END_QTY_input.value;

    END_QTY_input.value = '';
    const OP = sessionData.Name;
    //輸入盤點量後創造SUB內容
    sub_content_add(GUID , END_QTY , OP, VAL, LOT);
    VAL_input_popup_input.value = ""
    LOT_input_popup_input.value = ""
    hide_popup_input();
}
async function delete_row_popup_input(GUID , Master_GUID)
{
    if (confirm("是否刪除?")) 
    {
       await sub_contents_delete_by_GUID(GUID , Master_GUID);
    }
}

function get_popup_input()
{
    popup_input_div = new Basic_popup_Div('popup_input_div_popup_input','popup_input_div_popup_input','340px','');
    popup_input_div._popup_div.style.border = '10px solid white';
    const title = get_title_popup_input();
    const rows_div = document.createElement('div');
    My_Div.Init(rows_div, 'rows_div_popup_input','rows_div_popup_input', '100%', '100%', '');
    My_Div.Set_Block(rows_div, DisplayEnum.FLEX, FlexDirectionEnum.COLUMN, JustifyContentEnum.TOP);
    rows_div.style.marginTop = '10px';
    updateDivHeight(rows_div , 0);
    const rows_page_control_block = get_row_popup_inputs_page_control_block();
    const under_line = get_underline_popup_input();

    popup_input_div.AddControl(title);
    popup_input_div.AddControl(rows_div);
    popup_input_div.AddControl(rows_page_control_block);
    popup_input_div.AddControl(under_line);

    var height = 0;
    updateDivHeight(popup_input_div._popup_div , 10);
   
    return popup_input_div;
}
function edit_title_popup_input(Content)
{
    console.log(Content);
    const med_CODE_text = document.querySelector('#med_CODE_text_popup_input');
    med_CODE_text.innerText = `藥碼 : ${Content.CODE}`;
    const med_SKDIACODE_text = document.querySelector('#med_SKDIACODE_text_popup_input');
    if(Content.SKDIACODE == "")
    {
        med_SKDIACODE_text.innerText = `料號 : 無`;
    }
    else
    {
        med_SKDIACODE_text.innerText = `料號 : ${temp_med_data[`${Content.CODE}`]}`;
    }
    const med_eng_name_text = document.querySelector('#med_eng_name_text_popup_input');
    if(Content.NAME != null)med_eng_name_text.innerText = `(英) : ${temp_med_data[`${Content.CODE}`].NAME}`;
    const med_cht_name_text = document.querySelector('#med_cht_name_text_popup_input');
    if(Content.CHT_NAME != null) med_cht_name_text.innerText = `(中) : ${temp_med_data[`${Content.CODE}`].CHT_NAME}`;

    const med_end_QTY_text = document.querySelector('#med_end_QTY_text_popup_input');
    med_end_QTY_text.innerText = `總驗收量 : \n${Content.END_QTY}`;
    const med_end_PKG_text = document.querySelector('#med_end_PKG_text_popup_input');
    med_end_PKG_text.innerText = `單位 : \n${temp_med_data[`${Content.CODE}`].PAKAGE}`;
    
}
function edit_rows_popup_input(Content)
{
    const rows_div = document.querySelector('#rows_div_popup_input');
    rows_div.innerHTML = "";
    My_Div.Init(rows_div, 'rows_div_popup_input','rows_div_popup_input', '100%', '100%', '');
    My_Div.Set_Block(rows_div, DisplayEnum.FLEX, FlexDirectionEnum.COLUMN, JustifyContentEnum.TOP);

    var index = popup_input_PageIndex * popup_input_NumOfPageRows;
    var end_index = popup_input_PageIndex * popup_input_NumOfPageRows + popup_input_NumOfPageRows;
    while(true) 
    {
        if(popup_input_div_SubContent.length == 0)break;
        if(index >= popup_input_div_SubContent.length) break;
        if(index >= end_index) break;
        const row = get_row_popup_input(popup_input_div_SubContent[index]);
        rows_div.appendChild(row);
        index++;
    }

    let content_cards_display = document.querySelector(".content_cards_display")
    content_cards_display.innerHTML = `${popup_input_PageIndex + 1 + "/" + popup_input_MaxfPage}`
    updateDivHeight(rows_div , 0);
}
function edit_rows_page_control_popup_input()
{
    if(popup_input_MaxfPage == 0)
    {
        const rows_page_control_block = document.querySelector('#rows_page_control_block_popup_input');
        rows_page_control_block.style.visibility = "hidden";
    }
    else
    {
        const rows_page_control_block = document.querySelector('#rows_page_control_block_popup_input');
        const svg_next = document.querySelector('#svg_next');
        const svg_previous = document.querySelector('#svg_previous_popup_input');
        rows_page_control_block.visibility  = "visible";
        if(popup_input_PageIndex + 1 < popup_input_MaxfPage) svg_next.style.visibility = "visible";
        else svg_next.style.visibility = "hidden";
        if(popup_input_PageIndex - 1 >= 0) svg_previous.style.visibility = "visible";
        else svg_previous.style.visibility = "hidden";
    }
}
function get_title_popup_input()
{
    const title_div = document.createElement('div');
    My_Div.Init(title_div, 'title_div_popup_input','title_div_popup_input', '100%', '', '');
    My_Div.Set_Block(title_div, DisplayEnum.FLEX, FlexDirectionEnum.COLUMN, JustifyContentEnum.TOP);

    const title_text_div = document.createElement('div');
    My_Div.Init(title_text_div, 'title_text_div_popup_input','title_text_div_popup_input', '100%', '', '');
    My_Div.Set_Block(title_text_div, DisplayEnum.FLEX, FlexDirectionEnum.ROW, JustifyContentEnum.CENTER);
    title_text_div.style.borderBottom = '1px solid black';

    const title_text = document.createElement('div');
    My_Div.Init(title_text, 'title_text_popup_input','title_text_popup_input', '250px', '40px', '');
    My_Div.Set_Block(title_text, DisplayEnum.FLEX, FlexDirectionEnum.ROW, JustifyContentEnum.CENTER);
    My_Div.Set_Text(title_text ,"驗收資訊" , TextAlignEnum.CENTER , "26px", true,"微軟正黑體","black");
    title_text.style.borderRadius = "5px";
    title_text.style.marginLeft = "110px";
    title_text_div.appendChild(title_text);


    const undo_div = document.createElement('div');
    My_Div.Init(undo_div, 'undo_div_popup_input','undo_div_popup_input', '70%', '40px', '');
    My_Div.Set_Block(undo_div, DisplayEnum.FLEX, FlexDirectionEnum.ROW, JustifyContentEnum.RIGHT);
    const undo_SVG = Get_undo_SVG("40px","100%" ,"60%","100%","black");
    My_Div.Init(undo_SVG, 'svg','svg', '40px', '40px', '');
    undo_SVG.style.border = "1px solid gray";
    undo_SVG.style.borderRadius = "3px";
    undo_SVG.style.marginTop = "0px";
    undo_SVG.style.marginBottom = "5px";
    undo_SVG.style.marginLeft = "0px";
    undo_SVG.onclick = function()
    {
        hide_popup_input();
        let deadline_input = document.querySelector(".deadline_input")
        let batch_input = document.querySelector(".batch_input")
        deadline_input.value = ""
        batch_input.value = ""
    };
    undo_div.appendChild(undo_SVG);
    title_text_div.appendChild(undo_div);

    title_div.appendChild(title_text_div);

    const title_others = document.createElement('div');
    My_Div.Init(title_others, 'title_others_popup_input','title_others_popup_input', '100%', '', '');
    My_Div.Set_Block(title_others, DisplayEnum.FLEX, FlexDirectionEnum.COLUMN, JustifyContentEnum.TOP);
    // title_others.style.marginTop = "5px";
    title_div.appendChild(title_others);
  


    const med_info = document.createElement('div');
    My_Div.Init(med_info, 'med_info_popup_input','med_info_popup_input', '100%',"100%" ,'');
    My_Div.Set_Block(med_info, DisplayEnum.FLEX, FlexDirectionEnum.COLUMN, JustifyContentEnum.TOP);
    med_info.style.marginTop = "5px";
    const med_CODE_SKDIACODE_block = document.createElement('div');
    My_Div.Init(med_CODE_SKDIACODE_block, 'med_CODE_SKDIACODE_block_popup_input','med_CODE_SKDIACODE_block_popup_input', '100%',"20%",'');
    My_Div.Set_Block(med_CODE_SKDIACODE_block, DisplayEnum.FLEX, FlexDirectionEnum.ROW,JustifyContentEnum.CENTER)
    med_CODE_SKDIACODE_block.style.marginBottom = "5px";

    const med_CODE_text = document.createElement('div');
    My_Div.Init(med_CODE_text,'med_CODE_text_popup_input','med_CODE_text_popup_input', '25%',"100%");
    My_Div.Set_Text(med_CODE_text ,"藥碼 : XXXXX" , TextAlignEnum.LEFT , "16px", true,"微軟正黑體","black");
    med_CODE_text.style.marginLeft = "5px";
    const med_SKDIACODE_text = document.createElement('div');
    My_Div.Init(med_SKDIACODE_text,'med_SKDIACODE_text_popup_input','med_SKDIACODE_text_popup_input', '25%',"100%");
    My_Div.Set_Text(med_SKDIACODE_text ,"料號 : XXXXX" , TextAlignEnum.LEFT , "16px", true,"微軟正黑體","black");
    med_SKDIACODE_text.style.marginLeft = "5px";

    const med_end_QTY_text = document.createElement('div');
    My_Div.Init(med_end_QTY_text,'med_end_QTY_text_popup_input','med_end_QTY_text_popup_input', '25%',"100%" , '');
    My_Div.Set_Text(med_end_QTY_text ,"總驗收量 : 0" , TextAlignEnum.LEFT , "16px", true,"微軟正黑體","green");
    med_end_QTY_text.style.marginLeft = "5px";
    
    const med_end_PKG_text = document.createElement('div');
    My_Div.Init(med_end_PKG_text,'med_end_PKG_text_popup_input','med_end_PKG_text_popup_input', '25%',"100%" , '');
    My_Div.Set_Text(med_end_PKG_text ,"PKG" , TextAlignEnum.LEFT , "16px", true,"微軟正黑體","black");
    med_end_PKG_text.style.marginLeft = "5px";


    med_CODE_SKDIACODE_block.appendChild(med_CODE_text);
    med_CODE_SKDIACODE_block.appendChild(med_SKDIACODE_text);
    med_CODE_SKDIACODE_block.appendChild(med_end_QTY_text);
    med_CODE_SKDIACODE_block.appendChild(med_end_PKG_text);

    const med_eng_name_text = document.createElement('div');
    My_Div.Init(med_eng_name_text,'med_eng_name_text_popup_input','med_eng_name_text_popup_input', '100%',"",'');
    My_Div.Set_Text(med_eng_name_text ,"(英) : XXXXXXXXXXXXXXXXX" , TextAlignEnum.LEFT , "14px", true,"微軟正黑體","#c88114");
    med_eng_name_text.style.marginLeft = "5px";
    med_eng_name_text.style.marginBottom = "5px";

    const med_cht_name_text = document.createElement('div');
    My_Div.Init(med_cht_name_text,'med_cht_name_text_popup_input','med_cht_name_text_popup_input', '100%',"");
    My_Div.Set_Text(med_cht_name_text ,"(中) : XXXXXXXXXXXXXXXXX" , TextAlignEnum.LEFT , "14px", true,"微軟正黑體","#c88114");
    med_cht_name_text.style.marginLeft = "5px";
    med_cht_name_text.style.marginBottom = "5px";

   

    med_info.appendChild(med_CODE_SKDIACODE_block);
    med_info.appendChild(med_eng_name_text);
    med_info.appendChild(med_cht_name_text);
    
    title_others.style.borderBottom = "2px solid";
    title_others.appendChild(med_info);
    // title_others.appendChild(title_control_block);
    return title_div;
}
function edit_underline_popup_input()
{
    const END_QTY_input = document.querySelector('#END_QTY_input_popup_input');
    END_QTY_input.value = "";
    
}
function get_row_popup_inputs_page_control_block()
{
    const rows_page_control_block = document.createElement('div');
    My_Div.Init(rows_page_control_block, 'rows_page_control_block_popup_input','rows_page_control_block_popup_input', '100%','30px','');
    My_Div.Set_Block(rows_page_control_block, DisplayEnum.FLEX, FlexDirectionEnum.ROW, JustifyContentEnum.CENTER);
    rows_page_control_block.style.alignItems = "center";
    rows_page_control_block.style.marginTop = "5px";
    const svg_next = Get_next_SVG("30px","100%" ,"60%","100%","green");
    My_Div.Init(svg_next, 'svg_next','svg_next', '30px', '30px', '');
    // svg_next.style.border = "1px solid gray";
    svg_next.style.borderRadius = "3px";
    svg_next.style.marginRight = "5px";
    svg_next.addEventListener('click', function()
    {
        next_page_popup_input();
    });
    const svg_previous = Get_previous_SVG("30px","100%" ,"60%","100%","green");
    My_Div.Init(svg_previous, 'svg_previous_popup_input','svg_previous_popup_input', '30px', '30px', '');
    // svg_next.style.border = "1px solid gray";
    svg_previous.style.borderRadius = "3px";
    svg_previous.style.marginRight = "5px";
    svg_previous.addEventListener('click', function()
    {
        previous_page_popup_input();
    });

    const content_cards_display = document.createElement("div")
    My_Div.Init(content_cards_display,"content_cards_display","content_cards_display")
    content_cards_display.style.marginRight = "160px"
    content_cards_display.style.fontSize = "18px"
    content_cards_display.style.fontWeight = "600"

    rows_page_control_block.appendChild(content_cards_display);
    rows_page_control_block.appendChild(svg_previous);
    rows_page_control_block.appendChild(svg_next);
    return rows_page_control_block;
}

function get_underline_popup_input()
{
    const underline_div = document.createElement('div');
    My_Div.Init(underline_div,'underline_div','underline_div', '100%','','');
    My_Div.Set_Block(underline_div, DisplayEnum.FLEX, FlexDirectionEnum.COLUMN, JustifyContentEnum.CENTER);
    underline_div.style.alignItems = "center";

    // 新增批號、期效input欄位
    const batch_deadline_div = document.createElement("div")
    batch_deadline_div.classList.add("batch_deadline_div")
    batch_deadline_div.style.width = "100%"
    batch_deadline_div.style.alignItems = "center"
    
    const batch_input = document.createElement("input")
    My_Div.Init(batch_input, 'batch_input','batch_input', '90%','80%','');
    My_Div.Set_Text(batch_input, ``, TextAlignEnum.CENTER, "26px", true,"微軟正黑體","black");
    batch_input.type = "text";
    batch_input.style.backgroundColor = "";
    batch_input.style.borderRadius = "5px";
    batch_input.style.display = "block";
    batch_input.style.margin = "0px auto 6px";
    batch_input.placeholder = "請輸入批號";

    const deadline_input = document.createElement("input")
    My_Div.Init(deadline_input, 'deadline_input','deadline_input', '90%','80%','');
    My_Div.Set_Text(deadline_input, ``, TextAlignEnum.CENTER, "26px", true,"微軟正黑體","black");
    deadline_input.style.borderRadius = "5px";
    deadline_input.style.display = "block";
    deadline_input.style.margin = "0px auto 6px";
    deadline_input.placeholder = "請輸入期效";
    deadline_input.type = "email";
    deadline_input.inputMode = "latin";

    batch_deadline_div.appendChild(batch_input)
    batch_deadline_div.appendChild(deadline_input)
    underline_div.appendChild(batch_deadline_div)
    focus_blur_event_with_keydown(batch_input)
    focus_blur_event_with_keydown(deadline_input)

    const END_QTY_input_div = document.createElement('div');
    My_Div.Init(END_QTY_input_div, 'END_QTY_input_div','END_QTY_input_div', '100%','100%','');
    My_Div.Set_Block(END_QTY_input_div, DisplayEnum.FLEX, FlexDirectionEnum.ROW, JustifyContentEnum.CENTER);
    END_QTY_input_div.style.marginBottom = "5px";
  
    const END_QTY_input = document.createElement('input');
    popup_input_END_QTY_input = END_QTY_input;

    My_Div.Init(END_QTY_input, 'END_QTY_input_popup_input','END_QTY_input_popup_input', '65%','80%','');
    My_Div.Set_Text(END_QTY_input, ``, TextAlignEnum.CENTER, "26px", true,"微軟正黑體","black");
    END_QTY_input.readOnly = false;
    END_QTY_input.type = "text";
    END_QTY_input.inputMode = "numeric";
    END_QTY_input.style.backgroundColor = "";
    END_QTY_input.style.borderRadius = "5px";
    END_QTY_input.style.marginLeft = "10px";
    END_QTY_input.style.marginRight = "10px";
    END_QTY_input.placeholder = "請輸入算式";
    END_QTY_input.readOnly = true;
    END_QTY_input.onfocus = function()
    {
       //this.select();        
    };
    const END_QTY_input_Confirm = document.createElement('button');
    My_Div.Init(END_QTY_input_Confirm, 'control_btn','END_QTY_input_Confirm', '', '40px', '');
    My_Div.Set_Text(END_QTY_input_Confirm ,"送出" , TextAlignEnum.CENTER , "16px", false,"微軟正黑體","white");
    END_QTY_input_Confirm.addEventListener('click', function()
    {
        confirm_popup_input();
    });
    END_QTY_input_div.appendChild(END_QTY_input);
    END_QTY_input_div.appendChild(END_QTY_input_Confirm);

    underline_div.appendChild(END_QTY_input_div);

    const calculate_div = document.createElement('div');
    My_Div.Init(calculate_div, 'calculate_div','calculate_div', '100%', '180px', '');
    My_Div.Set_Block(calculate_div, DisplayEnum.FLEX, FlexDirectionEnum.COLUMN, JustifyContentEnum.CENTER);

    const calculate_div_row1 = document.createElement('div');
    My_Div.Init(calculate_div_row1, 'calculate_div_row1','calculate_div_row1', '100%', '25%', '');
    My_Div.Set_Block(calculate_div_row1, DisplayEnum.FLEX, FlexDirectionEnum.ROW, JustifyContentEnum.LEFT);
    const calculate_7_btn = document.createElement('button');
    My_Div.Init(calculate_7_btn, `calculate_btn`,`calculate_7_btn`, '25%', '100%',);
    My_Div.Set_Text(calculate_7_btn ,`7` , TextAlignEnum.CENTER , "20px", true,"微軟正黑體","black");
    calculate_7_btn.addEventListener('click', function()
    {
        calculate_input("7");
    });
    calculate_div_row1.appendChild(calculate_7_btn);
    const calculate_8_btn = document.createElement('button');
    My_Div.Init(calculate_8_btn, `calculate_btn`,`calculate_8_btn`, '25%', '100%',);
    My_Div.Set_Text(calculate_8_btn ,`8` , TextAlignEnum.CENTER , "20px", true,"微軟正黑體","black");
    calculate_8_btn.addEventListener('click', function()
    {
        calculate_input("8");
    });
    calculate_div_row1.appendChild(calculate_8_btn);
    const calculate_9_btn = document.createElement('button');
    My_Div.Init(calculate_9_btn, `calculate_btn`,`calculate_9_btn`, '25%', '100%',);
    My_Div.Set_Text(calculate_9_btn ,`9` , TextAlignEnum.CENTER , "20px", true,"微軟正黑體","black");
    calculate_9_btn.addEventListener('click', function()
    {
        calculate_input("9");
    });
    calculate_div_row1.appendChild(calculate_9_btn);
    const calculate_add_btn = document.createElement('button');
    My_Div.Init(calculate_add_btn, `calculate_btn`,`calculate_add_btn`, '25%', '100%',);
    My_Div.Set_Text(calculate_add_btn ,`+` , TextAlignEnum.CENTER , "20px", true,"微軟正黑體","black");
    calculate_add_btn.addEventListener('click', function()
    {
        calculate_input("+");
    });
    calculate_div_row1.appendChild(calculate_add_btn);

    const calculate_div_row2 = document.createElement('div');
    My_Div.Init(calculate_div_row2, 'calculate_div_row2','calculate_div_row2', '100%', '25%', '');
    My_Div.Set_Block(calculate_div_row2, DisplayEnum.FLEX, FlexDirectionEnum.ROW, JustifyContentEnum.LEFT);
    const calculate_4_btn = document.createElement('button');
    My_Div.Init(calculate_4_btn, `calculate_btn`,`calculate_4_btn`, '25%', '100%',);
    My_Div.Set_Text(calculate_4_btn ,`4` , TextAlignEnum.CENTER , "20px", true,"微軟正黑體","black");
    calculate_4_btn.addEventListener('click', function()
    {
        calculate_input("4");
    });
    calculate_div_row2.appendChild(calculate_4_btn);
    const calculate_5_btn = document.createElement('button');
    My_Div.Init(calculate_5_btn, `calculate_btn`,`calculate_5_btn`, '25%', '100%',);
    My_Div.Set_Text(calculate_5_btn ,`5` , TextAlignEnum.CENTER , "20px", true,"微軟正黑體","black");
    calculate_5_btn.addEventListener('click', function()
    {
        calculate_input("5");
    });
    calculate_div_row2.appendChild(calculate_5_btn);
    const calculate_6_btn = document.createElement('button');
    My_Div.Init(calculate_6_btn, `calculate_btn`,`calculate_6_btn`, '25%', '100%',);
    My_Div.Set_Text(calculate_6_btn ,`6` , TextAlignEnum.CENTER , "20px", true,"微軟正黑體","black");
    calculate_6_btn.addEventListener('click', function()
    {
        calculate_input("6");
    });
    calculate_div_row2.appendChild(calculate_6_btn);
    const calculate_sub_btn = document.createElement('button');
    My_Div.Init(calculate_sub_btn, `calculate_btn`,`calculate_sub_btn`, '25%', '100%',);
    My_Div.Set_Text(calculate_sub_btn ,`-` , TextAlignEnum.CENTER , "20px", true,"微軟正黑體","black");
    calculate_sub_btn.addEventListener('click', function()
    {
        calculate_input("-");
    });
    calculate_div_row2.appendChild(calculate_sub_btn);

    const calculate_div_row3 = document.createElement('div');
    My_Div.Init(calculate_div_row3, 'calculate_div_row3','calculate_div_row3', '100%', '25%', '');
    My_Div.Set_Block(calculate_div_row3, DisplayEnum.FLEX, FlexDirectionEnum.ROW, JustifyContentEnum.LEFT);
    const calculate_1_btn = document.createElement('button');
    My_Div.Init(calculate_1_btn, `calculate_btn`,`calculate_1_btn`, '25%', '100%',);
    My_Div.Set_Text(calculate_1_btn ,`1` , TextAlignEnum.CENTER , "20px", true,"微軟正黑體","black");
    calculate_1_btn.addEventListener('click', function()
    {
        calculate_input("1");
    });
    calculate_div_row3.appendChild(calculate_1_btn);
    const calculate_2_btn = document.createElement('button');
    My_Div.Init(calculate_2_btn, `calculate_btn`,`calculate_2_btn`, '25%', '100%',);
    My_Div.Set_Text(calculate_2_btn ,`2` , TextAlignEnum.CENTER , "20px", true,"微軟正黑體","black");
    calculate_2_btn.addEventListener('click', function()
    {
        calculate_input("2");
    });
    calculate_div_row3.appendChild(calculate_2_btn);
    const calculate_3_btn = document.createElement('button');
    My_Div.Init(calculate_3_btn, `calculate_btn`,`calculate_3_btn`, '25%', '100%',);
    My_Div.Set_Text(calculate_3_btn ,`3` , TextAlignEnum.CENTER , "20px", true,"微軟正黑體","black");
    calculate_3_btn.addEventListener('click', function()
    {
        calculate_input("3");
    });
    calculate_div_row3.appendChild(calculate_3_btn);
    const calculate_mul_btn = document.createElement('button');
    My_Div.Init(calculate_mul_btn, `calculate_btn`,`calculate_mul_btn`, '25%', '100%',);
    My_Div.Set_Text(calculate_mul_btn ,`*` , TextAlignEnum.CENTER , "20px", true,"微軟正黑體","black");
    calculate_mul_btn.addEventListener('click', function()
    {
        calculate_input("*");
    });
    calculate_div_row3.appendChild(calculate_mul_btn);

    const calculate_div_row4 = document.createElement('div');
    My_Div.Init(calculate_div_row4, 'calculate_div_row4','calculate_div_row4', '100%', '25%', '');
    My_Div.Set_Block(calculate_div_row4, DisplayEnum.FLEX, FlexDirectionEnum.ROW, JustifyContentEnum.LEFT);
    const calculate_CE_btn = document.createElement('button');
    My_Div.Init(calculate_CE_btn, `calculate_btn`,`calculate_CE_btn`, '25%', '100%',);
    My_Div.Set_Text(calculate_CE_btn ,`CE` , TextAlignEnum.CENTER , "20px", true,"微軟正黑體","black");
    calculate_CE_btn.addEventListener('click', function()
    {
        popup_input_END_QTY_input.value = "";
    });
    calculate_div_row4.appendChild(calculate_CE_btn);
    const calculate_0_btn = document.createElement('button');
    My_Div.Init(calculate_0_btn, `calculate_btn`,`calculate_0_btn`, '25%', '100%',);
    My_Div.Set_Text(calculate_0_btn ,`0` , TextAlignEnum.CENTER , "20px", true,"微軟正黑體","black");
    calculate_0_btn.addEventListener('click', function()
    {
        calculate_input("0");
    });
    calculate_div_row4.appendChild(calculate_0_btn);
    const calculate_Back_btn = document.createElement('button');
    My_Div.Init(calculate_Back_btn, `calculate_btn`,`calculate_Back_btn`, '25%', '100%',);
    My_Div.Set_Text(calculate_Back_btn ,`←` , TextAlignEnum.CENTER , "20px", true,"微軟正黑體","black");
    calculate_Back_btn.addEventListener('click', function()
    {
        popup_input_END_QTY_input.value = popup_input_END_QTY_input.value.slice(0, -1);
    });
    calculate_div_row4.appendChild(calculate_Back_btn);
    const calculate_Result_btn = document.createElement('button');
    My_Div.Init(calculate_Result_btn, `calculate_btn`,`calculate_Result_btn`, '25%', '100%',);
    My_Div.Set_Text(calculate_Result_btn ,`=` , TextAlignEnum.CENTER , "20px", true,"微軟正黑體","black");
    calculate_Result_btn.addEventListener('click', function()
    {
        popup_input_END_QTY_input.value = calculateExpression(popup_input_END_QTY_input.value);
    });
    calculate_div_row4.appendChild(calculate_Result_btn);

    calculate_div.appendChild(calculate_div_row1);
    calculate_div.appendChild(calculate_div_row2);
    calculate_div.appendChild(calculate_div_row3);
    calculate_div.appendChild(calculate_div_row4);
    underline_div.appendChild(calculate_div);

    return underline_div;
}

function focus_blur_event_with_keydown(input_tag) {
    input_tag.addEventListener("focus", () => {
        window.removeEventListener("keydown", keydown_event_for_conculate)
    })
    input_tag.addEventListener("blur", () => {
        window.addEventListener("keydown", keydown_event_for_conculate)
        console.log(input_tag.value);
    })
} 

function calculate_input(char)
{
    var text = popup_input_END_QTY_input.value;
    if(text.length == 0)
    {
        if(char == '0' ||char == '1'||char == '2'||char == '3'||char == '1'||char == '4'||char == '5'||char == '6'||char == '7'||char == '8'||char == '9'||char == '+'||char == '-')
        {
            popup_input_END_QTY_input.value = text + char;
        }
    }
    else
    {
        if(char == '0' ||char == '1'||char == '2'||char == '3'||char == '1'||char == '4'||char == '5'||char == '6'||char == '7'||char == '8'||char == '9')
        {
            popup_input_END_QTY_input.value = text + char;
        }
        else if(char == '+' ||char == '-'||char == '*')
        {
            let lastChar = text[text.length - 1];
            if(lastChar == "+" || lastChar == '-' || lastChar == '*')
            {
                return;
            }
            popup_input_END_QTY_input.value = text + char;
        }
         
    }

}
function get_row_popup_input(Sub_content)
{
    const row = document.createElement('div');
    My_Div.Init(row, 'row_popup_input','row_popup_input', '100%','75px');
    My_Div.Set_Block(row, DisplayEnum.FLEX, FlexDirectionEnum.COLUMN, JustifyContentEnum.TOP);
    if(Sub_content != undefined)
    {
        const block1 = get_block_popup_input(Sub_content);
        row.appendChild(block1);
    }
  

    row.style.margin = "5px 5px 5px 5px";
    row.style.border  = '1px solid';
    row.style.borderRadius = '3px 2px 3px 2px';
    row.style.boxShadow = '1px 1px 2px 2px black';
    row.style.paddingTop = "2px";
    return row;
}
function get_block_popup_input(Sub_content)
{
    const M_block = document.createElement('div');
    My_Div.Init(M_block, 'M_block_popup_input','M_block_popup_input', '100%','');
    My_Div.Set_Block(M_block, DisplayEnum.FLEX, FlexDirectionEnum.ROW, JustifyContentEnum.LEFT);

    const block1 = document.createElement('div');
    My_Div.Init(block1, 'block1_popup_input','block1_popup_input', '125px','');
    My_Div.Set_Block(block1, DisplayEnum.FLEX, FlexDirectionEnum.COLUMN, JustifyContentEnum.LEFT);
    block1.style.marginLeft = "10px";

    const block1_Date_popup_input = document.createElement('div');
    My_Div.Init(block1_Date_popup_input, 'block1_Date_popup_input','block1_Date_popup_input', '100%',"");
    My_Div.Set_Block(block1_Date_popup_input, DisplayEnum.FLEX, FlexDirectionEnum.ROW, JustifyContentEnum.LEFT);
    My_Div.Set_Text(block1_Date_popup_input, `${Sub_content.OP_TIME}`, TextAlignEnum.LEFT, "12px", true,"微軟正黑體","black" );
    block1.appendChild(block1_Date_popup_input);

    const block1_user_text_popup_input = document.createElement('div');
    My_Div.Init(block1_user_text_popup_input, 'block1_user_text_popup_input','block1_user_text_popup_input', '100%',"" , '');
    My_Div.Set_Text(block1_user_text_popup_input, `操作人 : ${Sub_content.OP}`, TextAlignEnum.LEFT, "14px", true,"微軟正黑體","black" );
    block1.appendChild(block1_user_text_popup_input);

    const block1_batch_text_input = document.createElement('div');
    My_Div.Init(block1_batch_text_input, 'block1_batch_text_input','block1_batch_text_input', '100%',"" , '');
    My_Div.Set_Text(block1_batch_text_input, `批號 : ${Sub_content.LOT}`, TextAlignEnum.LEFT, "14px", true,"微軟正黑體","black" );
    block1.appendChild(block1_batch_text_input);
    
    const block1_deadline_text_input = document.createElement('div');
    My_Div.Init(block1_deadline_text_input, 'block1_deadline_text_input','block1_deadline_text_input', '100%',"" , '');
    My_Div.Set_Text(block1_deadline_text_input, `期效 : ${Sub_content.VAL.split(' ')[0]}`, TextAlignEnum.LEFT, "14px", true,"微軟正黑體","black" );
    block1.appendChild(block1_deadline_text_input);

    M_block.appendChild(block1);

    const block2 = document.createElement('div');
    My_Div.Init(block2, 'block2_popup_input','block2_popup_input', '100px','40px','lightgray');
    My_Div.Set_Block(block2, DisplayEnum.FLEX, FlexDirectionEnum.COLUMN, JustifyContentEnum.LEFT);
    block2.style.border = '1px solid black';
    block2.style.marginLeft = '10px';
    block2.style.marginTop = '2px';
    block2.style.borderRadius = "5px";

    const block2_Value_text_popup_input = document.createElement('div');
    My_Div.Init(block2_Value_text_popup_input, 'block2_Value_text_popup_input','block1_Value_text_popup_input', '100%',"" , '');
    My_Div.Set_Block(block2_Value_text_popup_input, DisplayEnum.FLEX, FlexDirectionEnum.COLUMN, JustifyContentEnum.CENTER);
    My_Div.Set_Text(block2_Value_text_popup_input, `${Sub_content.END_QTY}`, TextAlignEnum.RIGHT, "20px", true,"微軟正黑體","green");
    block2_Value_text_popup_input.style.marginTop = "5px";
    block2_Value_text_popup_input.style.marginRight = "5px";
    block2.appendChild(block2_Value_text_popup_input);

    M_block.appendChild(block2);


    const deleteBtn_popup_input = document.createElement('button');
    deleteBtn_popup_input.className = "almcontrol_btn";
    My_Div.Init(deleteBtn_popup_input, 'almcontrol_btn','deleteBtn_popup_input', '', '40px', '');
    My_Div.Set_Text(deleteBtn_popup_input ,"刪除" , TextAlignEnum.CENTER , "16px", false,"微軟正黑體","white");
    deleteBtn_popup_input.style.marginLeft = "10px";
    deleteBtn_popup_input.style.marginTop = "3px";
    deleteBtn_popup_input.addEventListener("click", function()
    {     
        delete_row_popup_input(Sub_content.GUID,Sub_content.Master_GUID);
    });
    M_block.appendChild(deleteBtn_popup_input);



    return M_block;
}

function calculateExpression(expression) {
    // 移除所有空格
    expression = expression.replace(/\s+/g, '');
  
    // 创建一个存储数字和运算符的数组
    const stack = [];
    let currentNumber = 0;
    let currentOperator = '+';
  
    for (let i = 0; i < expression.length; i++) {
      const char = expression[i];
  
      if (!isNaN(char)) {
        // 如果是数字字符，将其添加到当前数字
        currentNumber = currentNumber * 10 + parseInt(char);
      }
  
      if (isNaN(char) || i === expression.length - 1) {
        // 如果是运算符或表达式结束
        if (currentOperator === '+') {
          stack.push(currentNumber);
        } else if (currentOperator === '-') {
          stack.push(-currentNumber);
        } else if (currentOperator === '*') {
          stack.push(stack.pop() * currentNumber);
        }
  
        currentNumber = 0;
        currentOperator = char;
      }
    }
  
    // 对数组中的所有数字求和
    return stack.reduce((total, num) => total + num, 0);
  }

  function serch_start_date_input_Y_Click()
  {
      const serch_start_date_input = document.querySelector(".deadline_input");
  }
  function serch_start_date_input_N_Click()
  {
      const serch_start_date_input = document.querySelector(".deadline_input");
      serch_start_date_input.value = "";
  }
  $(function()
  {
    let currentDate = new Date();
       $('.deadline_input').focus(function(event) 
       {
         /* Act on the event */
         $(this).date(
         {
           theme:'date',
           beginyear : currentDate.getFullYear() - 1,
           endyear: currentDate.getFullYear() + 8,
           curdate:false
         },serch_start_date_input_Y_Click,serch_start_date_input_N_Click);
       });
  }) 
  







