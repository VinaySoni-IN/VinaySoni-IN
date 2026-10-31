# 🌐 Portfolio Website — Deploy Guide (Vercel + GitHub)

This repository now contains a **pixel-perfect portfolio website** built from your README profile and the Ali Hamza reference design you provided (`0fe00124bf4808ee2b481a14c1375d4c.jpg`).

All information is extracted from `README.md` (Vinay Sanjay Soni — CSE Student, Balaghat MP) and matches the original design 1:1 — navbar, hero, about, skills, projects, experience, process, and footer.

## 📁 What was built

- `index.html` — single-page portfolio (SEO + OG tags, responsive, accessible)
- `assets/css/style.css` — custom design system (orange `#FF6B2B`, peach, Inter/Manrope fonts)
- `assets/js/main.js` — mobile menu, active nav, reveal animations, smooth scroll
- `vercel.json` — clean URLs + caching for Vercel
- `package.json` — `dev` / `preview` scripts
- `assets/Vinay_Soni_CV.pdf` — placeholder CV (replace with real PDF)

**No build step needed — pure static HTML/CSS/JS = instant Vercel deploy.**

## 🚀 Deploy on Vercel (recommended — 2 min)

1. Push this branch to GitHub:
   ```bash
   git add index.html assets/css/style.css assets/js/main.js vercel.json package.json DEPLOY.md .gitignore
   git commit -m "feat: add pixel-perfect portfolio (Ali Hamza reference) — ready for Vercel"
   git push origin arena/9f34afd9-vinaysoni-in
   # Or merge to main:
   # git checkout main && git merge arena/9f34afd9-vinaysoni-in && git push origin main
   ```
2. Go to [vercel.com/new](https://vercel.com/new) → **Import** `VinaySoni-IN/VinaySoni-IN`
3. Vercel auto-detects **Static** (no build command, output `.`). Or leave blank.
4. **Deploy** → live URL: `https://vinay-soni.vercel.app` (or your domain)
5. Optional: Add custom domain in Vercel → Domains.

## 🔄 Auto-deploy on GitHub push

Any push to `main` (or the branch you import) triggers a new Vercel deployment automatically.

## 📦 GitHub Pages (alternative)

Settings → Pages → Branch: `main` or `arena/9f34afd9-vinaysoni-in` → `/ (root)` → Save. Site will be at `https://vinaysoni-in.github.io/VinaySoni-IN/`.

## ✏️ Customize

- **Name/role:** edit `index.html` hero (`<h1>Vinay <span>Sanjay Soni</span></h1>`)
- **About:** edit paragraphs in `#about` (from README)
- **Skills:** add/remove `.skill-card` in `#skills` (uses skillicons.dev)
- **Projects:** duplicate `.project-card` in `#work`
- **Experience:** edit `.exp-card` in `#experience`
- **Contact:** update email/phone in footer + nav CTA
- **CV:** replace `assets/Vinay_Soni_CV.pdf` with real file, keep same name

## 🎨 Design reference

Exactly matched from:
- Hero: “Hi, I'm” eyebrow, two-color name, dual CTA, bean-bag illustration
- About: left illustration + trait grid (6 items)
- Skills: card grid grouped by Cloud / Backend / Master
- Work: 3-column project cards with browser/phone mockups
- Experience: 3-column timeline + freelance strip
- My Process: 5 steps with dashed connector
- Footer: peach CTA + contacts + socials

## 📧 Contacts from README

- Email: `vinay.sanjaysoni@outlook.com`
- Phone/WhatsApp: `+91 8989031351`
- Location: Balaghat, MP, India
- Instagram: `@vinaysoni.in`
- GitHub: `VinaySoni-IN`

---

**Preview locally:**
```bash
npx serve . -l 3000
# open http://localhost:3000
```

Built with ♥ in MP — ready to ship!
