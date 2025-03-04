

// var script = document.createElement('script');
// script.src = '../ApiURL.js';
// document.head.appendChild(script);
// document.write('<script src="../signalr/dist/browser/signalr.js"></script>'); //注意,此處須為相對於index.html的絕對路徑
//  document.write('../ApiURL.js'); //注意,此處須為相對於index.html的絕對路徑

loadScript("../../signalr/dist/browser/signalr.js");
var ChathubErrorEvent;
var connection ;
async function signalR_init()
{
    await Set_ChatHub_url();
    console.log('Chat_url' , Chat_url);
    connection = new signalR.HubConnectionBuilder()
    .withUrl(`${Chat_url}`)
    .build();

    connection.on("ReceiveMessage", function (user ,message)
    {
        triggerReceivedEvent(user, message);
    });
    
    connection.start()
    .then(function () 
    {        
        console.log("SignalR connected");
        connection.onclose(function (error) 
        {
            console.log("SignalR connection closed:", error);
            if(typeof ChathubErrorEvent == "function") 
            {
                ChathubErrorEvent();
            }
            startConnection();
        });
    })
    .catch(function (error) 
    {
        console.error("SignalR connection error:", error);
        setTimeout(startConnection, 5000); // 5秒后重试
    });
}
function SendMessage(msg)
{
    connection.invoke("SendMessage","", msg);
}
var ChathubReceivedEvent;

function triggerReceivedEvent(user, message) 
{
    // 创建自定义事件
    var customEvent = new CustomEvent('ReceivedEvent', {
        detail: {
            user: user,
            message: message
        }
    });
    if(typeof ChathubReceivedEvent == "function") 
    {
        ChathubReceivedEvent(user , message);
    }
    // 触发自定义事件
    document.dispatchEvent(customEvent);
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