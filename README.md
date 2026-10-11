# ADRS research showcase

A concise, responsive research website for SLIIT group **R26-SE-013**. It uses plain HTML, CSS and JavaScript and needs no backend or build tool.

GitHub Pages: [View ADRS](https://lasitha-dev.github.io/adrs-website/)

Source repository: [lasitha-dev/adrs-website](https://github.com/lasitha-dev/adrs-website)

Existing Sites showcase: [View ADRS on Sites](https://adrs-research-r26.cheekycedar16.chatgpt.site)

The website presents the overall project, its four components, a research journey, interface concepts, the document archive and the team. The forest green and warm paper theme preserves the agricultural and clinical character of the original draft. Technical evidence sits in expandable panels to keep the page readable.

## Content and evidence

The primary source is **Group_Thesis_Completed.docx**, dated October 2026. Component numbering follows sections 3.3–3.6:

1. AI Smart Diagnosis — A.L.M. Athulathmudali
2. Persistent Health Anomaly and Body Condition Scoring — W.M.P.J. Wijenayake
3. Geospatial Clustering and Trajectory Mapping — G.A. Sandaru
4. Climate-Informed Livestock Disease Forecasting — S.S. Kumarasinghe

The thesis supersedes the older content briefs where results, numbering or evaluation status differ. For example, the current image-classification result is 90.11%, rather than 88.78%. The site retains the scope and limitations of each evaluation, including engineered/simulated wellness data, retrospective spatial scores and historical climate proxies. No unverified submission dates or awards are shown.

The supplied UI images are presented as **interface concepts with illustrative values**, rather than evidence of live performance. The old animated background script is retained but is no longer loaded.

## Documents

The completed group thesis is downloadable from `docs/Group_Thesis_Completed.docx`, a copy of the supplied original.

The nine original PDFs were generated sample pages by `scratch/generate_pdfs.py`. They are preserved locally but are not linked as completed submissions or included in the hosted package. Other deliverables are labelled **Awaiting upload**. This refers to file availability, not whether the academic work has been completed.

To add an approved document:

1. Put the original PDF or slide deck in `docs/`.
2. Set its matching `url` in `CONFIG.DELIVERABLES` in `js/config.js`, for example `docs/ADRS_Project_Proposal.pdf`.
3. Track the approved file with `git add docs/<filename>`. GitHub Pages packages tracked files in `docs/` automatically. The generated sample filenames are ignored; use a different descriptive filename for approved originals.
4. When also publishing through Sites, add the file's relative path to the asset list in `scratch/prepare-hosting.ps1`.

Use only confirmed dates, publication details and original files. Raw farm locations and clinical datasets should not be added to this public-facing archive.

## Editing

- `index.html`: overview, research journey, archive introduction and page structure.
- `js/config.js`: component descriptions, methods, evidence, limitations, team and deliverables.
- `css/style.css`: colours, typography, layout and responsive styling.
- `js/main.js`: mobile navigation, document filtering, image tabs and accessible image dialog.

The prior draft is backed up in `scratch/draft-backup/`.

## Local preview

Run from this folder:

```powershell
python -m http.server 8765 --bind 127.0.0.1
```

Open `http://127.0.0.1:8765/`. JavaScript syntax checks:

```powershell
node --check js/config.js
node --check js/main.js
```

## Git and GitHub Pages

This project uses the `main` branch. The public repository is `lasitha-dev/adrs-website`, and GitHub Pages uses **GitHub Actions** as its publishing source.

Every push to `main` runs `.github/workflows/deploy-pages.yml`, checks JavaScript syntax, packages the tracked website assets, and deploys them to:

**https://lasitha-dev.github.io/adrs-website/**

The URL stays the same when you edit files, commit, and push. Keep the GitHub account name and repository name unchanged to preserve this address. Deployment updates can take a few minutes; check the repository's **Actions** tab for progress.

To publish changes from this folder:

```powershell
git add .
git commit -m "Update research website"
git push
```

To package and preview the same files that GitHub Pages deploys:

```powershell
python scripts/build-site.py
python -m http.server 8765 --bind 127.0.0.1 --directory _site
```

Open `http://127.0.0.1:8765/`. The packager includes `index.html` and tracked files in `css/`, `js/`, `Images/`, and `docs/`. Stage newly added assets with `git add` before running it. Build output, local Sites checkouts, scratch work, backups, credentials and generated sample documents are ignored by Git.

If you recreate the repository, select **Settings → Pages → Build and deployment → Source → GitHub Actions** before pushing the deployment workflow.

## Existing Sites hosting

The root website remains compatible with static hosting such as GitHub Pages. Publish `index.html`, `css/`, `js/config.js`, `js/main.js`, the referenced `Images/` assets and approved `docs/` files. Keep scratch work, backups and unapproved sample files out of the publication directory.

For Sites, the dedicated publication checkout is `sites/adrs-research/`. Its `.openai/hosting.json` retains the Site identity and serves `dist/`. Run `scratch/prepare-hosting.ps1` to copy the approved asset list before using the Sites source/publishing workflow. The Site audience was set to public at the user's request.

On this Windows installation, the hosting helper needs Git Bash ahead of the WSL shell in its process `PATH`, and `TAR_OPTIONS=--force-local` so archive paths with drive letters are treated as local files. When switching from the sandbox account to the user account, scope Git's `safe.directory` exception to this exact checkout through process environment settings. No global Git configuration was changed.
