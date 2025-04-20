import { useState, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);
  const [company, setCompany] = useState([]);

  useEffect(() => {
    const getCompany = async () => {
      const url = "http://localhost:8081/get-company";
      const response = await fetch(url);
      const json = await response.json();
      setCompany(json);
      console.log(json);
    };
    getCompany();
  }, []);

  return (
    <>
      <table>
        <thead>
          <tr>
            <th>Company</th>
            <th>Contact</th>
            <th>Country</th>
          </tr>
        </thead>
        <tbody>
          {company.map((user) => {
            return (
              <tr key={user.id}>
                <th>{user.id}</th>
                <th>{user.name}</th>
                <th>{user.company}</th>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}

export default App;
