const row_num_width = "40px";
const row_TYPE_width = "100px";
const row_TXN_QTY_width = "100px";
const row_EBQ_QTY_width = "100px";
const row_PHY_QTY_width = "100px";
const row_OP_width = "150px";

function creat_column_div()
{
    const tablehead_div = document.createElement("div");
    tablehead_div.style.width = "100%";
    tablehead_div.style.height = "20%";
    tablehead_div.style.justifyContent = "top";
    tablehead_div.style.alignItems= "center";
    tablehead_div.style.flexDirection = "row";
    tablehead_div.style.display = "flex";
    tablehead_div.style.marginTop = "3px";
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
    const category_div = document.createElement("div");
    category_div.id = "category_div";
    category_div.className = "category_div";
    category_div.innerText = "類別";
    category_div.style.borderStyle = "";
    category_div.style.fontWeight = "bolder";
    category_div.style.textAlign = "center";
    category_div.style.display = "flex";
    category_div.style.width = row_TYPE_width;
    category_div.style.height = "100%";
    category_div.style.justifyContent = "center";
    category_div.style.alignItems= "center";
    category_div.style.flexDirection = "";
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
    const invqty_div = document.createElement("div");
    invqty_div.id = "invqty_div";
    invqty_div.className = "invqty_div";
    invqty_div.innerText = "盤點量";
    invqty_div.style.borderStyle = "";
    invqty_div.style.fontWeight = "bolder";
    invqty_div.style.textAlign = "center";
    invqty_div.style.display = "flex";
    invqty_div.style.width = row_PHY_QTY_width;
    invqty_div.style.height = "100%";
    invqty_div.style.justifyContent = "center";
    invqty_div.style.alignItems= "center";
    invqty_div.style.flexDirection = "";
    const user_div = document.createElement("div");
    user_div.id = "user_div";
    user_div.className = "user_div";
    user_div.innerText = "調劑人";
    user_div.style.borderStyle = "";
    user_div.style.fontWeight = "bolder";
    user_div.style.textAlign = "center";
    user_div.style.display = "flex";
    user_div.style.width = row_OP_width;
    user_div.style.height = "100%";
    user_div.style.justifyContent = "center";
    user_div.style.alignItems= "center";
    user_div.style.flexDirection = "";

    tablehead_div.appendChild(num_div);
    tablehead_div.appendChild(category_div);
    tablehead_div.appendChild(tradqty_div);
    tablehead_div.appendChild(balqty_div);
    tablehead_div.appendChild(invqty_div);
    tablehead_div.appendChild(user_div);
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

    //類別
    const category_div = document.createElement("div");
    category_div.className = " category_div";
    category_div.id = ` category_div${_index}`;
    category_div.innerHTML = `${item.TYPE}`
    category_div.style.display = "flex";
    category_div.style.justifyContent = "center";
    category_div.style.alignItems = "center";
    category_div.style.width = row_TYPE_width;
    category_div.style.height= "100%";
    all_div.appendChild(category_div);
    
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

    //盤點量
    const invqty_div = document.createElement("div");
    invqty_div.className = " invqty_div";
    invqty_div.id = ` invqty_div${_index}`;
    invqty_div.innerHTML = `${item.PHY_QTY}`
    invqty_div.style.display = "flex";
    invqty_div.style.justifyContent = "flex-end";  // 靠右對齊
    invqty_div.style.alignItems = "center";
    invqty_div.style.width = row_PHY_QTY_width;
    invqty_div.style.height= "100%";
    all_div.appendChild(invqty_div);

    //調劑人
    const user_div = document.createElement("div");
    user_div.className = "user_div";
    user_div.id = `user_div${_index}`;
    user_div.innerHTML = `${item.OP}`
    user_div.style.display = "flex";
    user_div.style.justifyContent = "center";
    user_div.style.alignItems = "center";
    user_div.style.width = row_OP_width;
    user_div.style.height= "100%";
    all_div.appendChild(user_div);

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
