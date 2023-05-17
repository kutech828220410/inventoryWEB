//彈跳視窗確認按鈕
async function validateInput(_index) {
    var myModal1 = document.querySelector(`#myModal${_index}`);
    var GUID = myModal1.getAttribute("GUID");
    if (!myModal1) return;

    var qtyInputs = myModal1.querySelectorAll(".qty");
    var AllQTY = 0;
    var START_QTY = parseInt(myModal1.getAttribute("START_QTY"));
    var allInputsValid = true;
    // loop through each input and validate
    for (let i = 0; i < qtyInputs.length; i++) 
    {
      const qty = qtyInputs[i].value;
      AllQTY = AllQTY + parseInt(qty);
    if ( !qty.trim() ) {
        // 如果有任何一格未填，跳出警示提醒
        alert("請輸入盤點數量！");
        allInputsValid = false;
        break;
      }
    }
    
    if (allInputsValid) 
    {
      if(AllQTY > START_QTY)
      {
        const confirmResult = confirm("請注意！！輸入數量大於庫存理論值！！數量是否正確");
        if (!confirmResult) {
            return;
          }
      }
      data.Data.map((item) =>
      {
          if (item.GUID === GUID)
          {
            let _data = [];
            for (let i = 0; i < qtyInputs.length; i++) 
            {
              const qty = qtyInputs[i].value;
              _data.push(
              {
                 QTY: qty,
              });
             
            }
            item.QTY_date_datas = _data;
            let post_data = data;
            post_data.Data.length = 0;
            post_data.Data.push(item);
            console.log(post_data);
            
          }
      });
      myModal1.style.display='none';
      let return_data = await postDataToAPI(inspection_update_post_url , data);
      console.log(return_data);
      response = await fetch(inspection_get_url); // 替換成您的 API 網址
      data = await response.json();
      console.log(data);
      
      data.Data.map((item) =>
      {
          if (item.GUID === GUID)
          {
            var END_QTY_input = document.querySelector(`#END_QTY${_index}`);
            END_QTY_input.value = item.END_QTY;
          }
      });
  
      
    }
   
  }
  
  //新增批效
            
  function Check_addNewRow(_index) {
    var myModal1 = document.querySelector(`#myModal${_index}`);
    OD_SN_L = myModal1.getAttribute("OD_SN_L");
    if (!myModal1) return;
    const qtyInputs = myModal1.querySelectorAll(".qty");
    let alertMsg = myModal1.querySelector("#alertMsg"); // 建立一個新的 HTML 元素
    var AllQTY = 0;
    var START_QTY = parseInt(myModal1.getAttribute("START_QTY"));
  // loop through each input and validate
    for (let i = 0; i < qtyInputs.length; i++) 
    {
        const qty = qtyInputs[i].value;
        AllQTY = AllQTY + parseInt(qty);
        if (!qty.trim() )
        {
          if (alertMsg) {
            alertMsg.remove(); // 如果已經有警示訊息存在，先移除它
          }
          alertMsg = document.createElement("div"); // 建立一個新的 HTML 元素
          alertMsg.id = "alertMsg";
          alertMsg.style.color = "red"; // 設定警示訊息的文字顏色
          alertMsg.style.fontWeight = "bold"; // 設定警示訊息的文字粗體
          alertMsg.style.textAlign = "center"; // 設定警示訊息的文字水平置中
          alertMsg.innerText = "請先輸入盤點數量！"; // 設定警示訊息的文字內容
          const addRowBtn = myModal1.querySelector(".addRowBtn"); // 取得新增按鈕元素
          addRowBtn.insertAdjacentElement("afterend", alertMsg); // 將警示訊息插入到按鈕下方
          return;
        }
    }
    if (alertMsg)
    {
      alertMsg.remove(); // 如果已經有警示訊息存在，移除它
    }

    if(START_QTY - AllQTY < 0)
    {
    const confirmResult = confirm("請注意！！輸入數量大於庫存理論值！！是否繼續新增批次？");
        if (!confirmResult) {
            return;}}

    AddNewRow(_index ,null);
  }



function AddNewRow(_index,qty) {
    let rowNum = 1;  
    var myModal1 = document.querySelector(`#myModal${_index}`);
    OD_SN_L = myModal1.getAttribute("OD_SN_L");
    if (!myModal1) return;
    const rows = document.querySelector(`#rows${_index}`);
    // create divs
    const divall = document.createElement("div");
    const title_div = document.createElement("div");
    const div2 = document.createElement("div");
    const div3 = document.createElement("div");
    
    // create inputs
    const qtyInput = document.createElement("input");
    const delBtn = document.createElement("button")
    
    // set input attributes
  
    qtyInput.id = "qty1";
    qtyInput.type = "number";
    qtyInput.className = "qty";
    qtyInput.inputMode = "numeric";
    qtyInput.placeholder = "請輸入數量";
    qtyInput.min = "0";
    qtyInput.max = "9999";
    qtyInput.onfocus = function() {
    clearInput(this);
    };
    if(qty != null) qtyInput.value = qty;
    delBtn.innerHTML = `<svg stroke="red" fill="none" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round" class="svg" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
    <polyline points="3 6 5 6 21 6"></polyline>
    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
    <line x1="10" y1="11" x2="10" y2="17"></line>
    <line x1="14" y1="11" x2="14" y2="17"></line>`;
    const Modalrows = myModal1.querySelectorAll(".Modalrows-area");
    rowNum = Modalrows.length + 1;
    delBtn.className = `delBtn${rowNum}`;
    delBtn.setAttribute("_rowNum",rowNum);
    delBtn.setAttribute("_index",_index);
  
    delBtn.addEventListener("click", function () 
    {
        const delBtn_rowNum = delBtn.getAttribute("_rowNum");
        const delBtn_index = delBtn.getAttribute("_index");
        const divs = myModal1.querySelectorAll(`.rows`);
        var Modalrows = myModal1.querySelectorAll(`.Modalrows-area`);
        
        
        for(var i = 0 ; i < Modalrows.length ; i++)
        {
            var _rowNum = Modalrows[i].getAttribute("_rowNum");
            if(_rowNum == delBtn_rowNum)
            {
                Modalrows[i].remove();
                console.log( Modalrows[i]);
            }
        }
        Modalrows = myModal1.querySelectorAll(`.Modalrows-area`);
        for(var i = 0 ; i < Modalrows.length ; i++)
        {
            const orderText = Modalrows[i].querySelector("#orderText");
            orderText.innerHTML = `<div id = 'orderText' style=  flex-direction: row;'> <b>(藥品批次: ${i + 1})</b> </div> `;
        }
    });
  
    // create text nodes
    const orderText = document.createTextNode("<div id = 'orderText' style=  flex-direction: row;'> <b>(藥品批次: " + rowNum + ")</b> </div> ");
    
    const qty_div = document.createElement("div");
    const qtyInput_span = document.createElement("span");
    const qtyText_span = document.createElement("span");


    qtyText_span.innerHTML = "<b>盤點量:</b>";
    qtyText_span.style.display = "flex";
    qtyText_span.style.justifyContent = "flex-start";
    qtyText_span.style.alignItems = "center";
    qtyText_span.style.marginRight = "5px";
    qtyText_span.style.width = "60px";
    qtyText_span.flexBasis  ="50%";
    qtyInput_span.style.display = "flex";
    qtyInput_span.style.justifyContent = "flex-start";
    qtyInput_span.style.alignItems = "center";
    qtyInput_span.style.flexBasis  = "80%";
    qtyInput_span.appendChild(qtyInput);
    qty_div.style.display = "flex";
    qty_div.style.justifyContent = "center";
    qty_div.style.width = "100%";
    qty_div.style.marginTop = "5px";
    qty_div.appendChild(qtyText_span);
    qty_div.appendChild(qtyInput_span);

    title_div.style.display = "flex";
    title_div.style.flexDirection = "row";
    title_div.style.justifyContent = "space-between";
    title_div.style.alignItems = "center";
    title_div.innerHTML = orderText.textContent;  
    title_div.appendChild(delBtn);
  
  
  
    title_div.className =`rows`;
    title_div.setAttribute("_index",rowNum);
    qty_div.setAttribute("_index",rowNum);
  
    
    // append divs to rows
    divall.className = "Modalrows-area";
    divall.id = `Modalrows-area${rowNum}`;
    divall.setAttribute("_rowNum",rowNum);
    divall.style.borderTop = "2.5px solid #dadadad8";
    divall.style.borderRight = "2.5px solid #dadadad8";
    divall.style.borderLeft = "1px solid rgba(0, 0, 0, 0.85)";
    divall.style.borderBottom = "1px solid rgba(0, 0, 0, 0.85)";
    divall.style.margin = "5px";
    divall.style.padding = "10px";
    divall.style.boxShadow = "-2.5px 2.5px rgba(0, 0, 0, 0.85)";  
  
  
    divall.appendChild(title_div);
    divall.appendChild(qty_div);
    rows.appendChild(divall);
    
   
  }