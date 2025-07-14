const express = require("express");
const cors = require("cors");
const session = require("express-session");
const path = require("path");

const app = express();
const port = 3000;


app.use(
  cors({
    origin: (origin, callback) => {
      callback(null, true);
    },
    credentials: true,
  })
);


app.use(express.json());
app.set("trust proxy", 1);


app.use(express.static(path.join(__dirname, "dashadmin")));


app.use(
  session({
    secret: "ini-adalah-kunci-rahasia-saya-yang-sangat-aman",
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24,
      sameSite: "lax",
    },
  })
);


const plainPasswords = {
  admin: "admin123",
};


const logActivity = (ip, status, username) => {
  const timestamp = new Date().toLocaleString("id-ID", {
    timeZone: "Asia/Makassar",
  });
  console.log(`[${timestamp}] - IP: ${ip} - ${status} - User: '${username}'`);
};


app.get("/", (req, res) => {
  res.sendFile(
    path.join(__dirname, "admin_dashboard.html", "admin_login.html")
  );
});


app.post("/login", (req, res) => {
  const { username, password } = req.body;
  const ip = req.ip;
  const errorMessage =
    "Anda memasukan password / user yang salah. Silahkan hubungi administrator untuk mengetahui password / user nya";

  if (plainPasswords[username] && plainPasswords[username] === password) {
    logActivity(ip, "LOGIN SUKSES", username);
    req.session.user = { username: username };
    res.json({ success: true, message: "Login berhasil!" });
  } else {
    logActivity(ip, "LOGIN GAGAL", username);
    res.status(401).json({ success: false, message: errorMessage });
  }
});


app.get("/check-session", (req, res) => {
  if (req.session.user) {
    res.json({ loggedIn: true, user: req.session.user });
  } else {
    res.status(401).json({ loggedIn: false });
  }
});

app.post("/logout", (req, res) => {
  const ip = req.ip;
  const username = req.session.user
    ? req.session.user.username
    : "TIDAK DIKETAHUI";
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ success: false, message: "Gagal logout." });
    }
    logActivity(ip, "LOGOUT", username);
    res.clearCookie("connect.sid");
    res.json({ success: true, message: "Logout berhasil." });
  });
});


app.listen(port, () => {
  console.log(`Server berjalan di http://localhost:${port}`);
  console.log(`Login menggunakan username 'admin' dan password 'admin123'.`);
});
