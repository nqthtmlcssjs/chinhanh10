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
  "nqt.tt.md.hn@gmail.com"
];

window.loginGoogle = () => {
  signInWithPopup(auth, provider);
};

window.logoutGoogle = () => {
  signOut(auth);
};

onAuthStateChanged(auth, (user) => {

  const loginBox = document.getElementById("login-box");
  const noiBo = document.getElementById("noi-bo");

  if (!loginBox || !noiBo) return;

  if (user) {

    if (allowedEmails.includes(user.email)) {

      noiBo.style.display = "block";

      loginBox.innerHTML = `
        <div>
          Xin chào: <b>${user.displayName}</b><br>
          ${user.email}
          <br><br>
          <button onclick="logoutGoogle()">
            Đăng xuất
          </button>
        </div>
      `;

    } else {

      noiBo.style.display = "none";

      loginBox.innerHTML = `
        <div style="color:red">
          Tài khoản không có quyền truy cập
        </div>
      `;

    }

  } else {

    noiBo.style.display = "none";

    loginBox.innerHTML = `
      <button onclick="loginGoogle()">
        Đăng nhập Google
      </button>
    `;

  }

});
