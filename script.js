const API_URL = "https://script.google.com/macros/s/AKfycbzgVoPJhFAS3AdWuKk5-W5jXsNPfTxvipIpAV0IxJO285KGOFI5lMRxl6-bFkakuR3U/exec";
function loadTasks() {

  fetch(API_URL + "?action=tasks&t=" + Date.now())

    .then(response => response.json())

    .then(data => {

      const tbody = document.getElementById("task-list");

      if (!tbody) return;

      tbody.innerHTML = "";

      if (!data || data.length === 0) {

        tbody.innerHTML =
          "<tr><td colspan='5'>Chưa có lịch công việc</td></tr>";

        return;
      }

      data.forEach(item => {

        tbody.innerHTML += `
          <tr>
            <td>${item.thoigian || ""}</td>
            <td>${item.diadiem || ""}</td>
            <td>${item.noidung || ""}</td>
            <td>${item.hinhthucthamdu || ""}</td>
            <td>${item.thanhphanthamdu || ""}</td>
          </tr>
        `;
      });

    })

    .catch(error => {

      const tbody = document.getElementById("task-list");

      if (tbody) {

        tbody.innerHTML =
          "<tr><td colspan='5'>Không tải được dữ liệu</td></tr>";
      }

      console.error(error);
    });
}

loadTasks();

setInterval(loadTasks, 60000);
