var popup_upload_div;
//#region [rgba(0, 0, 255, 0.03)] public Function
function get_popup_upload()
{
    popup_upload_div = new Basic_popup_Div('popup_upload_div','popup_upload_div','330px','');
    popup_upload_div._popup_div.style.border = '10px solid white';
    const title_text = get_title_popup_upload();
    const box_div = get_box_popup_upload();
    const underline = get_underline_popup_upload();

    popup_upload_div.AddControl(title_text);
    popup_upload_div.AddControl(box_div);
    popup_upload_div.AddControl(underline);

    return popup_upload_div;
}

function show_popup_upload()
{
    popup_upload_div.Set_Visible(true);  
    updateDivHeight(popup_upload_div._popup_div , 10);
}
function hide_popup_upload()
{
    popup_upload_div.Set_Visible(false);
}
//#endregion

//#region [rgba(0, 255, 0, 0.03)] Event
async function undo_popup_upload()
{
    hide_popup_upload();
}
async function confirm_popup_upload()
{
    try
    {   
        const IC_NAME_input_popup = document.getElementById('IC_NAME_input_popup');
        const PON_input_popup = document.getElementById('PON_input_popup');
        const upload_input = document.getElementById('upload_input');
        if(!PON_input_popup.value)
        {
            alert("未輸入驗收單號!");
            return;
        }
        if(upload_input.files.length == 0)
        {
            alert("未選取上傳檔案!");
            return;
        }
        const confirmResult = confirm("確定上傳驗收單?");
        if (confirmResult)
        {     
            Set_main_div_enable(true);
            console.log("test01");
            const API_inspection_excel_upload = serch_APIServer("DS01","藥庫","API_inspection_excel_upload");
            // console.log(API_inspection_excel_upload[0].server);
            // console.log(IC_NAME_input_popup.value);
            // console.log(PON_input_popup.value);
            // console.log(get_logedName());
            await excel_upload(upload_input.files[0],IC_NAME_input_popup.value,PON_input_popup.value,get_logedName(), API_inspection_excel_upload);
            Set_main_div_enable(false);
            hide_popup_upload();
            Set_main_div_enable(false);
            // location.reload();
        }
      
    
    }
    catch (e) 
    {}
    finally
    {
      
    }
}
//#endregion

//#region [rgba(255, 0, 0, 0.03)] private Function
function get_title_popup_upload()
{
    const title_text = document.createElement('div');
    My_Div.Init(title_text, 'title_text_upload_div','title_text_upload_div', '100%', '40px', 'gray');
    My_Div.Set_Text(title_text ,"上傳驗收單" , TextAlignEnum.CENTER , "24px", true,"微軟正黑體","white");
    title_text.style.borderRadius = "5px";
    title_text.style.marginBottom = "10px";
    return title_text;
}
function get_box_popup_upload()
{
    const add_box_div = document.createElement('div');
    My_Div.Init(add_box_div,'add_box_div_popup_upload','add_box_div_popup_upload', '100%','','');
    My_Div.Set_Block(add_box_div, DisplayEnum.FLEX, FlexDirectionEnum.COLUMN, JustifyContentEnum.CENTER);
    add_box_div.style.alignItems = "center";
    add_box_div.style.flexWrap  = "wrap";

    const IC_NAME_input = document.createElement('input');
    My_Div.Init(IC_NAME_input,'IC_NAME_input_popup','IC_NAME_input_popup', '90%','40px','');
    My_Div.Set_Text(IC_NAME_input ,"" , TextAlignEnum.CENTER , "18px", false ,"微軟正黑體","black");
    IC_NAME_input.placeholder = '請輸入驗收名稱';
    IC_NAME_input.style.borderRadius = "3px";
    IC_NAME_input.style.border = "1px solid gray";
    IC_NAME_input.style.paddingLeft = "10px";
    IC_NAME_input.type = "email";
    IC_NAME_input.inputMode = "latin";
    IC_NAME_input.style.marginBottom = "5px";
    IC_NAME_input.onfocus = function()
    {
       this.select();       
    };
    add_box_div.appendChild(IC_NAME_input);

    const PON_input = document.createElement('input');
    My_Div.Init(PON_input,'PON_input_popup','PON_input_popup', '90%','40px','');
    My_Div.Set_Text(PON_input ,"" , TextAlignEnum.CENTER , "18px", false ,"微軟正黑體","black");
    PON_input.placeholder = '請輸入驗收單號';
    PON_input.style.borderRadius = "3px";
    PON_input.style.border = "1px solid gray";
    PON_input.style.paddingLeft = "10px";
    PON_input.type = "email";
    PON_input.inputMode = "latin";
    PON_input.style.marginBottom = "5px";
    PON_input.onfocus = function()
    {
       this.select();       
    };
    add_box_div.appendChild(PON_input);

    const upload_input = document.createElement('input');
    My_Div.Init(upload_input,'upload_input','upload_input', '90%','40px','');
    My_Div.Set_Text(upload_input ,"" , TextAlignEnum.CENTER , "14px", false ,"微軟正黑體","black");
    upload_input.type = "file";
    upload_input.placeholder = '';
    upload_input.accept = ".xlsx,.xls";
    upload_input.style.borderRadius = "3px";
    upload_input.style.border = "1px solid gray";
    upload_input.style.paddingLeft = "10px";
    // IC_NAME_input.type = "email";
    upload_input.inputMode = "latin";
    upload_input.onfocus = function()
    {
       this.select();       
    };
    add_box_div.appendChild(upload_input);


    return add_box_div;
}
function get_underline_popup_upload()
{
    const underline_div = document.createElement('div');
    My_Div.Init(underline_div, 'underline_div_upload_div_popup_upload','underline_div_upload_div_popup_upload', '100%','60px','');
    My_Div.Set_Block(underline_div, DisplayEnum.FLEX, FlexDirectionEnum.ROW, JustifyContentEnum.RIGHT);
    underline_div.style.alignItems = "center";

    const underline_uploadtype_div = document.createElement('div');
    My_Div.Init(underline_uploadtype_div, 'underline_uploadtype_div_popup_upload','underline_uploadtype_div_popup_upload', '72%','100%','');
    My_Div.Set_Block(underline_uploadtype_div, DisplayEnum.FLEX, FlexDirectionEnum.ROW, JustifyContentEnum.LEFT);
    underline_div.style.alignItems = "center";
    

    const svg_confirm_SVG = Get_confirm_SVG("40px","100%" ,"60%","100%","green");
    My_Div.Init(svg_confirm_SVG, 'svg_confirm_SVG_popup_input','svg_confirm_SVG_popup_input', '40px', '40px', '');
    svg_confirm_SVG.style.border = "1px solid gray";
    svg_confirm_SVG.style.borderRadius = "3px";
    svg_confirm_SVG.style.marginRight = "5px";
    svg_confirm_SVG.addEventListener('click', function()
    {
        confirm_popup_upload();
    });
    const svg_undo_SVG = Get_undo_SVG("40px","100%" ,"60%","100%","");
    My_Div.Init(svg_undo_SVG, 'svg_undo_SVG_popup_input','svg_undo_SVG_popup_input', '40px', '40px', '');
    svg_undo_SVG.style.border = "1px solid gray";
    svg_undo_SVG.style.borderRadius = "3px";
    svg_undo_SVG.style.marginRight = "5px";
    svg_undo_SVG.addEventListener('click', function()
    {
        undo_popup_upload();
    });
    underline_div.appendChild(underline_uploadtype_div);

    underline_div.appendChild(svg_undo_SVG);
    underline_div.appendChild(svg_confirm_SVG);
    return underline_div;
}
//#endregion

