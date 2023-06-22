window.onload = load;

async function load()
{ 
    await set_ip();
    var loggedlevel = sessionStorage.getItem('loggedlevel');
    permissions = GetApipermissions();
}

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