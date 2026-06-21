"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import styles from "./page.module.css";

interface Product {
  id: string;
  name: string;
  formula: string;
  category: "immunology" | "oncology" | "neurology" | "wellness";
  status: string;
  description: string;
  indications: string;
}

const PRODUCTS: Product[] = [
  {
    id: "hlx-101",
    name: "HLX-101",
    formula: "Recombinant Cytokine Receptor Blocker",
    category: "immunology",
    status: "Phase III",
    description: "A highly targeted biological agent that binds selectively to inflammatory cytokines, neutralizing signals that drive tissue and cartilage degeneration.",
    indications: "Severe Rheumatoid Arthritis, Plaque Psoriasis"
  },
  {
    id: "hlx-204",
    name: "HLX-204",
    formula: "Selective Autoimmune Signal Inhibitor",
    category: "immunology",
    status: "Phase II",
    description: "An innovative molecule targeting immune-cell receptors to dampen hyper-inflammatory signaling without suppressing overall immune functionality.",
    indications: "Chronic Inflammatory Disorders, Autoimmune Flare-ups"
  },
  {
    id: "hlx-308",
    name: "HLX-308",
    formula: "Monoclonal Antibody (mAb) Vector",
    category: "oncology",
    status: "Phase I",
    description: "Designed to locate specific antigens on solid tumor membranes, delivering highly localized payloads that disrupt replication and trigger apoptosis.",
    indications: "Advanced Solid Tumors, Refractory Adenocarcinomas"
  },
  {
    id: "hlx-412",
    name: "HLX-412",
    formula: "Synaptic Protection Compound",
    category: "neurology",
    status: "Preclinical",
    description: "A small-molecule neuroprotectant developed to cross the blood-brain barrier and counter synaptic decay by inhibiting toxic protein aggregation.",
    indications: "Early-stage Cognitive Decline, Neurodegenerative Models"
  },
  {
    id: "healax-daily-cell",
    name: "Healax Daily Cell",
    formula: "Mitochondrial Wellness Formulation",
    category: "wellness",
    status: "Available",
    description: "A premium clinical-grade supplement containing high-bioavailability antioxidants and coenzymes that support cellular respiration and cellular repair.",
    indications: "Daily Longevity Support, Mitochondrial Vitality"
  },
  {
    id: "healax-active-joint",
    name: "Healax Active Joint",
    formula: "Bio-Curcumin Inflammatory Support",
    category: "wellness",
    status: "Available",
    description: "A high-potency wellness formulation engineered to reduce exercise-induced joint soreness and support long-term mobility and connective tissue strength.",
    indications: "Joint Comfort, Flexibility, Cartilage Health"
  }
];

export default function ProductsContent() {
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get("category");

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  // Sync with search param if any (e.g. from homepage footer links)
  useEffect(() => {
    if (categoryParam) {
      setSelectedCategory(categoryParam);
    }
  }, [categoryParam]);

  const filteredProducts = PRODUCTS.filter((product) => {
    const matchesSearch = 
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.formula.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.indications.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory = 
      selectedCategory === "all" || product.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <div>
      {/* Search & Filters */}
      <div className={styles.controls}>
        <div className={styles.searchBar}>
          <svg className={styles.searchIcon} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
          <input
            type="text"
            placeholder="Search products by name, formula, or indication..."
            className={styles.searchInput}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className={styles.filters}>
          {["all", "immunology", "oncology", "neurology", "wellness"].map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`${styles.filterBtn} ${selectedCategory === cat ? styles.activeFilterBtn : ""}`}
            >
              {cat === "all" ? "All Areas" : cat.charAt(0).toUpperCase() + cat.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      {filteredProducts.length > 0 ? (
        <div className={styles.grid}>
          {filteredProducts.map((product) => (
            <div key={product.id} className={`${styles.card} glassCard`}>
              <div className={styles.cardHeader}>
                <span className={styles.categoryTag}>{product.category}</span>
                <span className={styles.statusTag}>{product.status}</span>
              </div>

              <div className={styles.productInfo}>
                <h3 className={styles.productName}>{product.name}</h3>
                <span className={styles.productFormula}>{product.formula}</span>
              </div>

              <p className={styles.description}>{product.description}</p>

              <div className={styles.indications}>
                <h4 className={styles.indicationsTitle}>Indications</h4>
                <p className={styles.indicationsText}>{product.indications}</p>
              </div>

              <div className={styles.cardFooter}>
                <Link href={`/contact?inquiry=${product.id}`} className={styles.inquireLink}>
                  Request Info
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                    <polyline points="12 5 19 12 12 19"></polyline>
                  </svg>
                </Link>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className={styles.emptyState}>
          No therapeutic products match your search or filter settings.
        </div>
      )}
    </div>
  );
}
