// ===== TYPED TERMINAL EFFECT =====
const outputLines = [
  { text: "anush_g — BCA Cybersecurity Student", cls: "out-green" },
  { text: "Location  : India", cls: "out-line" },
  { text: "Focus     : Ethical Hacking & Secure Web Dev", cls: "out-line" },
  { text: "Status    : Open for internships & projects", cls: "out-yellow" },
  { text: "", cls: "out-line" },
  { text: "[+] Skills loaded", cls: "out-green" },
  { text: "[+] Projects compiled", cls: "out-green" },
  { text: "[*] Contact form active", cls: "out-cyan" },
];

let charIndex = 0;
let lineIndex = 0;

window.addEventListener("load", () => {
  const typedEl = document.getElementById("typed-text");
  const outputEl = document.getElementById("hero-output");
  if (!typedEl || !outputEl) return;

  function typeCommand() {
    const cmd = "whoami";
    if (charIndex < cmd.length) {
      typedEl.textContent += cmd[charIndex];
      charIndex++;
      setTimeout(typeCommand, 80);
    } else {
      setTimeout(showOutput, 300);
    }
  }

  function showOutput() {
    if (lineIndex < outputLines.length) {
      const span = document.createElement("span");
      span.className = outputLines[lineIndex].cls;
      span.textContent = outputLines[lineIndex].text;
      outputEl.appendChild(span);
      lineIndex++;
      setTimeout(showOutput, 120);
    }
  }

  setTimeout(typeCommand, 600);
});

// ===== SKILL BARS =====
function animateBars() {
  document.querySelectorAll(".bar-fill").forEach(bar => {
    if (bar.getBoundingClientRect().top < window.innerHeight) {
      bar.style.width = bar.dataset.w + "%";
    }
  });
}
window.addEventListener("scroll", animateBars);
setTimeout(animateBars, 500);

// ===== COUNTERS =====
function animateCounters() {
  document.querySelectorAll(".stat-num").forEach(el => {
    if (el.getBoundingClientRect().top < window.innerHeight && !el.dataset.done) {
      el.dataset.done = "1";
      const target = parseInt(el.dataset.count);
      let current = 0;
      const timer = setInterval(() => {
        current += Math.ceil(target / 30);
        if (current >= target) { current = target; clearInterval(timer); }
        el.textContent = current;
      }, 40);
    }
  });
}
window.addEventListener("scroll", animateCounters);
animateCounters();

// ===== NAVBAR =====
window.addEventListener("scroll", () => {
  const scrollY = window.scrollY + 100;
  document.querySelectorAll("section[id]").forEach(sec => {
    const link = document.querySelector(`.nav-links a[href="#${sec.getAttribute("id")}"]`);
    if (link) {
      link.style.color = (scrollY >= sec.offsetTop && scrollY < sec.offsetTop + sec.offsetHeight)
        ? "var(--green)" : "";
    }
  });
});

// ===== CONTACT FORM =====
const BACKEND_URL = "https://portfolio-backend-n600.onrender.com/api/contact";

const form = document.getElementById("contactForm");
if (form) {
  const statusEl = document.getElementById("form-status");
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const btn = form.querySelector(".submit-btn");
    btn.disabled = true;
    btn.querySelector(".btn-text").textContent = "SENDING...";
    statusEl.style.display = "none";
    try {
      const res = await fetch(BACKEND_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: document.getElementById("fname").value,
          email: document.getElementById("femail").value,
          subject: document.getElementById("fsubject").value || "No subject",
          message: document.getElementById("fmessage").value,
        }),
      });
      const json = await res.json();
      if (res.ok) {
        statusEl.className = "form-status success";
        statusEl.textContent = "[+] Message sent! I'll get back to you soon.";
        form.reset();
      } else {
        throw new Error(json.error || "Server error");
      }
    } catch (err) {
      statusEl.className = "form-status error";
      statusEl.textContent = "[!] Failed: " + err.message;
    } finally {
      statusEl.style.display = "block";
      btn.disabled = false;
      btn.querySelector(".btn-text").textContent = "SEND MESSAGE";
    }
  });
}
