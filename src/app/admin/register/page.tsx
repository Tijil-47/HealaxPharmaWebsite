"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import styles from "../admin.module.css";

export default function RegisterPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Registration failed");
      }

      setSuccess(true);
      setTimeout(() => {
        router.push("/admin/login");
      }, 2000);
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`${styles.authCard} glassCard`}>
      <div className={styles.authHeader}>
        <h2 className={styles.authTitle}>Initialize Account</h2>
        <p className={styles.authSubtitle}>Create new admin credentials</p>
      </div>

      {error && (
        <div style={{ color: "#ef4444", fontSize: "0.85rem", marginBottom: "1.5rem", textAlign: "center", padding: "0.75rem", background: "rgba(239, 68, 68, 0.08)", border: "1px solid rgba(239, 68, 68, 0.2)", borderRadius: "8px" }}>
          {error}
        </div>
      )}

      {success && (
        <div style={{ color: "var(--primary-emerald)", fontSize: "0.85rem", marginBottom: "1.5rem", textAlign: "center", padding: "0.75rem", background: "rgba(16, 185, 129, 0.08)", border: "1px solid rgba(16, 185, 129, 0.2)", borderRadius: "8px" }}>
          Account created successfully! Redirecting to login...
        </div>
      )}

      <form className={styles.form} onSubmit={handleSubmit}>
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
            disabled={loading || success}
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
            disabled={loading || success}
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="password" className={styles.label}>Password (Min 6 chars)</label>
          <input
            type="password"
            id="password"
            name="password"
            className={styles.input}
            value={formData.password}
            onChange={handleChange}
            required
            disabled={loading || success}
          />
        </div>

        <button type="submit" className={styles.submitBtn} style={{ width: "100%", marginTop: "1rem" }} disabled={loading || success}>
          {loading ? "Registering..." : "Create Account"}
        </button>
      </form>

      <p style={{ marginTop: "2rem", fontSize: "0.85rem", color: "var(--foreground-muted)", textAlign: "center" }}>
        Already have an account?{" "}
        <Link href="/admin/login" style={{ color: "var(--primary-cyan)", fontWeight: 600 }}>
          Sign In here
        </Link>
      </p>
    </div>
  );
}
