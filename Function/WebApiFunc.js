
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
  

function downloadExcel(url ,jsonData,filename) 
{

    
  fetch(url, {
    method: 'POST',
    body: JSON.stringify(jsonData),
    headers: {
      'Content-Type': 'application/json'
    }
  })
  .then(response => response.blob())
  .then(blob => {
    let today = new Date();
    let year = today.getFullYear();
    let month = today.getMonth() + 1; // 注意月份是從0開始計算的，所以要加1
    let day = today.getDate();
    // Creating a download link for the file
    let downloadLink = document.createElement('a');
    downloadLink.href = window.URL.createObjectURL(blob);
    downloadLink.download = `${year}/${month}/${day}_${filename}.xls`;
    downloadLink.click();
  })
  .catch(error => console.error(error));
}