"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import {
  PortfolioData,
  defaultData,
  loadPortfolioData,
  savePortfolioData,
} from "@/lib/portfolioStore";

interface PortfolioContextValue {
  data: PortfolioData;
  updateData: (newData: PortfolioData) => void;
  resetData: () => void;
}

const PortfolioContext = createContext<PortfolioContextValue>({
  data: defaultData,
  updateData: () => {},
  resetData: () => {},
});

export function PortfolioProvider({ children }: { children: React.ReactNode }) {
  const [data, setData] = useState<PortfolioData>(defaultData);

  // Load from server-side database on mount
  useEffect(() => {
    fetch("/api/portfolio")
      .then((res) => res.json())
      .then((dbData) => {
        if (dbData && !dbData.error) {
          setData(dbData);
          savePortfolioData(dbData); // Sync local storage cache
        } else {
          setData(loadPortfolioData());
        }
      })
      .catch(() => {
        setData(loadPortfolioData());
      });
  }, []);

  // Listen for updates from admin panel (cross-tab or same-tab)
  useEffect(() => {
    const handler = (e: Event) => {
      const custom = e as CustomEvent<PortfolioData>;
      setData(custom.detail);
    };
    window.addEventListener("portfolioDataUpdated", handler);
    return () => window.removeEventListener("portfolioDataUpdated", handler);
  }, []);

  const updateData = async (newData: PortfolioData) => {
    savePortfolioData(newData);
    setData(newData);
    try {
      await fetch("/api/portfolio", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newData),
      });
    } catch (err) {
      console.error("Failed to save to database:", err);
    }
  };

  const resetData = async () => {
    savePortfolioData(defaultData);
    setData(defaultData);
    try {
      await fetch("/api/portfolio", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(defaultData),
      });
    } catch (err) {
      console.error("Failed to reset database:", err);
    }
  };

  return (
    <PortfolioContext.Provider value={{ data, updateData, resetData }}>
      {children}
    </PortfolioContext.Provider>
  );
}

export function usePortfolio() {
  return useContext(PortfolioContext);
}
