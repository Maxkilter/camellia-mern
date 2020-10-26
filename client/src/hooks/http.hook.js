import {useCallback, useState} from 'react';

export const useHttp = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const request = useCallback( async (url, method = 'GET', body, headers = {}) => {
        setLoading(true);

        let formattedBody;

        try {
            if (body) {
                formattedBody = JSON.stringify(body);
                headers['Content-type'] = 'application/json';
            }
            const response =  await fetch(url, {method, body: formattedBody, headers});
            const data = await response.json();

          if (!response.ok) {
              throw new Error(data.message || "Something went wrong");
          }
          setLoading(false);

          return data;
        } catch (e) {
            setLoading(false);
            setError(e.message);
            throw e;
        }
    }, []);

    const clearError = useCallback(() => setError(null), []);

    return {loading, error, request, clearError}
}
