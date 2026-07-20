"use client";

import { createContext, useContext, useState } from "react";

export type Lang = "en" | "haw";

// UI dictionary — English / ʻŌlelo Hawaiʻi pairs.
// Hawaiian terms drafted from Pukui-Elbert dictionary vocabulary.
// Marked for fluent-speaker review before public launch.
const DICT: Record<string, { en: string; haw: string }> = {
  // Bottom nav
  "nav.map": { en: "Map", haw: "Palapala ʻāina" },
  "nav.community": { en: "Community", haw: "Kaiāulu" },
  "nav.report": { en: "Report", haw: "Hōʻike" },
  "nav.pins": { en: "Pins", haw: "Nā Pine" },
  "nav.profile": { en: "Profile", haw: "Moʻolelo pilikino" },

  // Page titles & subtitles
  "community.title": { en: "Community", haw: "Kaiāulu" },
  "pins.title": { en: "Pins", haw: "Nā Pine" },
  "pins.subtitle": {
    en: "Verified reports the community is acting on",
    haw: "Nā hōʻike i hōʻoiaʻia e hana nei ke kaiāulu",
  },
  "report.title": { en: "Create a Pin", haw: "E hana i Pine" },
  "profile.title": { en: "Profile", haw: "Moʻolelo pilikino" },
  "search.title": { en: "Search", haw: "Huli" },
  "search.subtitle": { en: "Ask anything about Kauaʻi", haw: "E nīnau i kēlā me kēia mea e pili ana iā Kauaʻi" },

  // Common buttons & actions
  "action.post": { en: "Post", haw: "Kau" },
  "action.react": { en: "React", haw: "Pane" },
  "action.comment": { en: "Comment", haw: "Manaʻo" },
  "action.save": { en: "Save", haw: "Mālama" },
  "action.saved": { en: "Saved", haw: "Ua mālama ʻia" },
  "action.volunteer": { en: "Volunteer", haw: "Kōkua" },
  "action.contribute": { en: "Contribute", haw: "Hāʻawi" },
  "action.follow": { en: "Follow", haw: "Hahai" },
  "action.search": { en: "Search", haw: "Huli" },
  "action.submit": { en: "Submit Pin", haw: "Hoʻouna i ka Pine" },
  "action.reportIssue": { en: "Report an Issue", haw: "E hōʻike i kekahi pilikia" },

  // Post categories (the pills on community posts)
  "cat.safety": { en: "Safety Alert", haw: "Pūʻulu palekana" },
  "cat.accident": { en: "Accident / Traffic", haw: "Ulia / Kaʻa" },
  "cat.suspicious": { en: "Heads Up", haw: "E makaʻala" },
  "cat.lostfound": { en: "Lost & Found", haw: "Nalowale a loaʻa" },
  "cat.notice": { en: "Community Notice", haw: "Hoʻolaha kaiāulu" },
  "cat.civic": { en: "Civic Issue", haw: "Pilikia kīwila" },

  // Misc
  "misc.verified": { en: "Verified", haw: "Hōʻoiaʻia" },
  "misc.trending": { en: "Trending", haw: "Kaulana" },
  "misc.language": { en: "Language", haw: "ʻŌlelo" },
  "misc.english": { en: "English", haw: "ʻŌlelo Pelekānia" },
  "misc.hawaiian": { en: "ʻŌlelo Hawaiʻi", haw: "ʻŌlelo Hawaiʻi" },
};

type LanguageContextType = {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (key: string) => string;
};

const LanguageContext = createContext<LanguageContextType>({
  lang: "en",
  setLang: () => {},
  t: (key) => DICT[key]?.en ?? key,
});

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Lang>("en");

  function t(key: string): string {
    const entry = DICT[key];
    if (!entry) return key;
    return lang === "haw" ? entry.haw : entry.en;
  }

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}