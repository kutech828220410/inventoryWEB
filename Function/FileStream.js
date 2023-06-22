function Loadtxt(filename) {
    return new Promise((resolve, reject) => {
      var xhr = new XMLHttpRequest();
      xhr.open('GET', filename, true);
      xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            var txt = xhr.responseText;
            const jsonObj = JSON.parse(txt);
            resolve(jsonObj); // 解決 Promise
          } else {
            reject(new Error('Request failed'));
          }
        }
      };
      xhr.send();
    });
  }

