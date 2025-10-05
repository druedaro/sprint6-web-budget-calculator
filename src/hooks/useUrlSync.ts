import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import type { Service, WebConfiguration } from '../types/';

export const useUrlSync = (
  services: Service[],
  webConfig: WebConfiguration,
  setServices: React.Dispatch<React.SetStateAction<Service[]>>,
  setWebConfig: React.Dispatch<React.SetStateAction<WebConfiguration>>
) => {
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const servicesParam = searchParams.get('services');
    const pagesParam = searchParams.get('pages');
    const languagesParam = searchParams.get('languages');

    if (servicesParam) {
      const selectedServiceIds = servicesParam.split(',');
      setServices(prevServices =>
        prevServices.map(service => ({
          ...service,
          selected: selectedServiceIds.includes(service.id)
        }))
      );
    }

    if (pagesParam) {
      const pages = parseInt(pagesParam);
      if (!isNaN(pages) && pages > 0) {
        setWebConfig(prev => ({ ...prev, pages }));
      }
    }

    if (languagesParam) {
      const languages = parseInt(languagesParam);
      if (!isNaN(languages) && languages > 0) {
        setWebConfig(prev => ({ ...prev, languages }));
      }
    }
  }, [searchParams, setServices, setWebConfig]);

  useEffect(() => {
    const selectedServices = services.filter(s => s.selected);
    const params = new URLSearchParams();

    if (selectedServices.length > 0) {
      params.set('services', selectedServices.map(s => s.id).join(','));
    }

    if (selectedServices.some(s => s.id === 'web')) {
      if (webConfig.pages > 1) {
        params.set('pages', webConfig.pages.toString());
      }
      if (webConfig.languages > 1) {
        params.set('languages', webConfig.languages.toString());
      }
    }

    setSearchParams(params, { replace: true });
  }, [services, webConfig, setSearchParams]);

  const clearURL = () => {
    setSearchParams({}, { replace: true });
  };

  return { clearURL };
};