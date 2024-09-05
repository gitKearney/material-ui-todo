import {Container} from "@mui/material";
import TodoList from "./todo/components/TodoList.tsx";
import InputModal from "./todo/components/InputModal.tsx";
import {useTodoStore} from "./stores/todoStore.ts";

export type TodoListType = {
  name: string;
  priority: number;
  status: string;
}

function App() {
  const {todos} = useTodoStore((state) => state);

  return (
    <Container maxWidth="sm">
      <TodoList todos={todos} status={'not_done'} />
      <InputModal />
      <TodoList todos={todos} status={'done'} />
    </Container>
  )
}

export default App
