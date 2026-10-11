# ADRS documents and component dashboards: implementation plan

This plan is based on the newly supplied files and the current static website. It covers the document archive, component screenshots, related research copy, and deployment packaging. The approved changes are implemented and have passed local acceptance checks: all 14 original documents and four dashboard images resolve, filters/search and component links work, keyboard tabs/dialogs work, and layouts fit 360–1440 px viewports. Publication uses the existing Git-connected Vercel project and GitHub Pages workflow.

## 1. What is available

There are **14 new research files: 11 PDFs, two PPTX presentations, and one ODP presentation**, plus four dashboard screenshots. The existing group-report DOCX can remain available as an additional format.

| Group | Original file | Pages or slides | Size (MiB) |
| --- | --- | ---: | ---: |
| Group thesis | `Final_Thesis_Draft.pdf` | 90 pages | 1.90 |
| Research paper | `A_Multi_Stage_Artificial_Intelligence_Framework_for_Proactive_Livestock_Health_Monitoring_and_Outbreak_Surveillance.pdf` | 6 pages | 0.49 |
| Assessment | `Topic Assessment Form.pdf` | 19 pages | 0.99 |
| Individual thesis: smart diagnosis | `Individual Thesis/Individual Thesis Smart Diagnosis.pdf` | 85 pages | 1.63 |
| Individual thesis: wellness and BCS | `Individual Thesis/Individual Thesis Wellness Triage.pdf` | 58 pages | 8.99 |
| Individual thesis: geospatial analysis | `Individual Thesis/Individual Thesis Geospatial Clustering.pdf` | 61 pages | 2.31 |
| Individual thesis: climate-informed risk | `Individual Thesis/Individual Thesis Seasonal Forecasting.pdf` | 91 pages | 1.64 |
| Proposal: smart diagnosis | `Proposals/Computer Vision (Smart Diagnosis) Proposal.pdf` | 38 pages | 1.37 |
| Proposal: wellness and BCS | `Proposals/Wellness Triage Proposal.pdf` | 35 pages | 3.89 |
| Proposal: geospatial analysis | `Proposals/Real-Time Geospatial Clustering & Trajectory Mapping Proposal.pdf` | 42 pages | 1.88 |
| Proposal: climate-informed risk | `Proposals/Seasonal Forecasting Proposal.pdf` | 44 pages | 1.73 |
| Proposal presentation | `Presentations/Proposal Presentation.pptx` | 36 slides | 69.83 |
| Progress presentation I | `Presentations/ADRS Presentation-PP1.odp` | 23 slides | 25.16 |
| Progress presentation II | `Presentations/ADRS Presentation-PP2.pptx` | 12 slides | 20.97 |

The proposal covers identify March 2026; the group report and individual thesis covers identify October 2026. These are document dates, not proof of exact submission dates. The assessment form's template revision date must not be presented as the team's submission date.

The group PDF is titled **Common Integrated Solution Report**, and its filename includes `Draft`. Keep that version distinction visible unless the user confirms that this file is the final version despite its filename. Retain the original file bytes and filenames.

The research paper's title is **A Multi-Stage Artificial Intelligence Framework for Proactive Livestock Health Monitoring and Outbreak Surveillance**. Its author list includes the four researchers, Dilani Lunugalage and Eishan Weerasinghe. Present it as a research paper; do not infer a publication venue, acceptance status, DOI or publication date from its formatting.

## 2. Research archive design

Preserve the existing forest-green and warm-paper visual style. Make the available research files visible without requiring visitors to open the current archive accordion.

### Featured group report

Use the group PDF as the prominent featured report, with its proper title, a short description, PDF badge, 90-page count, file size, and document month. Provide **View PDF** and **Download PDF** actions. Keep the existing DOCX as a secondary format, clearly labelled as the existing document rather than assuming it is byte-for-byte the same revision as the new PDF.

### Categorized archive

Place the remaining 13 files beneath the featured report in five clear groups:

1. **Research paper**: the six-page paper, with its full title, authors, a concise summary, PDF badge, page count and file size. Give it a prominent entry with **View PDF** and **Download PDF** actions immediately below the group report.
2. **Individual theses**: four documents, ordered by component 01–04.
3. **Research proposals**: four documents, in the same component order.
4. **Presentations**: proposal, progress presentation I, progress presentation II.
5. **Topic assessment**: the supplied group assessment form.

Provide category filters and search by document title, component, researcher, and research stage. Each entry should show a readable title, associated researcher or group, format, page/slide count, size, and available document date. Display an empty-search message and an accessible result count.

Use compact, well-spaced document rows on desktop, with actions and metadata stacked on narrow screens. Keep the featured report visually distinct and the research paper easy to find. Avoid fourteen oversized cover cards that would make the single-page website unnecessarily long.

For PDFs, offer an explicit View action that opens the file in a new tab, plus Download. For PPTX and ODP, provide downloads with their actual formats visible; do not promise browser slide playback. Preserve submitted originals without converting or recompressing them. Load only small presentation/document icons or cover previews with the page, never the entire documents.

Replace the current main archive's unavailable placeholders with the supplied originals. Generated sample PDFs remain excluded. Do not invent missing progress decks, poster files, publication details, or submission dates.

## 3. Four components and their dashboards

The current component cards have no screenshots. The screenshots are in the following application section, which currently has only three tabs. Bring that gallery into the component presentation and replace its images and labels with four tabs matching the four research components.

| Component | Researcher | New dashboard | Related documents |
| --- | --- | --- | --- |
| 01 — AI Smart Diagnosis | A.L.M. Athulathmudali | `UI Dashboards/AI_Smart_Diagnosis.png` | Smart Diagnosis thesis and Computer Vision proposal |
| 02 — Health Monitoring & Body Condition | W.M.P.J. Wijenayake | `UI Dashboards/Wellness_Triage_BCS_analyzer.jpeg` | Wellness Triage thesis and proposal |
| 03 — Geospatial Clustering & Mapping | G.A. Sandaru | `UI Dashboards/09_National_Map_Legend_Disease_Selector_Geographic_Controls.png` | Geospatial thesis and proposal |
| 04 — Climate-Informed Outbreak Risk | S.S. Kumarasinghe | `UI Dashboards/Forecast overview - vet.png` | Seasonal Forecasting thesis and proposal |

Keep the four component cards concise, retain expandable methods/evaluation details, and add **View dashboard**, **Read thesis**, and **Read proposal** links. View dashboard should select the corresponding gallery tab and move focus to the gallery. This connects the image, researcher, and evidence without duplicating large screenshots in every card.

Make the gallery image area wider than the current small side-by-side frame. Display screenshots with their natural proportions and `object-fit: contain`; do not crop away dashboard controls or results. The climate screenshot is portrait-oriented (1190 × 1384), while the other three are landscape. Avoid fixed image dimensions that distort or clip either orientation.

Provide clear component-specific captions and alt text. Reuse the image dialog for full-size viewing, with keyboard operation, Escape-to-close, focus restoration, and scrolling for the tall forecast image. Keep the existing keyboard-accessible tabs and ensure they work on mobile. Lazy-load dashboard images and use the supplied images directly without generating replacements.

Use neutral descriptions such as "AI image-assessment dashboard" and "Veterinary district-risk overview." Screenshot confidence values, body-condition scores and district-risk percentages are example screen outputs, not research performance metrics or current official advisories.

## 4. Reconcile the evidence with the new documents

The new group PDF contains the same principal image, wellness, and district-risk figures already represented in the website. Check the component descriptions against the group report, the supplied individual theses, and the research paper before changing any research claim. Keep the group report and individual theses as the sources for the current component results, and retain source-specific evaluation context when referencing the paper.

Three specific differences need attention:

- The smart-diagnosis screenshot says **Mask R-CNN**, but the individual thesis explicitly describes a ResNet50 mask-head implementation and distinguishes it from a complete Mask R-CNN system. Preserve the documented method in the website copy; do not adopt architecture claims from screenshot labels.
- The current geospatial card says a reproducible predictive benchmark is outstanding. The new individual thesis describes a held-out **retrospective spatial-ranking evaluation**. Reconcile that wording with the reported scope and limitations; retrospective ranking must not be represented as validated future transmission prediction.
- The research paper reports figures and evaluation status that differ from the theses: for example, classifier accuracy of 88.78% versus 90.11%, segmentation IoU of 0.8245 versus the refined thesis mIoU of 0.4078, and a single-year LSD ROC-AUC of 0.3383 versus the thesis's five-fold mean of 0.6136. Do not combine these as interchangeable results or overwrite current metrics merely because the paper has been added. Distinguish document versions, evaluated datasets, metrics and validation periods; the paper also describes wellness triage as unevaluated, while the theses describe engineered/simulated evaluation.

Retain the distinction between concurrent risk nowcasting and future-period estimates based on historical climate proxies. Preserve the veterinary decision-support disclaimer and the limits of engineered/simulated wellness evaluation.

## 5. File handling and deployment

Keep the newly supplied documents in their existing folders and use explicit relative links to their real files. This preserves the user's organization and avoids duplicating large presentation files. Encode path segments correctly for spaces, parentheses and ampersands, and verify filename case for Linux hosting.

Update the publication packager to include tracked files in `Individual Thesis/`, `Presentations/`, `Proposals/`, and `UI Dashboards/`, plus the three named root PDFs: the group thesis, topic assessment form, and research paper. Keep the existing website asset directories. These folders and root PDFs are currently outside the packager's allowed paths, so merely staging the documents would not publish them to the GitHub Pages mirror. Link to the supplied paper rather than the ignored generated sample at `docs/ADRS_Research_Paper.pdf`.

Extend binary-file attributes for the presentation formats as needed. All supplied files are below GitHub's 100 MiB per-file limit, although the 69.83 MiB proposal presentation exceeds its 50 MiB warning threshold. It can be pushed through Git; keep it as an on-demand download rather than loading it during page rendering. See [GitHub's file-size documentation](https://docs.github.com/en/repositories/working-with-files/managing-large-files/about-large-files-on-github).

Update the README's document inventory, source references, and upload instructions, preserving the pending README change that identifies Vercel as the primary site. Vercel's existing production domain remains `https://adrs-website-coral.vercel.app/`.

If the existing Sites deployment is also to receive this update later, its separate publication asset list will need these files. The active implementation target is the Git-connected Vercel website and the existing GitHub Pages mirror.

## 6. Implementation order

1. Add document metadata, including the research paper's original path and full title, and component-to-document/dashboard mappings in `js/config.js`.
2. Update the archive markup/rendering in `index.html` and `js/main.js` to show the supplied files, filters, search, metadata and correct actions.
3. Replace the three-image gallery with four component dashboard tabs, connect component-card links, and update the image-dialog captions and behavior.
4. Refine the component/gallery/archive styles in `css/style.css` for desktop and mobile, keeping the current branding.
5. Reconcile the limited research-copy differences, update asset packaging and binary attributes, and finish the README inventory.
6. Preview and verify the complete change locally before committing, pushing, and checking the resulting deployments.

## 7. Acceptance checks

- Every one of the 14 new files is represented accurately and downloadable, including the research paper and PP1 in ODP format.
- The research paper appears prominently, participates in category filtering and title/author search, and its View/Download links resolve to the supplied six-page PDF.
- Paper metadata does not imply an unverified publication or acceptance, and source-dependent evaluation results remain clearly distinguished.
- PDF View links open the correct files; download links retain the supplied formats.
- Each component selects its matching dashboard and links to its own thesis and proposal.
- All four screenshots display without distortion or unintended cropping, with usable enlarged views.
- Filters/search work across titles, components and researchers, with correct counts and empty results.
- New folders and root PDFs are included in the deployment package; generated sample documents and scratch files remain excluded.
- Links with spaces and ampersands work, and deployed asset paths have exact filename case.
- Navigation, tabs, dialogs and document actions work with keyboard input and on narrow screens without horizontal overflow.
- JavaScript syntax checks pass; no document or large presentation is fetched until requested.
- The existing Vercel production address continues serving the updated website after deployment.
