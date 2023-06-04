loadScript("../../Function/WebApiFunc.js");
loadScript("../../Function/dateConvert.js");
const DeviceType = 
{
  MOBILE: "Mobile Phone",
  TABLET: "Tablet",
  COMPUTER: "Computer Web Page"
};

var device = checkDeviceType();
var screenWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
var screenHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;


function checkDeviceType() {
  var screenWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;

  if (screenWidth < 768) {
    return DeviceType.MOBILE;
  } else if (screenWidth >= 768 && screenWidth < 1024) {
    return DeviceType.MOBILE;
  } else {
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