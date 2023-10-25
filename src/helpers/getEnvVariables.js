export const getEnvVariables = () => {
    // import.meta.env;
  
    return {
        // ...import.meta.env
        VITE_API_URL: import.meta.env.VITE_API_URL,
        // igual con todas las que tengamos
    };
};
