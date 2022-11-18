import axios from "axios";
import { useState, useEffect } from "react";

const useCountryApi = (url) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get(url)
      .then((data) => setData(data.data.data));
  }, [url]);

  return data;
};

export default useCountryApi;