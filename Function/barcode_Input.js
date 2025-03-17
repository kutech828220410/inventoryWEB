var barcode_value = '';
var barcode_keydown_datetime;
var BarcodeKeyinEvent = null;
  // 監聽頁面的keydown事件
window.addEventListener('keydown', barcode_keydown);
async function barcode_keydown(event)
{
  // 判斷按下的按鍵是否是Tab鍵或Enter鍵
  

  if (event.key === 'Tab' || event.key === 'Enter') 
  {
  // 防止頁面重新載入
      event.preventDefault();
      const parsedCode = parseBarcode(barcode_value);
      
      // 取得輸入框的值
      barcode_value = '';
      // 解析藍牙掃描器返回的數據
      if(parsedCode != '')
      {         
        if(typeof BarcodeKeyinEvent == "function") 
        {
            await BarcodeKeyinEvent(parsedCode);
        }

      }         
  }
  else
  {
    const isValid = /^[a-zA-Z0-9<>+_,.*?-]+$/.test(event.key);
    const isValid2 = /^[<>+\\\-_,.*?]+$/.test(event.key);
    const controlKeys = [16, 17, 18, 20, 27, 91, 93]; // 例如: Shift, Ctrl, Alt, CapsLock, Escape, Left Command/Windows, Right Command/Menu
    const isControlKey = controlKeys.includes(event.keyCode);
    const isNumPadlKey = (event.keyCode >= 96 && event.keyCode <= 105);    
    if ((isValid || isValid2) && (!isControlKey||isNumPadlKey)) 
    {
      if (barcode_keydown_datetime == null) 
      {
        barcode_value = "";
      }
      const totalMs = getTotalMilliseconds(barcode_keydown_datetime);
      if (totalMs > 2000) {
        barcode_value = "";
      }
      barcode_keydown_datetime = Date.now();
      // 将解析后的条码值设置为输入框的值
      barcode_value += event.key;
      console.log("barcode_value", barcode_value);
    } 
  }
}
// 解析帶有分隔符的字符串
function parseBarcode(scannedCode) 
{
  const delimiter = /[\n\r]/g;
  const matches = scannedCode.split(delimiter);
  return matches[0];
}
