const ServerName = "";
const ServerType = "網頁";
const TableName = "medicine_page";
let phar_table_data;
let input_select_option = [
    {
        name: "全部",
        value: "all"
    },
    {
        name: "藥碼",
        value: "code"
    },
    {
        name: "藥名",
        value: "name"
    },
    {
        name: "批號",
        value: "batch_num"
    }
]
let fake_batch_data = [
    {
        "GUID": "asdfasdfa-asdfwe232-af2asd-2fads",
        "STORE_NAME": "急診",
        "CODE": "21307",
        "NAME": "PlusDmax Tab 70mg/2800IU",
        "PAKAGE": "TAB",
        "QTY": "400",
        "VAL": "9999/12/31",
        "LOT": "2024-04-04",
        "CT_OP": "蔣經國",
        "CT_TIME": "2024-03-13",
        "RECEIVER": "-",
        "RECEIVE_TIME": "-",
        "RSN": "-",
        "STATUS": "-",
        "REMARKS": "2024-07-04T12:13:16.035335"
    },
]

