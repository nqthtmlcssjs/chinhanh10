```javascript
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-app.js";

import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/11.9.1/firebase-auth.js";

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

/* Danh sách email được xem nội bộ */
const allowedEmails = [
  "nqt.tt.md.hn@gmail.com"
];

window.loginGoogle = () => {
  signInWithPopup(auth, provider)
    .catch(error => {
      console.error(error);
      alert("Không thể đăng nhập Google");
    });
};

window.logoutGoogle = () => {
  signOut(auth);
};

onAuthStateChanged(auth, (user) => {

  const loginBox = document.getElementById("login-box");
  const noiBo = document.getElementById("noi-bo");

  if (!loginBox || !noiBo) return;

  /* CHƯA ĐĂNG NHẬP */
  if (!user) {

    noiBo.style.display = "none";

    loginBox.innerHTML = `
      <div class="user-card">

        <h3>🔒 Khu vực nội bộ</h3>

        <p>
          Vui lòng đăng nhập bằng tài khoản Google
          được cấp quyền để xem lịch công việc.
        </p>

        <button class="btn-login" onclick="loginGoogle()">
          Đăng nhập Google
        </button>

      </div>
    `;

    return;
  }

  /* KHÔNG CÓ QUYỀN */
  if (!allowedEmails.includes(user.email)) {

    noiBo.style.display = "none";

    loginBox.innerHTML = `
      <div class="user-card">

        <h3 style="color:#dc2626">
          ⛔ Không có quyền truy cập
        </h3>

        <p>${user.email}</p>

        <button class="btn-logout" onclick="logoutGoogle()">
          Đăng xuất
        </button>

      </div>
    `;

    return;
  }

  /* ĐƯỢC PHÉP */
  noiBo.style.display = "block";

  loginBox.innerHTML = `
    <div class="user-card">

      <div class="user-avatar">
        👤
      </div>

      <div class="user-info">

        <h3>
          Xin chào, ${user.displayName}
        </h3>

        <p>${user.email}</p>

      </div>

      <button class="btn-logout" onclick="logoutGoogle()">
        Đăng xuất
      </button>

    </div>
  `;

});
```
