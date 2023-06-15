window.onload = load;

async function load()
{ 
    await set_ip();
}
window.addEventListener('load', function() 
{
  // 在這裡撰寫當網頁載入完成後要執行的程式碼
  var loggedlevel = sessionStorage.getItem('loggedlevel');
  permissions = GetApipermissions();
  console.log(permissions);
});


async function inventoryBtnClick() 
{
  location.href = "frontinventory.html"
}
async function consumptionBtnClick() 
{
  
}
async function controlledDrugsBtnClick() 
{
  
}
async function inspectionClick() 
{
  location.href = "frontinspection.html";
}
async function emgApplicationClick() 
{
  
}

async function controlledBtnClick() 
{
  location.href = "../controlleddrug/main.html";
}







async function inventoryBtnClick() 
{
  location.href = "./inventory/frontpage.html"
}
async function consumptionBtnClick() 
{
  
}
async function controlledDrugsBtnClick() 
{
  
}
async function inspectionClick() 
{
  location.href = "frontinspection.html";
}
async function emgApplicationClick() 
{
  
}