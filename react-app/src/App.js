import React, { useEffect, useState } from "react";

function App() {
  const [message, setMessage] = useState("WASM not loaded");

  useEffect(() => {
    const loadWasm = async () => {
      try {
        // Dynamically load wasm_exec.js
        const script = document.createElement("script");
        script.src = "/wasm_exec.js";
        script.onload = async () => {
          const go = new window.Go();
          const wasm = await fetch("/main.wasm").then(res => res.arrayBuffer());
          const instance = await WebAssembly.instantiate(wasm, go.importObject);
          go.run(instance.instance);
        };
        document.body.appendChild(script);
      } catch (error) {
        console.error("Error loading WASM:", error);
      }
    };

    loadWasm();
  }, []);

  const callWasm = () => {
    if (window.helloWasm) {
      setMessage(window.helloWasm());
    } else {
      console.error("WASM function not available.");
    }
  };

  return (
    <div>
      <h1>React + Go WebAssembly</h1>
      <button onClick={callWasm}>Call WASM</button>
      <p>{message}</p>
    </div>
  );
}

export default App;