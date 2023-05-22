
async function getDataFromAPI(url) {
    return fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => {
            if (response.ok) {
                return response.json();
            }
            throw new Error('Network response was not ok.');
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        });
}
async function postDataToAPI(url, data) 
{
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });
  
      if (!response.ok) {
        throw new Error('请求失败');
      }
  
      const responseData = await response.json();
      return responseData;
    } catch (error) {
      console.error(error);
      throw error;
    }
}
  
async function downloadExcel(url, jsonData, filename)
{
  try {
    const response = await fetch(url, {
      method: 'POST',
      body: JSON.stringify(jsonData),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error('Failed to fetch the Excel file.');
    }

    const blob = await response.blob();
    const _url = window.URL.createObjectURL(blob);
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth() + 1; // 注意月份是从0开始计算的，所以要加1
    const day = today.getDate();

    // 创建下载链接
    let downloadLink = document.createElement('a');
    downloadLink.href = window.URL.createObjectURL(blob);
    downloadLink.download = `${year}/${month}/${day}_${filename}.xlsx`;
    downloadLink.click();
  } catch (error) {
    console.error(error);
  }
}

