"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import styles from "./page.module.css";

export default function ContactContent() {
  const searchParams = useSearchParams();
  const inquiryParam = searchParams.get("inquiry");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    type: "general",
    subject: "",
    message: ""
  });

  // Pre-fill subject and message if inquiry parameter exists
  useEffect(() => {
    if (inquiryParam) {
      const formattedCode = inquiryParam.toUpperCase();
      setFormData((prev) => ({
        ...prev,
        type: "product",
        subject: `Clinical Inquiry regarding ${formattedCode}`,
        message: `Hello Healax Clinical Operations,\n\nI would like to request clinical trials data and pipeline information for candidate agent ${formattedCode}.`
      }));
    }
  }, [inquiryParam]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");
    setSuccess(false);

    try {
      const response = await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to submit inquiry");
      }

      setSuccess(true);
      setFormData({
        name: "",
        email: "",
        type: "general",
        subject: "",
        message: ""
      });
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className={styles.grid}>
      {/* Contact Info */}
      <div className={styles.infoCol}>
        <div className={`${styles.infoCard} glassCard`}>
          <h2 className={styles.infoTitle}>Global Headquarters</h2>
          <div className={styles.officeLocation}>
            <strong>Healax Pharma Inc.</strong>
            <span>100 Innovation Parkway, Suite 500</span>
            <span>Boston, MA 02110</span>
            <span>United States</span>
          </div>
        </div>

        <div className={`${styles.infoCard} glassCard`}>
          <h2 className={styles.infoTitle}>Communication Channels</h2>
          <ul className={styles.contactChannels}>
            <li className={styles.channelItem}>
              <svg className={styles.channelIcon} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
              </svg>
              <span>+1 (800) 555-0190</span>
            </li>
            <li className={styles.channelItem}>
              <svg className={styles.channelIcon} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                <polyline points="22,6 12,13 2,6"></polyline>
              </svg>
              <span>communications@healaxpharma.com</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Inquiry Form */}
      <div className={`${styles.formCard} glassCard`}>
        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label htmlFor="name" className={styles.label}>Full Name</label>
              <input
                type="text"
                id="name"
                name="name"
                className={styles.input}
                value={formData.name}
                onChange={handleChange}
                required
                disabled={submitting}
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="email" className={styles.label}>Email Address</label>
              <input
                type="email"
                id="email"
                name="email"
                className={styles.input}
                value={formData.email}
                onChange={handleChange}
                required
                disabled={submitting}
              />
            </div>
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="type" className={styles.label}>Inquiry Type</label>
            <select
              id="type"
              name="type"
              className={styles.select}
              value={formData.type}
              onChange={handleChange}
              disabled={submitting}
            >
              <option value="general">General Corporate Inquiry</option>
              <option value="product">Product Info / Trials Request</option>
              <option value="partnership">R&D Partnership Proposal</option>
              <option value="careers">Careers & Research Fellowships</option>
            </select>
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="subject" className={styles.label}>Subject</label>
            <input
              type="text"
              id="subject"
              name="subject"
              className={styles.input}
              value={formData.subject}
              onChange={handleChange}
              required
              disabled={submitting}
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="message" className={styles.label}>Message / Details</label>
            <textarea
              id="message"
              name="message"
              className={styles.textarea}
              value={formData.message}
              onChange={handleChange}
              required
              disabled={submitting}
            />
          </div>

          {error && (
            <div style={{ color: "#ef4444", fontSize: "0.85rem", padding: "0.75rem", background: "rgba(239, 68, 68, 0.08)", border: "1px solid rgba(239, 68, 68, 0.2)", borderRadius: "8px" }}>
              {error}
            </div>
          )}

          {success && (
            <div style={{ color: "var(--primary-emerald)", fontSize: "0.85rem", padding: "0.75rem", background: "rgba(16, 185, 129, 0.08)", border: "1px solid rgba(16, 185, 129, 0.2)", borderRadius: "8px" }}>
              Inquiry sent successfully! Our clinical team will contact you shortly.
            </div>
          )}

          <button type="submit" className={styles.submitBtn} disabled={submitting}>
            {submitting ? "Sending..." : "Send Inquiry"}
          </button>
        </form>
      </div>
    </div>
  );
}
