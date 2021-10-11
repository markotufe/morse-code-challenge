import { useState } from "react";
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import "./App.css";

interface TokenResponse {
  token: string;
}

interface MorseResponse {
  morseString: string;
}

interface IError {
  error: string;
}

function App() {
  const [morseOutput, setMorseOutput] = useState("");

  const baseURL = "http://localhost:5000/api/v1";

  const getMorseOutput = async () => {
    //get token
    try {
      const authUserOptions: AxiosRequestConfig = {
        method: "post",
        url: `${baseURL}/auth`,
        data: {
          username: process.env.REACT_APP_USERNAME,
          password: process.env.REACT_APP_PASSWORD,
        },
      };

      const { data }: AxiosResponse<TokenResponse> = await axios(
        authUserOptions
      );

      //get morse output
      const stringFirstPart = "Test 2021";
      const tokenExp = JSON.parse(atob(data.token.split(".")[1])).exp;

      const morseRequestOptions: AxiosRequestConfig = {
        method: "post",
        url: `${baseURL}/morse-response`,
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${data.token}`,
        },
        data: {
          textInput: `${stringFirstPart} : ${tokenExp}`,
        },
      };
      const response: AxiosResponse<MorseResponse> = await axios(
        morseRequestOptions
      );
      setMorseOutput(response.data.morseString);
    } catch (err) {
      if (axios.isAxiosError(err) && err.response) {
        console.log((err.response?.data as IError).error);
      }
    }
  };

  return (
    <div>
      <button onClick={getMorseOutput}>Get morse output</button>
      {morseOutput}
    </div>
  );
}

export default App;
