"use client";
import { useState } from "react";
import styles from "./OmniSearch.module.css";

export default function OmniSearch() {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);

  const jobRoles = [
    "AI Architect",
    "FinTech Analyst",
    "LLM Engineer",
    "Cybersecurity Specialist",
    "Data Scientist",
    "Cloud Solutions Architect",
    "Product Manager"
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setQuery(val);
    if (val.length > 1) {
      setSuggestions(jobRoles.filter(role => role.toLowerCase().includes(val.toLowerCase())));
    } else {
      setSuggestions([]);
    }
  };

  return (
    <div className={styles.searchWrapper}>
      <div className={styles.searchBar}>
        <span className={styles.icon}>🔍</span>
        <input
          type="text"
          placeholder="Search for your next career move (e.g. 'AI Architect')..."
          value={query}
          onChange={handleInputChange}
          className={styles.input}
        />
        <button className={styles.searchBtn}>Search Hub</button>
      </div>
      {suggestions.length > 0 && (
        <div className={styles.suggestions}>
          {suggestions.map((role, idx) => (
            <div key={idx} className={styles.suggestionItem} onClick={() => setQuery(role)}>
              {role}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
