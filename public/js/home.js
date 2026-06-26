document.getElementById("new-doc-btn").addEventListener("click", () => {
  const id = Math.random().toString(36).substring(2, 10);
  window.location.href = "/" + id;
});

function openByName() {
  const raw = document.getElementById("doc-name").value.trim();
  if (!raw) return;
  window.location.href = "/" + encodeURIComponent(raw);
}
document.getElementById("open-btn").addEventListener("click", openByName);
document.getElementById("doc-name").addEventListener("keydown", (e) => {
  if (e.key === "Enter") openByName();
});

function timeAgo(iso) {
  const diff = Date.now() - new Date(iso).getTime();
  const min = Math.round(diff / 60000);
  if (min < 1) return "just now";
  if (min < 60) return min + " min ago";
  const hr = Math.round(min / 60);
  if (hr < 24) return hr + (hr === 1 ? " hour ago" : " hours ago");
  const day = Math.round(hr / 24);
  return day + (day === 1 ? " day ago" : " days ago");
}

const DOC_ICON =
  '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/></svg>';

async function loadUser() {
  const area = document.getElementById("user-area");
  try {
    const res = await fetch("/api/me");
    if (res.status === 401) { window.location.href = "/login"; return; }
    const { email } = await res.json();
    area.innerHTML = "";
    const who = document.createElement("span");
    who.textContent = email;
    const out = document.createElement("button");
    out.className = "logout";
    out.textContent = "Log out";
    out.addEventListener("click", async () => {
      await fetch("/api/logout", { method: "POST" });
      window.location.href = "/login";
    });
    area.appendChild(who);
    area.appendChild(out);
  } catch (e) {}
}

async function loadRecent() {
  const list = document.getElementById("recent-list");
  try {
    const res = await fetch("/api/documents");
    if (res.status === 401) { window.location.href = "/login"; return; }
    const docs = await res.json();
    if (!docs.length) {
      list.innerHTML = '<li class="muted">No documents yet — create one above to get started.</li>';
      return;
    }
    list.innerHTML = "";
    for (const doc of docs) {
      const li = document.createElement("li");
      li.className = "doc-row";
      const link = document.createElement("a");
      link.className = "doc-link";
      link.href = "/" + encodeURIComponent(doc._id);
      const ico = document.createElement("span");
      ico.className = "doc-ico";
      ico.innerHTML = DOC_ICON;
      const name = document.createElement("span");
      name.className = "doc-name";
      name.textContent = doc._id;
      link.appendChild(ico);
      link.appendChild(name);
      const when = document.createElement("span");
      when.className = "doc-when";
      when.textContent = timeAgo(doc.updatedAt);
      li.appendChild(link);
      li.appendChild(when);
      list.appendChild(li);
    }
  } catch (err) {
    list.innerHTML = '<li class="muted">Couldn\'t load your documents. Refresh to try again.</li>';
  }
}

loadUser();
loadRecent();
