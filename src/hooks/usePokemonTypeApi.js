import axios from "axios";
import { useState, useEffect } from "react";

const usePokemonTypeApi = (url) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get(url)
      .then((data) =>{ setData(data.data.results) });
  }, [url]);

  return data;
};

export default usePokemonTypeApi;