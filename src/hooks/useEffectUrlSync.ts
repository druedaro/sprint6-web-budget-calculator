import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import type { Service, WebConfiguration } from '../config/types';
import { SERVICES_DATA } from '../config/appData';
import { getSelectedServices } from '../services/budgetService';

export const useEffectUrlSync = (
  services: Service[],
  webConfig: WebConfiguration,
  setServices: (services: Service[]) => void,
  setWebConfig: (config: WebConfiguration) => void
) => {
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const seo = searchParams.get('CampaingSeo') === 'true';
    const ads = searchParams.get('CampaingAds') === 'true';
    const web = searchParams.get('WebPage') === 'true';

    if (seo || ads || web) {
      setServices(SERVICES_DATA.map(service => ({
        ...service,
        selected: service.id === 'seo' ? seo : service.id === 'ads' ? ads : service.id === 'web' ? web : false
      })));

      if (web) {
        try {
          const pages = parseInt(searchParams.get('pages') || '1');
          const languages = parseInt(searchParams.get('lang') || '1');
          
          if (!isNaN(pages) && !isNaN(languages) && pages > 0 && languages > 0) {
            setWebConfig({ pages, languages });
          }
        } catch (error) {
          console.error('Error parsing URL parameters:', error);
        }
      }
    }
  }, [searchParams, setServices, setWebConfig]);

  useEffect(() => {
    const params = new URLSearchParams();
    const selectedServices = getSelectedServices(services);
    
    selectedServices.forEach(service => {
      const paramName = service.id === 'seo' 
        ? 'CampaingSeo' 
        : service.id === 'ads' 
        ? 'CampaingAds' 
        : 'WebPage';
      
      params.set(paramName, 'true');
    });

    const isWebSelected = selectedServices.some(s => s.id === 'web');
    if (isWebSelected) {
      params.set('pages', webConfig.pages.toString());
      params.set('lang', webConfig.languages.toString());
    }

    setSearchParams(params);
  }, [services, webConfig, setSearchParams]);

  return {
    clearURL: () => setSearchParams(new URLSearchParams())
  };
};
