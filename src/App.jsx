import { useState } from "react";

import "./App.css";
import { useEffect } from "react";
function App() {
  const [Converted, setConveretd] = useState(0.0);
  const [firstCurrenty, setFirstCurrency] = useState("");
  const [secondCurrenty, setSecondCurrency] = useState("USD");
  const [Amount, setAmount] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const controller = new AbortController();

    if (firstCurrenty && secondCurrenty && Amount) {
      setIsLoading(true);
      try {
        const fetchData = async () => {
          const response = await fetch(
            `https://api.frankfurter.app/latest?amount=${Number(
              Amount
            )}&from=${firstCurrenty}&to=${secondCurrenty}`,
            { signal: controller.signal }
          );
          const data = await response.json();
          setConveretd(data.rates[secondCurrenty]);

          setIsLoading(false);
        };

        fetchData();
      } catch (error) {
        console.error(error.message);
      }
      return function () {
        controller.abort();
      };
    }
  }, [firstCurrenty, secondCurrenty, Amount]);

  return (
    <>
      <div>
        {isLoading && <div>Loading...</div>}
        <input
          type="text"
          value={Amount}
          onChange={(e) => setAmount(e.target.value)}
          disabled={isLoading}
        />
        <select
          onChange={(e) => setFirstCurrency(e.target.value)}
          disabled={isLoading}
        >
          <option value="USD">USD</option>
          <option value="EUR">EUR</option>
          <option value="CAD">CAD</option>
          <option value="INR">INR</option>
        </select>
        <select
          onChange={(e) => setSecondCurrency(e.target.value)}
          disabled={isLoading}
        >
          <option value="USD">USD</option>
          <option value="EUR">EUR</option>
          <option value="CAD">CAD</option>
          <option value="INR">INR</option>
        </select>
        <p>
          {Converted} {secondCurrenty}
        </p>
      </div>
    </>
  );
}

export default App;
