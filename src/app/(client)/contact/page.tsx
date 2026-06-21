import { Suspense } from "react";
import ContactContent from "./ContactContent";
import styles from "./page.module.css";

export default function ContactPage() {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>Get In Touch</h1>
        <p className={styles.subtitle}>
          Connect with our corporate communications, clinical trial coordinators, or scientific partnership teams.
        </p>
      </header>
      <Suspense fallback={<div className={styles.loading}>Loading contact desk...</div>}>
        <ContactContent />
      </Suspense>
    </div>
  );
}
