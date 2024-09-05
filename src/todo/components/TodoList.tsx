import {TodoListType} from "../../App.tsx";
import CircleCheckBox from "../../shared/components/CircleCheckBox";
import {ReactNode} from "react";
import {Box, Button, ButtonGroup} from "@mui/material";
import {grey} from "@mui/material/colors";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import {useModalStore} from "../../stores/modalStore.ts";
import {useAnalytics} from "../../hooks/todo/analytics.hook.ts";

type TodoListProps = {
  status: string
  todos: TodoListType[];

};

export default function TodoList({status, todos}: TodoListProps) {
  const openToIndex = useModalStore((state) => state.openToIndex);
  const {client} = useAnalytics()

  const renderTodos = () => {
    const fields:ReactNode[] =  [];
    todos.forEach((todo: TodoListType, index: number) => {
      if (todo.status === status) {
        fields.push(
          <CircleCheckBox name={todo.name} priority={todo.priority} position={index} status={todo.status} />
        );
      }
    });

    if (!fields.length) {
      return [];
    }


   return fields;
  }

  const renderTodoRow = () => {
    const todoCheckBoxes = renderTodos();

    return todoCheckBoxes.map((row, index) => {
      return (
        <Box display="flex" key={`todo${index}`} justifyContent="space-between"
             sx={{paddingX: 1, borderWidth: '2px', borderBottomStyle: 'solid', borderColor: grey[500]}}>
          <Box>{row}</Box>
          <ButtonGroup variant="text" aria-label="Basic button group">
            <Button onClick={() => {
              client('todo_edit', todos[index]['name'], todos[index]['priority']);
              openToIndex(index);
            }}><EditIcon /></Button>
            <Button onClick={() => {
              client('todo_delete', todos[index]['name'], todos[index]['priority'])
            }}><DeleteIcon /></Button>
          </ButtonGroup>
        </Box>
      )
    });
  };

  return (
    <div>
      {renderTodoRow()}
    </div>
  )
}