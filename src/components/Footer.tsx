"use client";

import Link from "next/link";
import Image from "next/image";
import styles from "./Footer.module.css";

export default function Footer() {
  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Thank you for subscribing to our research updates!");
  };

  return (
    <footer className={styles.footer}>
      <div className={styles.footerContainer}>
        {/* Brand details */}
        <div className={styles.brandCol}>
          <div className={styles.logoContainer}>
            <Image
              src="/logo.jpg"
              alt="Healax Logo"
              width={34}
              height={34}
              style={{ borderRadius: "5px", objectFit: "cover" }}
            />
            <span className={styles.logoText}>HEALAX</span>
          </div>
          <p className={styles.brandDesc}>
            Integrating state-of-the-art biochemistry and modern medical engineering to deliver premium, effective therapeutic solutions worldwide.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className={styles.colTitle}>Company</h4>
          <ul className={styles.linkList}>
            <li><Link href="/">Home</Link></li>
            <li><Link href="/about">About Us</Link></li>
            <li><Link href="/research">R & D Pipeline</Link></li>
            <li><Link href="/contact">Contact</Link></li>
          </ul>
        </div>

        {/* Therapeutic Areas */}
        <div>
          <h4 className={styles.colTitle}>Therapeutic Areas</h4>
          <ul className={styles.linkList}>
            <li><Link href="/products?category=immunology">Immunology</Link></li>
            <li><Link href="/products?category=oncology">Oncology</Link></li>
            <li><Link href="/products?category=neurology">Neurology</Link></li>
            <li><Link href="/products?category=wellness">OTC & Wellness</Link></li>
          </ul>
        </div>

        {/* Newsletter / Subscription */}
        <div className={styles.newsletterCol}>
          <h4 className={styles.colTitle}>Research Updates</h4>
          <p className={styles.newsletterText}>
            Subscribe to receive updates on our clinical trials, scientific innovations, and pipeline advancements.
          </p>
          <form className={styles.form} onSubmit={handleSubscribe}>
            <input 
              type="email" 
              placeholder="Your email address" 
              className={styles.input} 
              required 
            />
            <button type="submit" className={styles.submitBtn}>
              Join
            </button>
          </form>
        </div>
      </div>

      {/* Regulatory / Compliance Disclaimer */}
      <div className={styles.disclaimer}>
        <strong>Important Notice:</strong> Healax Pharma is committed to developing innovative therapeutic treatments. The medical and research information provided on this website is intended solely for educational and informational purposes. It is not a substitute for professional medical advice, diagnosis, or treatment. Always consult a qualified healthcare provider for any health-related questions.
      </div>

      {/* Footer Bottom Bar */}
      <div className={styles.bottomBar}>
        <div>
          &copy; {new Date().getFullYear()} Healax Pharma Inc. All rights reserved.
        </div>
        <div className={styles.socials}>
          <a href="#" className={styles.socialLink}>LinkedIn</a>
          <a href="#" className={styles.socialLink}>Twitter</a>
          <a href="#" className={styles.socialLink}>ResearchGate</a>
        </div>
      </div>
    </footer>
  );
}
