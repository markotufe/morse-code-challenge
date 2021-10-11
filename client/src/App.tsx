import { useState } from "react";
import axios, { AxiosResponse } from "axios";
import "./App.css";

interface IResponse {
  token: string;
}

interface IError {
  error: string;
}

function App() {
  const [token, setToken] = useState("");

  const getToken = async () => {
    try {
      const { data }: AxiosResponse<IResponse> = await axios.post(
        "http://localhost:5000/api/v1/auth",
        {
          username: process.env.REACT_APP_USERNAME,
          password: process.env.REACT_APP_PASSWORD,
        }
      );
      setToken(data.token);
    } catch (err) {
      if (axios.isAxiosError(err) && err.response) {
        console.log((err.response?.data as IError).error);
      }
    }
  };

  return (
    <div>
      <button onClick={getToken}>Get morse output</button>
      {token}
    </div>
  );
}

export default App;
