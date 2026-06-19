"use client";

import { personalInfo, experiences, projects, skills, aboutMe } from "./data";

export type PersonalInfo = typeof personalInfo;
export type Experience = (typeof experiences)[0];
export type Project = (typeof projects)[0];
export type Skills = typeof skills;
export type AboutMe = typeof aboutMe;

export interface PortfolioData {
  personalInfo: PersonalInfo;
  aboutMe: AboutMe;
  experiences: Experience[];
  projects: Project[];
  skills: Skills;
}

const STORAGE_KEY = "portfolio_data";
// Bump this any time data.ts defaults change so stale cache is auto-cleared.
const DATA_VERSION = personalInfo.email;

export const defaultData: PortfolioData = {
  personalInfo,
  aboutMe,
  experiences,
  projects,
  skills,
};

export function loadPortfolioData(): PortfolioData {
  if (typeof window === "undefined") return defaultData;
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored) as PortfolioData & { __v?: string };
      // If the stored version matches current defaults, use it; otherwise refresh.
      if (parsed.__v === DATA_VERSION) {
        return parsed;
      }
      // Stale — merge whatsapp from defaults into stored data and re-save
      const refreshed = {
        ...defaultData,
        ...parsed,
        personalInfo: { ...defaultData.personalInfo, ...parsed.personalInfo },
        __v: DATA_VERSION,
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(refreshed));
      return refreshed;
    }
  } catch {
    // ignore
  }
  return { ...defaultData, __v: DATA_VERSION } as PortfolioData;
}

export function savePortfolioData(data: PortfolioData): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ ...data, __v: DATA_VERSION }));
    // Dispatch a custom event so other tabs/components can react
    window.dispatchEvent(new CustomEvent("portfolioDataUpdated", { detail: data }));
  } catch {
    // ignore
  }
}

export function resetPortfolioData(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem(STORAGE_KEY);
  window.dispatchEvent(new CustomEvent("portfolioDataUpdated", { detail: defaultData }));
}
