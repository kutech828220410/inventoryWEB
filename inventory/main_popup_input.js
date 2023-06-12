var popup_input_div;
var popup_input_div_Content;

var popup_input_NumOfPageRows = 3;
var popup_input_PageIndex = 0;
var popup_input_MaxfPage = 0;


function show_popup_input(Content , page_Initial)
{
    if(Content == undefined) return;
    if(popup_input_div == undefined) page_Initial = false;
    popup_input_div_Content = Content;
    popup_input_MaxfPage = Math.floor(Content.Sub_content.length / popup_input_NumOfPageRows);
    if(Content.Sub_content.length % popup_input_NumOfPageRows > 0) popup_input_MaxfPage ++;
    if(page_Initial) popup_input_PageIndex = popup_input_MaxfPage - 1;
    if(popup_input_PageIndex >= popup_input_MaxfPage) popup_input_PageIndex = 0;
    edit_title_popup_input(Content);
    edit_rows_popup_input(Content);
    edit_underline_popup_input();
    edit_rows_page_control_popup_input();
    popup_input_div.Set_Visible(true);
    const END_QTY_input = document.querySelector('#END_QTY_input_popup_input');
    END_QTY_input.focus();
}
function hide_popup_input()
{
     popup_input_div.Set_Visible(false);
}

function next_page_popup_input() 
{
    if((popup_input_PageIndex + 1) < popup_input_MaxfPage) popup_input_PageIndex++;      
    edit_rows_popup_input(popup_input_div_Content);
    edit_rows_page_control_popup_input();
}
function previous_page_popup_input() 
{
    popup_input_PageIndex--;
    if(popup_input_PageIndex < 0) popup_input_PageIndex = 0;
    edit_rows_popup_input(popup_input_div_Content);
    edit_rows_page_control_popup_input();
}
async function confirm_popup_input()
{
    const END_QTY_input = document.querySelector('#END_QTY_input_popup_input');
    if(!END_QTY_input.value) return;
    if(isNaN(END_QTY_input.value))
    {
        alert("請輸入數量");
        return;
    }
    const GUID = popup_input_div_Content.GUID;
    const END_QTY = END_QTY_input.value;
    END_QTY_input.value = '';
    const OP = loging_name;
    sub_content_add(GUID , END_QTY , OP);
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
    popup_input_div = new Basic_popup_Div('popup_input_div_popup_input','popup_input_div_popup_input','330px','');
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
    const med_CODE_text = document.querySelector('#med_CODE_text_popup_input');
    med_CODE_text.innerText = `藥碼 : ${Content.CODE}`;
    const med_SKDIACODE_text = document.querySelector('#med_SKDIACODE_text_popup_input');
    if(Content.SKDIACODE == "")
    {
        med_SKDIACODE_text.innerText = `料號 : 無`;
    }
    else
    {
        med_SKDIACODE_text.innerText = `料號 : ${Content.SKDIACODE}`;
    }
    const med_eng_name_text = document.querySelector('#med_eng_name_text_popup_input');
    if(Content.NAME != null)med_eng_name_text.innerText = `(英) : ${Content.NAME}`;
    const med_cht_name_text = document.querySelector('#med_cht_name_text_popup_input');
    if(Content.CHT_NAME != null) med_cht_name_text.innerText = `(中) : ${Content.CHT_NAME}`;
    const med_start_QTY_text = document.querySelector('#med_start_QTY_text_popup_input');
    med_start_QTY_text.innerText = `理論值 : ${Content.START_QTY}`;
    const med_end_QTY_text = document.querySelector('#med_end_QTY_text_popup_input');
    med_end_QTY_text.innerText = `盤點量 : ${Content.END_QTY}`;
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
        if(Content.Sub_content.length == 0)break;
        if(index >= Content.Sub_content.length) break;
        if(index >= end_index) break;
        const row = get_row_popup_input(Content.Sub_content[index]);
        rows_div.appendChild(row);
        index++;
    }

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
    My_Div.Init(title_div, 'title_div_popup_input','title_div_popup_input', '100%', '180px', '');
    My_Div.Set_Block(title_div, DisplayEnum.FLEX, FlexDirectionEnum.COLUMN, JustifyContentEnum.TOP);

    const title_text = document.createElement('div');
    My_Div.Init(title_text, 'title_text_popup_input','title_text_popup_input', '100%', '40px', 'gray');
    My_Div.Set_Text(title_text ,"盤點資訊" , TextAlignEnum.CENTER , "24px", true,"微軟正黑體","white");
    title_text.style.borderRadius = "5px";
    title_div.appendChild(title_text);

    const title_others = document.createElement('div');
    My_Div.Init(title_others, 'title_others_popup_input','title_others_popup_input', '100%', '140px', '');
    My_Div.Set_Block(title_others, DisplayEnum.FLEX, FlexDirectionEnum.ROW, JustifyContentEnum.LEFT);
    title_others.style.marginTop = "10px";
    title_div.appendChild(title_others);
  

    const title_control_block = document.createElement('div');
    My_Div.Init(title_control_block, 'title_control_block_popup_input','title_control_block_popup_input', '15%', '100%', '');
    My_Div.Set_Block(title_control_block, DisplayEnum.FLEX, FlexDirectionEnum.COLUMN, JustifyContentEnum.TOP);

    const undo_SVG = Get_undo_SVG("40px","100%" ,"60%","100%","black");
    My_Div.Init(undo_SVG, 'svg','svg', '40px', '40px', '');
    undo_SVG.style.border = "1px solid gray";
    undo_SVG.style.borderRadius = "3px";
    undo_SVG.style.marginTop = "2px";
    undo_SVG.style.marginRight = "2px";
    undo_SVG.onclick = function()
    {
        hide_popup_input();
    };
    title_control_block.appendChild(undo_SVG);

    const med_info = document.createElement('div');
    My_Div.Init(med_info, 'med_info_popup_input','med_info_popup_input', '85%',"100%" ,'');
    My_Div.Set_Block(med_info, DisplayEnum.FLEX, FlexDirectionEnum.COLUMN, JustifyContentEnum.TOP);
    med_info.style.marginTop = "10px";
    const med_CODE_SKDIACODE_block = document.createElement('div');
    My_Div.Init(med_CODE_SKDIACODE_block, 'med_CODE_SKDIACODE_block_popup_input','med_CODE_SKDIACODE_block_popup_input', '100%',"20%",'');
    My_Div.Set_Block(med_CODE_SKDIACODE_block, DisplayEnum.FLEX, FlexDirectionEnum.ROW,JustifyContentEnum.LEFT)

    const med_CODE_text = document.createElement('div');
    My_Div.Init(med_CODE_text,'med_CODE_text_popup_input','med_CODE_text_popup_input', '50%',"100%");
    My_Div.Set_Text(med_CODE_text ,"藥碼 : XXXXX" , TextAlignEnum.LEFT , "16px", true,"微軟正黑體","black");
    med_CODE_text.style.marginLeft = "5px";
    const med_SKDIACODE_text = document.createElement('div');
    My_Div.Init(med_SKDIACODE_text,'med_SKDIACODE_text_popup_input','med_SKDIACODE_text_popup_input', '50%',"100%");
    My_Div.Set_Text(med_SKDIACODE_text ,"料號 : XXXXX" , TextAlignEnum.LEFT , "16px", true,"微軟正黑體","black");
    med_SKDIACODE_text.style.marginLeft = "5px";
    med_CODE_SKDIACODE_block.appendChild(med_CODE_text);
    med_CODE_SKDIACODE_block.appendChild(med_SKDIACODE_text);

    const med_eng_name_text = document.createElement('div');
    My_Div.Init(med_eng_name_text,'med_eng_name_text_popup_input','med_eng_name_text_popup_input', '100%',"30%",'');
    My_Div.Set_Text(med_eng_name_text ,"(英) : XXXXXXXXXXXXXXXXX" , TextAlignEnum.LEFT , "14px", true,"微軟正黑體","orange");
    med_eng_name_text.style.marginLeft = "5px";
   
    const med_cht_name_text = document.createElement('div');
    My_Div.Init(med_cht_name_text,'med_cht_name_text_popup_input','med_cht_name_text_popup_input', '100%',"30%");
    My_Div.Set_Text(med_cht_name_text ,"(中) : XXXXXXXXXXXXXXXXX" , TextAlignEnum.LEFT , "14px", true,"微軟正黑體","orange");
    med_cht_name_text.style.marginLeft = "5px";

    const med_start_end_QTY_block = document.createElement('div');
    My_Div.Init(med_start_end_QTY_block, 'med_start_end_QTY_block_popup_input','med_start_end_QTY_block_popup_input', '100%',"20%",'');
    My_Div.Set_Block(med_start_end_QTY_block, DisplayEnum.FLEX, FlexDirectionEnum.ROW,JustifyContentEnum.LEFT)

    const med_start_QTY_text = document.createElement('div');
    My_Div.Init(med_start_QTY_text,'med_start_QTY_text_popup_input','med_start_QTY_text_popup_input', '50%',"100%" , '');
    My_Div.Set_Text(med_start_QTY_text ,"理論值 : 0" , TextAlignEnum.LEFT , "15px", true,"微軟正黑體","black");
    med_start_QTY_text.style.marginLeft = "5px";
    const med_end_QTY_text = document.createElement('div');
    My_Div.Init(med_end_QTY_text,'med_end_QTY_text_popup_input','med_end_QTY_text_popup_input', '50%',"100%" , '');
    My_Div.Set_Text(med_end_QTY_text ,"盤點量 : 0" , TextAlignEnum.LEFT , "15px", true,"微軟正黑體","black");
    med_end_QTY_text.style.marginLeft = "5px";

    med_start_end_QTY_block.appendChild(med_start_QTY_text);
    med_start_end_QTY_block.appendChild(med_end_QTY_text);
    med_start_end_QTY_block.style.marginBottom = "10px";

    med_info.appendChild(med_CODE_SKDIACODE_block);
    med_info.appendChild(med_eng_name_text);
    med_info.appendChild(med_cht_name_text);
    med_info.appendChild(med_start_end_QTY_block);
    
    title_others.style.borderBottom = "2px solid";
    title_others.appendChild(med_info);
    title_others.appendChild(title_control_block);
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
    rows_page_control_block.appendChild(svg_previous);
    rows_page_control_block.appendChild(svg_next);
    return rows_page_control_block;
}
function get_underline_popup_input()
{
    const underline_div = document.createElement('div');
    My_Div.Init(underline_div, 'underline_div_popup_input','underline_div_popup_input', '100%','60px','');
    My_Div.Set_Block(underline_div, DisplayEnum.FLEX, FlexDirectionEnum.ROW, JustifyContentEnum.RIGHT);
    underline_div.style.alignItems = "center";

    const svg_confirm_SVG = Get_confirm_SVG("40px","100%" ,"60%","100%","green");
    My_Div.Init(svg_confirm_SVG, 'svg_confirm_SVG_popup_input','svg_confirm_SVG_popup_input', '40px', '40px', '');
    svg_confirm_SVG.style.border = "1px solid gray";
    svg_confirm_SVG.style.borderRadius = "3px";
    svg_confirm_SVG.style.marginRight = "5px";
    svg_confirm_SVG.addEventListener('click', function()
    {
        confirm_popup_input();
    });
    const END_QTY_input_div = document.createElement('div');
    My_Div.Init(END_QTY_input_div, 'END_QTY_input_div_popup_input','END_QTY_input_div_popup_input', '90%','100%','');
    My_Div.Set_Block(END_QTY_input_div, DisplayEnum.FLEX, FlexDirectionEnum.ROW, JustifyContentEnum.CENTER);
  
  
    const END_QTY_input = document.createElement('input');
    My_Div.Init(END_QTY_input, 'END_QTY_input_popup_input','END_QTY_input_popup_input', '100%','80%','');
    My_Div.Set_Text(END_QTY_input, ``, TextAlignEnum.CENTER, "22px", true,"微軟正黑體","black");
    END_QTY_input.readOnly = false;
    END_QTY_input.type = "number";
    END_QTY_input.inputMode = "numeric";
    END_QTY_input.style.backgroundColor = "";
    END_QTY_input.style.borderRadius = "5px";
    END_QTY_input.style.marginLeft = "10px";
    END_QTY_input.style.marginRight = "10px";
    END_QTY_input.placeholder = "請點擊輸入盤點數量";
    END_QTY_input.onfocus = function()
    {
       //this.select();        
    };
    END_QTY_input.addEventListener("keydown", function(event)
     {
        if (event.keyCode === 13 || event.key === "Enter") 
        {
           confirm_popup_input();
        }
    });
    END_QTY_input.addEventListener("blur", function(event)
    {
           confirm_popup_input();
    });
    END_QTY_input_div.appendChild(END_QTY_input);

    underline_div.appendChild(END_QTY_input_div);
    underline_div.appendChild(svg_confirm_SVG);

    return underline_div;
}
function get_row_popup_input(Sub_content)
{
    const row = document.createElement('div');
    My_Div.Init(row, 'row_popup_input','row_popup_input', '95%','100px');
    My_Div.Set_Block(row, DisplayEnum.FLEX, FlexDirectionEnum.COLUMN, JustifyContentEnum.TOP);
    if(Sub_content != undefined)
    {
        const block1 = get_block1_popup_input(Sub_content);
        const block2 = get_block2_popup_input(Sub_content);
        row.appendChild(block1);
        row.appendChild(block2);
    }
  

    row.style.margin = "5px 5px 5px 5px";
    row.style.border  = '1px solid';
    row.style.borderRadius = '3px 2px 3px 2px';
    row.style.boxShadow = '1px 1px 2px 2px black';
    return row;
}
function get_block1_popup_input(Sub_content)
{
    
    const block1 = document.createElement('div');
    My_Div.Init(block1, 'block1_popup_input','block1_popup_input', '100%','40px');
    My_Div.Set_Block(block1, DisplayEnum.FLEX, FlexDirectionEnum.ROW, JustifyContentEnum.LEFT);
    block1.style.marginTop = "5px";


    const block1_user_delete_div = document.createElement('div');
    My_Div.Init(block1_user_delete_div, 'block1_user_delete_div_popup_input','block1_user_delete_div_popup_input', '100%',"100%");
    My_Div.Set_Block(block1_user_delete_div, DisplayEnum.FLEX, FlexDirectionEnum.ROW,JustifyContentEnum.RIGHT);
   
    var trashBox_SVG = Get_trashBox_SVG("40px", "100%", "65%","100%","red","");
    trashBox_SVG.style.borderRadius = '3px';
    trashBox_SVG.style.border = '1px solid gray';
    trashBox_SVG.style.marginRight = '3px';
    trashBox_SVG.onclick = function()
    {
        delete_row_popup_input(Sub_content.GUID,Sub_content.Master_GUID);
    };
    const block1_user_text = document.createElement('div');
    My_Div.Init(block1_user_text, 'block1_user_text_popup_input','block1_user_text_popup_input', '100%',"100%" , '');
    My_Div.Set_Text(block1_user_text, `操作人 : ${Sub_content.OP}`, TextAlignEnum.LEFT, "18px", true,"微軟正黑體","black" );
    block1_user_text.style.marginLeft = "5px";

    block1_user_delete_div.appendChild(block1_user_text);
    block1_user_delete_div.appendChild(trashBox_SVG);
   

    block1.appendChild(block1_user_delete_div);
    return block1;
}
function get_block2_popup_input(Sub_content)
{
    const block2 = document.createElement('div');
    My_Div.Init(block2, 'block2_popup_input','block2_popup_input', '100%','40px' , '');
    My_Div.Set_Block(block2, DisplayEnum.FLEX, FlexDirectionEnum.ROW, JustifyContentEnum.LEFT);
    block2.style.marginTop = "5px";
    block2.style.alignItems = "center";

    const block2_Date = document.createElement('div');
    My_Div.Init(block2_Date, 'block2_Date_popup_input','block2_Date_popup_input', '85%',"100%");
    My_Div.Set_Text(block2_Date, `時間 : \n ${Sub_content.OP_TIME}`, TextAlignEnum.LEFT, "13px", true,"微軟正黑體","black" );
    block2_Date.style.marginLeft = "5px";

    const block2_Value = document.createElement('div');
    My_Div.Init(block2_Value, 'block2_Value_popup_input','block2_Value_popup_input', '50%',"70%");
    My_Div.Set_Block(block2_Value, DisplayEnum.FLEX, FlexDirectionEnum.ROW, JustifyContentEnum.LEFT);
    block2_Value.style.marginLeft = "5px";
    block2_Value.style.marginRight = "10px";

    const block2_Value_text = document.createElement('div');
    My_Div.Init(block2_Value_text, 'block2_Value_text_popup_input','block2_Value_text_popup_input', '30px',"100%" ,'white');
    My_Div.Set_Text(block2_Value_text, "數量", TextAlignEnum.LEFT, "13.5px", true,"微軟正黑體","black");
    const block2_Value_input = document.createElement('input');
    My_Div.Init(block2_Value_input, 'block2_Value_input_popup_input','block2_Value_input_popup_input', '80%',"100%" ,'');
    My_Div.Set_Text(block2_Value_input, `${Sub_content.END_QTY}`, TextAlignEnum.RIGHT, "16px", true,"微軟正黑體","black");
    block2_Value_input.readOnly = true;
    block2_Value_input.value = Sub_content.END_QTY;
    block2_Value_input.type = "number";
    block2_Value_input.inputMode = "numeric";
    block2_Value_input.style.backgroundColor = "lightgray";
    block2_Value_input.style.borderRadius = "5px";

    block2_Value.appendChild(block2_Value_text);
    block2_Value.appendChild(block2_Value_input);
    block2.appendChild(block2_Date);
    block2.appendChild(block2_Value);
    return block2;
}
