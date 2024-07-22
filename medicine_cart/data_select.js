let light_color_list = [
    {
        name: "green",
        rgb: "40,255,40"
    },
    {
        name: "blue",
        rgb: "40,40,255"
    },
    {
        name: "red",
        rgb: "255,40,40"
    },
    {
        name: "yellow",
        rgb: "255,255,40"
    },
    {
        name: "orange",
        rgb: "255,160,40"
    },
    {
        name: "black",
        rgb: "0,0,0"
    }
];
let light_color_object = {
    green: "40,255,40",
    blue: "40,40,255",
    red: "255,40,40",
    yellow: "255,255,40",
    orange: "255,160,40",
    black: "0,0,40",
}
let color_list_triiger = false;
let color_select = {
    name: "green",
    rgb: "40,255,40"
};

let func_list = [
    {
        name: "allocate",
        ctname: "調劑"
    },
    {
        name: "review",
        ctname: "初盤清單"
    },
    {
        name: "deliver",
        ctname: "交車"
    }
];
let func_list_triiger = false;
let current_func = "";
let last_current_func = "";

let pharmacy_list = [
    {
        uid: '13329',
        ctname: '長青樓-住院藥局A'
    },
    {
        uid: '13349',
        ctname: '長青樓-住院藥局B'
    },
    {
        uid: '13353',
        ctname: '思源樓-住院藥局'
    }
];
let pharmacy_list_triiger = false;
let current_pharmacy = "";
let last_current_pharmacy = "";

let cart_list = [
    {
        uid: '33222',
        ctname: 'C066'
    },
    {
        uid: '33131',
        ctname: 'C229'
    },
    {
        uid: '32241',
        ctname: 'C220'
    },
    {
        uid: '322121',
        ctname: 'C099'
    },
    {
        uid: '322442',
        ctname: 'C120'
    },
];
let cart_list_triiger = false;
let current_cart = "";
let last_current_cart = "";

let med_table = [
    {
        uid: '55555',
        ctname: '針劑'   
    },
    {
        uid: '66666',
        ctname: '口服'   
    },
];
let med_table_triiger = false;
let current_med_table = "";
let last_current_med_table = "";

let popup_last_cart_mark = "";

let patient_bed_index = 0;
let last_patient_bed_index = -1;
