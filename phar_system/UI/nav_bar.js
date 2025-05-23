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
                        html_ctName: "盤點管理",
                        html_url: "../../phar_system/inventory_manager",
                        icon_url: "../../phar_system/image/icon/inventory.png",
                        icon_big_url: "../../phar_system/image/icon/inventory_big_icon.png"
                    },
                    {
                        html_name: "barcodemanagement",
                        html_ctName: "條碼建置",
                        html_url: "../../phar_system/barcodemanagement",
                        icon_url: "../../phar_system/image/icon/barcode.png",
                        icon_big_url: "../../phar_system/image/icon/barcode_big_icon.png"
                    },
                    {
                        html_name: "medGroup",
                        html_ctName: "藥品管理",
                        html_url: "../../phar_system/medGroup",
                        icon_url: "../../phar_system/image/icon/medgroup.png",
                        icon_big_url: "../../phar_system/image/icon/med_group_big_icon.png"
                    },
                    {
                        html_name: "med_balance",
                        html_ctName: "庫存清單",
                        html_url: "../../phar_system/med_balance",
                        icon_url: "../../phar_system/image/icon/balance_icon.png",
                        icon_big_url: "../../phar_system/image/icon/balance_big_icon.png"
                    },
                    {
                        html_name: "staff_management",
                        html_ctName: "人員管理",
                        html_url: "../../phar_system/staff_management",
                        icon_url: "../../phar_system/image/icon/staff_icon.png",
                        icon_big_url: "../../phar_system/image/icon/staff_big_icon.png"
                    },
                    {
                        html_name: "pages_setting",
                        html_ctName: "頁面設定",
                        html_url: "../../phar_system/pages_setting",
                        icon_url: "../../phar_system/image/icon/staff_icon.png",
                        icon_big_url: "../../phar_system/image/icon/staff_big_icon.png"
                    },
                    {
                        html_name: "permission_settings",
                        html_ctName: "權限設定",
                        html_url: "../../phar_system/permission_settings",
                        icon_url: "../../phar_system/image/icon/staff_icon.png",
                        icon_big_url: "../../phar_system/image/icon/settings.png"
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
                        html_ctName: "驗收管理",
                        html_url: "../../phar_system/inspection_manager",
                        icon_url: "../../phar_system/image/icon/inspection.png",
                        icon_big_url: "../../phar_system/image/icon/inspection_big_icon.png"
                    },
                    {
                        html_name: "pickingpage",
                        html_ctName: "揀貨指引",
                        html_url: "../../phar_system/pickingpage",
                        icon_url: "../../phar_system/image/icon/assortment.png",
                        icon_big_url: "../../phar_system/image/icon/picking_big_icon.png"
                    },
                    {
                        html_name: "med_request",
                        html_ctName: "申領核撥",
                        html_url: "../../phar_system/med_request",
                        icon_url: "../../phar_system/image/icon/research.png",
                        icon_big_url: "../../phar_system/image/icon/research.png"
                    },
                    {
                        html_name: "med_allocate",
                        html_ctName: "撥補核撥",
                        html_url: "../../phar_system/med_allocate",
                        icon_url: "../../phar_system/image/icon/assortment.png",
                        icon_big_url: "../../phar_system/image/list.png"
                    },
                    {
                        html_name: "med_allocate",
                        html_ctName: "撥補建單",
                        html_url: "../../phar_system/med_allocate_build",
                        icon_url: "../../phar_system/phar_system/image/icon/assortment.png",
                        icon_big_url: "../../phar_system/image/allocate_bulid_icon.png"
                    },
                    {
                        html_name: "requisitions_upload",
                        html_ctName: "單據辨識",
                        html_url: "../../phar_system/requisitions_upload",
                        icon_url: "../../phar_system/phar_system/image/icon/assortment.png",
                        icon_big_url: "../../phar_system/image/icon/requisitions_upload.png"
                    },
                    // {
                    //     html_name: "requisitions_upload",
                    //     html_ctName: "單據辨識",
                    //     html_url: "../../phar_system/requisitions_upload_new",
                    //     icon_url: "../../phar_system/image/icon/assortment.png",
                    //     icon_big_url: "../../phar_system/image/icon/requisitions_upload.png"
                    // }
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
                        html_url: "../../phar_system/controlleddrug",
                        icon_url: "../../phar_system/image/icon/compliance.png",
                        icon_big_url: "../../phar_system/image/icon/controlled_big_icon.png"
                    },
                    {
                        html_name: "consumption_report",
                        html_ctName: "交易紀錄",
                        html_url: "../../phar_system/consumption",
                        icon_url: "../../phar_system/image/icon/transaction.png",
                        icon_big_url: "../../phar_system/image/icon/traded_big_icon.png"
                    },
                    {
                        html_name: "batch_storage",
                        html_ctName: "批次入庫",
                        html_url: "../../phar_system/batch_storage",
                        icon_url: "../../phar_system/image/icon/batch_storage.png",
                        icon_big_url: "../../phar_system/image/icon/batch_storage.png"
                    },
                    {
                        html_name: "medicine_cart",
                        html_ctName: "住院調劑",
                        html_url: "../../phar_system/medicine_cart",
                        icon_url: "../../phar_system/image/icon/drug_cart.png",
                        icon_big_url: "../../phar_system/image/icon/drug_cart_big_icon.png"
                    },
                    {
                        html_name: "med_request",
                        html_ctName: "申領建單",
                        html_url: "../../phar_system/med_request_build",
                        icon_url: "../../phar_system/image/icon/assortment.png",
                        icon_big_url: "../../phar_system/image/requset_bulid_icon.png"
                    },
                    {
                        html_name: "pickingpage",
                        html_ctName: "藥品指引",
                        html_url: "../../phar_system/pickingpage_phar",
                        icon_url: "../../phar_system/image/icon/assortment.png",
                        icon_big_url: "../../phar_system/image/icon/picking_big_icon.png"
                    },
                    {
                        html_name: "suspiciousRxLog",
                        html_ctName: "醫師處方疑義",
                        html_url: "../../phar_system/suspiciousRxLog",
                        icon_url: "../../phar_system/image/icon/doctorMiss.png",
                        icon_big_url: "../../phar_system/image/icon/doctorMiss.png"
                    },
                    {
                        html_name: "cpoe_query",
                        html_ctName: "醫令查詢",
                        html_url: "../../phar_system/cpoe_query",
                        icon_url: "../../phar_system/image/icon/compliance.png",
                        icon_big_url: "../../phar_system/image/icon/controlled_big_icon.png"
                    },
                ]
            },
            {
                name: "中藥局",
                engname: "Chinese Medicine Pharmacy",
                pages: [
                    {
                        html_name: "ch_medical_order",
                        html_ctName: "中藥醫令",
                        html_url: "../../phar_system/ch_medical_order",
                        icon_url: "../../phar_system/image/icon/compliance.png",
                        icon_big_url: "../../phar_system/image/icon/controlled_big_icon.png"
                    },
                    {
                        html_name: "cht_consumption_report",
                        html_ctName: "中藥交易",
                        html_url: "../../phar_system/cht_consumption",
                        icon_url: "../../phar_system/image/icon/transaction.png",
                        icon_big_url: "../../phar_system/image/icon/traded_big_icon.png"
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