import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import type { Service, WebConfiguration } from '../config/types';
import { SERVICES_DATA } from '../config/appData';

export const useUrlSync = (
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
        const pages = parseInt(searchParams.get('pages') || '1');
        const languages = parseInt(searchParams.get('lang') || '1');
        setWebConfig({ pages, languages });
      }
    }
  }, [searchParams, setServices, setWebConfig]);


  useEffect(() => {
    const params = new URLSearchParams();
    
    services.forEach(s => {
      if (s.selected) {
        params.set(s.id === 'seo' ? 'CampaingSeo' : s.id === 'ads' ? 'CampaingAds' : 'WebPage', 'true');
      }
    });

    if (services.some(s => s.id === 'web' && s.selected)) {
      params.set('pages', webConfig.pages.toString());
      params.set('lang', webConfig.languages.toString());
    }

    setSearchParams(params);
  }, [services, webConfig, setSearchParams]);

  return {
    clearURL: () => setSearchParams(new URLSearchParams())
  };
};