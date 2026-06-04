const API_URL = "https://script.google.com/macros/s/AKfycbzBpjLcr3weEaJQx9IsW3yrt3tvpea3mjgfv3gfDZXnEQS3dkrgEHcbIrx8qOa6yUF7/exec";

fetch(API_URL)
  .then(response => response.json())
  .then(data => {
    const tbody = document.getElementById("task-list");

    if (!tbody) return;

    tbody.innerHTML = "";

    if (data.length === 0) {
      tbody.innerHTML = "<tr><td colspan='5'>Chưa có công việc nào</td></tr>";
      return;
    }

    data.forEach(item => {
      tbody.innerHTML += `
        <tr>
          <td>${item.Ngay || ""}</td>
          <td>${item.Gio || ""}</td>
          <td>${item.NoiDung || ""}</td>
          <td>${item.NguoiPhuTrach || ""}</td>
          <td>${item.TrangThai || ""}</td>
        </tr>
      `;
    });
  })
  .catch(error => {
    const tbody = document.getElementById("task-list");

    if (tbody) {
      tbody.innerHTML = "<tr><td colspan='5'>Không tải được dữ liệu</td></tr>";
    }

    console.error("Lỗi tải dữ liệu:", error);
  });
