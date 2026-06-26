require("dotenv").config();

const express = require("express");
const http = require("http");
const path = require("path");
const session = require("express-session");
const connectMongo = require("connect-mongo");
const MongoStore = connectMongo.default || connectMongo;
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const connectDB = require("./db");

const app = express();
const server = http.createServer(app);

connectDB();

const isProd = process.env.NODE_ENV === "production";
app.set("trust proxy", 1);

// ---- Models ----
const User = mongoose.model(
  "User",
  new mongoose.Schema(
    {
      email: { type: String, required: true, unique: true, lowercase: true, trim: true },
      passwordHash: { type: String, required: true },
    },
    { timestamps: true }
  )
);

const DocIndex = mongoose.model(
  "DocIndex",
  new mongoose.Schema({ _id: String, updatedAt: Date }, { collection: "doc_index" })
);

// ---- Middleware ----
app.use(express.json());
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: process.env.MONGO_URI }),
    cookie: { httpOnly: true, secure: isProd, sameSite: "lax", maxAge: 1000 * 60 * 60 * 24 * 7 }, // 7 days
  })
);

// Serve static assets, but do NOT auto-serve index.html (we gate "/").
app.use(express.static(path.join(__dirname, "..", "public"), { index: false }));

function requireApi(req, res, next) {
  if (req.session.userId) return next();
  res.status(401).json({ error: "Not logged in" });
}
function requirePage(req, res, next) {
  if (req.session.userId) return next();
  res.redirect("/login");
}

// ---- Public auth pages ----
app.get("/login", (req, res) =>
  res.sendFile(path.join(__dirname, "..", "public", "login.html"))
);
app.get("/signup", (req, res) =>
  res.sendFile(path.join(__dirname, "..", "public", "signup.html"))
);

// ---- Auth API ----
app.post("/api/signup", async (req, res) => {
  try {
    const email = (req.body.email || "").toLowerCase().trim();
    const password = req.body.password || "";
    if (!email || password.length < 8) {
      return res.status(400).json({ error: "Email required and password must be at least 8 characters." });
    }
    const existing = await User.findOne({ email });
    if (existing) return res.status(409).json({ error: "An account with that email already exists." });
    const passwordHash = await bcrypt.hash(password, 12);
    const user = await User.create({ email, passwordHash });
    req.session.userId = user._id.toString();
    req.session.email = user.email;
    res.json({ ok: true });
  } catch (err) {
    res.status(500).json({ error: "Could not create account." });
  }
});

app.post("/api/login", async (req, res) => {
  try {
    const email = (req.body.email || "").toLowerCase().trim();
    const password = req.body.password || "";
    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.passwordHash))) {
      return res.status(401).json({ error: "Incorrect email or password." });
    }
    req.session.userId = user._id.toString();
    req.session.email = user.email;
    res.json({ ok: true });
  } catch (err) {
    res.status(500).json({ error: "Login failed." });
  }
});

app.post("/api/logout", (req, res) => {
  req.session.destroy(() => {
    res.clearCookie("connect.sid");
    res.json({ ok: true });
  });
});

app.get("/api/me", requireApi, (req, res) => {
  res.json({ email: req.session.email });
});

// Short-lived token the browser uses to authenticate to the Yjs server.
app.get("/api/ws-token", requireApi, (req, res) => {
  const token = jwt.sign({ uid: req.session.userId }, process.env.JWT_SECRET, { expiresIn: "1d" });
  res.json({ token, wsUrl: process.env.YJS_WS_URL || "ws://localhost:1234" });
});

// ---- App data ----
app.get("/api/documents", requireApi, async (req, res) => {
  try {
    const docs = await DocIndex.find().sort({ updatedAt: -1 }).limit(20).select("_id updatedAt");
    res.json(docs);
  } catch (err) {
    res.status(500).json({ error: "Failed to load documents" });
  }
});

// ---- Gated pages ----
app.get("/", requirePage, (req, res) =>
  res.sendFile(path.join(__dirname, "..", "public", "index.html"))
);
app.get("/*splat", requirePage, (req, res) =>
  res.sendFile(path.join(__dirname, "..", "public", "editor.html"))
);

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
