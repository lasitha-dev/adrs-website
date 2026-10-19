# ADRS research showcase

A concise, responsive research website for SLIIT group **R26-SE-013**. It uses plain HTML, CSS and JavaScript and needs no backend or build tool.

Live website (Vercel): [View ADRS](https://adrs-website-coral.vercel.app/)

Source repository: [lasitha-dev/adrs-website](https://github.com/lasitha-dev/adrs-website)

Existing Sites showcase: [View ADRS on Sites](https://adrs-research-r26.cheekycedar16.chatgpt.site)

The website presents the overall project, its four components, a research journey, four component dashboards, the searchable document archive, technology stack, team and contact form. Research Gaps, Literature Review and Methodology open as short, keyboard-accessible dialogs with links to the supplied PDFs. The forest green and warm paper theme preserves the agricultural and clinical character of the original draft. Technical evidence sits in expandable panels to keep the page readable.

## Contact email setup (Web3Forms)

The contact form is integrated with Web3Forms and **configured with the public access key supplied for the receiving inbox**. Before relying on it, submit a test message and check that inbox. If you need to replace the key or change the destination, follow these steps. An empty key shows an unavailable message and does not send a request or claim success.

1. Visit [Web3Forms](https://web3forms.com/), create a form/access key using the email address that should receive ADRS enquiries, and complete the email verification steps.
2. In `js/config.js`, replace the empty `CONTACT.accessKey` string with that form's public access key:

   ```js
   "CONTACT": {
     "accessKey": "YOUR_WEB3FORMS_ACCESS_KEY",
     "subject": "New enquiry from the ADRS research website"
   },
   ```

3. Save and preview with `python -m http.server 8765 --bind 127.0.0.1`. Open `http://127.0.0.1:8765/#contact`, enter a test name, your email and a clearly marked test message, then send it.
4. Verify that the receiving inbox gets the email (check spam too). Use **Reply** to confirm it addresses the visitor's email. A successful API response alone does not verify inbox delivery.
5. Publish through the existing Vercel/GitHub workflow described below and repeat the check on the production website. If your Web3Forms form restricts allowed domains, include each production host where you use this form.

Web3Forms determines the recipient from the access key; an additional recipient email field is unnecessary. The access key is intended for frontend use and will be visible in the page's JavaScript. Do not use an account password, private API token or SMTP credential. No backend, `.env` loader or paid email server is needed for this basic integration. See the official [setup guide](https://docs.web3forms.com/getting-started/installation) and [API reference](https://docs.web3forms.com/getting-started/api-reference).

The form validates required fields and email format, includes a hidden honeypot, blocks duplicate submissions while sending, and displays success only after Web3Forms confirms it. Failures and timeouts preserve the visitor's message. Browser checks use simulated responses; live inbox delivery remains unverified until a message is submitted and received using the configured key.

## Research summaries and tech stack

Edit `CONFIG.RESEARCH_TOPICS` in `js/config.js` to update the three popup summaries and their PDF page links. The gaps follow group-report chapter 3; the literature summaries follow chapter 2 of each individual thesis; the methodology follows the documented component workflows and evaluation limits. Keep the distinction between simulated wellness evaluation, retrospective spatial ranking and clinically validated deployment.

Edit `CONFIG.TECH_STACK` to add or change technology cards. Each entry has a name, role, group and logo filename in `Images/tech/`. The current entries follow the group report's section 6.1, PDF pages 47–48, and describe the research application. The showcase itself remains plain HTML, CSS and JavaScript.

Logos are stored locally, so viewing the technology section does not depend on an image CDN. Eleven logos come from [Devicon](https://github.com/devicons/devicon/tree/master/icons), with its license at `Images/tech/DEVICON-LICENSE.txt`. The Leaflet logo comes from [Simple Icons](https://github.com/simple-icons/simple-icons/blob/develop/icons/leaflet.svg), under [CC0](https://github.com/simple-icons/simple-icons/blob/develop/LICENSE.md). Names and logos remain the property of their respective owners. Include new local logo files when staging changes for publication.

## Content and evidence

The component summaries follow **Final_Thesis_Draft.pdf** (Common Integrated Solution Report) and the four supplied individual theses, dated October 2026. Component numbering follows sections 3.3–3.6 of the group report:

1. AI Smart Diagnosis — A.L.M. Athulathmudali
2. Persistent Health Anomaly and Body Condition Scoring — W.M.P.J. Wijenayake
3. Geospatial Clustering and Trajectory Mapping — G.A. Sandaru
4. Climate-Informed Livestock Disease Forecasting — S.S. Kumarasinghe

The research paper reports different evaluation versions and scopes from the theses. Its figures are not merged with the current component results. The website retains the limits of engineered/simulated wellness evaluation, retrospective geospatial ranking and future estimates based on historical climate proxies. The geospatial thesis reports a mean target percentile of 73.85 (95% interval 70.51–77.11), with limited spatial coverage and partial evaluation-cohort exposure before final model selection; this is not validated future transmission prediction.

The four original screenshots in `UI Dashboards/` are displayed without cropping, with keyboard-accessible tabs and a full-size dialog. Screen outputs are examples, not performance metrics or current official advisories. The smart-diagnosis copy follows the thesis's ResNet50 mask head rather than adopting the screenshot's Mask R-CNN label. The old animated background script is retained but is no longer loaded.

## Documents

The archive contains **14 original research documents**: 11 PDFs, two PPTX files and one ODP file. They are grouped and searchable by title, researcher, component and research stage. PDFs have View and Download actions; presentations download in their original formats.

| Group | Original location | Contents |
| --- | --- | --- |
| Featured group thesis | `Final_Thesis_Draft.pdf` | 90-page Common Integrated Solution Report, labelled Draft PDF |
| Research paper | `A_Multi_Stage_Artificial_Intelligence_Framework_for_Proactive_Livestock_Health_Monitoring_and_Outbreak_Surveillance.pdf` | Six-page paper with its full title and six authors |
| Individual theses | `Individual Thesis/` | Four component theses, ordered 01–04 |
| Research proposals | `Proposals/` | Four component proposals, dated March 2026 |
| Presentations | `Presentations/` | Proposal (PPTX, 36 slides), progress I (ODP, 23 slides), progress II (PPTX, 12 slides) |
| Topic assessment | `Topic Assessment Form.pdf` | 19-page group assessment form |

The existing `docs/Group_Thesis_Completed.docx` remains a secondary download; it is a separate supplied revision from the draft PDF. The paper is presented without an unverified venue, acceptance status, DOI or publication date. Printed document months are distinguished from submission dates.

Original filenames and bytes are retained. The proposal presentation is approximately 69.83 MiB, so visitors see its size before downloading. Documents and presentations are fetched only when requested. Generated sample PDFs remain excluded from Git and publication.

To add another approved document:

1. Put the original in `docs/` or the appropriate existing research folder.
2. Add its metadata to `CONFIG.DELIVERABLES` in `js/config.js`, following the existing entries. Keep relative paths in their original spelling; the renderer encodes them for links.
3. Track the file with `git add`. New root-level files or new folders also need an entry in `ROOT_FILES` or `ASSET_DIRECTORIES` in `scripts/build-site.py` for the GitHub Pages mirror.
4. Include its direct link in the archive's `noscript` fallback in `index.html`.
5. If also publishing through Sites, update the separate asset list in `scratch/prepare-hosting.ps1`.

Use confirmed dates, publication details and original files. Raw farm locations and clinical datasets should not be added to this public-facing archive.

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

## Git and Vercel deployment

This project uses the `main` branch in the public repository [lasitha-dev/adrs-website](https://github.com/lasitha-dev/adrs-website). The primary live website is hosted on Vercel:

**https://adrs-website-coral.vercel.app/**

For automatic updates, keep the Vercel project connected to this repository, set `main` as its production branch, and keep `adrs-website-coral.vercel.app` assigned to Production. These settings are available in the project's Git, Environments and Domains settings.

With that configuration, pushing to `main` triggers a production deployment. After it succeeds, Vercel serves the updated website at the **same production URL**. Ordinary code changes do not change that address. Preserve the existing Vercel project and domain assignment to keep the link stable.

Vercel also generates individual deployment and preview URLs. Share the production link above as the website's permanent address. See [Vercel's production deployment documentation](https://vercel.com/docs/deployments/environments#production-environment) and [URL documentation](https://vercel.com/docs/deployments/generated-urls).

To publish changes from this folder:

```powershell
git add .
git commit -m "Update research website"
git push
```

Check the Vercel project's **Deployments** tab for progress. This static website uses plain HTML, CSS and JavaScript and requires no framework build step.

## GitHub Pages mirror

The existing GitHub Pages deployment is also available at [https://lasitha-dev.github.io/adrs-website/](https://lasitha-dev.github.io/adrs-website/).

Every push to `main` also runs `.github/workflows/deploy-pages.yml`, checks JavaScript syntax, packages the tracked website assets, and updates this mirror. GitHub Pages uses **GitHub Actions** as its publishing source; this workflow operates separately from Vercel's Git integration. Check the repository's **Actions** tab for progress.

To package and preview the same files that GitHub Pages deploys:

```powershell
python scripts/build-site.py
python -m http.server 8765 --bind 127.0.0.1 --directory _site
```

Open `http://127.0.0.1:8765/`. The packager includes `index.html`, the three named root PDFs, and tracked files in `css/`, `js/`, `Images/`, `docs/`, `Individual Thesis/`, `Proposals/`, `Presentations/`, and `UI Dashboards/`. Stage newly added assets with `git add` before running it. Build output, local Sites checkouts, scratch work, backups, credentials and generated sample documents are ignored by Git.

If you recreate the repository, select **Settings → Pages → Build and deployment → Source → GitHub Actions** before pushing the deployment workflow.

## Existing Sites hosting

The root website remains compatible with static hosting such as GitHub Pages. Publish the assets listed above, preserving relative paths and filename case. The existing Sites mirror has a separate publication list and does not automatically follow Git pushes. Keep scratch work, backups and unapproved sample files out of the publication directory.

For Sites, the dedicated publication checkout is `sites/adrs-research/`. Its `.openai/hosting.json` retains the Site identity and serves `dist/`. Run `scratch/prepare-hosting.ps1` to copy the approved asset list before using the Sites source/publishing workflow. The Site audience was set to public at the user's request.

On this Windows installation, the hosting helper needs Git Bash ahead of the WSL shell in its process `PATH`, and `TAR_OPTIONS=--force-local` so archive paths with drive letters are treated as local files. When switching from the sandbox account to the user account, scope Git's `safe.directory` exception to this exact checkout through process environment settings. No global Git configuration was changed.
