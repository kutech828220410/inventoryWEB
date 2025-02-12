const row_num_width = "30px";
const row_CODE_width = "100px";
const row_NAME_width = "60%";
const row_TXN_QTY_width = "90px";
const row_EBQ_QTY_width = "90px";

function creat_column_div()
{
    const tablehead_div = document.createElement("div");
    My_Div.Init(tablehead_div, 'tablehead_div','tablehead_div', '100%','30px','linear-gradient(90deg, gray 0%, gray 100%)');
    My_Div.Set_Block(tablehead_div, DisplayEnum.FLEX, FlexDirectionEnum.ROW, JustifyContentEnum.TOP);
    tablehead_div.style.background = "linear-gradient(90deg, gray 0%, gray 100%)" ;

    const num_div = document.createElement('div');
    My_Div.Init(num_div, 'num_div','num_div', row_num_width, '100%', '');
    My_Div.Set_Text(num_div ,"No." , TextAlignEnum.CENTER , "14px", true,"微軟正黑體","white");
    num_div.className = "num_div";
    num_div.id = "num_div";
    num_div.style.marginLeft = "5px";
    tablehead_div.appendChild(num_div);

    const code_div = document.createElement('div');
    My_Div.Init(code_div, 'code_div','code_div', row_CODE_width, '100%', '');
    My_Div.Set_Text(code_div ,"藥碼" , TextAlignEnum.LEFT , "14px", true,"微軟正黑體","white");
    code_div.className = "code_div";
    code_div.id = "code_div";
    code_div.style.marginLeft = "10px";
    tablehead_div.appendChild(code_div);
    
    const name_div = document.createElement('div');
    My_Div.Init(name_div, 'name_div','name_div', row_NAME_width, '100%', '');
    My_Div.Set_Text(name_div ,"藥名" , TextAlignEnum.LEFT , "14px", true,"微軟正黑體","white");
    name_div.className = "name_div";
    name_div.id = "name_div";
    name_div.style.marginLeft = "10px";
    tablehead_div.appendChild(name_div);

    const tradqty_div = document.createElement('div');
    My_Div.Init(tradqty_div, 'tradqty_div','tradqty_div', row_TXN_QTY_width, '100%', '');
    My_Div.Set_Text(tradqty_div ,"交易量" , TextAlignEnum.LEFT , "14px", true,"微軟正黑體","white");
    tradqty_div.className = "tradqty_div";
    tradqty_div.id = "tradqty_div";
    tradqty_div.style.marginLeft = "10px";
    tablehead_div.appendChild(tradqty_div);

    const balqty_div = document.createElement('div');
    My_Div.Init(balqty_div, 'balqty_div','balqty_div', row_EBQ_QTY_width, '100%', '');
    My_Div.Set_Text(balqty_div ,"結存量" , TextAlignEnum.LEFT , "14px", true,"微軟正黑體","white");
    balqty_div.className = "balqty_div";
    balqty_div.id = "balqty_div";
    balqty_div.style.marginLeft = "10px";
    tablehead_div.appendChild(balqty_div);

    return tablehead_div;
}
function creat_table(data)
{
    for (var i = 0; i < data.Data.length; i++) 
    {
        const row_div = creat_row_div(i, data.Data[i]);
        main_div.appendChild(row_div);
    }
    const row_div = creat_row_div();
    main_div.appendChild(row_div);
}
function creat_row_div(_index , item) 
{
    const main_div = document.querySelector('#main_div');
    main_div.style.width = "100%";

    const all_div = document.createElement("div");
    all_div.className = "all_div";
    all_div.id = `all_div${_index}`;
    all_div.style.display = "flex";
    all_div.style.justifyContent = "left";
    all_div.style.width = "100%";
    all_div.style.height= "45px";
    all_div.style.borderBottom = "2px solid gray";
    all_div.style.flexDirection = "row";
    if(item == null)
    {
      all_div.style.borderBottom = "";
      return all_div;
    }
    //編號
    const number_div = document.createElement('div');
    My_Div.Init(number_div, 'number_div',`number_div${_index}`, row_num_width, '100%', '');
    My_Div.Set_Text(number_div ,`${_index + 1}` , TextAlignEnum.LEFT , "12px", true,"微軟正黑體","");
    number_div.style.marginLeft = "5px";
    all_div.appendChild(number_div);

    //藥碼
    const code_div = document.createElement("div");
    My_Div.Init(code_div, 'code_div',`code_div${_index}`, row_CODE_width, '100%', '');
    My_Div.Set_Text(code_div ,`${item.CODE}` , TextAlignEnum.LEFT , "12px", false,"微軟正黑體","");
    code_div.style.marginLeft = "5px";
    all_div.appendChild(code_div);

    
    //藥名
    const name_div = document.createElement("div");
    My_Div.Init(name_div, 'name_div',`name_div${_index}`, row_NAME_width, '100%', '');
    My_Div.Set_Text(name_div ,`${item.NAME}` , TextAlignEnum.LEFT , "12px", false,"微軟正黑體","");
    all_div.appendChild(name_div);
    
    //交易量
    const tradqty_div = document.createElement("div");
    My_Div.Init(tradqty_div, 'tradqty_div',`tradqty_div${_index}`, row_TXN_QTY_width, '100%', '');
    My_Div.Set_Text(tradqty_div ,`${item.TXN_QTY}` , TextAlignEnum.RIGHT , "12px", false,"微軟正黑體","");
    all_div.appendChild(tradqty_div);


    //結存量
    const balqty_div = document.createElement("div");
    My_Div.Init(balqty_div, 'balqty_div',`balqty_div${_index}`, row_EBQ_QTY_width, '100%', '');
    My_Div.Set_Text(balqty_div ,`${item.EBQ_QTY}` , TextAlignEnum.RIGHT , "12px", false,"微軟正黑體","");
    balqty_div.style.marginRight = "5px";
    all_div.appendChild(balqty_div);


    var num = parseInt(_index, 10);  // 10 是基數，表示轉換為十進制整數
    if (num % 2 === 0) 
    {
      all_div.style.backgroundColor = "lightblue";
    }
    else 
    {
      all_div.style.backgroundColor = "#FFFFF2";
    }
    return all_div;
}
