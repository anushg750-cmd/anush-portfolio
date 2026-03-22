# 🛡️ Anush G — Complete Portfolio Setup Guide
# BCA Cybersecurity | Modern Web Development Workflow

---

## 📁 YOUR FOLDER STRUCTURE

```
my-portfolio/
├── index.html              ← Main website
├── style.css               ← All styling
├── script.js               ← JavaScript
├── .gitignore              ← Files Git should ignore
├── .github/
│   └── workflows/
│       └── deploy.yml      ← CI/CD pipeline (auto-runs on push)
└── backend/
    ├── server.js           ← Node.js + Express API
    ├── package.json        ← Backend dependencies
    └── .env.example        ← Template for environment variables
```

---

## STEP 1 — INSTALL GIT ON WINDOWS

1. Go to: https://git-scm.com/download/windows
2. Download and install (click Next on everything — defaults are fine)
3. Open **Command Prompt** or **PowerShell** and verify:

```
git --version
```
You should see something like: `git version 2.43.0`

4. Set up your identity (Git needs this for commits):

```
git config --global user.name "Anush G"
git config --global user.email "your@email.com"
```

---

## STEP 2 — CREATE YOUR PROJECT FOLDER

Open PowerShell or Command Prompt and type:

```
mkdir my-portfolio
cd my-portfolio
```

Now copy all the files from this project into `my-portfolio/` folder.
Make sure your folder looks exactly like the structure above.

---

## STEP 3 — INITIALIZE GIT AND MAKE FIRST COMMIT

Inside `my-portfolio/` folder, type these commands ONE BY ONE:

```
git init
git add .
git commit -m "Initial commit: cybersecurity portfolio"
```

You should see a message like: `[main (root-commit) abc1234] Initial commit`

---

## STEP 4 — CREATE GITHUB REPOSITORY

1. Go to: https://github.com
2. Click the **+** button → **New repository**
3. Name it: `my-portfolio` (must match your folder name)
4. Make it **Public** ← Important for GitHub Pages!
5. Do NOT check "Add README" (we already have our files)
6. Click **Create repository**

GitHub will show you commands. Copy the ones under **"…or push an existing repository"** — they look like:

```
git remote add origin https://github.com/YOUR_USERNAME/my-portfolio.git
git branch -M main
git push -u origin main
```

Type these in your terminal. When asked for password, use a **Personal Access Token**:
- GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic) → Generate new token
- Check: `repo` scope → Generate → Copy the token → Paste it as password

---

## STEP 5 — ENABLE GITHUB PAGES

1. Go to your repo on GitHub
2. Click **Settings** tab
3. Click **Pages** in the left sidebar
4. Under **Source**, select **Branch: gh-pages** → **/ (root)**
5. Click **Save**

Your site will be live at:
**https://YOUR_USERNAME.github.io/my-portfolio**

(It may take 2-3 minutes the first time)

---

## STEP 6 — CI/CD PIPELINE (AUTOMATIC!)

Every time you push code to GitHub, the pipeline in `.github/workflows/deploy.yml` runs automatically. It:

1. ✅ Lints your HTML for errors
2. ✅ Checks all required files exist
3. ✅ Verifies backend syntax
4. ✅ Deploys frontend to GitHub Pages

To see it running:
- Go to your GitHub repo → Click **Actions** tab
- You'll see your pipeline running in real-time!

---

## STEP 7 — BACKEND SETUP (Node.js + Express)

### Install Node.js
1. Go to: https://nodejs.org
2. Download **LTS version** (e.g., 20.x)
3. Install it (click Next on everything)
4. Verify: `node --version` and `npm --version`

### Set up backend locally
```
cd my-portfolio/backend
npm install
```

Create your `.env` file (copy from example):
```
copy .env.example .env
```

Open `.env` in VS Code and fill in your database URL (you get this from Render in the next step).

---

## STEP 8 — DEPLOY BACKEND ON RENDER.COM

### Create PostgreSQL Database on Render
1. Go to: https://render.com → Sign up (free)
2. Click **New +** → **PostgreSQL**
3. Name: `portfolio-db`
4. Click **Create Database**
5. Copy the **External Database URL** — looks like:
   `postgresql://user:password@host:5432/dbname`

### Deploy Node.js Server on Render
1. Click **New +** → **Web Service**
2. Connect your GitHub account
3. Select your `my-portfolio` repository
4. Settings:
   - **Name**: `portfolio-backend`
   - **Root Directory**: `backend`
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `node server.js`
5. Click **Advanced** → **Add Environment Variable**:
   - Key: `DATABASE_URL`
   - Value: (paste the PostgreSQL URL from above)
   - Add another: `NODE_ENV` = `production`
6. Click **Create Web Service**

Your backend URL will be: **https://portfolio-backend.onrender.com**

---

## STEP 9 — CONNECT FRONTEND TO BACKEND

Open `script.js` in VS Code.

Find this line (around line 60):
```javascript
const BACKEND_URL = "https://your-backend.onrender.com/api/contact";
```

Replace with your actual Render URL:
```javascript
const BACKEND_URL = "https://portfolio-backend.onrender.com/api/contact";
```

Also update `server.js` in the CORS section:
```javascript
origin: ['https://YOUR_USERNAME.github.io']
```
Replace `YOUR_USERNAME` with your actual GitHub username.

Then push your changes:
```
git add .
git commit -m "Connect frontend to backend API"
git push
```

CI/CD will automatically redeploy your frontend!

---

## STEP 10 — TEST EVERYTHING

1. Visit your live site: `https://YOUR_USERNAME.github.io/my-portfolio`
2. Fill out the contact form and submit
3. Check your Render dashboard → your backend logs should show: `[+] New contact from...`
4. Visit: `https://portfolio-backend.onrender.com/api/contacts` to see all messages in the database!

---

## 🔄 DAILY WORKFLOW (After Setup)

Whenever you make changes to your portfolio:

```
git add .
git commit -m "Describe what you changed"
git push
```

That's it! GitHub Actions will automatically:
- Run tests and lint your code
- Deploy updates to GitHub Pages
- Everything happens in the cloud!

---

## 📌 QUICK REFERENCE

| Thing           | URL / Command                                    |
|-----------------|--------------------------------------------------|
| Live website    | https://YOUR_USERNAME.github.io/my-portfolio     |
| Backend API     | https://portfolio-backend.onrender.com           |
| All contacts    | https://portfolio-backend.onrender.com/api/contacts |
| GitHub repo     | https://github.com/YOUR_USERNAME/my-portfolio    |
| CI/CD pipeline  | GitHub repo → Actions tab                       |
| Git commit      | `git add . && git commit -m "msg" && git push`   |

---

## 🆘 COMMON PROBLEMS

**"git is not recognized"** → Restart your terminal after installing Git

**"Permission denied" on push** → Use Personal Access Token as password

**GitHub Pages shows 404** → Wait 3 minutes, check Settings → Pages

**Backend not working** → Check Render logs, verify DATABASE_URL environment variable

**CORS error in browser** → Update the `origin` array in server.js with your exact GitHub Pages URL

---

Built following HOD's Modern Web Development Workflow:
Local Git → GitHub → CI/CD → Hosting (GitHub Pages + Render) → Web Browser ✅
