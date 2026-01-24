import { create } from 'zustand';
import { useEffect } from 'react';

type Language = 'en' | 'ar';

interface LanguageState {
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  t: (en: string, ar: string) => string;
  dir: 'ltr' | 'rtl';
}

export const useLanguage = create<LanguageState>((set, get) => ({
  language: 'en',
  dir: 'ltr',
  setLanguage: (lang) => {
    const dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
    document.documentElement.dir = dir;
    set({ language: lang, dir });
  },
  toggleLanguage: () => {
    const newLang = get().language === 'en' ? 'ar' : 'en';
    get().setLanguage(newLang);
  },
  t: (en, ar) => (get().language === 'ar' ? ar : en),
}));

// Initialize language on mount
export function useLanguageInit() {
  const { setLanguage } = useLanguage();
  useEffect(() => {
    // Default to English or check localStorage if implemented later
    setLanguage('en');
  }, [setLanguage]);
}
