import axios from "axios";
axios.defaults.withCredentials = true;

class DataService {
  static token = null;

  constructor() {
    // eslint-disable-next-line no-undef
    this._baseUrl = import.meta.env.VITE_BASE_URL;
  }

  static getToken = () => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      DataService.token = storedToken;
      return true;
    }
  };

  get(relativeUrl, config = {}) {
    try {
      return axios.get(this._generateUrl(relativeUrl), this._config(config));
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  post(relativeUrl, data = null, config = {}) {
    try {
      return axios.post(
        this._generateUrl(relativeUrl),
        data,
        this._config(config)
      );
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  put(relativeUrl, data = null, config = {}) {
    try {
      return axios.put(
        this._generateUrl(relativeUrl),
        data,
        this._config(config)
      );
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  patch(relativeUrl, data = null, config = {}) {
    try {
      return axios.patch(
        this._generateUrl(relativeUrl),
        data,
        this._config(config)
      );
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  delete(relativeUrl, data = null, config = {}) {
    try {
      if (data)
        return axios.delete(
          this._generateUrl(relativeUrl),
          { data: data },
          this._config(config)
        );
      else
        return axios.delete(
          this._generateUrl(relativeUrl),
          this._config(config)
        );
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  setCommonHeader(key, value) {
    axios.defaults.headers.common[key] = value;
  }

  setBaseUrl(baseUrl) {
    this._baseUrl = baseUrl;
  }

  _generateUrl(relativeUrl) {
    return `${this._baseUrl}/${relativeUrl}`;
  }

  _config(config = {}) {
    return {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${DataService?.token}`,
      },
      ...config,
    };
  }
}

export default DataService;
