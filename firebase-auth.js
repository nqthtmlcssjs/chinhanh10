import { initializeApp } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-app.js";

import {
  getAuth,
  GoogleAuthProvider,
  signInWithRedirect,
  signOut,
  onAuthStateChanged,
  getRedirectResult
} from "https://www.gstatic.com/firebasejs/11.9.1/firebase-auth.js";

const API_URL = "https://script.google.com/macros/s/AKfycbzgVoPJhFAS3AdWuKk5-W5jXsNPfTxvipIpAV0IxJO285KGOFI5lMRxl6-bFkakuR3U/exec";

const firebaseConfig = {
  apiKey: "AIzaSyCyHS-jYLZQvrysbhV7UhQOtl42CX7Em_g",
  authDomain: "chinhanh10-web.firebaseapp.com",
  projectId: "chinhanh10-web",
  storageBucket: "chinhanh10-web.firebasestorage.app",
  messagingSenderId: "75779781593",
  appId: "1:75779781593:web:5748e89fc7b5dbb3c5dfc8"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

async function getAllowedUsers() {
  const response = await fetch(API_URL + "?action=users");
  return await response.json();
}

window.loginGoogle = () => {
  signInWithRedirect(auth, provider);
};

window.logoutGoogle = () => {
  signOut(auth);
};

getRedirectResult(auth).catch(error => {
  console.error(error);
});

onAuthStateChanged(auth, async (user) => {
  const loginBox = document.getElementById("login-box");
  const noiBo = document.getElementById("noi-bo");

  if (!loginBox || !noiBo) return;

  if (!user) {
    noiBo.style.display = "none";

    loginBox.innerHTML = `
      <p>
        🔒 Bạn phải đăng nhập bằng tài khoản được cấp quyền để xem nội dung này.
        <button onclick="loginGoogle()">Đăng nhập Google</button>
      </p>
    `;

    return;
  }

  try {
    const users = await getAllowedUsers();

    const email = user.email.toLowerCase().trim();

    const currentUser = users.find(u =>
      String(u.email).toLowerCase().trim() === email
    );

    if (!currentUser) {
      noiBo.style.display = "none";

      loginBox.innerHTML = `
        <p style="color:#dc2626;font-weight:700;">
          ⛔ Tài khoản ${email} không có quyền truy cập.
          <button onclick="logoutGoogle()">Đăng xuất</button>
        </p>
      `;

      return;
    }

    noiBo.style.display = "block";

    loginBox.innerHTML = `
      <p>
        👤 Đang đăng nhập: <b>${currentUser.hoten || user.displayName || "Cán bộ"}</b>
        (${email})
        <button onclick="logoutGoogle()">Đăng xuất</button>
      </p>
    `;

  } catch (error) {
    console.error(error);

    noiBo.style.display = "none";

    loginBox.innerHTML = `
      <p style="color:#dc2626;font-weight:700;">
        Không tải được danh sách phân quyền.
        <button onclick="logoutGoogle()">Đăng xuất</button>
      </p>
    `;
  }
});
