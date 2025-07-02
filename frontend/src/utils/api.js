const API_BASE_URL = 'https://bbuyorcry3.onrender.com';

export const fetchOrderHistory = async () => {
  const token = localStorage.getItem('auth-token');

  try {
    const response = await fetch(`${API_BASE_URL}/myorders`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': token,
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching order history:', error);
    throw error;
  }
};
