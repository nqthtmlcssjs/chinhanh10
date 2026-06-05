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

const allowedEmails = [
  "nqt.tt.md.hn@gmail.com",
  "maihuongnguyen0702@gmail.com"
];

window.loginGoogle = () => {
  signInWithPopup(auth, provider).catch(error => {
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

  if (!allowedEmails.includes(user.email)) {
    noiBo.style.display = "none";

    loginBox.innerHTML = `
      <p style="color:#dc2626;font-weight:700;">
        ⛔ Tài khoản ${user.email} không có quyền truy cập.
        <button onclick="logoutGoogle()">Đăng xuất</button>
      </p>
    `;

    return;
  }

  noiBo.style.display = "block";

  loginBox.innerHTML = `
    <p>
      👤 Đang đăng nhập: <b>${user.displayName}</b>
      (${user.email})
      <button onclick="logoutGoogle()">Đăng xuất</button>
    </p>
  `;
});