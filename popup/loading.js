
function GetLoadingpopup()
{

    // 創建 @keyframes 規則
    var keyframes = `@keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }`;
  
    // 創建 style 元素
    var style = document.createElement("style");
    style.type = "text/css";
    style.appendChild(document.createTextNode(keyframes));
  
    // 將 style 元素添加到 head 中
    document.head.appendChild(style);
  
  // var keyframes = `@keyframes walkingAnimation {
  //   0% { background-position: 0 0; }
  //   100% { background-position: -512px 0; }
  // }`;

  // var style = document.createElement("style");
  // style.type = "text/css";
  // style.appendChild(document.createTextNode(keyframes));

  // document.head.appendChild(style);

   
  var popup = document.createElement("div");
  popup.id = "loadingPopup";
  popup.className = "loadingPopup";
  popup.style.display = "none";
  popup.style.position = "fixed";
  popup.style.top = "0";
  popup.style.left = "0";
  popup.style.width = "100%";
  popup.style.height = "100%";
  popup.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
  popup.style.zIndex = "0";
  
  // 創建彈跳視窗內容元素
  var popupContent = document.createElement("div");
  popupContent.classList.add("popup-content");
  popupContent.style.position = "absolute";
  popupContent.style.top = "50%";
  popupContent.style.left = "50%";
  popupContent.style.transform = "translate(-50%, -50%)";
  popupContent.style.backgroundColor = "#fff";
  popupContent.style.padding = "50px";
  popupContent.style.backgroundColor = "rgba(0, 0, 0, 0.7)";
  popupContent.style.textAlign = "center";
  popupContent.style.borderRadius = "10px";
  popup.appendChild(popupContent);
  
  // 創建讀取器元素
  var loader = document.createElement("div");
  loader.style.border = "8px solid #f3f3f3";
  loader.style.borderTop = "8px solid #3498db";
  loader.style.borderRadius = "50%";
  loader.style.width = "60px";
  loader.style.height = "60px";
  loader.style.animation = "spin 2s linear infinite";
  loader.style.marginBottom = "10px";
  // loader.style.backgroundImage = "url('../image/GGWalk.gif')";
  // loader.style.width = "186px";
  // loader.style.height = "186px";
  // loader.style.animation = "walkingAnimation 1s steps(4) infinite";
  popupContent.appendChild(loader);
  
  // 創建讀取中的消息元素
  var message = document.createElement("div");
  message.classList.add("message");
  message.innerText = "讀取中...";
  message.style.fontSize = "16px";
  message.style.color = "#FFFFFF";
  popupContent.appendChild(message);
  return popup;
}

// 顯示彈跳視窗
function showLoadingPopup() 
{
  const loadingPopup = document.querySelector('#loadingPopup');
  loadingPopup.style.display = "block";
}

// 隱藏彈跳視窗
function hideLoadingPopup() 
{
  const loadingPopup = document.querySelector('#loadingPopup');
  loadingPopup.style.display = "none";
}