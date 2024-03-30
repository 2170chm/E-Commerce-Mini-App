const BASE_URL = "https://dummyjson.com";

// Function to fetch data from the API and handle errors
async function fetchWithErrorHandling(url = "", options = {}) {
  const response = await fetch(url, options);
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
}

// Functions to fetch all products from the API
export const getProducts = async () => {
  return fetchWithErrorHandling(`${BASE_URL}/products`);
};

// Function to fetch a single product by ID, this is currently not utilized
export const getProductById = async (id) => {
  return fetchWithErrorHandling(`${BASE_URL}/products/${id}`);
};

// Below are dummy functions to simulate database calls, which you can replace with your own API calls

export const addToCartAPI = async (productId) => {
  // When backend is ready, post a create call with the product ID to the server
  return { success: true, productId: productId };
};

export const updateCartItemAPI = async (productId, quantity) => {
  // When backend is ready, post an update call with the product ID and quantity to the server
  return { success: true, productId: productId, quantity: quantity };
};

export const removeFromCartAPI = async (productId) => {
  // When backend is ready, post a delete call with the product ID to the server
  return { success: true, productId: productId };
};
