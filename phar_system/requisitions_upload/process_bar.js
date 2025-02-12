function process_bar_display(boolean) {
    let process_bar_div = document.querySelector(".process_bar_div");
    if(boolean) {
      process_bar_div.style.display = "flex";
    } else {
      process_bar_div.style.display = "none";
    }
}
function process_bar_display(boolean) {
    let process_bar_div = document.querySelector(".process_bar_div");
    if(boolean) {
      process_bar_div.style.display = "flex";
    } else {
      process_bar_div.style.display = "none";
    }
}
function set_process_bar_log(arrLength, index, content) {
    clearInterval(process_timer);
    let bar_before = document.querySelector(".bar_before");
    let bar_after = document.querySelector(".bar_after");
    let process_log_num = document.querySelector(".process_log_num");
    let process_content = document.querySelector(".process_content");

    let last_num = +process_log_num.textContent; // 當前數值
    let currentItem = index + 1; // arr index
    let totalItem = +arrLength; // arr.length
    let percentage;
    if(currentItem == totalItem) {
        percentage = 100;
    } else {
        percentage = (currentItem / totalItem) * 100;
    }
    let position = 80 + (currentItem / totalItem) * -200;
    percentage = percentage.toFixed(2);
    position = position.toFixed(0);

    
    const duration = 1200; // 動畫總時間 1 秒
    const interval = 10; // 每 10 毫秒更新一次
    const steps = duration / interval; // 更新次數
    const increment = (percentage - last_num) / steps; // 每次增加的數值
    // console.log(last_num);
    // console.log(percentage);
    // console.log(increment);

    process_timer = setInterval(() => { // 增加數值

        if ((increment > 0 && last_num + increment >= percentage) || (increment < 0 && last_num + increment <= percentage)) {
            last_num = +percentage; // 確保最後數字為目標值
            clearInterval(process_timer); // 停止計時器
        } else {
            last_num += increment; 
        }

        process_log_num.textContent = last_num.toFixed(2); // 更新畫面顯示，保留兩位小數
    }, interval);

    bar_before.style.top = `${position}px`;
    bar_after.style.top = `${position}px`;

    process_content.textContent = content;
}
function reset_process_bar_log(content) {
    setTimeout(() => {
        clearInterval(process_timer);
        let bar_before = document.querySelector(".bar_before");
        let bar_after = document.querySelector(".bar_after");
        let process_log_num = document.querySelector(".process_log_num");
        let process_content = document.querySelector(".process_content");
    
        process_log_num.textContent = "0";
        process_content.textContent = content;
        bar_before.style.top = `80px`;
        bar_after.style.top = `80px`;
    }, 1500);
}