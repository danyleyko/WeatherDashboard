import { countryTranslations } from './countryTranslations';

export const getTranslatedCountryName = (countryCode: string, lang: string): string => 
{
    const translations = countryTranslations[countryCode];

    if (translations) 
    {
        return translations[lang] || translations['en'];
    }
    
    return countryCode;
};

