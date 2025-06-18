let medicine_page = [];
const ServerName = "";
const ServerType = "網頁";
const TableName = "medicine_page";
let form_info_title = [
  {
    name: "藥名",
    value: "name"
  },
  {
    name: "藥碼",
    value: "code"
  },
  {
    name: "料號",
    value: "skdiacode"
  },
  {
    name: "撥發量",
    value: "issuedQuantity"
  },
  {
    name: "來源庫別",
    value: "sourceStoreType"
  },
  {
    name: "目的庫別",
    value: "destinationStoreType"
  },
];
// 藥碼、藥名、撥發量、實撥量預設0、目的庫別、來源庫別（藥庫）、狀態（等待過帳）reportName(建單人)