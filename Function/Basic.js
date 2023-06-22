loadScript("../../Function/WebApiFunc.js");
loadScript("../../Function/dateConvert.js");
loadScript("../../Function/FileStream.js");
loadScript("../../Function/JsonFunction.js");
var isDesktop = /Windows|Linux|Macintosh/i.test(navigator.userAgent);

const DeviceType = 
{
  MOBILE: "Mobile Phone",
  TABLET: "Tablet",
  COMPUTER: "Computer Web Page",
  NONE: "None"
};

var device = checkDeviceType();
var screenWidth = getScreenWidth();
var screenHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;

function getScreenWidth()
{
  return window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
}
function checkDeviceType() 
{
  var screenWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;

  if (screenWidth < 500)
  {
    return DeviceType.MOBILE;
  } 
  else 
  {
    return DeviceType.COMPUTER;
  }
}

function getConfigFromURL(url , config_name) 
{
  const urlParams = new URLSearchParams(new URL(url).search);
  const config = urlParams.get(`${config_name}`);
  return config;
}

function getAbsolutePosition(element) 
{
  const rect = element.getBoundingClientRect();
  return {
    top: rect.top + window.pageYOffset,
    left: rect.left + window.pageXOffset,
    bottom: rect.bottom + window.pageYOffset,
    right: rect.right + window.pageXOffset,
    width : rect.width,
    height : rect.height
  };
}
function waitForElementToDisplay(element, callback)
{
  const isElementVisible = () => {
    const style = window.getComputedStyle(element);
    return style.display !== 'none' && style.visibility !== 'hidden';
  };

  const checkVisibility = () => {
    if (isElementVisible()) {
      callback(); // 元素完全显示后执行回调函数
    } else {
      requestAnimationFrame(checkVisibility);
    }
  };

  checkVisibility();
}

function updateDivHeight(div , offsetHeight) 
{
  var elements = div.children;
  var totalHeight = 0;
  for (var i = 0; i < elements.length; i++) {
    totalHeight += elements[i].height;
  }
  console.log('totalHeight', totalHeight);
  div.style.height = totalHeight + offsetHeight + 'px';
}

function isStringNull(str)
{
  if(str === null || str === undefined || str === "") return true;
}

function isScriptLoaded(scriptSrc)
{
    var scripts = document.getElementsByTagName('script');
    for (var i = 0; i < scripts.length; i++) {
        var script = scripts[i];
        if (script.src === scriptSrc) {
            return true;
        }
    }
    return false;
}
function loadScript(scriptSrc)
{
    if (!isScriptLoaded(scriptSrc)) 
    {
        document.write(`<script src='${scriptSrc}'></script>`);
    }
}