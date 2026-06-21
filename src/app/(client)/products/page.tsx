import { Suspense } from "react";
import ProductsContent from "./ProductsContent";
import styles from "./page.module.css";

export default function ProductsPage() {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>Therapeutic Portfolio</h1>
        <p className={styles.subtitle}>
          Explore our pipeline of clinical-phase biological molecules and premium wellness products developed to restore vitality.
        </p>
      </header>
      <Suspense fallback={<div className={styles.loading}>Loading therapeutic portfolio...</div>}>
        <ProductsContent />
      </Suspense>
    </div>
  );
}
