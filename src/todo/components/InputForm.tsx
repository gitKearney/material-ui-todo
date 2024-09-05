import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import {Box, Button, FormControl, MenuItem, Select, SelectChangeEvent} from "@mui/material";
import {ChangeEvent, FormEvent, useEffect, useState} from "react";
import {useTodoStore} from "../../stores/todoStore.ts";
import {useModalStore} from "../../stores/modalStore.ts";
import {useAnalytics} from "../../hooks/todo/analytics.hook.ts";

export type InputFormProps = {
  todoIndex?: number;
}

export default function InputForm({todoIndex}: InputFormProps) {
  const {addTodo, todos, updateTodo } = useTodoStore((state) => state);
  const setOpen = useModalStore((state) => state.setOpen);
  const clearTodoIndex = useModalStore((state) => state.clearTodoIndex);
  const {client} = useAnalytics();

  const [priority, setPriority] = useState<string>('4');
  const [task, setTask] = useState<string>('');

  useEffect(() => {
    if (todoIndex !== undefined) {
      setTask(todos[todoIndex]['name']);
    }
  }, [todoIndex])

  const _doSave = () => {
    if (task.length) {
      // default to priority of 4
      const _priority = parseInt(priority, 10) || 4;

      if (todoIndex !== undefined) {
        client('todo_edit', task, _priority);
        updateTodo(task, _priority, todoIndex);
        clearTodoIndex();
      } else {
        client('todo_created', task, _priority);
        addTodo({name: task, priority: _priority, status: 'not_done'});
      }

      setTask("");
      setOpen(false);
    }
  };

  const handleEscEnter = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      _doSave();
    }
  }
  const handleSave = (event: FormEvent) => {
    event.preventDefault();
    _doSave();
  }

  return (
    <Box sx={{flexGrow: 1, display: 'flex', alignItems: 'center', alignContent: "center"}}>

      <FormControl sx={{paddingX: 1}}>
        <TextField
          required
          variant="standard"
          id="outlined-required"
          label="Task Name"
          placeholder="Task Name"
          value={task}
          onChange={(event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => setTask(event.target.value)}
          onKeyDown={handleEscEnter}
        />
      </FormControl>

      <FormControl sx={{minWidth: 120, paddingX: 1}}>
        <InputLabel id="priority-label">Priority</InputLabel>
        <Select
          labelId="priority-label"
          id="priority"
          value={priority}
          label="Priority"
          variant="standard"
          onChange={(event: SelectChangeEvent<string>) => setPriority(event.target.value)}
        >
          <MenuItem value={'1'}>P1</MenuItem>
          <MenuItem value={'2'}>P2</MenuItem>
          <MenuItem value={'3'}>P3</MenuItem>
          <MenuItem value={'4'}>P4</MenuItem>
        </Select>
      </FormControl>

      <Button onClick={handleSave} size="large" variant="contained">
        Save
      </Button>
    </Box>
  );
}