// ===== TYPED TERMINAL EFFECT =====
const commands = [
  "whoami",
];
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
const typedEl = document.getElementById("typed-text");
const outputEl = document.getElementById("hero-output");

function typeCommand() {
  const cmd = commands[0];
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

window.addEventListener("load", () => setTimeout(typeCommand, 600));

// ===== PHOTO UPLOAD =====
const photoUpload = document.getElementById("photo-upload");
const uploadedPhoto = document.getElementById("uploaded-photo");
const photoPlaceholder = document.getElementById("photo-placeholder");

photoUpload.addEventListener("change", (e) => {
  const file = e.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = (ev) => {
    uploadedPhoto.src = ev.target.result;
    uploadedPhoto.style.display = "block";
    photoPlaceholder.style.display = "none";
  };
  reader.readAsDataURL(file);
});

// ===== SKILL BARS ON SCROLL =====
function animateBars() {
  document.querySelectorAll(".bar-fill").forEach(bar => {
    const rect = bar.getBoundingClientRect();
    if (rect.top < window.innerHeight) {
      bar.style.width = bar.dataset.w + "%";
    }
  });
}
window.addEventListener("scroll", animateBars);
// Also trigger on load after a short delay
setTimeout(animateBars, 500);

// ===== COUNTER ANIMATION =====
function animateCounters() {
  document.querySelectorAll(".stat-num").forEach(el => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight - 50 && !el.dataset.done) {
      el.dataset.done = "1";
      const target = parseInt(el.dataset.count);
      let current = 0;
      const step = Math.ceil(target / 30);
      const timer = setInterval(() => {
        current += step;
        if (current >= target) { current = target; clearInterval(timer); }
        el.textContent = current;
      }, 40);
    }
  });
}
window.addEventListener("scroll", animateCounters);
animateCounters();

// ===== NAVBAR ACTIVE LINK =====
const sections = document.querySelectorAll("section[id]");
window.addEventListener("scroll", () => {
  const scrollY = window.scrollY + 100;
  sections.forEach(sec => {
    const top = sec.offsetTop;
    const height = sec.offsetHeight;
    const id = sec.getAttribute("id");
    const link = document.querySelector(`.nav-links a[href="#${id}"]`);
    if (link) {
      if (scrollY >= top && scrollY < top + height) {
        link.style.color = "var(--green)";
      } else {
        link.style.color = "";
      }
    }
  });
});

// ===== CONTACT FORM =====
const form = document.getElementById("contactForm");
const statusEl = document.getElementById("form-status");

// *** REPLACE THIS URL with your actual Render.com backend URL after deployment ***
const BACKEND_URL = "https://your-backend.onrender.com/api/contact";

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const btn = form.querySelector(".submit-btn");
  btn.disabled = true;
  btn.querySelector(".btn-text").textContent = "SENDING...";
  statusEl.style.display = "none";

  const data = {
    name: document.getElementById("fname").value,
    email: document.getElementById("femail").value,
    subject: document.getElementById("fsubject").value,
    message: document.getElementById("fmessage").value,
  };

  try {
    const res = await fetch(BACKEND_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    const json = await res.json();
    if (res.ok) {
      statusEl.className = "form-status success";
      statusEl.textContent = "[+] Message sent successfully! I'll get back to you soon.";
      form.reset();
    } else {
      throw new Error(json.error || "Server error");
    }
  } catch (err) {
    statusEl.className = "form-status error";
    statusEl.textContent = "[!] Error: " + err.message + " — Try emailing directly.";
  } finally {
    statusEl.style.display = "block";
    btn.disabled = false;
    btn.querySelector(".btn-text").textContent = "SEND MESSAGE";
  }
});

// ===== CARD HOVER GLOW =====
document.querySelectorAll(".project-card, .stat-card, .wf-step").forEach(card => {
  card.addEventListener("mousemove", (e) => {
    const rect = card.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    card.style.setProperty("--mx", x + "%");
    card.style.setProperty("--my", y + "%");
  });
});
