import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { Language } from '@/types';
import { translations } from '@/data/translations';

interface LanguageState {
  currentLanguage: Language;
  translations: typeof translations;
}

type LanguageAction = {
  type: 'SET_LANGUAGE';
  payload: Language;
};

const initialState: LanguageState = {
  currentLanguage: (localStorage.getItem('language') as Language) || 'rus',
  translations,
};

const languageReducer = (state: LanguageState, action: LanguageAction): LanguageState => {
  switch (action.type) {
    case 'SET_LANGUAGE':
      localStorage.setItem('language', action.payload);
      return {
        ...state,
        currentLanguage: action.payload,
      };
    default:
      return state;
  }
};

interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: string) => string;
  getLocalizedText: (text: { taj: string; rus: string }) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(languageReducer, initialState);

  const setLanguage = (language: Language) => {
    dispatch({ type: 'SET_LANGUAGE', payload: language });
  };

  const t = (key: string): string => {
    const keys = key.split('.');
    let value: any = state.translations;
    
    for (const k of keys) {
      value = value?.[k];
    }
    
    if (typeof value === 'object' && value[state.currentLanguage]) {
      return value[state.currentLanguage];
    }
    
    return key; // Fallback to key if translation not found
  };

  const getLocalizedText = (text: { taj: string; rus: string }): string => {
    return text[state.currentLanguage];
  };

  return (
    <LanguageContext.Provider 
      value={{ 
        language: state.currentLanguage, 
        setLanguage, 
        t, 
        getLocalizedText 
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
