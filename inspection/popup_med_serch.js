var popup_med_serch_div;
var popup_med_serch_value = null;
var popup_med_serch_finishedEvent = [];
var popup_med_serch_medclass = null;
var popup_med_serch_rows_div = [];
var popup_med_serch_NumOfPageRows = 6;
var popup_med_serch_PageIndex = 0;
var popup_med_serch_MaxfPage = 0;
async function popup_med_serch_load()
{ 
   
    popup_med_serch_div.Clear();
    const title = popup_med_serch_title_init();
    const content = popup_med_serch_content_init();
    const underline = popup_med_serch_underline_init();
    popup_med_serch_div.Set_BackgroundOpacity(0.8);
    popup_med_serch_div.AddControl(title);
    popup_med_serch_div.AddControl(content);
    popup_med_serch_div.AddControl(underline);
    popup_med_serch_rows_div = [];
    popup_med_serch_value = null;
}
async function popup_med_serch_closed()
{
   for(var i = 0 ; i < popup_med_serch_rows_div.length ; i++)
   {
       if( popup_med_serch_rows_div[i].getAttribute("checked") == "true")
       {
           popup_med_serch_value = popup_med_serch_rows_div[i].getAttribute("CODE");
           break;
       }
   }

   for(var i = 0 ; i < popup_med_serch_finishedEvent.length ; i++)
   {
       if(typeof popup_med_serch_finishedEvent[i] == "function") 
       {
           await popup_med_serch_finishedEvent[i](popup_med_serch_value);
       }
   }
}
async function popup_med_serch_init()
{
    popup_med_serch_div = new Basic_popup_Div('popup_med_serch_div_popup_med_serch','popup_med_serch_div_popup_med_serch','330px','');
    popup_med_serch_div._popup_div.style.border = '10px solid white';
    popup_med_serch_div.LoadEvent.push(popup_med_serch_load);
    popup_med_serch_div.ClosedEvent.push(popup_med_serch_closed);

    popup_med_serch_div.Close();
    
    document.body.appendChild(popup_med_serch_div.div);
    return popup_med_serch_div;
}

function popup_med_serch_title_init()
{
    const title_text = document.createElement('div');
    My_Div.Init(title_text, 'popup_med_serch_title','popup_med_serch_title', '100%', '40px', 'green');
    My_Div.Set_Text(title_text ,"藥品搜尋" , TextAlignEnum.CENTER , "24px", true,"微軟正黑體","white");
    title_text.style.borderRadius = "5px";
    title_text.style.marginBottom = "5px";
    return title_text;
}
function popup_med_serch_content_init()
{
    const content = document.createElement('div');
    My_Div.Set_Block(content, DisplayEnum.FLEX, FlexDirectionEnum.COLUMN, JustifyContentEnum.CENTER);

    const content_serch_type_div = document.createElement('div');
    My_Div.Init(content_serch_type_div, 'content_serch_type_div','content_serch_type_div', '100%', '', '');
    My_Div.Set_Block(content_serch_type_div, DisplayEnum.FLEX, FlexDirectionEnum.ROW, JustifyContentEnum.LEFT);

    const radio_content_ENG_NAME = document.createElement('input');
    radio_content_ENG_NAME.type = "radio";
    radio_content_ENG_NAME.id= 'radio_content_ENG_NAME';
    radio_content_ENG_NAME.name = "serch_type";
    radio_content_ENG_NAME.style.width = "20px";
    radio_content_ENG_NAME.style.height = "20px";
    radio_content_ENG_NAME.style.marginRight = "3px";
    radio_content_ENG_NAME.checked = "true";
    content_serch_type_div.appendChild(radio_content_ENG_NAME);
   
    const radio_content_ENG_NAME_text = document.createElement('div');
    My_Div.Set_Text(radio_content_ENG_NAME_text ,"藥名" , TextAlignEnum.CENTER , "16px", false,"標楷體","black");
    radio_content_ENG_NAME_text.style.marginLeft = "5px";
    radio_content_ENG_NAME_text.style.marginRight = "5px";
    content_serch_type_div.appendChild(radio_content_ENG_NAME_text);

    const radio_content_DIANAME = document.createElement('input');
    radio_content_DIANAME.type = "radio";
    radio_content_DIANAME.id= 'radio_content_DIANAME';
    radio_content_DIANAME.name = "serch_type";
    radio_content_DIANAME.style.width = "20px";
    radio_content_DIANAME.style.height = "20px";
    radio_content_DIANAME.style.marginRight = "3px";
    content_serch_type_div.appendChild(radio_content_DIANAME);
   
    const radio_content_DIANAME_text = document.createElement('div');
    My_Div.Set_Text(radio_content_DIANAME_text ,"商品名" , TextAlignEnum.CENTER , "16px", false,"標楷體","black");
    radio_content_DIANAME_text.style.marginLeft = "5px";
    radio_content_DIANAME_text.style.marginRight = "5px";
    content_serch_type_div.appendChild(radio_content_DIANAME_text);

    const radio_content_CHT_NAME = document.createElement('input');
    radio_content_CHT_NAME.type = "radio";
    radio_content_CHT_NAME.id= 'radio_content_CHT_NAME';
    radio_content_CHT_NAME.name = "serch_type";
    radio_content_CHT_NAME.style.width = "20px";
    radio_content_CHT_NAME.style.height = "20px";
    radio_content_CHT_NAME.style.marginRight = "3px";
    radio_content_CHT_NAME.style.marginLeft = "5px";
    radio_content_CHT_NAME.style.marginRight = "5px";
    content_serch_type_div.appendChild(radio_content_CHT_NAME);
   
    const radio_content_CHT_NAME_text = document.createElement('div');
    My_Div.Set_Text(radio_content_CHT_NAME_text ,"中文名" , TextAlignEnum.CENTER , "16px", false,"標楷體","black");
    content_serch_type_div.appendChild(radio_content_CHT_NAME_text);

    content.appendChild(content_serch_type_div);

    const content_serch_type_textBox_div = document.createElement('div');
    My_Div.Init(content_serch_type_textBox_div, 'content_serch_type_textBox_div','content_serch_type_textBox_div', '100%', '', '');
    My_Div.Set_Block(content_serch_type_textBox_div, DisplayEnum.FLEX, FlexDirectionEnum.ROW, JustifyContentEnum.CENTER);

    const content_serch_type_textBox = document.createElement('input');
    My_Div.Init(content_serch_type_textBox, 'content_serch_type_textBox','content_serch_type_textBox', '70%', '40px', '');
    My_Div.Set_Text(content_serch_type_textBox ,"" , TextAlignEnum.CENTER , "20px", false,"微軟正黑體","black");

    content_serch_type_textBox.placeholder = '輸入搜尋內容...';
    content_serch_type_textBox.style.marginTop = "5px";
    content_serch_type_textBox.style.borderRadius = "5px";
    content_serch_type_textBox.style.border = "2px solid gray";
    content_serch_type_textBox.type = "text";
    content_serch_type_textBox.inputMode = "latin";
    content_serch_type_textBox_div.appendChild(content_serch_type_textBox);

    const content_serch_type_serchBtn = document.createElement('button');
    content_serch_type_serchBtn.className = "control_btn";
    My_Div.Init(content_serch_type_serchBtn, 'control_btn','content_serch_type_serchBtn', '', '40px', '');
    My_Div.Set_Text(content_serch_type_serchBtn ,"搜尋" , TextAlignEnum.CENTER , "16px", false,"微軟正黑體","white");
    content_serch_type_serchBtn.style.marginLeft = "5px";
    content_serch_type_serchBtn.style.marginTop = "3px";
    content_serch_type_serchBtn.addEventListener("click", function()
    {     
        popup_med_serch_typeSerch(content_serch_type_textBox.value);
    });
    content_serch_type_textBox_div.appendChild(content_serch_type_serchBtn);

    content.appendChild(content_serch_type_textBox_div);

    const content_serch_result_div = document.createElement('div');
    My_Div.Init(content_serch_result_div, 'content_serch_result_div','content_serch_result_div', '100%', '', '');
    My_Div.Set_Block(content_serch_result_div, DisplayEnum.FLEX, FlexDirectionEnum.COLUMN, JustifyContentEnum.TOP);
    content_serch_result_div.style.marginTop = "5px";

    content.appendChild(content_serch_result_div);

    const content_serch_result_page_control_div = document.createElement('div');
    My_Div.Init(content_serch_result_page_control_div, 'content_serch_result_page_control_div','content_serch_result_page_control_div', '100%', '', '');
    My_Div.Set_Block(content_serch_result_page_control_div, DisplayEnum.FLEX, FlexDirectionEnum.ROW, JustifyContentEnum.CENTER);
    content_serch_result_page_control_div.style.marginTop = "5px";
    content_serch_result_page_control_div.style.marginBottom = "5px";

    const content_serch_result_svg_next = Get_next_SVG("40px","100%" ,"60%","100%","green");
    My_Div.Init(content_serch_result_svg_next, 'content_serch_result_svg_next','content_serch_result_svg_next', '60px', '40px', '');
    // svg_next.style.border = "1px solid gray";
    content_serch_result_svg_next.style.borderRadius = "3px";
    content_serch_result_svg_next.style.marginRight = "5px";
    content_serch_result_svg_next.style.border = "1px solid gray";
    content_serch_result_svg_next.addEventListener('click', function()
    {
        popup_med_serch_PageIndex++;
        popup_med_serch_refresh_rows();
    });
    const content_serch_result_svg_previous = Get_previous_SVG("40px","100%" ,"60%","100%","green");
    My_Div.Init(content_serch_result_svg_previous, 'content_serch_result_svg_previous','content_serch_result_svg_previous', '60px', '40px', '');
    // svg_next.style.border = "1px solid gray";
    content_serch_result_svg_previous.style.borderRadius = "3px";
    content_serch_result_svg_previous.style.marginRight = "5px";
    content_serch_result_svg_previous.style.border = "1px solid gray";
    content_serch_result_svg_previous.addEventListener('click', function()
    {
        popup_med_serch_PageIndex--;
        popup_med_serch_refresh_rows();
    });
    content_serch_result_page_control_div.appendChild(content_serch_result_svg_previous);
    content_serch_result_page_control_div.appendChild(content_serch_result_svg_next);

    content.appendChild(content_serch_result_page_control_div);

    return content;
}

function popup_med_serch_underline_init()
{
    const underline = document.createElement('div');
    My_Div.Set_Block(underline, DisplayEnum.FLEX, FlexDirectionEnum.COLUMN, JustifyContentEnum.CENTER);


    const popup_med_serch_content_submit_button = document.createElement('button');
    My_Div.Init(popup_med_serch_content_submit_button, 'link_btn','popup_med_serch_content_submit_button', '95%', '60px','gray');
    My_Div.Set_Text(popup_med_serch_content_submit_button ,"確認" , TextAlignEnum.CENTER , "24px", true,"微軟正黑體","white");

    // popup_med_serch_content_submit_button.type = "submit";
    popup_med_serch_content_submit_button.borderRadius = "10px";
    popup_med_serch_content_submit_button.onclick = async function(event)
    {
        if(typeof popup_med_serch_finishedEvent == "function") 
        {
            await popup_med_serch_finishedEvent();
        }
        await popup_med_serch_div.Close();
    };
    underline.appendChild(popup_med_serch_content_submit_button);

    return underline;
}

function popup_med_serch_typeSerch(text)
{
    const radio_content_ENG_NAME = document.querySelector("#radio_content_ENG_NAME");
    const radio_content_DIANAME = document.querySelector("#radio_content_DIANAME");
    const radio_content_CHT_NAME = document.querySelector("#radio_content_CHT_NAME");
    console.log(`[${arguments.callee.name}]`,radio_content_ENG_NAME.checked );
    var med = null;
    if(radio_content_ENG_NAME.checked == true)
    {
        med = popup_med_serch_medclass.filter(function(item)
        {
            return item.NAME.toUpperCase().includes(text.toUpperCase());
        });

      
    
        console.log("搜尋英文名結果",med);
    }
    else if(radio_content_DIANAME.checked == true)
    {
        med = popup_med_serch_medclass.filter(function(item)
        {
            return item.DIANAME.toUpperCase().includes(text.toUpperCase());
        });
        console.log("搜尋商品名結果",med);
    }
    else if(radio_content_CHT_NAME.checked == true)
    {
        med = popup_med_serch_medclass.filter(function(item)
        {
            return item.CHT_NAME.toUpperCase().includes(text.toUpperCase());
        });
        console.log("搜尋中文名結果",med);
    }
    popup_med_serch_rows_div.length = 0;
    popup_med_serch_PageIndex = 0;
    if(med.length > 0)
    {
        const content_serch_result_div = document.querySelector("#content_serch_result_div");
        for(var i = 0 ; i < med.length; i ++)
        {
            const row = popup_med_serch_get_row(med[i] , i + 1);
            popup_med_serch_rows_div.push(row);
        }
        popup_med_serch_refresh_rows();
    } else {
        alert('查無此藥...')
        popup_med_serch_div.Close(); // 關閉彈窗
        const content_serch_type_textBox = document.querySelector('.content_serch_type_textBox');
        content_serch_type_textBox.value = "";
        const content_serch_result_div = document.querySelector("#content_serch_result_div");
        content_serch_result_div.innerHTML = "";
        // popup_med_serch_div.Close(); // 關閉彈窗
        return false;
  
    }
    
}
function popup_med_serch_refresh_rows()
{
    const content_serch_result_div = document.querySelector("#content_serch_result_div");
    content_serch_result_div.innerHTML = "";
    My_Div.Init(content_serch_result_div, 'content_serch_result_div','content_serch_result_div', '100%', '', '');
    My_Div.Set_Block(content_serch_result_div, DisplayEnum.FLEX, FlexDirectionEnum.COLUMN, JustifyContentEnum.TOP);
    content_serch_result_div.style.marginTop = "5px";
    if(popup_med_serch_PageIndex < 0 ) popup_med_serch_PageIndex = 0;
    var MaxPage = Math.floor(popup_med_serch_rows_div.length / popup_med_serch_NumOfPageRows);
    if(popup_med_serch_rows_div.length % popup_med_serch_NumOfPageRows != 0) MaxPage ++;
    if(popup_med_serch_PageIndex > (MaxPage - 1)) popup_med_serch_PageIndex = (MaxPage - 1);
    var index = popup_med_serch_PageIndex * popup_med_serch_NumOfPageRows;
    console.log("popup_med_serch_PageIndex",popup_med_serch_PageIndex);
    var num = 0;

    while(true)
    {
        if(num >= popup_med_serch_NumOfPageRows)break;
        if(index >= popup_med_serch_rows_div.length) break;
        content_serch_result_div.appendChild(popup_med_serch_rows_div[index]);
        index++;
        num++;
    }
    
}
function popup_med_serch_get_row(medClass , index)
{
    const row_div = document.createElement("div");
    row_div.setAttribute("GUID",medClass.GUID);
    row_div.setAttribute("CODE",medClass.CODE);
    row_div.setAttribute("checked",false);
    My_Div.Init(row_div, `popup_med_serch_row_div${medClass.CODE}`,`popup_med_serch_row_div${medClass.CODE}`, '100%', '60px', '#8ad0ec');
    My_Div.Set_Block(row_div, DisplayEnum.FLEX, FlexDirectionEnum.COLUMN, JustifyContentEnum.CENTER);
    row_div.style.flexWrap = "wrap";
    row_div.style.borderTop = "1px solid white";

    row_div.setAttribute("bk_color",row_div.style.backgroundColor);
    row_div.addEventListener('mouseover', function () 
    {
        if(this.getAttribute("checked") == "false") 
        {
            row_div.style.backgroundColor = 'lightgray'; 
        }
    });
    row_div.addEventListener('mouseout', function () 
    {
        if(this.getAttribute("checked") == "false") 
        {
            row_div.style.backgroundColor = row_div.getAttribute("bk_color");
        }  
    });
    row_div.addEventListener('click', async function () 
    {
        for(var i=0; i < popup_med_serch_rows_div.length ; i++)
        {
            popup_med_serch_rows_div[i].setAttribute("checked",false);
            popup_med_serch_rows_div[i].style.backgroundColor = row_div.getAttribute("bk_color");
        }
        this.setAttribute("checked",true);
        this.style.backgroundColor = "yellow";
        if(typeof popup_med_serch_finishedEvent == "function") 
        {
            await popup_med_serch_finishedEvent();
        }
        await popup_med_serch_div.Close();
    });
    const row_text = document.createElement("div");
    My_Div.Init(row_text, `popup_med_serch_row_text${medClass.CODE}`,`popup_med_serch_row_text${medClass.CODE}`, '100%', '60px', '');
    My_Div.Set_Text(row_text ,`${index}.${medClass.NAME}` , TextAlignEnum.LEFT , "16px", true,"微軟正黑體","black");
    My_Div.Set_Block(row_text, DisplayEnum.FLEX, FlexDirectionEnum.ROW, JustifyContentEnum.LEFT);
    row_text.style.marginLeft = "5px";



    row_div.append(row_text);

    return row_div;
   
}