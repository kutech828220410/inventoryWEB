let html_pages = [
    {
        name: "共同管理",
        engname: "Management",
        branch: [
            {
                name: "共同管理",
                engname: "Management",
                pages: [
                    {
                        html_name: "inventory",
                        html_ctName: "盤點單管理",
                        html_url: "../../inventory/manager",
                        icon_url: "../../image/icon/inventory.png",
                        icon_big_url: "../../image/icon/inventory_big_icon.png"
                    },
                    {
                        html_name: "barcodemanagement",
                        html_ctName: "條碼建置",
                        html_url: "../../barcodemanagement",
                        icon_url: "../../image/icon/barcode.png",
                        icon_big_url: "../../image/icon/barcode_big_icon.png"
                    },
                    {
                        html_name: "medGroup",
                        html_ctName: "藥品管理",
                        html_url: "../../medGroup",
                        icon_url: "../../image/icon/medgroup.png",
                        icon_big_url: "../../image/icon/med_group_big_icon.png"
                    },
                    {
                        html_name: "med_balance",
                        html_ctName: "庫存量清單",
                        html_url: "../../med_balance",
                        icon_url: "../../image/icon/balance_icon.png",
                        icon_big_url: "../../image/icon/balance_big_icon.png"
                    },
                    {
                        html_name: "staff_management",
                        html_ctName: "人員管理",
                        html_url: "../../staff_management",
                        icon_url: "../../image/icon/staff_icon.png",
                        icon_big_url: "../../image/icon/staff_big_icon.png"
                    }
                ]
            },
        ],
    },
    {
        name: "藥庫",
        engname: "Storehouse",
        branch: [
            {
                name: "藥庫",
                engname: "Storehouse",
                pages: [
                    {
                        html_name: "inspection",
                        html_ctName: "驗收單管理",
                        html_url: "../../storehouse/inspection",
                        icon_url: "../../image/icon/inspection.png",
                        icon_big_url: "../../image/icon/inspection_big_icon.png"
                    },
                    {
                        html_name: "med_request",
                        html_ctName: "申領核撥",
                        html_url: "../../med_request",
                        icon_url: "../../image/icon/assortment.png",
                        icon_big_url: "../../image/list.png"
                    },
                    {
                        html_name: "pickingpage",
                        html_ctName: "揀貨",
                        html_url: "../../pickingpage",
                        icon_url: "../../image/icon/assortment.png",
                        icon_big_url: "../../image/icon/picking_big_icon.png"
                    }
                ]
            }
        ]
    },
    {
        name: "藥局",
        engname: "Pharmacy",
        branch: [
            {
                name: "藥局",
                engname: "Pharmacy",
                pages: [
                    {
                        html_name: "drugs_report",
                        html_ctName: "管制結存",
                        html_url: "../../controlleddrug",
                        icon_url: "../../image/icon/compliance.png",
                        icon_big_url: "../../image/icon/controlled_big_icon.png"
                    },
                    {
                        html_name: "consumption_report",
                        html_ctName: "交易紀錄",
                        html_url: "../../consumption",
                        icon_url: "../../image/icon/transaction.png",
                        icon_big_url: "../../image/icon/traded_big_icon.png"
                    },
                    {
                        html_name: "batch_storage",
                        html_ctName: "批次入庫",
                        html_url: "../../batch_storage",
                        icon_url: "../../image/icon/batch_storage.png",
                        icon_big_url: "../../image/icon/batch_storage.png"
                    },
                    {
                        html_name: "medicine_cart",
                        html_ctName: "住院調劑",
                        html_url: "../../medicine_cart",
                        icon_url: "../../image/icon/drug_cart.png",
                        icon_big_url: "../../image/icon/drug_cart_big_icon.png"
                    }
                ]
            },
            {
                name: "中藥局",
                engname: "Chinese Medicine Pharmacy",
                pages: [
                    {
                        html_name: "ch_medical_order",
                        html_ctName: "中藥醫令",
                        html_url: "../../ch_medical_order",
                        icon_url: "../../image/icon/compliance.png",
                        icon_big_url: "../../image/icon/controlled_big_icon.png"
                    },
                    {
                        html_name: "cht_consumption_report",
                        html_ctName: "中藥交易",
                        html_url: "../../cht_consumption",
                        icon_url: "../../image/icon/transaction.png",
                        icon_big_url: "../../image/icon/traded_big_icon.png"
                    },
                ]
            }
        ],
    }
];
function nav_bar_create(user_data) {
    // 導覽列環境設定
    document.body.style.position = "relative";

    console.log(user_data);
}