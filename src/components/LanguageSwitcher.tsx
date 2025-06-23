import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { Language } from '@/types';

const LanguageSwitcher: React.FC = () => {
  const { language, setLanguage } = useLanguage();

  const languages: { code: Language; name: string; flag: string }[] = [
    { code: 'taj', name: 'تاجیکی', flag: '🇹🇯' },
    { code: 'rus', name: 'Русский', flag: '🇷🇺' },
  ];

  return (
    <div className="relative">
      <div className="flex items-center space-x-1 bg-gray-50 rounded-lg p-1">
        {languages.map((lang) => (
          <button
            key={lang.code}
            onClick={() => setLanguage(lang.code)}
            className={`flex items-center space-x-1 px-2 py-1 rounded-md text-sm font-medium transition-colors duration-200 ${
              language === lang.code
                ? 'bg-white text-primary-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <span className="text-base">{lang.flag}</span>
            <span className="hidden sm:inline">{lang.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default LanguageSwitcher;
