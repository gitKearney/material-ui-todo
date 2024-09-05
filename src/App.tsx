import {Container} from "@mui/material";
import TodoList from "./todo/components/TodoList.tsx";
import InputModal from "./todo/components/InputModal.tsx";
import {useTodoStore} from "./stores/todoStore.ts";
import {useEffect} from "react";

export type TodoListType = {
  name: string;
  priority: number;
  status: string;
}

function App() {
  const {todos} = useTodoStore((state) => state);

  useEffect(() => {
    fetch('https://restcountries.com/v3.1/name/usa')
      .then((res) => res.json())
      .then((res) => {
        document.title = `${(res[0]['flag'])}` + document.title
      })
  }, []);

  return (
    <Container maxWidth="sm">
      <TodoList todos={todos} status={'not_done'} />
      <InputModal />
      <TodoList todos={todos} status={'done'} />
    </Container>
  )
}

export default App
