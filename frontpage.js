

setInterval(check_session, 5000);

async function check_session() {
    var loggedID = sessionStorage.getItem('loggedID');
    var loggedName = sessionStorage.getItem('loggedName');
    var loggedEmployer = sessionStorage.getItem('loggedEmployer');
    var loggedlevel = sessionStorage.getItem('loggedlevel');
    var loggedTime = sessionStorage.getItem('loggedTime');

    let userdata = {
        "ID": loggedID,
        "level": loggedlevel,
        "loginTime": loggedTime,
        "check_sec": "20"
    };
    console.log(JSON.stringify(userdata));

    data = await postDataToAPI(session_check_post_url, userdata);
    console.log(data);

    if (data.Code < 0) {
        let lotoutdata = {
            "ID": loggedID,
        };
        data_0 = await postDataToAPI(session_logout_post_url, lotoutdata);
        console.log(data_0);
        sessionStorage.clear();
        alert(data.Result);
        window.location.href = "login.html";
    }
}

window.onload = function() {

  // 在這裡撰寫當網頁載入完成後要執行的程式碼
};
window.addEventListener('load', function() {
  // 在這裡撰寫當網頁載入完成後要執行的程式碼
  var loggedlevel = sessionStorage.getItem('loggedlevel');
  setButtonPermissions(loggedlevel);
});


async function inventoryBtnClick() {
  location.href = "frontinventory.html"
}
async function consumptionBtnClick() {
  
}
async function controlledDrugsBtnClick() {
  
}
async function inspectionClick() {
  location.href = "frontinspection.html";
}
async function emgApplicationClick() {
  
}


function setButtonPermissions(loggedlevel) {
  var inventoryButton = document.getElementById("inventory-btn");
  var consumptionButton = document.getElementById("consumption-btn");
  var controlledDrugsButton = document.getElementById("controlled-drugs-btn");
  var inspectionButton = document.getElementById("inspection-btn");
  var emgApplicationButton = document.getElementById("emg-application-btn");
  switch (loggedlevel) {
    case "01":
      // level 01 用户有权限访问所有按钮
      break;
    case "02":
      // level 02 用户无法访问 controlledDrugsButton
      controlledDrugsButton.disabled = true;
       emgApplicationButton.disabled = true;
      break;
    case "03":
      // level 03 用户无法访问 inventoryButton 和 consumptionButton
      inventoryButton.disabled = true;
      consumptionButton.disabled = true;
      break;
    default:
      // 默认情况下，所有按钮都被禁用
      inventoryButton.disabled = true;
      consumptionButton.disabled = true;
      controlledDrugsButton.disabled = true;
      inspectionButton.disabled = true;
      emgApplicationButton.disabled = true;
  }
}

async function logout() {
  var loggedID = sessionStorage.getItem('loggedID');
  let lotoutdata = {
      "ID": loggedID,
  };
  data_0 = await postDataToAPI(session_logout_post_url, lotoutdata);
  console.log(data_0);

  sessionStorage.clear();
  window.location.href = "login.html";
}


async function inventoryBtnClick() {
  location.href = "frontinventory.html"
}
async function consumptionBtnClick() {
  
}
async function controlledDrugsBtnClick() {
  
}
async function inspectionClick() {
  location.href = "frontinspection.html";
}
async function emgApplicationClick() {
  
}