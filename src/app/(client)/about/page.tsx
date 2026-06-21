import styles from "./page.module.css";

interface TeamMember {
  name: string;
  role: string;
  initials: string;
  bio: string;
}

const TEAM_MEMBERS: TeamMember[] = [
  {
    name: "Dr. Aris Thorne",
    role: "Chief Scientific Officer",
    initials: "AT",
    bio: "Over 20 years of postdoctoral experience in macromolecular biochemistry. Former Lead Investigator at the Institute of Immunology.",
  },
  {
    name: "Dr. Elena Rostova",
    role: "VP of Clinical Operations",
    initials: "ER",
    bio: "Specializes in clinical trial safety designs and international regulatory compliance. Formerly directed clinical programs at BioMed Labs.",
  },
  {
    name: "Marcus Vance",
    role: "VP of Quality Assurance",
    initials: "MV",
    bio: "Monitors our chemical systems and manufacturing pipelines. Ensuring strict adherence to global cGMP and ISO manufacturing metrics.",
  },
];

export default function AboutPage() {
  return (
    <div className={styles.container}>
      {/* Header */}
      <header className={styles.header}>
        <h1 className={styles.title}>About Healax Pharma</h1>
        <p className={styles.subtitle}>
          We integrate advanced molecular biochemistry, rigorous clinical validation, and premium manufacturing practices to develop and deliver life-enhancing medical solutions.
        </p>
      </header>

      {/* Mission & Vision Section */}
      <section className={styles.missionGrid}>
        <div className={`${styles.missionCard} glassCard`}>
          <svg className={styles.cardIcon} width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"></path>
            <path d="M12 6v6l4 2"></path>
          </svg>
          <h2 className={styles.cardTitle}>Our Mission</h2>
          <p className={styles.cardText}>
            Our core mission is to develop targeted therapeutic options that address autoimmune and chronic ailments at their cellular roots. By combining science-backed research with rigorous quality control, we deliver solutions that enhance patient safety, recovery, and overall quality of life.
          </p>
        </div>

        <div className={`${styles.missionCard} glassCard`}>
          <svg className={styles.cardIcon} width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10"></circle>
            <circle cx="12" cy="12" r="6"></circle>
            <circle cx="12" cy="12" r="2"></circle>
          </svg>
          <h2 className={styles.cardTitle}>Our Vision</h2>
          <p className={styles.cardText}>
            We envision a future where advanced biotechnology and medical chemistry are unified. Through state-of-the-art laboratory pipelines and automated quality monitoring, we strive to become a global leader in molecular development and patient-first wellness.
          </p>
        </div>
      </section>

      {/* Compliance Section */}
      <section className={styles.complianceSection}>
        <h2 className={styles.sectionTitle}>Compliance & Global Standards</h2>
        <div className={styles.complianceGrid}>
          <div className={`${styles.complianceCard} glassCard`}>
            <h3 className={styles.complianceTitle}>cGMP Standards</h3>
            <p className={styles.complianceText}>
              All developmental and production facilities strictly align with Current Good Manufacturing Practice (cGMP) guidelines, ensuring batch-to-batch chemical consistency, safety, and reliability.
            </p>
          </div>
          <div className={`${styles.complianceCard} glassCard`}>
            <h3 className={styles.complianceTitle}>Regulatory Alignment</h3>
            <p className={styles.complianceText}>
              Our research and drug pipeline methodologies are structured to align directly with requirements set by global authorities including the FDA (USA) and the EMA (Europe).
            </p>
          </div>
          <div className={`${styles.complianceCard} glassCard`}>
            <h3 className={styles.complianceTitle}>Ethical Clinical Trials</h3>
            <p className={styles.complianceText}>
              Every phase of our research programs operates with strict clinical ethics, emphasizing patient protection, informed consent, and peer-reviewed safety transparency.
            </p>
          </div>
        </div>
      </section>

      {/* Leadership Section */}
      <section>
        <h2 className={styles.sectionTitle}>Scientific Leadership</h2>
        <div className={styles.leadershipGrid}>
          {TEAM_MEMBERS.map((member, index) => (
            <div key={index} className={`${styles.memberCard} glassCard`}>
              <div className={styles.memberAvatar}>{member.initials}</div>
              <h3 className={styles.memberName}>{member.name}</h3>
              <span className={styles.memberRole}>{member.role}</span>
              <p className={styles.memberBio}>{member.bio}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
