/* Source: Group_Thesis_Completed.docx, October 2026, sections 3.3–3.6.
 * Earlier drafts and generated sample PDFs are not submission evidence. */
const CONFIG = {
  COMPONENTS: [
    {
      number: '01', title: 'AI Smart Diagnosis', short: 'Image assessment', initials: 'LA',
      owner: 'A.L.M. Athulathmudali', studentId: 'IT21129544',
      description: 'Analyses cattle photographs for signs associated with foot-and-mouth disease, lumpy skin disease and mastitis. Detection, classification and lesion outlining provide supporting evidence for veterinary review.',
      input: 'Cattle photographs', output: 'Candidate labels & lesion masks',
      methods: 'YOLOv8s · ViT-B/16 · ResNet50', status: 'Stage models evaluated',
      evidence: 'ViT-B/16 achieved 90.11% test accuracy. Refined segmentation achieved 0.4078 mean intersection-over-union on 100 samples.',
      limit: 'These are separate stage results. The complete image-service cascade and its clinical handover still require validation.'
    },
    {
      number: '02', title: 'Health Monitoring & Body Condition', short: 'Wellness & BCS', initials: 'JW',
      owner: 'W.M.P.J. Wijenayake', studentId: 'IT22194558',
      description: 'Combines daily productivity trends, body condition images and environmental context to flag sustained changes. Seven-day triage helps distinguish general wellness concerns and heat stress.',
      input: 'Daily logs, images & weather', output: 'Wellness flags & body condition scores',
      methods: 'Random Forest · CNN · LSTM late fusion', status: 'Engineered / simulated evaluation',
      evidence: 'Monitoring reported 99.80% accuracy on engineered data. The base triage model agreed with all 20 simulated test profiles.',
      limit: 'Constructed data and a small simulated batch do not establish clinical performance. Body condition scoring still needs a numerical regression benchmark.'
    },
    {
      number: '03', title: 'Geospatial Clustering & Mapping', short: 'Geospatial analysis', initials: 'GS',
      owner: 'G.A. Sandaru', studentId: 'IT22258908',
      description: 'Places verified cases and historical disease reports in a spatial context. Maps, relative cell scores and geometric descriptors help veterinary officers explore local patterns and source records.',
      input: 'Verified cases & historical reports', output: 'Spatial views & relative rankings',
      methods: 'ST-DBSCAN · Geodesic grids · Distance decay', status: 'Implementation & qualitative evidence',
      evidence: 'The LSD reference calculation uses approximately 5 km grid cells and a fixed 25 km distance-decay kernel. National and district views support source inspection.',
      limit: 'Relative scores and geometric directions are not infection probabilities or confirmed transmission routes. A reproducible predictive benchmark remains outstanding.'
    },
    {
      number: '04', title: 'Climate-Informed Outbreak Risk', short: 'District risk estimation', initials: 'SK',
      owner: 'S.S. Kumarasinghe', studentId: 'IT22221414',
      description: 'Combines surveillance history and climate information to estimate district-month occurrence risk for foot-and-mouth disease and lumpy skin disease across Sri Lanka’s 25 districts.',
      input: 'Surveillance history & climate data', output: 'District-month risk & explanations',
      methods: 'Logistic Regression · ElasticNet · Platt calibration', status: 'Retrospective model evaluation',
      evidence: 'Enhanced FMD: ROC-AUC 0.8166, PR-AUC 0.6968 on held-out 2024 data. Calibrated LSD: mean ROC-AUC 0.6136, PR-AUC 0.2699 across five year-separated folds.',
      limit: 'Concurrent climate inputs support nowcasting. Future periods can use disclosed historical proxies; these are not validated future-weather forecasts. LSD performance varies between years.'
    }
  ],
  // Replace sample files with approved originals before enabling downloads.
  // Submission dates are not inferred from old draft placeholders.
  DELIVERABLES: [
    { title: 'Topic Assessment', category: 'report', description: 'Research scope and feasibility', url: null },
    { title: 'Project Charter', category: 'report', description: 'Project scope and responsibilities', url: null },
    { title: 'Project Proposal', category: 'report', description: 'Proposed research and methods', url: null },
    { title: 'Status Document I', category: 'report', description: 'First progress record', url: null },
    { title: 'Status Document II', category: 'report', description: 'Second progress record', url: null },
    { title: 'Research Paper', category: 'report', description: 'Research findings and contribution', url: null },
    { title: 'Individual Final Reports', category: 'report', description: 'Detailed component theses', url: null },
    { title: 'Research Poster', category: 'report', description: 'Visual project summary', url: null },
    { title: 'Proposal Presentation', category: 'presentation', description: 'Research proposal and architecture', url: null },
    { title: 'Progress Presentation I', category: 'presentation', description: 'Initial component progress', url: null },
    { title: 'Progress Presentation II', category: 'presentation', description: 'Further development and evaluation', url: null },
    { title: 'Final Presentation & Viva', category: 'presentation', description: 'Group findings and individual contributions', url: null }
  ],
  SCREENS: {
    wellness: { src: 'Images/ui/wellness-dashboard.png', alt: 'Wellness dashboard concept with daily logging, body condition assessments and a triage entry point', caption: 'Daily observations, body condition and wellness review.' },
    report: { src: 'Images/ui/ai-diagnostic-report.png', alt: 'Illustrative assessment report concept showing model outputs and supporting visual evidence', caption: 'Assessment outputs brought together for professional review.' },
    alerts: { src: 'Images/ui/alerts-center.png', alt: 'Illustrative alerts centre concept showing a list of animal health notifications', caption: 'A central view of notifications and follow-up tasks.' }
  }
};
