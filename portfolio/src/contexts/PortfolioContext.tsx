"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import {
  PortfolioData,
  defaultData,
  loadPortfolioData,
  savePortfolioData,
  fetchPortfolioFromFirestore,
  savePortfolioToFirestore,
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
  // Initialize from local cache synchronously to avoid layout shifts or blank screens
  const [data, setData] = useState<PortfolioData>(loadPortfolioData);

  // Load from Firestore database asynchronously on mount
  useEffect(() => {
    fetchPortfolioFromFirestore()
      .then((dbData) => {
        if (dbData) {
          setData(dbData);
          savePortfolioData(dbData); // Sync local storage cache
        }
      })
      .catch((err) => {
        console.error("Failed to load from Firestore on mount:", err);
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
    // Update local cache and state immediately
    savePortfolioData(newData);
    setData(newData);
    try {
      await savePortfolioToFirestore(newData);
    } catch (err) {
      console.error("Failed to save to Firestore database:", err);
    }
  };

  const resetData = async () => {
    // Reset local cache and state immediately
    savePortfolioData(defaultData);
    setData(defaultData);
    try {
      await savePortfolioToFirestore(defaultData);
    } catch (err) {
      console.error("Failed to reset Firestore database:", err);
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
