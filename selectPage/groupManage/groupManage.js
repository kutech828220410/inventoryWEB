window.onload = load;
async function load()
{
    const serverName ="";
    const serverType = "網頁";
    APIServer = await LoadAPIServer();
    const API01 = serch_APIServer(serverName,serverType,"API01");
    const API02 = serch_APIServer(serverName,serverType,"API02");
    console.log("API01",API01);
    console.log("API02",API02);
    await check_ip(API01[0].server,API02[0].server);
    console.log("inventory_url",inventory_url);

    var med_data = await get_medicine_cloud()
    var temp_med_data = {}
    med_data["Data"].forEach(element => {
        temp_med_data[element.CODE] = element
    });
    console.log(temp_med_data);

    let test_user_data = {
        name: "王曉明",
    }

    nav_bar_create("groupManage", test_user_data)
}