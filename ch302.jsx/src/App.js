import logo from "./logo.svg";
import "./App.css";

function myFunction() {
  const a = 1;
  if (true) {
    const a = 2;
    console.log(`first: ${a}`); // maybe 2
  }
  console.log(`second: ${a}`); // maybe 1
}

function App() {
  myFunction();
  const number = 0;
  return (
    <div
      className="App"
      // color="red" // 시작 태그에서는 // 주석이 가능하다.
    >
      {number && <div>내용</div>}
    </div>
  );
}

export default App;
