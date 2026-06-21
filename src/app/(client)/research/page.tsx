import styles from "./page.module.css";

interface PipelineProgram {
  code: string;
  type: string;
  target: string;
  phase: string;
  progress: number;
  status: string;
}

const PIPELINE_PROGRAMS: PipelineProgram[] = [
  {
    code: "HLX-101",
    type: "Immunology / Anti-cytokine",
    target: "Rheumatoid Arthritis & Plaque Psoriasis",
    phase: "Phase III Clinical Trials",
    progress: 85,
    status: "Patient Cohort Active"
  },
  {
    code: "HLX-204",
    type: "Immunology / Signal Blocker",
    target: "Chronic Auto-Inflammatory Disorders",
    phase: "Phase II Clinical Trials",
    progress: 60,
    status: "Dosing Phase"
  },
  {
    code: "HLX-308",
    type: "Oncology / mAb Vector",
    target: "Advanced Solid Tumors & Adenocarcinomas",
    phase: "Phase I Clinical Trials",
    progress: 40,
    status: "Escalation Cohort"
  },
  {
    code: "HLX-412",
    type: "Neurology / Synaptic Protection",
    target: "Early-stage Cognitive Decline Models",
    phase: "Preclinical Development",
    progress: 25,
    status: "In Vivo Safety Assays"
  },
  {
    code: "HLX-509",
    type: "Cardiovascular / Tissue Repair",
    target: "Ischemic Cardiomyopathy Pathways",
    phase: "Discovery / Screening",
    progress: 10,
    status: "Target Validation"
  }
];

export default function ResearchPage() {
  return (
    <div className={styles.container}>
      {/* Header */}
      <header className={styles.header}>
        <h1 className={styles.title}>Research & Development</h1>
        <p className={styles.subtitle}>
          Discover our pipeline of biological programs and investigational assets designed to provide targeted solutions for challenging clinical indications.
        </p>
      </header>

      {/* R&D Pipeline */}
      <section className={styles.pipelineSection}>
        <h2 className={styles.sectionTitle}>Clinical Development Pipeline</h2>
        <div className={styles.pipelineList}>
          {PIPELINE_PROGRAMS.map((program) => (
            <div key={program.code} className={`${styles.pipelineItem} glassCard`}>
              <div className={styles.itemMeta}>
                <span className={styles.itemType}>{program.type}</span>
                <h3 className={styles.itemCode}>{program.code}</h3>
                <span className={styles.itemTarget}>{program.target}</span>
              </div>

              <div className={styles.progressCol}>
                <div className={styles.progressLabel}>
                  <span className={styles.phaseName}>{program.phase}</span>
                  <span className={styles.phasePercent}>{program.progress}%</span>
                </div>
                <div className={styles.progressBarBg}>
                  <div 
                    className={styles.progressBarFill} 
                    style={{ width: `${program.progress}%` }}
                  />
                </div>
              </div>

              <div className={styles.statusCol}>
                <span className={styles.statusBadge}>{program.status}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* R&D Methodologies */}
      <section>
        <h2 className={styles.sectionTitle}>Methodologies & Innovation</h2>
        <div className={styles.methodologiesGrid}>
          <div className={`${styles.methodCard} glassCard`}>
            <h3 className={styles.methodTitle}>In Silico Molecular Modeling</h3>
            <p className={styles.methodDesc}>
              Before physical synthesis, we use advanced molecular simulation systems and physics modeling tools to test candidate molecules against targeted proteins. This accelerates discovery and optimizes initial receptor affinity.
            </p>
          </div>

          <div className={`${styles.methodCard} glassCard`}>
            <h3 className={styles.methodTitle}>Automated Cellular Assays</h3>
            <p className={styles.methodDesc}>
              Our laboratory centers utilize high-precision automated robotics to rapidly screen binding interactions. This allows us to observe cellular responses under highly regulated conditions, providing robust safety benchmarks.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
