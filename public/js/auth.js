const form = document.getElementById("auth-form");
const msg = document.getElementById("msg");
const endpoint = form.getAttribute("data-endpoint");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  msg.textContent = "";
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;
  const btn = form.querySelector("button");
  btn.disabled = true;
  try {
    const res = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json().catch(() => ({}));
    if (res.ok) {
      window.location.href = "/";
    } else {
      msg.textContent = data.error || "Something went wrong.";
      btn.disabled = false;
    }
  } catch (err) {
    msg.textContent = "Network error. Try again.";
    btn.disabled = false;
  }
});
