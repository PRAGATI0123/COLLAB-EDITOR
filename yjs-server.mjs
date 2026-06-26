import "dotenv/config";
import http from "http";
import { WebSocketServer } from "ws";
import { setupWSConnection, setPersistence } from "@y/websocket-server/utils";
import { MongodbPersistence } from "y-mongodb-provider";
import { MongoClient } from "mongodb";
import jwt from "jsonwebtoken";
import * as Y from "yjs";

const MONGO_URI = process.env.MONGO_URI;
const JWT_SECRET = process.env.JWT_SECRET;
if (!MONGO_URI || !JWT_SECRET) {
  console.error("❌ MONGO_URI or JWT_SECRET missing from .env");
  process.exit(1);
}

const mdb = new MongodbPersistence(MONGO_URI, { collectionName: "yjs-documents", flushSize: 100 });

const indexClient = new MongoClient(MONGO_URI);
let docIndex;
const debounce = new Map();
async function startIndex() {
  await indexClient.connect();
  docIndex = indexClient.db().collection("doc_index");
  console.log("🗂  doc index ready");
}
function touchDoc(docName) {
  clearTimeout(debounce.get(docName));
  debounce.set(docName, setTimeout(() => {
    docIndex?.updateOne({ _id: docName }, { $set: { updatedAt: new Date() } }, { upsert: true })
      .catch((e) => console.error("index error:", e.message));
  }, 1500));
}

setPersistence({
  bindState: async (docName, ydoc) => {
    const persisted = await mdb.getYDoc(docName);
    Y.applyUpdate(ydoc, Y.encodeStateAsUpdate(persisted));
    await mdb.storeUpdate(docName, Y.encodeStateAsUpdate(ydoc));
    ydoc.on("update", (update) => {
      mdb.storeUpdate(docName, update);
      touchDoc(docName);
    });
  },
  writeState: async () => true,
});

const server = http.createServer((req, res) => {
  res.writeHead(200, { "Content-Type": "text/plain" });
  res.end("Yjs sync server running");
});

const wss = new WebSocketServer({ server });
wss.on("connection", (conn, req) => {
  // Authenticate before allowing any sync.
  try {
    const url = new URL(req.url, "http://localhost");
    const token = url.searchParams.get("token");
    jwt.verify(token, JWT_SECRET); // throws if missing / invalid / expired
  } catch (e) {
    conn.close(1008, "unauthorized");
    return;
  }
  setupWSConnection(conn, req);
});

const PORT = process.env.PORT || 1234;
startIndex().then(() => {
  server.listen(PORT, () => {
    console.log(`🔗 Yjs sync server on ws://localhost:${PORT} (auth + persistence)`);
  });
});
