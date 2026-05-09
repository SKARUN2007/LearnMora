"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Brain, TrendingUp, Palette, Clock, BookOpen } from "lucide-react";
import styles from "./CommandHub.module.css";
import { ALL_INSTITUTIONS, getLogoUrl } from "@/lib/institutions";
import InstitutionLogo from "@/components/ui/InstitutionLogo";

const RECENT_SEARCHES = ["AI Engineering", "Harvard Data Science", "Google UX Design"];
const CATEGORIES = [
  { id: "ai", name: "Artificial Intelligence", icon: <Brain size={20} /> },
  { id: "business", name: "Business & Finance", icon: <TrendingUp size={20} /> },
  { id: "design", name: "Experience Design", icon: <Palette size={20} /> },
];

export const CommandHub = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isOpen]);

  const handleSearch = (q: string) => {
    router.push(`/courses?query=${encodeURIComponent(q)}`);
    setIsOpen(false);
  };

  return (
    <>
      <div className={styles.searchTrigger} onClick={() => setIsOpen(true)}>
        <span className={styles.triggerIcon}><Search size={18} /></span>
        <span className={styles.triggerText}>Search courses, universities...</span>
        <span className={styles.shortcut}>⌘K</span>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={styles.overlay}
            onClick={() => setIsOpen(false)}
          >
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -20 }}
              className={styles.modal}
              onClick={(e) => e.stopPropagation()}
            >
              <div className={styles.header}>
                <span className={styles.modalIcon}><Search size={22} /></span>
                <input 
                  ref={inputRef}
                  type="text" 
                  placeholder="What do you want to master today?"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className={styles.input}
                />
              </div>

              <div className={styles.content}>
                {!query ? (
                  <div className={styles.defaultState}>
                    <section>
                      <label>Recent Searches</label>
                      <div className={styles.list}>
                          {RECENT_SEARCHES.map((s) => (
                          <div key={s} className={styles.item} onClick={() => handleSearch(s)}>
                            <span className={styles.itemIcon}><Clock size={16} /></span>
                            {s}
                          </div>
                        ))}
                      </div>
                    </section>

                    <section>
                      <label>Popular Categories</label>
                      <div className={styles.categoryGrid}>
                        {CATEGORIES.map((c) => (
                          <div key={c.id} className={styles.categoryCard} onClick={() => router.push(`/courses?category=${c.id}`)}>
                            <span className={styles.catIcon}>{c.icon}</span>
                            <span>{c.name}</span>
                          </div>
                        ))}
                      </div>
                    </section>
                  </div>
                ) : (
                  <div className={styles.results}>
                    {/* Mock results for now */}
                    <div className={styles.resultGroup}>
                      <label>Suggested Courses</label>
                      <div className={styles.item} onClick={() => handleSearch(query)}>
                        <span className={styles.itemIcon}><BookOpen size={16} /></span>
                        Search for "{query}" in Course Index
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className={styles.footer}>
                <div className={styles.footerKey}>
                  <span>ENTER</span> to search
                </div>
                <div className={styles.footerKey}>
                  <span>ESC</span> to close
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
