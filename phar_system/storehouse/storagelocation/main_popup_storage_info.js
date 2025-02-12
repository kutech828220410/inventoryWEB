var popup_storage_info_div;

function get_popup_storage_info()
{
    popup_storage_info_div = new Basic_popup_Div('popup_storage_info_div','popup_storage_info_div','330px','');
    popup_storage_info_div._popup_div.style.border = '10px solid white';
    const title_text = get_title_popup_storage_info();
    const storage_info_box_div = get_storage_info_box_popup_storage_info();
    const underline = get_underline_popup_storage_info();

    popup_storage_info_div.AddControl(title_text);
    popup_storage_info_div.AddControl(storage_info_box_div);
    popup_storage_info_div.AddControl(underline);


    return popup_storage_info_div;
}

function show_popup_storage_info()
{
    const storage_info_IP_input = document.querySelector('#storage_info_IP_input_popup_storage_info');
    const storage_info_CODE_input = document.querySelector('#storage_info_CODE_input_popup_storage_info');
    const storage_info_SKDIACODE_input = document.querySelector('#storage_info_SKDIACODE_input_popup_storage_info');
    const storage_info_NAME_input = document.querySelector('#storage_info_NAME_input_popup_storage_info');
    const storage_info_CHT_NAME_input = document.querySelector('#storage_info_CHT_NAME_input_popup_storage_info');

    storage_info_IP_input.value = '';
    storage_info_CODE_input.value = '';
    storage_info_SKDIACODE_input.value = '';
    storage_info_NAME_input.value = '';
    storage_info_CHT_NAME_input.value = '';

    popup_storage_info_div.Set_Visible(true);  
    updateDivHeight(popup_storage_info_div._popup_div , 10);
}

function hide_popup_storage_info()
{
    popup_storage_info_div.Set_Visible(false);
}

function undo_popup_storage_info()
{
    hide_popup_storage_info();
}
function confirm_popup_storage_info()
{
    try
    {
        const storage_info_IP_input = document.querySelector('#storage_info_IP_input_popup_storage_info');
        const storage_info_CODE_input = document.querySelector('#storage_info_CODE_input_popup_storage_info');
        const storage_info_SKDIACODE_input = document.querySelector('#storage_info_SKDIACODE_input_popup_storage_info');
        const storage_info_NAME_input = document.querySelector('#storage_info_NAME_input_popup_storage_info');
        const storage_info_CHT_NAME_input = document.querySelector('#storage_info_CHT_NAME_input_popup_storage_info');
        if(!storage_info_IP_input.value && !storage_info_CODE_input.value && !storage_info_SKDIACODE_input.value && !storage_info_NAME_input.value && !storage_info_CHT_NAME_input.value)
        {
            for(var i = 0; i < allrows.length ; i++)
            {
                allrows[i].style.display = "inline-block";
                allrows[i].style.visibility = "visible";
            }
            return;
        }
        const ratio_button_byNormal_input = document.querySelector('#ratio_button_byNormal_input_popup_storage_info');
        const ratio_button_bylike_input = document.querySelector('#ratio_button_bylike_input_popup_storage_info');
        const ratio_button_bystartWith_input = document.querySelector('#ratio_button_bystartWith_input_popup_storage_info');
        if(ratio_button_byNormal_input.checked)
        {
            popup_storage_info_ByNormal();
            return;
        }
        if(ratio_button_bylike_input.checked)
        {
            popup_storage_info_ByLike();
            return;
        }
        if(ratio_button_bystartWith_input.checked)
        {
            popup_storage_info_ByStartWith();
            return;
        }
    }
    catch (e) {}
    finally
    {
        hide_popup_storage_info();
    }
}
function popup_storage_info_ByStartWith()
{
    const storage_info_IP_input = document.querySelector('#storage_info_IP_input_popup_storage_info');
    const storage_info_CODE_input = document.querySelector('#storage_info_CODE_input_popup_storage_info');
    const storage_info_SKDIACODE_input = document.querySelector('#storage_info_SKDIACODE_input_popup_storage_info');
    const storage_info_NAME_input = document.querySelector('#storage_info_NAME_input_popup_storage_info');
    const storage_info_CHT_NAME_input = document.querySelector('#storage_info_CHT_NAME_input_popup_storage_info');

    var storage_info_value0 = '';
    var storage_info_value1 = '';
    if(storage_info_IP_input.value)
    {
        storage_info_value0 = storage_info_IP_input.value;
        storage_info_value0.toUpperCase();
    }
    if(storage_info_CODE_input.value)
    {
        storage_info_value0 = storage_info_CODE_input.value;
        storage_info_value0.toUpperCase();
    }
    if(storage_info_SKDIACODE_input.value)
    {
        storage_info_value0 = storage_info_SKDIACODE_input.value;
        storage_info_value0.toUpperCase();
    }
    if(storage_info_NAME_input.value)
    {
        storage_info_value0 = storage_info_NAME_input.value;
        storage_info_value0.toUpperCase();
    }
    if(storage_info_CHT_NAME_input.value)
    {
        storage_info_value0 = storage_info_CHT_NAME_input.value;
        storage_info_value0.toUpperCase();
    }

    if(storage_info_value0 == '') return;

    for(var i = 0; i < allrows.length ; i++)
    {
        if(storage_info_IP_input.value) storage_info_value1 = allrows[i].getAttribute("IP").toUpperCase();  
        if(storage_info_CODE_input.value) storage_info_value1 = allrows[i].getAttribute("CODE").toUpperCase();  
        if(storage_info_SKDIACODE_input.value) storage_info_value1 = allrows[i].getAttribute("SKDIACODE").toUpperCase();  
        if(storage_info_NAME_input.value) storage_info_value1 = allrows[i].getAttribute("NAME").toUpperCase();  
        if(storage_info_CHT_NAME_input.value) storage_info_value1 = allrows[i].getAttribute("CHT_NAME").toUpperCase();  
       
        var storage_info_value1 = storage_info_value1.substring(0, storage_info_value0.length);

        if (storage_info_value0 == storage_info_value1)
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
function popup_storage_info_ByLike()
{
    const storage_info_IP_input = document.querySelector('#storage_info_IP_input_popup_storage_info');
    const storage_info_CODE_input = document.querySelector('#storage_info_CODE_input_popup_storage_info');
    const storage_info_SKDIACODE_input = document.querySelector('#storage_info_SKDIACODE_input_popup_storage_info');
    const storage_info_NAME_input = document.querySelector('#storage_info_NAME_input_popup_storage_info');
    const storage_info_CHT_NAME_input = document.querySelector('#storage_info_CHT_NAME_input_popup_storage_info');

    var storage_info_value0 = '';
    var storage_info_value1 = '';
    if(storage_info_IP_input.value)
    {
        storage_info_value0 = storage_info_IP_input.value;
        storage_info_value0.toUpperCase();
    }
    if(storage_info_CODE_input.value)
    {
        storage_info_value0 = storage_info_CODE_input.value;
        storage_info_value0.toUpperCase();
    }
    if(storage_info_SKDIACODE_input.value)
    {
        storage_info_value0 = storage_info_SKDIACODE_input.value;
        storage_info_value0.toUpperCase();
    }
    if(storage_info_NAME_input.value)
    {
        storage_info_value0 = storage_info_NAME_input.value;
        storage_info_value0.toUpperCase();
    }
    if(storage_info_CHT_NAME_input.value)
    {
        storage_info_value0 = storage_info_CHT_NAME_input.value;
        storage_info_value0.toUpperCase();
    }
    if(storage_info_value0 == '') return;
   
    for(var i = 0; i < allrows.length ; i++)
    {
        if(storage_info_IP_input.value) storage_info_value1 = allrows[i].getAttribute("IP").toUpperCase();
        if(storage_info_CODE_input.value) storage_info_value1 = allrows[i].getAttribute("CODE").toUpperCase();  
        if(storage_info_SKDIACODE_input.value) storage_info_value1 = allrows[i].getAttribute("SKDIACODE").toUpperCase();  
        if(storage_info_NAME_input.value) storage_info_value1 = allrows[i].getAttribute("NAME").toUpperCase();  
        if(storage_info_CHT_NAME_input.value) storage_info_value1 = allrows[i].getAttribute("CHT_NAME").toUpperCase();  
        if (storage_info_value1.indexOf(storage_info_value0) !== -1)
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
function popup_storage_info_ByNormal()
{
    const storage_info_IP_input = document.querySelector('#storage_info_IP_input_popup_storage_info');
    const storage_info_CODE_input = document.querySelector('#storage_info_CODE_input_popup_storage_info');
    const storage_info_SKDIACODE_input = document.querySelector('#storage_info_SKDIACODE_input_popup_storage_info');
    const storage_info_NAME_input = document.querySelector('#storage_info_NAME_input_popup_storage_info');
    const storage_info_CHT_NAME_input = document.querySelector('#storage_info_CHT_NAME_input_popup_storage_info');

    var storage_info_value0 = '';
    var storage_info_value1 = '';
    if(storage_info_IP_input.value)
    {
        storage_info_value0 = storage_info_IP_input.value;
        storage_info_value0.toUpperCase();
    }
    if(storage_info_CODE_input.value)
    {
        storage_info_value0 = storage_info_CODE_input.value;
        storage_info_value0.toUpperCase();
    }
    if(storage_info_SKDIACODE_input.value)
    {
        storage_info_value0 = storage_info_SKDIACODE_input.value;
        storage_info_value0.toUpperCase();
    }
    if(storage_info_NAME_input.value)
    {
        storage_info_value0 = storage_info_NAME_input.value;
        storage_info_value0.toUpperCase();
    }
    if(storage_info_CHT_NAME_input.value)
    {
        storage_info_value0 = storage_info_CHT_NAME_input.value;
        storage_info_value0.toUpperCase();
    }
    if(storage_info_value0 == '') return;

    for(var i = 0; i < allrows.length ; i++)
    {
        if(storage_info_IP_input.value) storage_info_value1 = allrows[i].getAttribute("IP").toUpperCase(); 
        if(storage_info_CODE_input.value) storage_info_value1 = allrows[i].getAttribute("CODE").toUpperCase();  
        if(storage_info_SKDIACODE_input.value) storage_info_value1 = allrows[i].getAttribute("SKDIACODE").toUpperCase();  
        if(storage_info_NAME_input.value) storage_info_value1 = allrows[i].getAttribute("NAME").toUpperCase();  
        if(storage_info_CHT_NAME_input.value) storage_info_value1 = allrows[i].getAttribute("CHT_NAME").toUpperCase();  
        if(storage_info_value1 == storage_info_value0) 
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

function get_title_popup_storage_info()
{
    const title_text = document.createElement('div');
    My_Div.Init(title_text, 'title_text_storage_info_div','title_text_storage_info_div', '100%', '40px', 'gray');
    My_Div.Set_Text(title_text ,"儲位資訊" , TextAlignEnum.CENTER , "24px", true,"微軟正黑體","white");
    title_text.style.borderRadius = "5px";
    title_text.style.marginBottom = "10px";
    return title_text;
}
function get_storage_info_box_popup_storage_info()
{
    const storage_info_box_div = document.createElement('div');
    My_Div.Init(storage_info_box_div,'storage_info_box_div_popup_storage_info','storage_info_box_div_popup_storage_info', '100%','','');
    My_Div.Set_Block(storage_info_box_div, DisplayEnum.FLEX, FlexDirectionEnum.COLUMN, JustifyContentEnum.CENTER);
    storage_info_box_div.style.alignItems = "center";
    storage_info_box_div.style.flexWrap  = "wrap";

    const storage_info_IP_div = document.createElement('div');
    My_Div.Init(storage_info_IP_div,'storage_info_IP_div_popup_storage_info','storage_info_IP_div_popup_storage_info', '100%','50px','');
    My_Div.Set_Block(storage_info_IP_div, DisplayEnum.FLEX, FlexDirectionEnum.ROW, JustifyContentEnum.LEFT);
    storage_info_IP_div.style.marginBottom = "10px";
    const storage_info_IP_text = document.createElement('div');
    My_Div.Init(storage_info_IP_text,'storage_info_IP_text_popup_storage_info','storage_info_IP_text_popup_storage_info', '120px','100%','royalblue');
    My_Div.Set_Text(storage_info_IP_text ,"儲位IP" , TextAlignEnum.CENTER , "18px", false ,"微軟正黑體","white");
    storage_info_IP_text.style.borderRadius = "5px";
    storage_info_IP_text.style.marginRight = "10px";
    const storage_info_IP_input = document.createElement('input');
    My_Div.Init(storage_info_IP_input,'storage_info_IP_input_popup_storage_info','storage_info_IP_input_popup_storage_info', '80%','100%','');
    My_Div.Set_Text(storage_info_IP_input ,"" , TextAlignEnum.LEFT , "18px", false ,"微軟正黑體","black");
    storage_info_IP_input.placeholder = '請輸入...   ';
    storage_info_IP_input.style.paddingLeft = "10px";
    storage_info_IP_input.style.borderRadius = "3px";
    storage_info_IP_input.style.border = "1px solid gray";
    storage_info_IP_input.type = "email";
    storage_info_IP_input.inputMode = "latin";
    storage_info_IP_input.onfocus = function()
    {
       this.select();       
    };
    storage_info_IP_div.appendChild(storage_info_IP_text);
    storage_info_IP_div.appendChild(storage_info_IP_input);

    const storage_info_CODE_div = document.createElement('div');
    My_Div.Init(storage_info_CODE_div,'storage_info_CODE_div_popup_storage_info','storage_info_CODE_div_popup_storage_info', '100%','50px','');
    My_Div.Set_Block(storage_info_CODE_div, DisplayEnum.FLEX, FlexDirectionEnum.ROW, JustifyContentEnum.LEFT);
    storage_info_CODE_div.style.marginBottom = "10px";
    const storage_info_CODE_text = document.createElement('div');
    My_Div.Init(storage_info_CODE_text,'storage_info_CODE_text_popup_storage_info','storage_info_CODE_text_popup_storage_info', '120px','100%','royalblue');
    My_Div.Set_Text(storage_info_CODE_text ,"藥碼" , TextAlignEnum.CENTER , "18px", false ,"微軟正黑體","white");
    storage_info_CODE_text.style.borderRadius = "5px";
    storage_info_CODE_text.style.marginRight = "10px";
    const storage_info_CODE_input = document.createElement('input');
    My_Div.Init(storage_info_CODE_input,'storage_info_CODE_input_popup_storage_info','storage_info_CODE_input_popup_storage_info', '80%','100%','');
    My_Div.Set_Text(storage_info_CODE_input ,"" , TextAlignEnum.LEFT , "18px", false ,"微軟正黑體","black");
    storage_info_CODE_input.placeholder = '請輸入...   ';
    storage_info_CODE_input.style.paddingLeft = "10px";
    storage_info_CODE_input.style.borderRadius = "3px";
    storage_info_CODE_input.style.border = "1px solid gray";
    storage_info_CODE_input.type = "email";
    storage_info_CODE_input.inputMode = "latin";
    storage_info_CODE_input.onfocus = function()
    {
       this.select();       
    };
    storage_info_CODE_div.appendChild(storage_info_CODE_text);
    storage_info_CODE_div.appendChild(storage_info_CODE_input);

    const storage_info_SKDIACODE_div = document.createElement('div');
    My_Div.Init(storage_info_SKDIACODE_div,'storage_info_SKDIACODE_div_popup_storage_info','storage_info_SKDIACODE_div_popup_storage_info', '100%','50px','');
    My_Div.Set_Block(storage_info_SKDIACODE_div, DisplayEnum.FLEX, FlexDirectionEnum.ROW, JustifyContentEnum.LEFT);
    storage_info_SKDIACODE_div.style.marginBottom = "10px";
    const storage_info_SKDIACODE_text = document.createElement('div');
    My_Div.Init(storage_info_SKDIACODE_text,'storage_info_SKDIACODE_text_popup_storage_info','storage_info_SKDIACODE_text_popup_storage_info', '120px','100%','royalblue');
    My_Div.Set_Text(storage_info_SKDIACODE_text ,"料號" , TextAlignEnum.CENTER , "18px", false ,"微軟正黑體","white");
    storage_info_SKDIACODE_text.style.borderRadius = "5px";
    storage_info_SKDIACODE_text.style.marginRight = "10px";
    const storage_info_SKDIACODE_input = document.createElement('input');
    My_Div.Init(storage_info_SKDIACODE_input,'storage_info_SKDIACODE_input_popup_storage_info','storage_info_SKDIACODE_input_popup_storage_info', '80%','100%','');
    My_Div.Set_Text(storage_info_SKDIACODE_input ,"" , TextAlignEnum.LEFT , "18px", false ,"微軟正黑體","black");
    storage_info_SKDIACODE_input.placeholder = '請輸入...   ';
    storage_info_SKDIACODE_input.style.borderRadius = "3px";
    storage_info_SKDIACODE_input.style.border = "1px solid gray";
    storage_info_SKDIACODE_input.style.paddingLeft = "10px";
    storage_info_SKDIACODE_input.type = "email";
    storage_info_SKDIACODE_input.inputMode = "latin";
    storage_info_SKDIACODE_input.onfocus = function()
    {
       this.select();       
    };
    storage_info_SKDIACODE_div.appendChild(storage_info_SKDIACODE_text);
    storage_info_SKDIACODE_div.appendChild(storage_info_SKDIACODE_input);


    const storage_info_NAME_div = document.createElement('div');
    My_Div.Init(storage_info_NAME_div,'storage_info_NAME_div_popup_storage_info','storage_info_NAME_div_popup_storage_info', '100%','50px','');
    My_Div.Set_Block(storage_info_NAME_div, DisplayEnum.FLEX, FlexDirectionEnum.ROW, JustifyContentEnum.LEFT);
    storage_info_NAME_div.style.marginBottom = "10px";
    const storage_info_NAME_text = document.createElement('div');
    My_Div.Init(storage_info_NAME_text,'storage_info_NAME_text_popup_storage_info','storage_info_NAME_text_popup_storage_info', '120px','100%','royalblue');
    My_Div.Set_Text(storage_info_NAME_text ,"藥名" , TextAlignEnum.CENTER , "18px", false ,"微軟正黑體","white");
    storage_info_NAME_text.style.borderRadius = "5px";
    storage_info_NAME_text.style.marginRight = "10px";
    const storage_info_NAME_input = document.createElement('input');
    My_Div.Init(storage_info_NAME_input,'storage_info_NAME_input_popup_storage_info','storage_info_NAME_input_popup_storage_info', '80%','100%','');
    My_Div.Set_Text(storage_info_NAME_input ,"" , TextAlignEnum.LEFT , "18px", false ,"微軟正黑體","black");
    storage_info_NAME_input.placeholder = '請輸入...   ';
    storage_info_NAME_input.style.borderRadius = "3px";
    storage_info_NAME_input.style.border = "1px solid gray";
    storage_info_NAME_input.style.paddingLeft = "10px";
    storage_info_NAME_input.type = "email";
    storage_info_NAME_input.inputMode = "latin";
    storage_info_NAME_input.onfocus = function()
    {
       this.select();       
    };
    storage_info_NAME_div.appendChild(storage_info_NAME_text);
    storage_info_NAME_div.appendChild(storage_info_NAME_input);

    const storage_info_CHT_NAME_div = document.createElement('div');
    My_Div.Init(storage_info_CHT_NAME_div,'storage_info_CHT_NAME_div_popup_storage_info','storage_info_CHT_NAME_div_popup_storage_info', '100%','50px','');
    My_Div.Set_Block(storage_info_CHT_NAME_div, DisplayEnum.FLEX, FlexDirectionEnum.ROW, JustifyContentEnum.LEFT);
    storage_info_CHT_NAME_div.style.marginBottom = "10px";
    const storage_info_CHT_NAME_text = document.createElement('div');
    My_Div.Init(storage_info_CHT_NAME_text,'storage_info_CHT_NAME_text_popup_storage_info','storage_info_CHT_NAME_text_popup_storage_info', '120px','100%','royalblue');
    My_Div.Set_Text(storage_info_CHT_NAME_text ,"中文名" , TextAlignEnum.CENTER , "18px", false ,"微軟正黑體","white");
    storage_info_CHT_NAME_text.style.borderRadius = "5px";
    storage_info_CHT_NAME_text.style.marginRight = "10px";
    const storage_info_CHT_NAME_input = document.createElement('input');
    My_Div.Init(storage_info_CHT_NAME_input,'storage_info_CHT_NAME_input_popup_storage_info','storage_info_CHT_NAME_input_popup_storage_info', '80%','100%','');
    My_Div.Set_Text(storage_info_CHT_NAME_input ,"" , TextAlignEnum.LEFT , "18px", false ,"微軟正黑體","black");
    storage_info_CHT_NAME_input.placeholder = '請輸入...   ';
    storage_info_CHT_NAME_input.style.borderRadius = "3px";
    storage_info_CHT_NAME_input.style.border = "1px solid gray";
    storage_info_CHT_NAME_input.style.paddingLeft = "10px";
    storage_info_CHT_NAME_input.type = "text";
    storage_info_CHT_NAME_input.inputMode = "latin";
    storage_info_CHT_NAME_input.onfocus = function()
    {
       this.select();       
    };
    storage_info_CHT_NAME_div.appendChild(storage_info_CHT_NAME_text);
    storage_info_CHT_NAME_div.appendChild(storage_info_CHT_NAME_input);

    storage_info_box_div.append(storage_info_IP_div);
    storage_info_box_div.append(storage_info_CODE_div);
    storage_info_box_div.append(storage_info_SKDIACODE_div);
    storage_info_box_div.append(storage_info_NAME_div);
    storage_info_box_div.append(storage_info_CHT_NAME_div);
    return storage_info_box_div;
}
function get_underline_popup_storage_info()
{
    const underline_div = document.createElement('div');
    My_Div.Init(underline_div, 'underline_div_storage_info_div_popup_storage_info','underline_div_storage_info_div_popup_storage_info', '100%','60px','');
    My_Div.Set_Block(underline_div, DisplayEnum.FLEX, FlexDirectionEnum.ROW, JustifyContentEnum.RIGHT);
    underline_div.style.alignItems = "center";

    const underline_storage_infotype_div = document.createElement('div');
    My_Div.Init(underline_storage_infotype_div, 'underline_storage_infotype_div_popup_storage_info','underline_storage_infotype_div_popup_storage_info', '72%','100%','');
    My_Div.Set_Block(underline_storage_infotype_div, DisplayEnum.FLEX, FlexDirectionEnum.ROW, JustifyContentEnum.LEFT);
    underline_div.style.alignItems = "center";
    


    const svg_confirm_SVG = Get_confirm_SVG("40px","100%" ,"60%","100%","green");
    My_Div.Init(svg_confirm_SVG, 'svg_confirm_SVG_popup_input','svg_confirm_SVG_popup_input', '40px', '40px', '');
    svg_confirm_SVG.style.border = "1px solid gray";
    svg_confirm_SVG.style.borderRadius = "3px";
    svg_confirm_SVG.style.marginRight = "5px";
    svg_confirm_SVG.addEventListener('click', function()
    {
        confirm_popup_storage_info();
    });
    const svg_undo_SVG = Get_undo_SVG("40px","100%" ,"60%","100%","");
    My_Div.Init(svg_undo_SVG, 'svg_undo_SVG_popup_input','svg_undo_SVG_popup_input', '40px', '40px', '');
    svg_undo_SVG.style.border = "1px solid gray";
    svg_undo_SVG.style.borderRadius = "3px";
    svg_undo_SVG.style.marginRight = "5px";
    svg_undo_SVG.addEventListener('click', function()
    {
        undo_popup_storage_info();
    });

    const storage_info_button_refresh_canvas = document.createElement('button');
    My_Div.Init(storage_info_button_refresh_canvas,'storage_info_button_refresh_canvas_popup_storage_info','storage_info_button_refresh_canvas_popup_storage_info', '120px','80%','');
    My_Div.Set_Text(storage_info_button_refresh_canvas ,"更新面板" , TextAlignEnum.CENTER , "14px", false ,"微軟正黑體","black");
    storage_info_button_refresh_canvas.style.marginRight = "5px";
    underline_div.appendChild(storage_info_button_refresh_canvas);
    underline_div.appendChild(svg_undo_SVG);
    underline_div.appendChild(svg_confirm_SVG);
   
    return underline_div;
}