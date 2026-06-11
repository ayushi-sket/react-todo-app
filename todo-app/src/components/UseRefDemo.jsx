import { useRef, useEffect } from "react";

function UseRefDemo() {
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const focusInput = () => {
    inputRef.current.focus();
  };

  return (
    <div style={{ textAlign: "center", marginTop: "20px" }}>
      <h2>useRef Demo</h2>

      <input
        ref={inputRef}
        type="text"
        placeholder="Type here..."
      />

      <br />
      <br />

      <button onClick={focusInput}>
        Focus Input
      </button>
    </div>
  );
}

export default UseRefDemo;
