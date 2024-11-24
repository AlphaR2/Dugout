const createApiClient = () => {
  const baseURL = process.env.NEXT_PUBLIC_API_URL;

  const headers = {
    'Content-Type': 'application/json',
  };

  const handleResponse = async (response: Response) => {
    if (!response.ok) {
      const error = await response.json().catch(() => ({}));
      throw new Error(error.message || 'Network response was not ok');
    }
    return response.json();
  };

  return {
    post: async (endpoint: string, data: any) => {
      try {
        const response = await fetch(`${baseURL}${endpoint}`, {
          method: 'POST',
          headers,
          credentials: 'include',
          body: JSON.stringify(data),
        });
        return handleResponse(response);
      } catch (error) {
        console.error('API Error:', error);
        throw error;
      }
    },
  };
};

export const apiClient = createApiClient();