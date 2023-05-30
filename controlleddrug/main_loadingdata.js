function get_all_div(_index , item) 
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
    main_div.appendChild(all_div);

    //編號
    const number_div = document.createElement("div");
     number_div.className = " number_div";
     number_div.id = ` number_div${_index}`;
     number_div.innerHTML = `1`
     number_div.style.display = "flex";
     number_div.style.justifyContent = "center";
     number_div.style.alignItems = "center";
     number_div.style.width = "6%";
     number_div.style.height= "100%";
     all_div.appendChild(number_div);

    //類別
    const category_div = document.createElement("div");
    category_div.className = " category_div";
    category_div.id = ` category_div${_index}`;
    category_div.innerHTML = `領藥`
    category_div.style.display = "flex";
    category_div.style.justifyContent = "center";
    category_div.style.alignItems = "center";
    category_div.style.width = "12%";
    category_div.style.height= "100%";
    all_div.appendChild(category_div);
    
    //交易量
    const tradqty_div = document.createElement("div");
    tradqty_div.className = " tradqty_div";
    tradqty_div.id = ` tradqty_div${_index}`;
    tradqty_div.innerHTML = `-2`
    tradqty_div.style.display = "flex";
    tradqty_div.style.justifyContent = "center";
    tradqty_div.style.alignItems = "center";
    tradqty_div.style.width = "19%";
    tradqty_div.style.height= "100%";
    all_div.appendChild(tradqty_div);

    //結存量
    const balqty_div = document.createElement("div");
    balqty_div.className = " balqty_div";
    balqty_div.id = ` balqty_div${_index}`;
    balqty_div.innerHTML = `80`
    balqty_div.style.display = "flex";
    balqty_div.style.justifyContent = "center";
    balqty_div.style.alignItems = "center";
    balqty_div.style.width = "19%";
    balqty_div.style.height= "100%";
    all_div.appendChild(balqty_div);

    //盲盤量
    const invqty_div = document.createElement("div");
    invqty_div.className = " invqty_div";
    invqty_div.id = ` invqty_div${_index}`;
    invqty_div.innerHTML = `81`
    invqty_div.style.display = "flex";
    invqty_div.style.justifyContent = "center";
    invqty_div.style.alignItems = "center";
    invqty_div.style.width = "19%";
    invqty_div.style.height= "100%";
    all_div.appendChild(invqty_div);

    //調劑人
    const user_div = document.createElement("div");
    user_div.className = "user_div";
    user_div.id = `user_div${_index}`;
    user_div.innerHTML = `李承勳`
    user_div.style.display = "flex";
    user_div.style.justifyContent = "center";
    user_div.style.alignItems = "center";
    user_div.style.width = "25%";
    user_div.style.height= "100%";
    all_div.appendChild(user_div);

    return all_div;
    
}

//每行顏色不同
function add_divs() {
    for (let i = 0; i < 5; i++) {
      const all_div = get_all_div(i, null);
      if (i % 2 === 0) {
        all_div.style.backgroundColor = "lightblue";
      } else {
        all_div.style.backgroundColor = "lightyellow";
      }
    }
  }