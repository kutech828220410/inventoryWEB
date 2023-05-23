



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


// function setButtonPermissions(loggedlevel) {
//   var inventoryButton = document.getElementById("inventory-btn");
//   var consumptionButton = document.getElementById("consumption-btn");
//   var controlledDrugsButton = document.getElementById("controlled-drugs-btn");
//   var inspectionButton = document.getElementById("inspection-btn");
//   var emgApplicationButton = document.getElementById("emg-application-btn");
//   switch (loggedlevel) {
//     case "01":
//       // level 01 用户有权限访问所有按钮
//       break;
//     case "02":
//       // level 02 用户无法访问 controlledDrugsButton
//       controlledDrugsButton.disabled = true;
//        emgApplicationButton.disabled = true;
//       break;
//     case "03":
//       // level 03 用户无法访问 inventoryButton 和 consumptionButton
//       inventoryButton.disabled = true;
//       consumptionButton.disabled = true;
//       break;
//     default:
//       // 默认情况下，所有按钮都被禁用
//       inventoryButton.disabled = true;
//       consumptionButton.disabled = true;
//       controlledDrugsButton.disabled = true;
//       inspectionButton.disabled = true;
//       emgApplicationButton.disabled = true;
//   }
// }




async function inventoryBtnClick() {
  location.href = "./inventory/frontpage.html"
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