import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

export const useQueryParams = (): { [name: string]: string } => {
  const [params, setParams] = useState({});
  const location = useLocation();

  useEffect(() => {
    const temp: Record<string, unknown> = {};
    new URLSearchParams(location.search).forEach((value, key) => {
      temp[key] = value;
    });
    setParams(temp);
  }, [location]);

  return params;
};
