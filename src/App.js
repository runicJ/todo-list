import logo from './logo.svg';
import './App.css';
import {useState} from "react";

function App() {
  // react way
  const [todos, setTodos] = useState(["할일 1", "할일 2"]);
  // stat 변화하는 값
  // React -> state가 변할 때마다 화면을 다시 그린다.
  // ["할일 1", "할일 2"];


  return (
    // JSX (JS -> HTML)
    <div className="App">
      <h1>TODO LIST</h1>
      <div>
        <input />
        <button>ADD</button>
      </div>
      {/* {DRY Don't Repeat Yourself} */}
      {todos.map((todo, index) => (
        <div key={index}>
          <input type="checkbox" />
          <span>{todo}</span>
          <button>DEL</button>
        </div>
      ))}
    </div>
  );
}

export default App;

{/* <input
        style={{
          border: "solid 1px green",
          borderRadius: "20px",
          border: "solid 1px green",
          borderRadius: "20px",
          outline: "none",
        }}
      /> */}
// onChange={(e) => {
//   if (e.target.value.includes("바보")) {
//     alert("바보라는 글자는 사용할 수 없습니다.");
//   }
// }}