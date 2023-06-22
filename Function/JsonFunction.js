function searchJSON(jsonObj, searchKey, searchValue) 
{
    var results = []; // 儲存符合搜尋條件的結果
  
    function search(jsonObj) {
      for (var key in jsonObj) {
        if (typeof jsonObj[key] === 'object') {
          // 遞迴搜尋內嵌的物件
          search(jsonObj[key]);
        } else if (key === searchKey && jsonObj[key] === searchValue) {
          // 找到符合搜尋條件的屬性
          results.push(jsonObj);
        }
      }
    }
  
    search(jsonObj); // 開始搜尋
  
    return results;
}