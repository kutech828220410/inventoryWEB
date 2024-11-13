

function isMobileOrTablet() {
    const userAgent = navigator.userAgent;

    // 檢查 User Agent 是否包含行動裝置或平板裝置的關鍵字
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Tablet/i.test(userAgent);
}