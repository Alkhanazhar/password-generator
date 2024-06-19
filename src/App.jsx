import { useCallback, useEffect, useState } from "react";
import "./App.css";

function App() {
  const [password, setPassword] = useState("");
  const [passwordLength, setPasswordLength] = useState(10);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const passwordGenerate = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numberAllowed) str += "0123456789";
    if (charAllowed) str += "!@#$%^&*()_+~?/";
    for (let i = 0; i < passwordLength; i++) {
      const char = Math.floor(Math.random() * str.length);
      pass += str.charAt(char);
    }
    console.log(pass);
    setPassword(pass);
  }, [passwordLength, numberAllowed, charAllowed]);
  useEffect(() => {
    passwordGenerate();
  }, [passwordLength, numberAllowed, charAllowed]);

  const copyToclipboard=()=>{
    window.navigator.clipboard.writeText(password)
  }
  return (
    <div className="w-full my-4">
      <div className="w-full max-w-md mx-auto bg-gray-700 p-4 rounded-lg">
        <h1 className="text-center capitalize">password generator</h1>
        <div className="flex h-full my-2">
          <input
            type="text"
            className="w-full p-2 outline-none text-black"
            placeholder="password"
            value={password}
          />
          <button className="px-4 py-2 bg-green-600 shrink-0" onClick={copyToclipboard}>copy</button>
        </div>
        <div className="flex items-center justify-between">
          <div>
            <input
              type="range"
              min={8}
              max={30}
              onChange={(e) => setPasswordLength(e.target.value)}
              value={passwordLength}
            />
            <span className="text-xl">{passwordLength}</span>
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              onChange={() => setNumberAllowed((prev) => !prev)}
            />
            number
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              onChange={() => setCharAllowed((prev) => !prev)}
            />
            characters
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
