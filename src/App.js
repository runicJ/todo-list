import { v4 as uuid } from "uuid";
import './App.css';
import { useEffect, useState } from "react";
import { RadioGroup } from "./components/RadioGroup";
import { Select } from "./components/Select";
import { TodoItem } from "./components/TodoItem";
import { Button } from "./components/Button";

// camelcase -> 띄어쓰기가 필요한 곳에 대문자로 표시한다
// ex) background-color -> backgroundColor
//     font-size -> fontSize
function App() {
  // react way
  // state는 새로운 값으로 대체된다
  const [inputValue, setInputValue] = useState("");
  /**
   * 세트메뉴
   * {
   *  id: 중복되지 않는 id값
   *  name: 메뉴 이름
   *  price: 가격
   *  hamburger: 햄버거 종류
   *  isPotato: 감자튀김을 받을지 말지
   *  soda: 음료수 종류
   * }
   */
  /**
  * TODO object, 객체
  * {
  * id: 중복되지 않는 id값, uuid 항상 고유한 키값이 나오는 암호화 로직을 갖고 있는 라이브러리 // npm i uuid
  * content: 할 일에 대해 적은 내용 string ('할일 1')
  * createAt: 생성된 시간 number (0~9128439184921490)
  * idDone: 완료 여부 (true, false)
  * }
   */

  const [todos, setTodos] = useState([]);
  const [sort, setSort] = useState("NONE");
  const [filter, setFilter] = useState("ALL");
  const [updateTargetId, setUpdateTargetId] = useState("");

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem("todos"));
    if (!storedTodos || storedTodos.length === 0) return;
    setTodos(storedTodos);
  }, []);

  /** computedValue */
  const isUpdateMode = Boolean(updateTargetId);

  const computedTodos = todos
    .filter((todo) => {
      if (filter === "ALL") return true;
      if (filter === "DONE") return todo.isDone === true;
      if (filter === "NOT_DONE") return todo.isDone === false;
    })
    .sort((a, b) => {
      if (sort === "NONE") return 0;
      if (sort === "CREATED_AT") return b.createdAt - a.createdAt;
      if (sort === "CONTENT") return a.content.localeCompare(b.content);
    });

  // console.log({ sort });
  // state 변화하는 값, 임시적인 값
  // React -> state가 변할때마다 화면을 다시 그린다.
  // ["할일 1", "할일 2"] -> ["할일 1", "할일 2", "할일 3"]];

  const updateTodos = (nextTodos) => {
    localStorage.setItem("todos", JSON.stringify(nextTodos));
    setTodos(nextTodos);
  };

  return (
    // JSX (JS -> HTML)
    <div className="App">
      <h1 className="header">TODO LIST</h1>
      <div className="filter-container">
        <div>
          <span>필터 : </span>
          <RadioGroup
            values={["ALL", "DONE", "NOT_DONE"]}
            labels={["전체", "완료", "미완료"]}
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          />
        </div>

        <div>
          <span htmlFor="sort">정렬 : </span>
          <Select
            values={["NONE", "CREATED_AT", "CONTENT"]}
            labels={["생성순", "최신순", "가나다순"]}
            value={sort}
            onChange={(e) => setSort(e.target.value)}
          />
        </div>
      </div>

      {/*
      SPA(Single Page Application), CSR(client Side Rendering  <-> SSR, Server side rendering)
      client가 dom그리기를 제어한다.
      */}
      <form
        className="add-input-container"
        onSubmit={(e) => {
          // form은 기본적으로 새로고침을 trigger, why? 새로운 html파일을 내려받아야하니까
          e.preventDefault();
          if (!inputValue) return;
          const newTodo = {
            id: uuid(),
            content: inputValue,
            isDone: false,
            createdAt: Date.now(),
          };
          updateTodos([...todos, newTodo]);
          setInputValue("");
        }}
      >
        {/* (인자) => {어떤 행동} */}
        <input
          className="add-input"
          // Input의 제어권을 React(JS)가 가지고 있을 수 있게, state값을 주입했다.
          value={inputValue}
          // Input의 값이 변하는 이벤트가 발생했을 때, 제어권을 가진 React(JS)의 state값을 변경한다.
          onChange={(e) => {
            setInputValue(e.target.value);
          }}
          disabled={isUpdateMode}
        />
        <Button disabled={!inputValue || isUpdateMode}>{"ADD"}</Button>
      </form>

      <div className="todo-list-container">
        {computedTodos.map((todo) => (
          <TodoItem
            className="todo-list-item"
            key={todo.id}
            todo={todo}
            updateTargetId={updateTargetId}
            setUpdateTargetId={setUpdateTargetId}
            onTodoListDelete={(itemId) => {
              const nextTodos = todos.filter((item) => item.id !== itemId);
              updateTodos(nextTodos);
            }}
            onTodoListUpdate={(itemId, nextTodo) => {
              const nextTodos = todos.map((todo) =>
                todo.id === itemId ? { ...todo, ...nextTodo } : todo
              );
              updateTodos(nextTodos);
            }}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
