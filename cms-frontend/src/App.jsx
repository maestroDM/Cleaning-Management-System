const API_URL = import.meta.env.VITE_API_URL;

const fetchData = async () => {
  const response = await fetch(`$ {API_URL}/users`);
  const data = await response.json();
  console.log(data);
};