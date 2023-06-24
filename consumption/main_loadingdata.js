const row_num_width = "40px";
const row_CODE_width = "100px";
const row_NAME_width = "200px";
const row_TXN_QTY_width = "80px";
const row_EBQ_QTY_width = "80px";

function creat_column_div()
{
    const tablehead_div = document.createElement("div");
    tablehead_div.style.width = "100%";
    tablehead_div.style.height = "20%";
    tablehead_div.style.justifyContent = "top";
    tablehead_div.style.alignItems= "center";
    tablehead_div.style.flexDirection = "row";
    tablehead_div.style.display = "flex";
    tablehead_div.style.background = "linear-gradient(90deg, gray 0%, #fff 100%)" ;
    const num_div = document.createElement("div");
    num_div.id = "num_div";
    num_div.className = "num_div";
    num_div.innerText = "No.";
    num_div.style.fontSize = "12px";
    num_div.style.borderStyle = "";
    num_div.style.fontWeight = "bolder";
    num_div.style.textAlign = "center";
    num_div.style.display = "flex";
    num_div.style.width = row_num_width;
    num_div.style.height = "100%";
    num_div.style.justifyContent = "center";
    num_div.style.alignItems= "center";
    num_div.style.flexDirection = "";
    const code_div = document.createElement("div");
    code_div.id = "code_div";
    code_div.className = "code_div";
    code_div.innerText = "藥碼";
    code_div.style.borderStyle = "";
    code_div.style.fontWeight = "bolder";
    code_div.style.textAlign = "center";
    code_div.style.display = "flex";
    code_div.style.width = row_CODE_width;
    code_div.style.height = "100%";
    code_div.style.justifyContent = "center";
    code_div.style.alignItems= "center";
    code_div.style.flexDirection = "";
    const tradqty_div = document.createElement("div");
    tradqty_div.id = "tradqty_div";
    tradqty_div.className = "tradqty_div";
    tradqty_div.innerText = "交易量";
    tradqty_div.style.borderStyle = "";
    tradqty_div.style.fontWeight = "bolder";
    tradqty_div.style.textAlign = "center";
    tradqty_div.style.display = "flex";
    tradqty_div.style.width = row_TXN_QTY_width;
    tradqty_div.style.height = "100%";
    tradqty_div.style.justifyContent = "center";
    tradqty_div.style.alignItems= "center";
    tradqty_div.style.flexDirection = "";
    const name_div = document.createElement("div");
    name_div.id = "name_div";
    name_div.className = "name_div";
    name_div.innerText = "藥名";
    name_div.style.borderStyle = "";
    name_div.style.fontWeight = "bolder";
    name_div.style.textAlign = "center";
    name_div.style.display = "flex";
    name_div.style.width = row_NAME_width;
    name_div.style.height = "100%";
    name_div.style.justifyContent = "center";
    name_div.style.alignItems= "center";
    name_div.style.flexDirection = "";
    const balqty_div = document.createElement("div");
    balqty_div.id = "balqty_div";
    balqty_div.className = "balqty_div";
    balqty_div.innerText = "結存量";
    balqty_div.style.borderStyle = "";
    balqty_div.style.fontWeight = "bolder";
    balqty_div.style.textAlign = "center";
    balqty_div.style.display = "flex";
    balqty_div.style.width = row_EBQ_QTY_width;
    balqty_div.style.height = "100%";
    balqty_div.style.justifyContent = "center";
    balqty_div.style.alignItems= "center";
    balqty_div.style.flexDirection = "";

    tablehead_div.appendChild(num_div);
    tablehead_div.appendChild(code_div);
    tablehead_div.appendChild(name_div);
    tablehead_div.appendChild(tradqty_div);
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
    all_div.style.height= "35px";
    all_div.style.borderBottom = "2px solid gray";
    all_div.style.flexDirection = "row";
    if(item == null)
    {
      all_div.style.borderBottom = "";
      return all_div;
    }
    //編號
    const number_div = document.createElement("div");
     number_div.className = " number_div";
     number_div.id = ` number_div${_index}`;
     number_div.innerHTML = `${_index + 1}`
     number_div.style.display = "flex";
     number_div.style.justifyContent = "center";
     number_div.style.alignItems = "center";
     number_div.style.width = row_num_width;
     number_div.style.height= "100%";
     all_div.appendChild(number_div);

    //藥碼
    const code_div = document.createElement("div");
    code_div.className = " code_div";
    code_div.id = ` code_div${_index}`;
    code_div.innerHTML = `${item.CODE}`
    code_div.style.display = "flex";
    code_div.style.justifyContent = "center";
    code_div.style.alignItems = "center";
    code_div.style.width = row_CODE_width;
    code_div.style.height= "100%";
    all_div.appendChild(code_div);

    
    //藥名
    const name_div = document.createElement("div");
    name_div.className = " name_div";
    name_div.id = ` name_div${_index}`;
    name_div.innerHTML = `${item.NAME}`
    name_div.style.display = "flex";
    name_div.style.justifyContent = "flex-end";  // 靠右對齊
    name_div.style.alignItems = "center";
    name_div.style.width = row_NAME_width;
    name_div.style.height= "100%";
    all_div.appendChild(name_div);
    
    //交易量
    const tradqty_div = document.createElement("div");
    tradqty_div.className = " tradqty_div";
    tradqty_div.id = ` tradqty_div${_index}`;
    tradqty_div.innerHTML = `${item.TXN_QTY}`
    tradqty_div.style.display = "flex";
    tradqty_div.style.justifyContent = "flex-end";  // 靠右對齊
    tradqty_div.style.alignItems = "center";
    tradqty_div.style.width = row_TXN_QTY_width;
    tradqty_div.style.height= "100%";
    all_div.appendChild(tradqty_div);   

    //結存量
    const balqty_div = document.createElement("div");
    balqty_div.className = " balqty_div";
    balqty_div.id = ` balqty_div${_index}`;
    balqty_div.innerHTML = `${item.EBQ_QTY}`
    balqty_div.style.display = "flex";
    balqty_div.style.justifyContent = "flex-end";  // 靠右對齊
    balqty_div.style.alignItems = "center";
    balqty_div.style.width = row_EBQ_QTY_width;
    balqty_div.style.height= "100%";
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
