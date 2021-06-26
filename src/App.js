import "./App.css";
import React, { useState, useEffect } from "react";
import Chart from "./components/Chart";


function App() {
  const [data, setData] = useState([]);
  const [isLoading,setIsLoading] = useState(true)
  useEffect(() => {
    setIsLoading(true)
    fetch(`${window.location.origin}/data.csv`)
      .then((res) => res.text())
      .then((data) => setData(data.split("\n")), setIsLoading(false))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="App">
      <h4>manufac-data-visualization-assignment</h4>
      {isLoading && <h1>Loading...Please wait!</h1>}
      <Chart data={data} />
      
    </div>
  );
}

export default App;
