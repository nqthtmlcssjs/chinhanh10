const API_URL = "https://script.google.com/macros/s/AKfycbzBpjLcr3weEaJQx9IsW3yrt3tvpea3mjgfv3gfDZXnEQS3dkrgEHcbIrx8qOa6yUF7/exec";

function hienThiNgay(value) {
  if (!value) return "";

  if (typeof value === "string" && value.includes("T")) {
    const d = new Date(value);
    return d.toLocaleDateString("vi-VN", {
      timeZone: "Asia/Ho_Chi_Minh"
    });
  }

  return value;
}

function loadTasks() {
  fetch(API_URL + "?t=" + new Date().getTime())
    .then(response => response.json())
    .then(data => {
      const tbody = document.getElementById("task-list");

      if (!tbody) return;

      tbody.innerHTML = "";

      if (data.length === 0) {
        tbody.innerHTML = "<tr><td colspan='5'>Chưa có lịch công việc</td></tr>";
        return;
      }

      data.forEach(item => {
        tbody.innerHTML += `
          <tr>
            <td>${hienThiNgay(item.thoigian)}</td>
            <td>${item.diadiem || ""}</td>
            <td>${item.noidung || ""}</td>
            <td>${item.hinhthucthamdu || ""}</td>
            <td>${item.thanhphanthamdu || ""}</td>
          </tr>
        `;
      });
    });
}

loadTasks();
setInterval(loadTasks, 5000);
