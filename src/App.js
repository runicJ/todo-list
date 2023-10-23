import { v4 as uuid } from "uuid";
import './App.css';
import { useState } from "react";

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
  const [sort, setSort] = useState("");
  const [filter, setFilter] = useState("");

  const [updateValue, setUpdateValue] = useState("");
  const [updateTargetIndex, setUpdateTargetIndex] = useState(-1);
  /** computedValue */
  const isUpdateMode = updateTargetIndex >= 0;

  const computedTodos = todos
    .filter((todo) => {
      if (filter === 'ALL') return true;
      if (filter === 'DONE') return todo.isDone === true;
      if (filter === "NOT DONE") return todo.isDone === false; // !todo.isDone
    })
    .sort((a, b) => {
      if (sort === 'none') return 0; // 0이 의미하는 것 바꾸지 않겠다
      if (sort === 'createAt') return b.createAt - a.createAt;
      if (sort === 'content') return a.content.localeCompare(b.content);
    });

  // console.log({ sort });
  // state 변화하는 값, 임시적인 값
  // React -> state가 변할때마다 화면을 다시 그린다.
  // ["할일 1", "할일 2"] -> ["할일 1", "할일 2", "할일 3"]];

  return (
    // JSX (JS -> HTML)
    <div className="App">
      <h1>TODO LIST</h1>
      <div>
        <label>필터 : </label>
        <input
          type="radio"
          value="ALL"
          checked={filter === "ALL"}
          onChange={(e) => setFilter(e.target.value)}
        />
        <label>전체</label>
        <input
          type="radio"
          value="DONE"
          checked={filter === "DONE"}
          onChange={(e) => setFilter(e.target.value)}
        />
        <label>완료</label>
        <input type="radio"
          value="NOT DONE"
          checked={filter === "NOT DONE"}
          onChange={(e) => setFilter(e.target.value)}
        />
        <label>미완료</label>
      </div>
      <div>
        <label htmlFor="sort">정렬 : </label>
        <select value={sort} onChange={(e) => setSort(e.target.value)}>
          <option value="none">생성순</option>
          <option value="createAt">최신순</option>
          <option value="content">가나다순</option>
        </select>
      </div>
      {/*
      SPA(Single Page Application), CSR(client Side Rendering  <-> SSR, Server side rendering)
      client가 dom그리기를 제어한다.
      */}
      <form
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
          setTodos([...todos, newTodo]);
          setInputValue("");
        }}
      >
        {/* (인자) => {어떤 행동} */}
        <input
          // Input의 제어권을 React(JS)가 가지고 있을 수 있게, state값을 주입했다.
          value={inputValue}
          // Input의 값이 변하는 이벤트가 발생했을 때, 제어권을 가진 React(JS)의 state값을 변경한다.
          onChange={(e) => {
            setInputValue(e.target.value);
          }}
          disabled={isUpdateMode}
        />
        <button disabled={!inputValue || isUpdateMode}>{"ADD"}</button>
      </form>
      <div>
        {/* DRY Don't Repeat Yourself */}
        {/* [할일 1, 할일 2, 할일 3]  */}
        {computedTodos.map((todo, index) => (
          <div key={todo.id}>
            <input
              type="checkbox"
              checked={todo.isDone}
              onChange={(e) => {
                /**
                 * todos :
                 * { content : "할일 1"
                 * createdAt : 1697782607507
                 * id : "38b5c80a-008a-47f4-81f1-bb50fa206c29"
                 * isDone : false },
                 * 두번째 todo,
                 * 세번째 todo
                 */
                // map하는 것은 처음부터 끝까지 보는 것
                const nextTodos = todos.map((todo, idx) =>
                  idx === index ? { ...todo, isDone: e.target.checked } : todo
                );
                setTodos(nextTodos);
              }}
            />
            {updateTargetIndex === index ? (
              <input
                value={updateValue}
                onChange={(e) => setUpdateValue(e.target.value)}
              />
            ) : (
              <span
                style={{ textDecoration: todo.isDone ? "line-through" : "" }}
              >
                {todo.content}
              </span>
            )}
            <button
              onClick={() => {
                const nextTodos = todos.filter((_, idx) => idx !== index);
                setTodos(nextTodos);
              }}
              disabled={isUpdateMode}
            >
              DEL
            </button>
            <button
              onClick={() => {
                if (isUpdateMode) {
                  const nextTodos = todos.map((todo, index) =>
                    index === updateTargetIndex
                      ? { ...todo, content: updateValue }
                      : todo
                  );
                  setTodos(nextTodos);
                  setUpdateValue("");
                  setUpdateTargetIndex(-1);
                  return;
                }

                setUpdateTargetIndex(index);
                setUpdateValue(todo.content);
              }}
              disabled={isUpdateMode && index !== updateTargetIndex}
            >
              UPDATE
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;

// 내용 수정(update 할 수 있는 동작), 우선 순위, 디자인 +? 쓰레기통 아이콘?
// 심화 - 새로 고침 했을때 내용이 그대로 남아있게 하기