/* Research evidence: supplied group report and individual theses, October 2026.
 * The research paper retains its own evaluation scope; screen values are examples. */
const CONFIG = {
  // Web3Forms public access key for the receiving inbox. See README.md for setup.
  "CONTACT": { "accessKey": "75d9a8b2-f442-45c7-86c0-c60a538a4e99", "subject": "New enquiry from the ADRS research website" },
  "RESEARCH_TOPICS": {
    "gaps": {
      "title": "Research Gaps",
      "intro": "The missing link is a clear path from a farmer’s first concern to veterinary review and wider disease surveillance.",
      "items": [
        { "title": "Everyday health needs context", "text": "A drop in milk yield can reflect heat stress or illness. Daily records, body condition and weather need to be considered together." },
        { "title": "Photographs provide only part of the evidence", "text": "Image models may struggle with unfamiliar farms, lighting and backgrounds. A predicted disease label still needs veterinary review." },
        { "title": "A map does not explain transmission", "text": "Nearby outbreak reports reveal patterns, but incomplete locations and reporting delays limit what clusters and direction arrows can tell us." },
        { "title": "Risk estimates need realistic evaluation", "text": "Disease records are sparse and uneven. Models need testing on later periods, with a clear distinction between current conditions and future estimates using historical climate." }
      ],
      "takeaway": "ADRS connects these evidence streams while keeping AI suggestions separate from confirmed clinical records.",
      "sources": [{ "label": "Group report · chapter 3", "url": "Final_Thesis_Draft.pdf", "page": 15 }]
    },
    "literature": {
      "title": "Literature Review",
      "intro": "The supplied theses review four areas of existing work. Each offers useful tools, alongside limits that shaped ADRS.",
      "items": [
        { "title": "Computer vision", "text": "Earlier work uses image classifiers, object detectors and lesion masks to assess cattle photographs. Curated image results do not establish reliability on unfamiliar farms.", "tag": "ADRS response: detect, classify and outline lesions for review." },
        { "title": "Wellness and body condition", "text": "Sensor systems and 3D cameras support monitoring, but cost can restrict smallholder use. Research on ordinary images, time-series data and heat stress supports a more accessible approach.", "tag": "ADRS response: combine photographs, daily logs and thermal context." },
        { "title": "Spatial surveillance", "text": "WAHIS and FAO EMPRES-i provide reported disease events. ST-DBSCAN groups events by place and time; distance-based scoring adds local context. Neither proves a transmission route.", "tag": "ADRS response: show traceable records and relative spatial rankings." },
        { "title": "Climate and outbreak risk", "text": "Surveillance and statistical models help identify unusual disease activity. Sparse reports, rare outbreaks and time-dependent data make validation, calibration and clear explanations essential.", "tag": "ADRS response: evaluate disease-specific district-month models over time." }
      ],
      "takeaway": "This is a short summary of the reviews in the project documents; results from different studies are not directly interchangeable.",
      "sources": [
        { "label": "Smart diagnosis · chapter 2", "url": "Individual Thesis/Individual Thesis Smart Diagnosis.pdf", "page": 21 },
        { "label": "Wellness triage · chapter 2", "url": "Individual Thesis/Individual Thesis Wellness Triage.pdf", "page": 17 },
        { "label": "Geospatial analysis · chapter 2", "url": "Individual Thesis/Individual Thesis Geospatial Clustering.pdf", "page": 15 },
        { "label": "District risk · chapter 2", "url": "Individual Thesis/Individual Thesis Seasonal Forecasting.pdf", "page": 24 }
      ]
    },
    "methodology": {
      "title": "Methodology",
      "intro": "Four research streams share one veterinary review workflow. Here is the process in five simple steps.",
      "ordered": true,
      "items": [
        { "title": "Collect and prepare evidence", "text": "Organise cattle photographs, daily health logs, historical disease reports and climate data. Check identifiers, dates, locations and source quality." },
        { "title": "Assess the individual animal", "text": "Use YOLOv8, a Vision Transformer and a ResNet50 mask head for image assessment. Combine Random Forest monitoring, image-based body condition and seven-day LSTM triage for wellness." },
        { "title": "Keep veterinary confirmation central", "text": "Present animal history and model outputs as supporting evidence. A veterinary officer reviews a suspected case before it becomes a confirmed clinical record." },
        { "title": "Explore the wider picture", "text": "Use event clusters and distance-based spatial rankings for geographic context. Estimate district-month FMD and LSD risk using disease-specific statistical models and climate information." },
        { "title": "Evaluate each part and document limits", "text": "Measure image accuracy and mask overlap, test wellness with engineered or simulated profiles, and assess spatial rankings retrospectively. Test district-risk models across time-separated periods." }
      ],
      "takeaway": "Component evaluation supports a research prototype. Prospective clinical trials and complete end-to-end validation remain future work.",
      "sources": [
        { "label": "Group report · solution structure", "url": "Final_Thesis_Draft.pdf", "page": 21 },
        { "label": "Group report · evaluation", "url": "Final_Thesis_Draft.pdf", "page": 53 },
        { "label": "Geospatial thesis · methodology", "url": "Individual Thesis/Individual Thesis Geospatial Clustering.pdf", "page": 19 }
      ]
    }
  },
  // Add a technology here with its local logo to extend the section.
  "TECH_STACK": [
    { "name": "React", "role": "Application interfaces", "logo": "react.svg", "group": "Interface" },
    { "name": "Vite", "role": "Frontend development & builds", "logo": "vite.svg", "group": "Interface" },
    { "name": "Tailwind CSS", "role": "Responsive styling", "logo": "tailwindcss.svg", "group": "Interface" },
    { "name": "Python", "role": "Research & backend processing", "logo": "python.svg", "group": "Services & data" },
    { "name": "FastAPI", "role": "Validated application APIs", "logo": "fastapi.svg", "group": "Services & data" },
    { "name": "MongoDB", "role": "Farm, case & user records", "logo": "mongodb.svg", "group": "Services & data" },
    { "name": "TensorFlow", "role": "Wellness & mask models", "logo": "tensorflow.svg", "group": "Machine learning" },
    { "name": "PyTorch", "role": "Detection & image classification", "logo": "pytorch.svg", "group": "Machine learning" },
    { "name": "scikit-learn", "role": "Monitoring & risk models", "logo": "scikitlearn.svg", "group": "Machine learning" },
    { "name": "OpenCV", "role": "Image processing", "logo": "opencv.svg", "group": "Analysis & mapping" },
    { "name": "Pandas", "role": "Tabular data preparation", "logo": "pandas.svg", "group": "Analysis & mapping" },
    { "name": "Leaflet", "role": "Interactive map views", "logo": "leaflet.svg", "group": "Analysis & mapping" }
  ],
  "COMPONENTS": [
    {
      "number": "01",
      "title": "AI Smart Diagnosis",
      "short": "Image assessment",
      "initials": "LA",
      "owner": "A.L.M. Athulathmudali",
      "studentId": "IT21129544",
      "description": "Analyses cattle photographs for signs associated with foot-and-mouth disease, lumpy skin disease and mastitis. Detection, classification and lesion outlining provide supporting evidence for veterinary review.",
      "input": "Cattle photographs",
      "output": "Candidate labels & lesion masks",
      "methods": "YOLOv8s · ViT-B/16 · ResNet50",
      "status": "Stage models evaluated",
      "evidence": "ViT-B/16 achieved 90.11% test accuracy. Refined segmentation achieved 0.4078 mean intersection-over-union on 100 samples.",
      "limit": "These are separate stage results. The thesis documents a ResNet50 mask head, not a complete Mask R-CNN implementation. The full image-service cascade and clinical handover still require validation.",
      "screen": "diagnosis",
      "thesis": "thesis-01",
      "proposal": "proposal-01"
    },
    {
      "number": "02",
      "title": "Health Monitoring & Body Condition",
      "short": "Wellness & BCS",
      "initials": "JW",
      "owner": "W.M.P.J. Wijenayake",
      "studentId": "IT22194558",
      "description": "Combines daily productivity trends, body condition images and environmental context to flag sustained changes. Seven-day triage helps distinguish general wellness concerns and heat stress.",
      "input": "Daily logs, images & weather",
      "output": "Wellness flags & body condition scores",
      "methods": "Random Forest · CNN · LSTM late fusion",
      "status": "Engineered / simulated evaluation",
      "evidence": "Monitoring reported 99.80% accuracy on engineered data. The base triage model agreed with all 20 simulated test profiles.",
      "limit": "Constructed data and a small simulated batch do not establish clinical performance. Body condition scoring still needs a numerical regression benchmark.",
      "screen": "wellness",
      "thesis": "thesis-02",
      "proposal": "proposal-02"
    },
    {
      "number": "03",
      "title": "Geospatial Clustering & Mapping",
      "short": "Geospatial analysis",
      "initials": "GS",
      "owner": "G.A. Sandaru",
      "studentId": "IT22258908",
      "description": "Places verified cases and historical disease reports in a spatial context. Maps, relative cell scores and geometric descriptors help veterinary officers explore local patterns and source records.",
      "input": "Verified cases & historical reports",
      "output": "Spatial views & relative rankings",
      "methods": "ST-DBSCAN · Geodesic grids · Distance decay",
      "status": "Retrospective spatial-ranking evaluation",
      "evidence": "The held-out LSD evaluation reported a mean area-weighted target percentile of 73.85 (origin-level 95% interval: 70.51–77.11), using approximately 5 km grid cells and a 25 km spatial envelope.",
      "limit": "Only 323 of 588 target events were inside the evaluated envelope, and part of the held-out cohort was exposed before final model selection. These are retrospective geographic rankings, not infection probabilities or validated future transmission routes.",
      "screen": "geospatial",
      "thesis": "thesis-03",
      "proposal": "proposal-03"
    },
    {
      "number": "04",
      "title": "Climate-Informed Outbreak Risk",
      "short": "District risk estimation",
      "initials": "SK",
      "owner": "S.S. Kumarasinghe",
      "studentId": "IT22221414",
      "description": "Combines surveillance history and climate information to estimate district-month occurrence risk for foot-and-mouth disease and lumpy skin disease across Sri Lanka’s 25 districts.",
      "input": "Surveillance history & climate data",
      "output": "District-month risk & explanations",
      "methods": "Logistic Regression · ElasticNet · Platt calibration",
      "status": "Retrospective model evaluation",
      "evidence": "Enhanced FMD: ROC-AUC 0.8166, PR-AUC 0.6968 on held-out 2024 data. Calibrated LSD: mean ROC-AUC 0.6136, PR-AUC 0.2699 across five year-separated folds.",
      "limit": "Concurrent climate inputs support nowcasting. Future periods can use disclosed historical proxies; these are not validated future-weather forecasts. LSD performance varies between years.",
      "screen": "forecast",
      "thesis": "thesis-04",
      "proposal": "proposal-04"
    }
  ],
  "GROUP_REPORT": {
    "id": "group-thesis",
    "title": "Common Integrated Solution Report",
    "category": "group",
    "url": "Final_Thesis_Draft.pdf",
    "description": "The shared architecture, four research components, evaluation evidence and future directions in one group report.",
    "author": "A.L.M. Athulathmudali · W.M.P.J. Wijenayake · G.A. Sandaru · S.S. Kumarasinghe",
    "stage": "Group thesis",
    "format": "PDF",
    "bytes": 1990886,
    "pages": 90,
    "date": "October 2026",
    "version": "Draft PDF"
  },
  "LEGACY_REPORT": {
    "url": "docs/Group_Thesis_Completed.docx",
    "bytes": 111617
  },
  "CATEGORIES": [
    {
      "id": "paper",
      "title": "Research paper"
    },
    {
      "id": "thesis",
      "title": "Individual theses"
    },
    {
      "id": "proposal",
      "title": "Research proposals"
    },
    {
      "id": "presentation",
      "title": "Presentations"
    },
    {
      "id": "assessment",
      "title": "Topic assessment"
    }
  ],
  "DELIVERABLES": [
    {
      "id": "research-paper",
      "title": "A Multi-Stage Artificial Intelligence Framework for Proactive Livestock Health Monitoring and Outbreak Surveillance",
      "category": "paper",
      "url": "A_Multi_Stage_Artificial_Intelligence_Framework_for_Proactive_Livestock_Health_Monitoring_and_Outbreak_Surveillance.pdf",
      "description": "A concise account of the integrated decision-support architecture and selected component evaluations.",
      "author": "A.L.M. Athulathmudali · W.M.P.J. Wijenayake · S.S. Kumarasinghe · G.A. Sandaru · Dilani Lunugalage · Eishan Weerasinghe",
      "stage": "Research paper",
      "format": "PDF",
      "bytes": 509244,
      "pages": 6,
      "note": "The paper and theses report different evaluation versions and scopes. Component summaries on this site follow the group report and individual theses."
    },
    {
      "id": "thesis-01",
      "title": "AI Smart Diagnosis",
      "category": "thesis",
      "url": "Individual Thesis/Individual Thesis Smart Diagnosis.pdf",
      "description": "Individual research, implementation and component-level evaluation.",
      "author": "A.L.M. Athulathmudali",
      "stage": "Individual thesis",
      "format": "PDF",
      "bytes": 1704954,
      "pages": 85,
      "date": "October 2026",
      "component": "01"
    },
    {
      "id": "thesis-02",
      "title": "Persistent Health Anomaly & Body Condition Scoring",
      "category": "thesis",
      "url": "Individual Thesis/Individual Thesis Wellness Triage.pdf",
      "description": "Individual research, implementation and component-level evaluation.",
      "author": "W.M.P.J. Wijenayake",
      "stage": "Individual thesis",
      "format": "PDF",
      "bytes": 9425214,
      "pages": 58,
      "date": "October 2026",
      "component": "02"
    },
    {
      "id": "thesis-03",
      "title": "Geospatial Clustering & Trajectory Mapping",
      "category": "thesis",
      "url": "Individual Thesis/Individual Thesis Geospatial Clustering.pdf",
      "description": "Individual research, implementation and component-level evaluation.",
      "author": "G.A. Sandaru",
      "stage": "Individual thesis",
      "format": "PDF",
      "bytes": 2420367,
      "pages": 61,
      "date": "October 2026",
      "component": "03"
    },
    {
      "id": "thesis-04",
      "title": "Climate-Informed Livestock Disease Forecasting",
      "category": "thesis",
      "url": "Individual Thesis/Individual Thesis Seasonal Forecasting.pdf",
      "description": "Individual research, implementation and component-level evaluation.",
      "author": "S.S. Kumarasinghe",
      "stage": "Individual thesis",
      "format": "PDF",
      "bytes": 1717681,
      "pages": 91,
      "date": "October 2026",
      "component": "04"
    },
    {
      "id": "proposal-01",
      "title": "AI Smart Diagnosis",
      "category": "proposal",
      "url": "Proposals/Computer Vision (Smart Diagnosis) Proposal.pdf",
      "description": "The proposed research problem, objectives and methodology.",
      "author": "A.L.M. Athulathmudali",
      "stage": "Research proposal",
      "format": "PDF",
      "bytes": 1433344,
      "pages": 38,
      "date": "March 2026",
      "component": "01"
    },
    {
      "id": "proposal-02",
      "title": "Persistent Health Anomaly & Body Condition Scoring",
      "category": "proposal",
      "url": "Proposals/Wellness Triage Proposal.pdf",
      "description": "The proposed research problem, objectives and methodology.",
      "author": "W.M.P.J. Wijenayake",
      "stage": "Research proposal",
      "format": "PDF",
      "bytes": 4080619,
      "pages": 35,
      "date": "March 2026",
      "component": "02"
    },
    {
      "id": "proposal-03",
      "title": "Geospatial Clustering & Trajectory Mapping",
      "category": "proposal",
      "url": "Proposals/Real-Time Geospatial Clustering & Trajectory Mapping Proposal.pdf",
      "description": "The proposed research problem, objectives and methodology.",
      "author": "G.A. Sandaru",
      "stage": "Research proposal",
      "format": "PDF",
      "bytes": 1973200,
      "pages": 42,
      "date": "March 2026",
      "component": "03"
    },
    {
      "id": "proposal-04",
      "title": "Climate-Informed Livestock Disease Forecasting",
      "category": "proposal",
      "url": "Proposals/Seasonal Forecasting Proposal.pdf",
      "description": "The proposed research problem, objectives and methodology.",
      "author": "S.S. Kumarasinghe",
      "stage": "Research proposal",
      "format": "PDF",
      "bytes": 1814381,
      "pages": 44,
      "date": "March 2026",
      "component": "04"
    },
    {
      "id": "proposal-presentation",
      "title": "Proposal presentation",
      "category": "presentation",
      "url": "Presentations/Proposal Presentation.pptx",
      "description": "Group presentation documenting this stage of the research journey.",
      "author": "ADRS research group · R26-SE-013",
      "stage": "Proposal presentation",
      "format": "PPTX",
      "bytes": 73224383,
      "slides": 36
    },
    {
      "id": "progress-1",
      "title": "Progress presentation I",
      "category": "presentation",
      "url": "Presentations/ADRS Presentation-PP1.odp",
      "description": "Group presentation documenting this stage of the research journey.",
      "author": "ADRS research group · R26-SE-013",
      "stage": "Progress presentation I",
      "format": "ODP",
      "bytes": 26380730,
      "slides": 23
    },
    {
      "id": "progress-2",
      "title": "Progress presentation II",
      "category": "presentation",
      "url": "Presentations/ADRS Presentation-PP2.pptx",
      "description": "Group presentation documenting this stage of the research journey.",
      "author": "ADRS research group · R26-SE-013",
      "stage": "Progress presentation II",
      "format": "PPTX",
      "bytes": 21992738,
      "slides": 12
    },
    {
      "id": "topic-assessment",
      "title": "Topic assessment form",
      "category": "assessment",
      "url": "Topic Assessment Form.pdf",
      "description": "The research problem, proposed scope and initial component definitions.",
      "author": "ADRS research group · R26-SE-013",
      "stage": "Topic assessment",
      "format": "PDF",
      "bytes": 1041086,
      "pages": 19
    }
  ],
  "SCREENS": {
    "diagnosis": {
      "src": "UI Dashboards/AI_Smart_Diagnosis.png",
      "title": "AI Smart Diagnosis",
      "caption": "Image assessment, lesion visualization and veterinary review.",
      "alt": "AI Smart Diagnosis interface showing a cattle-image lesion overlay, an example assessment and a veterinary verification action",
      "width": 1900,
      "height": 997
    },
    "wellness": {
      "src": "UI Dashboards/Wellness_Triage_BCS_analyzer.jpeg",
      "title": "Wellness & BCS",
      "caption": "Image-based body condition analysis and animal wellness assessment.",
      "alt": "Body condition analyzer showing cattle-image upload, detected image regions and an example body condition score",
      "width": 1280,
      "height": 800
    },
    "geospatial": {
      "src": "UI Dashboards/09_National_Map_Legend_Disease_Selector_Geographic_Controls.png",
      "title": "Geospatial analysis",
      "caption": "Disease selection, historical spatial context and map controls.",
      "alt": "Geospatial disease interface showing a Sri Lanka map, disease selector, historical source legend and geographic controls",
      "width": 1920,
      "height": 1080
    },
    "forecast": {
      "src": "UI Dashboards/Forecast overview - vet.png",
      "title": "District risk estimation",
      "caption": "District-month risk estimates for veterinary surveillance review.",
      "alt": "Veterinary risk overview showing example FMD and LSD district-month estimates, model context and decision-support guardrails",
      "width": 1190,
      "height": 1384
    }
  }
};
