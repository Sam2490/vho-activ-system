import React, { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/Card';
import { Globe, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from '@/lib/i18n';

const LanguageSelection = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleLanguageSelect = (language: 'en' | 'ar') => {
    localStorage.setItem('activ-language', language);
    navigate('/login');
  };

  // Add RTL support for Arabic
  useEffect(() => {
    const currentLang = localStorage.getItem('activ-language') || 'en';
    document.documentElement.dir = currentLang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = currentLang;
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-primary via-primary-light to-secondary">
      <Card className="max-w-md w-full text-center">
        <div className="flex justify-center mb-6">
          <Globe className="w-16 h-16 text-primary" />
        </div>
        
        <h1 className="text-3xl font-bold text-gray-900 mb-2">{t('appName')}</h1>
        <h2 className="text-xl font-semibold text-gray-700 mb-4">
          {t('tagline')}
        </h2>
        <p className="text-gray-600 mb-8">{t('selectLanguage')}</p>

        <div className="space-y-4">
          <Button 
            onClick={() => handleLanguageSelect('en')}
            className="w-full flex items-center justify-between text-lg py-6"
          >
            <span>{t('english')}</span>
            <ArrowRight className="w-5 h-5" />
          </Button>
          
          <Button 
            onClick={() => handleLanguageSelect('ar')}
            variant="secondary"
            className="w-full flex items-center justify-between text-lg py-6"
          >
            <span>{t('arabic')}</span>
            <ArrowRight className="w-5 h-5" />
          </Button>
        </div>

        <div className="mt-8 text-sm text-gray-500">
          {t('organization')}
        </div>
      </Card>
    </div>
  );
};

export default LanguageSelection;