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
        "check_sec": "30"
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
function get_logedName()
{
    var loggedName = sessionStorage.getItem('loggedName');
    return loggedName;
}
function get_loggedID()
{
    var loggedName = sessionStorage.getItem('loggedID');
    return loggedName;
}
async function logout()
{
  var loggedID = sessionStorage.getItem('loggedID');
  let lotoutdata = {
      "ID": loggedID,
  };
  data_0 = await postDataToAPI(session_logout_post_url, lotoutdata);
  console.log(data_0);

  sessionStorage.clear();
  window.location.href = "login.html";
}