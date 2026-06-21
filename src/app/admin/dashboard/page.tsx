"use client";

import { useState, useEffect } from "react";
import styles from "./dashboard.module.css";

interface Inquiry {
  id: string;
  name: string;
  email: string;
  type: string;
  subject: string;
  message: string;
  createdAt: string;
  status: "unread" | "reviewed" | "archived";
}

export default function DashboardPage() {
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const fetchInquiries = async () => {
    try {
      const response = await fetch("/api/admin/inquiries");
      if (!response.ok) {
        throw new Error("Failed to load dashboard data");
      }
      const data = await response.json();
      setInquiries(data);
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInquiries();
  }, []);

  const handleStatusChange = async (id: string, newStatus: string) => {
    try {
      const response = await fetch("/api/admin/inquiries", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status: newStatus }),
      });

      if (!response.ok) {
        throw new Error("Failed to update status");
      }

      // Locally update state to avoid full refetch
      setInquiries((prev) =>
        prev.map((inq) => (inq.id === id ? { ...inq, status: newStatus as any } : inq))
      );
    } catch (err: any) {
      alert(err.message || "Error updating status");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to permanently delete this inquiry?")) {
      return;
    }

    try {
      const response = await fetch(`/api/admin/inquiries?id=${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete inquiry");
      }

      setInquiries((prev) => prev.filter((inq) => inq.id !== id));
    } catch (err: any) {
      alert(err.message || "Error deleting inquiry");
    }
  };

  // Metrics Calculation
  const totalCount = inquiries.length;
  const unreadCount = inquiries.filter((inq) => inq.status === "unread").length;
  const reviewedCount = inquiries.filter((inq) => inq.status === "reviewed").length;
  const archivedCount = inquiries.filter((inq) => inq.status === "archived").length;

  const filteredInquiries = inquiries.filter((inq) => {
    const matchesSearch =
      inq.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inq.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inq.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inq.message.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = statusFilter === "all" || inq.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  if (loading) {
    return <div className={styles.loader}>Loading secure dashboard panel...</div>;
  }

  if (error) {
    return <div className={styles.loader} style={{ color: "#ef4444" }}>Error: {error}</div>;
  }

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div>
          <h1 className={styles.title}>Inquiries Control</h1>
          <p className={styles.subtitle}>Manage and respond to corporate and clinical queries</p>
        </div>
      </header>

      {/* Metrics Row */}
      <section className={styles.metricsRow}>
        <div className={`${styles.metricCard} glassCard`}>
          <span className={styles.metricLabel}>Total Submissions</span>
          <div className={styles.metricValue}>{totalCount}</div>
        </div>
        <div className={`${styles.metricCard} glassCard`} style={{ borderLeft: "3px solid #f87171" }}>
          <span className={styles.metricLabel}>Unread Inquiries</span>
          <div className={styles.metricValue} style={{ color: "#f87171" }}>{unreadCount}</div>
        </div>
        <div className={`${styles.metricCard} glassCard`} style={{ borderLeft: "3px solid #818cf8" }}>
          <span className={styles.metricLabel}>Reviewed & Archived</span>
          <div className={styles.metricValue} style={{ color: "#818cf8" }}>{reviewedCount + archivedCount}</div>
        </div>
      </section>

      {/* Filter and Search Controls */}
      <section className={styles.controlsRow}>
        <div className={styles.searchWrapper}>
          <svg className={styles.searchIcon} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
          <input
            type="text"
            placeholder="Search details..."
            className={styles.searchInput}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div>
          <select
            className={styles.filterSelect}
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="all">All Inquiries</option>
            <option value="unread">Unread</option>
            <option value="reviewed">Reviewed</option>
            <option value="archived">Archived</option>
          </select>
        </div>
      </section>

      {/* Inquiries List */}
      <section className={`${styles.tableCard} glassCard`}>
        {filteredInquiries.length > 0 ? (
          <div className={styles.tableWrapper}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th className={styles.th}>Date</th>
                  <th className={styles.th}>Sender</th>
                  <th className={styles.th}>Type</th>
                  <th className={styles.th}>Message Details</th>
                  <th className={styles.th}>Status</th>
                  <th className={styles.th}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredInquiries.map((inq) => (
                  <tr key={inq.id} className={styles.tr}>
                    <td className={styles.td}>
                      <span className={styles.date}>
                        {new Date(inq.createdAt).toLocaleDateString(undefined, {
                          month: "short",
                          day: "numeric",
                          year: "numeric"
                        })}
                      </span>
                    </td>
                    <td className={styles.td}>
                      <div className={styles.clientCol}>
                        <span className={styles.clientName}>{inq.name}</span>
                        <span className={styles.clientEmail}>{inq.email}</span>
                      </div>
                    </td>
                    <td className={styles.td}>
                      <span className={styles.typeTag}>{inq.type}</span>
                    </td>
                    <td className={styles.td}>
                      <div className={styles.contentWrapper}>
                        <h4 className={styles.subject}>{inq.subject}</h4>
                        <p className={styles.message}>{inq.message}</p>
                      </div>
                    </td>
                    <td className={styles.td}>
                      <span
                        className={
                          inq.status === "unread"
                            ? styles.badgeUnread
                            : inq.status === "reviewed"
                            ? styles.badgeReviewed
                            : styles.badgeArchived
                        }
                      >
                        {inq.status}
                      </span>
                      <br />
                      <select
                        className={styles.statusSelect}
                        value={inq.status}
                        onChange={(e) => handleStatusChange(inq.id, e.target.value)}
                      >
                        <option value="unread">Unread</option>
                        <option value="reviewed">Reviewed</option>
                        <option value="archived">Archived</option>
                      </select>
                    </td>
                    <td className={styles.td}>
                      <button
                        onClick={() => handleDelete(inq.id)}
                        className={styles.deleteBtn}
                        aria-label="Delete inquiry"
                      >
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="3 6 5 6 21 6"></polyline>
                          <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                        </svg>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className={styles.empty}>No submissions match the current filters.</div>
        )}
      </section>
    </div>
  );
}
