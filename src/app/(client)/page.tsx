"use client";

import { useState } from "react";
import Link from "next/link";
import styles from "./page.module.css";

interface TherapeuticArea {
  id: string;
  name: string;
  title: string;
  description: string;
  features: string[];
}

const THERAPEUTIC_AREAS: TherapeuticArea[] = [
  {
    id: "immunology",
    name: "Immunology",
    title: "Rebalancing Systemic Defenses",
    description: "Developing targeted therapies that target cytokine pathways and intercellular signals to regulate autoimmune diseases and systemic inflammatory disorders without compromising host immunity.",
    features: [
      "Targeted cytokine pathway inhibition",
      "Biological cell-membrane signaling",
      "Autoimmune regulatory response assets"
    ]
  },
  {
    id: "oncology",
    name: "Oncology",
    title: "Precision Cancer Solutions",
    description: "Creating biological molecules and cell-specific oncology systems that selectively disrupt tumor growth factors, block metastasis pathways, and harness the body's native immune defenses.",
    features: [
      "Monoclonal antibody synthesis",
      "Cell-growth signaling regulators",
      "Targeted tumor microenvironment vectors"
    ]
  },
  {
    id: "neurology",
    name: "Neurology",
    title: "Restoring Neuro-Connectivity",
    description: "Focusing on neuroprotection and synaptic plasticity. Our neurological assets target protein misfolding mechanisms and neuroinflammatory pathways to combat neurodegenerative diseases.",
    features: [
      "Amyloid and Tau misfolding targets",
      "Synaptic restoration pathways",
      "Blood-brain barrier transport systems"
    ]
  },
  {
    id: "wellness",
    name: "OTC & Wellness",
    title: "Enhancing Cellular Health",
    description: "Translating clinical discoveries into high-efficacy over-the-counter supplements and preventive wellness formulas that target mitochondrial activity and support longevity.",
    features: [
      "Mitochondrial support complexes",
      "High-bioavailability formulas",
      "Clinical-grade wellness formulations"
    ]
  }
];

export default function Home() {
  const [activeTab, setActiveTab] = useState<string>("immunology");
  const currentArea = THERAPEUTIC_AREAS.find((a) => a.id === activeTab) || THERAPEUTIC_AREAS[0];

  return (
    <div className={styles.container}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroGlow} />
        
        <div className={styles.badge}>
          <span className={styles.badgeDot} />
          Leading Modern Biomedical Innovation
        </div>

        <h1 className={styles.title}>
          Innovating Chemistry <br />
          <span className={styles.accentText}>Restoring Vitality</span>
        </h1>

        <p className={styles.subtitle}>
          Healax Pharma develops next-generation molecular therapeutics and wellness formulas. We bridge the gap between advanced scientific research and human longevity.
        </p>

        <div className={styles.ctas}>
          <Link href="/products" className={styles.primaryCta}>
            Explore Products
          </Link>
          <Link href="/research" className={styles.secondaryCta}>
            R&D Pipeline
          </Link>
        </div>
      </section>

      {/* Stats Counter Section */}
      <section className={`${styles.statsContainer}`}>
        <div className={`${styles.statCard} glassCard`}>
          <div className={styles.statNumber}>14+</div>
          <div className={styles.statLabel}>Active Pipelines</div>
        </div>
        <div className={`${styles.statCard} glassCard`}>
          <div className={styles.statNumber}>120+</div>
          <div className={styles.statLabel}>Scientists & R&D Labs</div>
        </div>
        <div className={`${styles.statCard} glassCard`}>
          <div className={styles.statNumber}>25+</div>
          <div className={styles.statLabel}>Patents Granted</div>
        </div>
        <div className={`${styles.statCard} glassCard`}>
          <div className={styles.statNumber}>100%</div>
          <div className={styles.statLabel}>Quality Standards</div>
        </div>
      </section>

      {/* Interactive Therapeutic Areas Section */}
      <section className={styles.categoriesSection}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Therapeutic Areas</h2>
          <p className={styles.sectionSubtitle}>
            Our primary research focus spans major medical areas where targeted biotechnology can make a life-changing impact.
          </p>
        </div>

        {/* Navigation Tabs */}
        <div className={styles.tabsContainer}>
          {THERAPEUTIC_AREAS.map((area) => (
            <button
              key={area.id}
              onClick={() => setActiveTab(area.id)}
              className={`${styles.tabBtn} ${activeTab === area.id ? styles.activeTabBtn : ""}`}
            >
              {area.name}
            </button>
          ))}
        </div>

        {/* Tab Detail Window */}
        <div className={`${styles.tabContent} glassCard`}>
          <div className={styles.tabTextSide}>
            <h3 className={styles.tabTitle}>{currentArea.title}</h3>
            <p className={styles.tabDesc}>{currentArea.description}</p>
            <ul className={styles.featureList}>
              {currentArea.features.map((feature, idx) => (
                <li key={idx} className={styles.featureItem}>
                  <svg className={styles.featureIcon} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                  {feature}
                </li>
              ))}
            </ul>
          </div>
          
          <div className={styles.tabVisualSide}>
            <div className={styles.visualGrid} />
            <div className={styles.moleculeStructure}>
              <div className={styles.moleculeCore} />
              <div className={`${styles.moleculeNode} ${styles.node1}`} />
              <div className={`${styles.moleculeNode} ${styles.node2}`} />
              <div className={`${styles.moleculeNode} ${styles.node3}`} />
              <div className={`${styles.moleculeNode} ${styles.node4}`} />
            </div>
          </div>
        </div>
      </section>

      {/* R&D Spotlight Section */}
      <section className={styles.spotlightSection}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>R&D Pipeline Spotlight</h2>
          <p className={styles.sectionSubtitle}>
            A glance into our active clinical development programs aiming to establish new therapeutic standards.
          </p>
        </div>

        <div className={`${styles.spotlightCard} glassCard`}>
          <div className={styles.spotlightTextSide}>
            <span className={styles.pipelineTag}>Phase II Clinical Trials</span>
            <h3 className={styles.spotlightTitle}>HLX-204 Molecular Agent</h3>
            <p className={styles.spotlightDesc}>
              HLX-204 is an investigative, highly selective biological compound designed to target autoimmune receptors. By blocking pathway signals that trigger chronic cellular inflammation, HLX-204 aims to deliver long-term regulatory relief for inflammatory conditions.
            </p>
            <div className={styles.spotlightStats}>
              <div className={styles.spotlightStatItem}>
                <span className={styles.spotlightStatVal}>92%</span>
                <span className={styles.spotlightStatLbl}>Selectivity Index</span>
              </div>
              <div className={styles.spotlightStatItem}>
                <span className={styles.spotlightStatVal}>Well-Tolerated</span>
                <span className={styles.spotlightStatLbl}>Safety Profile</span>
              </div>
            </div>
            <Link href="/research" className={styles.secondaryCta} style={{ alignSelf: "flex-start", marginTop: "1rem" }}>
              Explore R&D Pipeline
            </Link>
          </div>
          
          {/* Scientific graphic overlay placeholder representation */}
          <div className={styles.tabVisualSide}>
            <div className={styles.visualGrid} />
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem', zIndex: 1 }}>
              <div style={{ fontSize: '3rem', fontWeight: 800, background: 'var(--gradient-science)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                HLX-204
              </div>
              <div style={{ padding: '0.5rem 1rem', background: 'rgba(99, 102, 241, 0.1)', border: '1px solid rgba(99, 102, 241, 0.3)', borderRadius: '8px', fontSize: '0.85rem', color: '#a5b4fc', letterSpacing: '0.05em' }}>
                RECEPTOR SELECTIVITY BLOCKER
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
