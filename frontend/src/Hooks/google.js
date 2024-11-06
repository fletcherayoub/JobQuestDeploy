
const useGoogle = () => {

  const API_URL = "https://jobquestdeploy.onrender.com";

  const googleOauth = () => {
    window.location.href = `${API_URL}/api/v1/user/google`;
  };

  return { googleOauth };
};

export default useGoogle;