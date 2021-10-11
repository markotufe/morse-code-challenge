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
  const [errorMessage, setErrorMessage] = useState("");

  const baseURL = "http://localhost:5000/api/v1";
  const stringFirstPart = "Marko 2021";

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
      const token = data.token;
      const tokenExp = JSON.parse(atob(token.split(".")[1])).exp;
      const textInput = `${stringFirstPart} : ${tokenExp}`;

      const morseRequestOptions: AxiosRequestConfig = {
        method: "post",
        url: `${baseURL}/morse-response`,
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        data: {
          textInput,
        },
      };
      const response: AxiosResponse<MorseResponse> = await axios(
        morseRequestOptions
      );
      setMorseOutput(response.data.morseString);
      setErrorMessage("");
    } catch (err) {
      if (axios.isAxiosError(err) && err.response) {
        setErrorMessage((err.response?.data as IError).error);
        setMorseOutput("");
      }
    }
  };

  return (
    <div className="morse-screen">
      <div className="morse-content">
        <h2 className="morse-code-header">Morse code challenge</h2>
        <p className="morse-code-paragraph">
          Get morse code from string <span>{stringFirstPart}</span> and JWT
          expiration date
        </p>
        <button className="get-morse-output-button" onClick={getMorseOutput}>
          Get morse output
        </button>
        {morseOutput && (
          <div className="morse-output-container">
            <p className="morse-output-text">{morseOutput}</p>
          </div>
        )}
        {errorMessage && <p className="error-message">{errorMessage}</p>}
      </div>
    </div>
  );
}

export default App;
