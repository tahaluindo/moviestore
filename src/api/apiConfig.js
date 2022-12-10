const apiConfig = {
  baseUrl: "https://api.themoviedb.org/3/",
  apiKey: "5615048566f1fe7aa70bb4078a49f1c4",
  originalImage: (imgPath) => `https://image.tmdb.org/t/p/original/${imgPath}`,
  w500Image: (imgPath) => `https://image.tmdb.org/t/p/w500/${imgPath}`,
};

export default apiConfig;

// REACT_APP_API_KEY=5615048566f1fe7aa70bb4078a49f1c4
