var popup_serch_div;

function get_popup_serch()
{
    popup_serch_div = new Basic_popup_Div('popup_serch_div','popup_serch_div','330px','');
    popup_serch_div._popup_div.style.border = '10px solid white';
    const title_text = get_title_popup_serch();
    const serch_box_div = get_serch_box_popup_serch();
    const underline = get_underline_popup_serch();

    popup_serch_div.AddControl(title_text);
    popup_serch_div.AddControl(serch_box_div);
    popup_serch_div.AddControl(underline);


    return popup_serch_div;
}

function show_popup_serch()
{
    const serch_IP_input = document.querySelector('#serch_IP_input_popup_serch');
    const serch_CODE_input = document.querySelector('#serch_CODE_input_popup_serch');
    const serch_SKDIACODE_input = document.querySelector('#serch_SKDIACODE_input_popup_serch');
    const serch_NAME_input = document.querySelector('#serch_NAME_input_popup_serch');
    const serch_CHT_NAME_input = document.querySelector('#serch_CHT_NAME_input_popup_serch');

    serch_IP_input.value = '';
    serch_CODE_input.value = '';
    serch_SKDIACODE_input.value = '';
    serch_NAME_input.value = '';
    serch_CHT_NAME_input.value = '';

    popup_serch_div.Set_Visible(true);  
    updateDivHeight(popup_serch_div._popup_div , 10);
}

function hide_popup_serch()
{
    popup_serch_div.Set_Visible(false);
}

function undo_popup_serch()
{
    hide_popup_serch();
}
function confirm_popup_serch()
{
    try
    {
        const serch_IP_input = document.querySelector('#serch_IP_input_popup_serch');
        const serch_CODE_input = document.querySelector('#serch_CODE_input_popup_serch');
        const serch_SKDIACODE_input = document.querySelector('#serch_SKDIACODE_input_popup_serch');
        const serch_NAME_input = document.querySelector('#serch_NAME_input_popup_serch');
        const serch_CHT_NAME_input = document.querySelector('#serch_CHT_NAME_input_popup_serch');
        if(!serch_IP_input.value && !serch_CODE_input.value && !serch_SKDIACODE_input.value && !serch_NAME_input.value && !serch_CHT_NAME_input.value)
        {
            for(var i = 0; i < allrows.length ; i++)
            {
                allrows[i].style.display = "inline-block";
                allrows[i].style.visibility = "visible";
            }
            return;
        }
        const ratio_button_byNormal_input = document.querySelector('#ratio_button_byNormal_input_popup_serch');
        const ratio_button_bylike_input = document.querySelector('#ratio_button_bylike_input_popup_serch');
        const ratio_button_bystartWith_input = document.querySelector('#ratio_button_bystartWith_input_popup_serch');
        if(ratio_button_byNormal_input.checked)
        {
            popup_serch_ByNormal();
            return;
        }
        if(ratio_button_bylike_input.checked)
        {
            popup_serch_ByLike();
            return;
        }
        if(ratio_button_bystartWith_input.checked)
        {
            popup_serch_ByStartWith();
            return;
        }
    }
    catch (e) {}
    finally
    {
        hide_popup_serch();
    }
}
function popup_serch_ByStartWith()
{
    const serch_IP_input = document.querySelector('#serch_IP_input_popup_serch');
    const serch_CODE_input = document.querySelector('#serch_CODE_input_popup_serch');
    const serch_SKDIACODE_input = document.querySelector('#serch_SKDIACODE_input_popup_serch');
    const serch_NAME_input = document.querySelector('#serch_NAME_input_popup_serch');
    const serch_CHT_NAME_input = document.querySelector('#serch_CHT_NAME_input_popup_serch');

    var serch_value0 = '';
    var serch_value1 = '';
    if(serch_IP_input.value)
    {
        serch_value0 = serch_IP_input.value;
        serch_value0.toUpperCase();
    }
    if(serch_CODE_input.value)
    {
        serch_value0 = serch_CODE_input.value;
        serch_value0.toUpperCase();
    }
    if(serch_SKDIACODE_input.value)
    {
        serch_value0 = serch_SKDIACODE_input.value;
        serch_value0.toUpperCase();
    }
    if(serch_NAME_input.value)
    {
        serch_value0 = serch_NAME_input.value;
        serch_value0.toUpperCase();
    }
    if(serch_CHT_NAME_input.value)
    {
        serch_value0 = serch_CHT_NAME_input.value;
        serch_value0.toUpperCase();
    }

    if(serch_value0 == '') return;

    for(var i = 0; i < allrows.length ; i++)
    {
        if(serch_IP_input.value) serch_value1 = allrows[i].getAttribute("IP").toUpperCase();  
        if(serch_CODE_input.value) serch_value1 = allrows[i].getAttribute("CODE").toUpperCase();  
        if(serch_SKDIACODE_input.value) serch_value1 = allrows[i].getAttribute("SKDIACODE").toUpperCase();  
        if(serch_NAME_input.value) serch_value1 = allrows[i].getAttribute("NAME").toUpperCase();  
        if(serch_CHT_NAME_input.value) serch_value1 = allrows[i].getAttribute("CHT_NAME").toUpperCase();  
       
        var serch_value1 = serch_value1.substring(0, serch_value0.length);

        if (serch_value0 == serch_value1)
        {
            allrows[i].style.display = "inline-block";
            allrows[i].style.visibility = "visible";
        }
        else 
        {
            allrows[i].style.display = "none";
            allrows[i].style.visibility = "hidden";
        }
        
    }
}
function popup_serch_ByLike()
{
    const serch_IP_input = document.querySelector('#serch_IP_input_popup_serch');
    const serch_CODE_input = document.querySelector('#serch_CODE_input_popup_serch');
    const serch_SKDIACODE_input = document.querySelector('#serch_SKDIACODE_input_popup_serch');
    const serch_NAME_input = document.querySelector('#serch_NAME_input_popup_serch');
    const serch_CHT_NAME_input = document.querySelector('#serch_CHT_NAME_input_popup_serch');

    var serch_value0 = '';
    var serch_value1 = '';
    if(serch_IP_input.value)
    {
        serch_value0 = serch_IP_input.value;
        serch_value0.toUpperCase();
    }
    if(serch_CODE_input.value)
    {
        serch_value0 = serch_CODE_input.value;
        serch_value0.toUpperCase();
    }
    if(serch_SKDIACODE_input.value)
    {
        serch_value0 = serch_SKDIACODE_input.value;
        serch_value0.toUpperCase();
    }
    if(serch_NAME_input.value)
    {
        serch_value0 = serch_NAME_input.value;
        serch_value0.toUpperCase();
    }
    if(serch_CHT_NAME_input.value)
    {
        serch_value0 = serch_CHT_NAME_input.value;
        serch_value0.toUpperCase();
    }
    if(serch_value0 == '') return;
   
    for(var i = 0; i < allrows.length ; i++)
    {
        if(serch_IP_input.value) serch_value1 = allrows[i].getAttribute("IP").toUpperCase();
        if(serch_CODE_input.value) serch_value1 = allrows[i].getAttribute("CODE").toUpperCase();  
        if(serch_SKDIACODE_input.value) serch_value1 = allrows[i].getAttribute("SKDIACODE").toUpperCase();  
        if(serch_NAME_input.value) serch_value1 = allrows[i].getAttribute("NAME").toUpperCase();  
        if(serch_CHT_NAME_input.value) serch_value1 = allrows[i].getAttribute("CHT_NAME").toUpperCase();  
        if (serch_value1.indexOf(serch_value0) !== -1)
        {
            allrows[i].style.display = "inline-block";
            allrows[i].style.visibility = "visible";
        }
        else 
        {
            allrows[i].style.display = "none";
            allrows[i].style.visibility = "hidden";
        }
        
    }
}
function popup_serch_ByNormal()
{
    const serch_IP_input = document.querySelector('#serch_IP_input_popup_serch');
    const serch_CODE_input = document.querySelector('#serch_CODE_input_popup_serch');
    const serch_SKDIACODE_input = document.querySelector('#serch_SKDIACODE_input_popup_serch');
    const serch_NAME_input = document.querySelector('#serch_NAME_input_popup_serch');
    const serch_CHT_NAME_input = document.querySelector('#serch_CHT_NAME_input_popup_serch');

    var serch_value0 = '';
    var serch_value1 = '';
    if(serch_IP_input.value)
    {
        serch_value0 = serch_IP_input.value;
        serch_value0.toUpperCase();
    }
    if(serch_CODE_input.value)
    {
        serch_value0 = serch_CODE_input.value;
        serch_value0.toUpperCase();
    }
    if(serch_SKDIACODE_input.value)
    {
        serch_value0 = serch_SKDIACODE_input.value;
        serch_value0.toUpperCase();
    }
    if(serch_NAME_input.value)
    {
        serch_value0 = serch_NAME_input.value;
        serch_value0.toUpperCase();
    }
    if(serch_CHT_NAME_input.value)
    {
        serch_value0 = serch_CHT_NAME_input.value;
        serch_value0.toUpperCase();
    }
    if(serch_value0 == '') return;

    for(var i = 0; i < allrows.length ; i++)
    {
        if(serch_IP_input.value) serch_value1 = allrows[i].getAttribute("IP").toUpperCase(); 
        if(serch_CODE_input.value) serch_value1 = allrows[i].getAttribute("CODE").toUpperCase();  
        if(serch_SKDIACODE_input.value) serch_value1 = allrows[i].getAttribute("SKDIACODE").toUpperCase();  
        if(serch_NAME_input.value) serch_value1 = allrows[i].getAttribute("NAME").toUpperCase();  
        if(serch_CHT_NAME_input.value) serch_value1 = allrows[i].getAttribute("CHT_NAME").toUpperCase();  
        if(serch_value1 == serch_value0) 
        {
            allrows[i].style.display = "inline-block";
            allrows[i].style.visibility = "visible";
        }
        else 
        {
            allrows[i].style.display = "none";
            allrows[i].style.visibility = "hidden";
        }
    }
}

function get_title_popup_serch()
{
    const title_text = document.createElement('div');
    My_Div.Init(title_text, 'title_text_serch_div','title_text_serch_div', '100%', '40px', 'gray');
    My_Div.Set_Text(title_text ,"搜尋功能" , TextAlignEnum.CENTER , "24px", true,"微軟正黑體","white");
    title_text.style.borderRadius = "5px";
    title_text.style.marginBottom = "10px";
    return title_text;
}
function get_serch_box_popup_serch()
{
    const serch_box_div = document.createElement('div');
    My_Div.Init(serch_box_div,'serch_box_div_popup_serch','serch_box_div_popup_serch', '100%','','');
    My_Div.Set_Block(serch_box_div, DisplayEnum.FLEX, FlexDirectionEnum.COLUMN, JustifyContentEnum.CENTER);
    serch_box_div.style.alignItems = "center";
    serch_box_div.style.flexWrap  = "wrap";

    const serch_IP_div = document.createElement('div');
    My_Div.Init(serch_IP_div,'serch_IP_div_popup_serch','serch_IP_div_popup_serch', '100%','50px','');
    My_Div.Set_Block(serch_IP_div, DisplayEnum.FLEX, FlexDirectionEnum.ROW, JustifyContentEnum.LEFT);
    serch_IP_div.style.marginBottom = "10px";
    const serch_IP_text = document.createElement('div');
    My_Div.Init(serch_IP_text,'serch_IP_text_popup_serch','serch_IP_text_popup_serch', '120px','100%','royalblue');
    My_Div.Set_Text(serch_IP_text ,"儲位IP" , TextAlignEnum.CENTER , "18px", false ,"微軟正黑體","white");
    serch_IP_text.style.borderRadius = "5px";
    serch_IP_text.style.marginRight = "10px";
    const serch_IP_input = document.createElement('input');
    My_Div.Init(serch_IP_input,'serch_IP_input_popup_serch','serch_IP_input_popup_serch', '80%','100%','');
    My_Div.Set_Text(serch_IP_input ,"" , TextAlignEnum.LEFT , "18px", false ,"微軟正黑體","black");
    serch_IP_input.placeholder = '請輸入...   ';
    serch_IP_input.style.paddingLeft = "10px";
    serch_IP_input.style.borderRadius = "3px";
    serch_IP_input.style.border = "1px solid gray";
    serch_IP_input.type = "email";
    serch_IP_input.inputMode = "latin";
    serch_IP_input.onfocus = function()
    {
       this.select();       
    };
    serch_IP_div.appendChild(serch_IP_text);
    serch_IP_div.appendChild(serch_IP_input);

    const serch_CODE_div = document.createElement('div');
    My_Div.Init(serch_CODE_div,'serch_CODE_div_popup_serch','serch_CODE_div_popup_serch', '100%','50px','');
    My_Div.Set_Block(serch_CODE_div, DisplayEnum.FLEX, FlexDirectionEnum.ROW, JustifyContentEnum.LEFT);
    serch_CODE_div.style.marginBottom = "10px";
    const serch_CODE_text = document.createElement('div');
    My_Div.Init(serch_CODE_text,'serch_CODE_text_popup_serch','serch_CODE_text_popup_serch', '120px','100%','royalblue');
    My_Div.Set_Text(serch_CODE_text ,"藥碼" , TextAlignEnum.CENTER , "18px", false ,"微軟正黑體","white");
    serch_CODE_text.style.borderRadius = "5px";
    serch_CODE_text.style.marginRight = "10px";
    const serch_CODE_input = document.createElement('input');
    My_Div.Init(serch_CODE_input,'serch_CODE_input_popup_serch','serch_CODE_input_popup_serch', '80%','100%','');
    My_Div.Set_Text(serch_CODE_input ,"" , TextAlignEnum.LEFT , "18px", false ,"微軟正黑體","black");
    serch_CODE_input.placeholder = '請輸入...   ';
    serch_CODE_input.style.paddingLeft = "10px";
    serch_CODE_input.style.borderRadius = "3px";
    serch_CODE_input.style.border = "1px solid gray";
    serch_CODE_input.type = "email";
    serch_CODE_input.inputMode = "latin";
    serch_CODE_input.onfocus = function()
    {
       this.select();       
    };
    serch_CODE_div.appendChild(serch_CODE_text);
    serch_CODE_div.appendChild(serch_CODE_input);

    const serch_SKDIACODE_div = document.createElement('div');
    My_Div.Init(serch_SKDIACODE_div,'serch_SKDIACODE_div_popup_serch','serch_SKDIACODE_div_popup_serch', '100%','50px','');
    My_Div.Set_Block(serch_SKDIACODE_div, DisplayEnum.FLEX, FlexDirectionEnum.ROW, JustifyContentEnum.LEFT);
    serch_SKDIACODE_div.style.marginBottom = "10px";
    const serch_SKDIACODE_text = document.createElement('div');
    My_Div.Init(serch_SKDIACODE_text,'serch_SKDIACODE_text_popup_serch','serch_SKDIACODE_text_popup_serch', '120px','100%','royalblue');
    My_Div.Set_Text(serch_SKDIACODE_text ,"料號" , TextAlignEnum.CENTER , "18px", false ,"微軟正黑體","white");
    serch_SKDIACODE_text.style.borderRadius = "5px";
    serch_SKDIACODE_text.style.marginRight = "10px";
    const serch_SKDIACODE_input = document.createElement('input');
    My_Div.Init(serch_SKDIACODE_input,'serch_SKDIACODE_input_popup_serch','serch_SKDIACODE_input_popup_serch', '80%','100%','');
    My_Div.Set_Text(serch_SKDIACODE_input ,"" , TextAlignEnum.LEFT , "18px", false ,"微軟正黑體","black");
    serch_SKDIACODE_input.placeholder = '請輸入...   ';
    serch_SKDIACODE_input.style.borderRadius = "3px";
    serch_SKDIACODE_input.style.border = "1px solid gray";
    serch_SKDIACODE_input.style.paddingLeft = "10px";
    serch_SKDIACODE_input.type = "email";
    serch_SKDIACODE_input.inputMode = "latin";
    serch_SKDIACODE_input.onfocus = function()
    {
       this.select();       
    };
    serch_SKDIACODE_div.appendChild(serch_SKDIACODE_text);
    serch_SKDIACODE_div.appendChild(serch_SKDIACODE_input);


    const serch_NAME_div = document.createElement('div');
    My_Div.Init(serch_NAME_div,'serch_NAME_div_popup_serch','serch_NAME_div_popup_serch', '100%','50px','');
    My_Div.Set_Block(serch_NAME_div, DisplayEnum.FLEX, FlexDirectionEnum.ROW, JustifyContentEnum.LEFT);
    serch_NAME_div.style.marginBottom = "10px";
    const serch_NAME_text = document.createElement('div');
    My_Div.Init(serch_NAME_text,'serch_NAME_text_popup_serch','serch_NAME_text_popup_serch', '120px','100%','royalblue');
    My_Div.Set_Text(serch_NAME_text ,"藥名" , TextAlignEnum.CENTER , "18px", false ,"微軟正黑體","white");
    serch_NAME_text.style.borderRadius = "5px";
    serch_NAME_text.style.marginRight = "10px";
    const serch_NAME_input = document.createElement('input');
    My_Div.Init(serch_NAME_input,'serch_NAME_input_popup_serch','serch_NAME_input_popup_serch', '80%','100%','');
    My_Div.Set_Text(serch_NAME_input ,"" , TextAlignEnum.LEFT , "18px", false ,"微軟正黑體","black");
    serch_NAME_input.placeholder = '請輸入...   ';
    serch_NAME_input.style.borderRadius = "3px";
    serch_NAME_input.style.border = "1px solid gray";
    serch_NAME_input.style.paddingLeft = "10px";
    serch_NAME_input.type = "email";
    serch_NAME_input.inputMode = "latin";
    serch_NAME_input.onfocus = function()
    {
       this.select();       
    };
    serch_NAME_div.appendChild(serch_NAME_text);
    serch_NAME_div.appendChild(serch_NAME_input);

    const serch_CHT_NAME_div = document.createElement('div');
    My_Div.Init(serch_CHT_NAME_div,'serch_CHT_NAME_div_popup_serch','serch_CHT_NAME_div_popup_serch', '100%','50px','');
    My_Div.Set_Block(serch_CHT_NAME_div, DisplayEnum.FLEX, FlexDirectionEnum.ROW, JustifyContentEnum.LEFT);
    serch_CHT_NAME_div.style.marginBottom = "10px";
    const serch_CHT_NAME_text = document.createElement('div');
    My_Div.Init(serch_CHT_NAME_text,'serch_CHT_NAME_text_popup_serch','serch_CHT_NAME_text_popup_serch', '120px','100%','royalblue');
    My_Div.Set_Text(serch_CHT_NAME_text ,"中文名" , TextAlignEnum.CENTER , "18px", false ,"微軟正黑體","white");
    serch_CHT_NAME_text.style.borderRadius = "5px";
    serch_CHT_NAME_text.style.marginRight = "10px";
    const serch_CHT_NAME_input = document.createElement('input');
    My_Div.Init(serch_CHT_NAME_input,'serch_CHT_NAME_input_popup_serch','serch_CHT_NAME_input_popup_serch', '80%','100%','');
    My_Div.Set_Text(serch_CHT_NAME_input ,"" , TextAlignEnum.LEFT , "18px", false ,"微軟正黑體","black");
    serch_CHT_NAME_input.placeholder = '請輸入...   ';
    serch_CHT_NAME_input.style.borderRadius = "3px";
    serch_CHT_NAME_input.style.border = "1px solid gray";
    serch_CHT_NAME_input.style.paddingLeft = "10px";
    serch_CHT_NAME_input.type = "text";
    serch_CHT_NAME_input.inputMode = "latin";
    serch_CHT_NAME_input.onfocus = function()
    {
       this.select();       
    };
    serch_CHT_NAME_div.appendChild(serch_CHT_NAME_text);
    serch_CHT_NAME_div.appendChild(serch_CHT_NAME_input);

    serch_box_div.append(serch_IP_div);
    serch_box_div.append(serch_CODE_div);
    serch_box_div.append(serch_SKDIACODE_div);
    serch_box_div.append(serch_NAME_div);
    serch_box_div.append(serch_CHT_NAME_div);
    return serch_box_div;
}
function get_underline_popup_serch()
{
    const underline_div = document.createElement('div');
    My_Div.Init(underline_div, 'underline_div_serch_div_popup_serch','underline_div_serch_div_popup_serch', '100%','60px','');
    My_Div.Set_Block(underline_div, DisplayEnum.FLEX, FlexDirectionEnum.ROW, JustifyContentEnum.RIGHT);
    underline_div.style.alignItems = "center";

    const underline_serchtype_div = document.createElement('div');
    My_Div.Init(underline_serchtype_div, 'underline_serchtype_div_popup_serch','underline_serchtype_div_popup_serch', '72%','100%','');
    My_Div.Set_Block(underline_serchtype_div, DisplayEnum.FLEX, FlexDirectionEnum.ROW, JustifyContentEnum.LEFT);
    underline_div.style.alignItems = "center";
    

    const ratio_button_bylike_input = document.createElement('input');
    ratio_button_bylike_input.id= 'ratio_button_bylike_input_popup_serch';
    ratio_button_bylike_input.type = "radio";
    ratio_button_bylike_input.name = "serch_type";
    ratio_button_bylike_input.style.width = "15px";
    ratio_button_bylike_input.style.height = "15px";
    ratio_button_bylike_input.style.marginRight = "3px";
    ratio_button_bylike_input.checked = "true";

    underline_serchtype_div.appendChild(ratio_button_bylike_input);
    
    const serch_bylike_text = document.createElement('div');
    My_Div.Init(serch_bylike_text,'serch_bylike_text_popup_serch','serch_bylike_text_popup_serch', '35px','100%','');
    My_Div.Set_Text(serch_bylike_text ,"模糊" , TextAlignEnum.CENTER , "14px", false ,"微軟正黑體","black");
    serch_bylike_text.style.marginRight = "5px";
    underline_serchtype_div.appendChild(serch_bylike_text);

    const ratio_button_bystartWith_input = document.createElement('input');
    ratio_button_bystartWith_input.type = "radio";
    ratio_button_bystartWith_input.id= 'ratio_button_bystartWith_input_popup_serch';
    ratio_button_bystartWith_input.name = "serch_type";
    ratio_button_bystartWith_input.style.width = "15px";
    ratio_button_bystartWith_input.style.height = "15px";
    ratio_button_bystartWith_input.style.marginRight = "3px";
    underline_serchtype_div.appendChild(ratio_button_bystartWith_input);

    const serch_bystartWith_text = document.createElement('div');
    My_Div.Init(serch_bystartWith_text,'serch_bystartWith_text_popup_serch','serch_bystartWith_text_popup_serch', '35px','100%','');
    My_Div.Set_Text(serch_bystartWith_text ,"前綴" , TextAlignEnum.CENTER , "14px", false ,"微軟正黑體","black");
    serch_bystartWith_text.style.marginRight = "5px";
    underline_serchtype_div.appendChild(serch_bystartWith_text);

    const ratio_button_byNormal_input = document.createElement('input');
    ratio_button_byNormal_input.type = "radio";
    ratio_button_byNormal_input.id= 'ratio_button_byNormal_input_popup_serch';
    ratio_button_byNormal_input.name = "serch_type";
    ratio_button_byNormal_input.style.width = "15px";
    ratio_button_byNormal_input.style.height = "15px";
    ratio_button_byNormal_input.style.marginRight = "3px";
    underline_serchtype_div.appendChild(ratio_button_byNormal_input);

    const serch_byNormal_text = document.createElement('div');
    My_Div.Init(serch_byNormal_text,'serch_byNormal_text_popup_serch','serch_byNormal_text_popup_serch', '35px','100%','');
    My_Div.Set_Text(serch_byNormal_text ,"標準" , TextAlignEnum.CENTER , "14px", false ,"微軟正黑體","black");
    serch_byNormal_text.style.marginRight = "5px";
    underline_serchtype_div.appendChild(serch_byNormal_text);

    const svg_confirm_SVG = Get_confirm_SVG("40px","100%" ,"60%","100%","green");
    My_Div.Init(svg_confirm_SVG, 'svg_confirm_SVG_popup_input','svg_confirm_SVG_popup_input', '40px', '40px', '');
    svg_confirm_SVG.style.border = "1px solid gray";
    svg_confirm_SVG.style.borderRadius = "3px";
    svg_confirm_SVG.style.marginRight = "5px";
    svg_confirm_SVG.addEventListener('click', function()
    {
        confirm_popup_serch();
    });
    const svg_undo_SVG = Get_undo_SVG("40px","100%" ,"60%","100%","");
    My_Div.Init(svg_undo_SVG, 'svg_undo_SVG_popup_input','svg_undo_SVG_popup_input', '40px', '40px', '');
    svg_undo_SVG.style.border = "1px solid gray";
    svg_undo_SVG.style.borderRadius = "3px";
    svg_undo_SVG.style.marginRight = "5px";
    svg_undo_SVG.addEventListener('click', function()
    {
        undo_popup_serch();
    });
    underline_div.appendChild(underline_serchtype_div);

    underline_div.appendChild(svg_undo_SVG);
    underline_div.appendChild(svg_confirm_SVG);
    return underline_div;
}