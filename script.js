const API_URL = "https://script.google.com/macros/s/AKfycbzgVoPJhFAS3AdWuKk5-W5jXsNPfTxvipIpAV0IxJO285KGOFI5lMRxl6-bFkakuR3U/exec";

const CACHE_KEY = "lich_cong_viec_cache";
const CACHE_TIME = 60 * 1000;

function escapeHtml(text) {
  const div = document.createElement("div");
  div.textContent = text || "";
  return div.innerHTML;
}

function renderTasks(data) {
  const tbody = document.getElementById("task-list");
  if (!tbody) return;

  if (!data || data.length === 0) {
    tbody.innerHTML = "<tr><td colspan='5'>Chưa có lịch công việc</td></tr>";
    return;
  }

  let html = "";

  data.forEach(item => {
    html += `
      <tr>
        <td>${escapeHtml(item.thoigian)}</td>
        <td>${escapeHtml(item.diadiem)}</td>
        <td>${escapeHtml(item.noidung)}</td>
        <td>${escapeHtml(item.hinhthucthamdu)}</td>
        <td>${escapeHtml(item.thanhphanthamdu)}</td>
      </tr>
    `;
  });

  tbody.innerHTML = html;
}

function loadTasks() {
  const cache = localStorage.getItem(CACHE_KEY);

  if (cache) {
    const saved = JSON.parse(cache);
    if (Date.now() - saved.time < CACHE_TIME) {
      renderTasks(saved.data);
      return;
    }
  }

  fetch(API_URL + "?action=tasks&t=" + Date.now())
    .then(response => response.json())
    .then(data => {
      localStorage.setItem(
        CACHE_KEY,
        JSON.stringify({
          time: Date.now(),
          data: data
        })
      );

      renderTasks(data);
    })
    .catch(error => {
      const tbody = document.getElementById("task-list");

      if (tbody) {
        tbody.innerHTML = "<tr><td colspan='5'>Không tải được dữ liệu</td></tr>";
      }

      console.error(error);
    });
}

loadTasks();

setInterval(loadTasks, 300000);
