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
let batch_data = [];

