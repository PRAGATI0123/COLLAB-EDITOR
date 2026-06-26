import * as Y from "yjs";
import { WebsocketProvider } from "y-websocket";
import { QuillBinding } from "y-quill";
import Quill from "quill";
import QuillCursors from "quill-cursors";

Quill.register("modules/cursors", QuillCursors);

const documentId = decodeURIComponent(window.location.pathname.slice(1));
if (!documentId) window.location.href = "/";

const COLORS = ["#FF5D8F", "#8B5CF6", "#F5A524", "#06B6D4", "#4F7CFF"];
function getIdentity() {
  let id = null;
  try { id = JSON.parse(localStorage.getItem("collab-identity")); } catch (e) {}
  if (!id || !id.name || !id.color) {
    id = { name: "Guest " + Math.floor(100 + Math.random() * 900), color: COLORS[Math.floor(Math.random() * COLORS.length)] };
    try { localStorage.setItem("collab-identity", JSON.stringify(id)); } catch (e) {}
  }
  return id;
}
const me = getIdentity();

const TOOLBAR_OPTIONS = [
  [{ header: [1, 2, 3, false] }],
  ["bold", "italic", "underline"],
  [{ list: "ordered" }, { list: "bullet" }],
  [{ color: [] }, { background: [] }],
  ["clean"],
];

const quill = new Quill("#editor", {
  theme: "snow",
  modules: { cursors: true, toolbar: TOOLBAR_OPTIONS },
  placeholder: "Start writing…",
});
quill.disable();

async function start() {
  let token, wsUrl;
  try {
    const res = await fetch("/api/ws-token");
    if (res.status === 401) { window.location.href = "/login"; return; }
    const data = await res.json();
    token = data.token;
    wsUrl = data.wsUrl;
  } catch (e) {
    window.location.href = "/login";
    return;
  }

  const ydoc = new Y.Doc();
  const provider = new WebsocketProvider(wsUrl, documentId, ydoc, { params: { token } });
  provider.awareness.setLocalStateField("user", { name: me.name, color: me.color });

  const ytext = ydoc.getText("quill");
  const binding = new QuillBinding(ytext, quill, provider.awareness);

  let enabled = false;
  const enable = () => { if (!enabled) { enabled = true; quill.enable(); } };
  provider.on("status", (e) => console.log("[yjs] connection:", e.status));
  provider.once("sync", enable);
  setTimeout(enable, 2000);
}
start();
