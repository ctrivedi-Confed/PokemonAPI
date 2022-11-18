import axios from "axios";
import { useState, useEffect } from "react";

const usePokemonApi = (url) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get(url)
      .then((data) =>{ setData(data.data.results) });
  }, [url]);

  return [data, setData];
};

export default usePokemonApi;