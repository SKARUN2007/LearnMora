"use client";
import { useState, useMemo, useCallback } from "react";
import { Virtuoso } from "react-virtuoso";
import { ChevronRight, ChevronDown, CheckSquare, Square, Search } from "lucide-react";
import { HIERARCHICAL_TAXONOMY, getVisibleNodes, TaxonomyNode } from "@/lib/dynamicTaxonomy";
import styles from "./SmartSidebar.module.css";

interface Props {
  selectedTags: Set<string>;
  onTagToggle: (tag: string) => void;
  isFreeOnly: boolean;
  setIsFreeOnly: (val: boolean) => void;
}

export default function SmartSidebar({ selectedTags, onTagToggle, isFreeOnly, setIsFreeOnly }: Props) {
  const [search, setSearch] = useState("");
  // Default expand Tier 1 nodes
  const [expandedIds, setExpandedIds] = useState<Set<string>>(
    new Set(HIERARCHICAL_TAXONOMY.map(t => t.id))
  );

  const visibleNodes = useMemo(() => {
    return getVisibleNodes(HIERARCHICAL_TAXONOMY, expandedIds, search);
  }, [expandedIds, search]);

  const toggleExpand = useCallback((id: string) => {
    setExpandedIds(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }, []);

  const renderRow = (index: number) => {
    const node = visibleNodes[index];
    const isExpanded = expandedIds.has(node.id);
    const hasChildren = node.children && node.children.length > 0;
    const isSelected = selectedTags.has(node.name);

    return (
      <div style={{ paddingLeft: `${(node.level - 1) * 16}px`, paddingTop: '4px', paddingBottom: '4px' }} className={styles.row}>
        {hasChildren ? (
          <button onClick={() => toggleExpand(node.id)} className={styles.expandBtn}>
            {isExpanded || search ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
          </button>
        ) : (
          <div className={styles.expandSpacer} />
        )}
        
        <label className={styles.nodeLabel}>
          <input 
            type="checkbox" 
            checked={isSelected}
            onChange={() => onTagToggle(node.name)}
            className={styles.hiddenCheckbox}
          />
          <div className={styles.customCheckbox}>
            {isSelected ? <CheckSquare size={16} className={styles.checkedIcon} /> : <Square size={16} className={styles.uncheckedIcon} />}
          </div>
          <span className={`${styles.nodeName} ${node.level === 1 ? styles.nodeLevel1 : ''}`} title={node.name}>
            {node.name}
          </span>
          <span className={styles.nodeCount}>[{node.count}]</span>
        </label>
      </div>
    );
  };

  return (
    <aside className={styles.sidebar}>
      <div className={styles.filterGroup}>
        <h3 className={styles.filterTitle}>The Gold Filter</h3>
        <label className={styles.toggleLabel}>
          <input 
            type="checkbox" 
            checked={isFreeOnly} 
            onChange={(e) => setIsFreeOnly(e.target.checked)} 
          />
          <span className={styles.toggleSlider}></span>
          <span className={styles.labelTitle}>100% Free Professional Certificates</span>
        </label>
      </div>

      <div className={styles.filterGroup}>
        <h3 className={styles.filterTitle}>Smart Taxonomy</h3>
        
        <div className={styles.searchWrapper}>
          <Search size={16} className={styles.searchIcon} />
          <input 
            type="text" 
            placeholder="Search 500+ subjects..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className={styles.searchInput}
          />
        </div>

        <div className={styles.treeContainer}>
          <Virtuoso
            style={{ height: '500px', width: '100%' }}
            totalCount={visibleNodes.length}
            itemContent={renderRow}
          />
        </div>
      </div>
      
      <div className={styles.sidebarAd}>
        <div className={styles.adLabel}>SPONSORED</div>
        <div className={styles.adPlaceholderSidebar}>Sidebar Sticky Ad</div>
      </div>
    </aside>
  );
}
