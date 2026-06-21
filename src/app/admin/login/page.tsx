"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import styles from "../admin.module.css";

export default function LoginPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
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
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Login failed");
      }

      router.push("/admin/dashboard");
      router.refresh();
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`${styles.authCard} glassCard`}>
      <div className={styles.authHeader}>
        <h2 className={styles.authTitle}>Portal Sign In</h2>
        <p className={styles.authSubtitle}>Healax Clinical Admin Console</p>
      </div>

      {error && (
        <div style={{ color: "#ef4444", fontSize: "0.85rem", marginBottom: "1.5rem", textAlign: "center", padding: "0.75rem", background: "rgba(239, 68, 68, 0.08)", border: "1px solid rgba(239, 68, 68, 0.2)", borderRadius: "8px" }}>
          {error}
        </div>
      )}

      <form className={styles.form} onSubmit={handleSubmit}>
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
            disabled={loading}
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="password" className={styles.label}>Password</label>
          <input
            type="password"
            id="password"
            name="password"
            className={styles.input}
            value={formData.password}
            onChange={handleChange}
            required
            disabled={loading}
          />
        </div>

        <button type="submit" className={styles.submitBtn} style={{ width: "100%", marginTop: "1rem" }} disabled={loading}>
          {loading ? "Authenticating..." : "Sign In"}
        </button>
      </form>

      <p style={{ marginTop: "2rem", fontSize: "0.85rem", color: "var(--foreground-muted)", textAlign: "center" }}>
        No account yet?{" "}
        <Link href="/admin/register" style={{ color: "var(--primary-cyan)", fontWeight: 600 }}>
          Create one here
        </Link>
      </p>
    </div>
  );
}
