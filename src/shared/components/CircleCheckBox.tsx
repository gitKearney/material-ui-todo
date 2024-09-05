import {Checkbox, FormControlLabel, FormGroup} from "@mui/material";
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import {blue, grey, orange, pink} from "@mui/material/colors";
import {useTodoStore} from "../../stores/todoStore.ts";
import {useEffect, useState} from "react";
import {useAnalytics} from "../../hooks/todo/analytics.hook.ts";

export type CircleCheckBoxProps = {
  priority: number;
  name: string,
  position: number;
  status: string
}

const CircleCheckbox = (props: CircleCheckBoxProps) => {
  const {toggleTodo} = useTodoStore((state) => state);
  const [isChecked, setChecked] = useState<boolean>(props.status === 'done');
  const {client} = useAnalytics();

  useEffect(() => {
    if (props.status === 'done') {
      client('todo_marked', props.name, props.priority);
    } else {
      client('todo_unmarked', props.name, props.priority);
    }

    setChecked(props.status === 'done');
  }, [props.status])

  let color = '';
  switch (props.priority) {
    case 4:
      color = grey[500];
      break;
    case 3:
      color = blue[500];
      break;
    case 2:
      color = orange[500];
      break;
    case 1:
      color = pink[500];
  }

  const handleChange = () => {
    toggleTodo(props.position);
  }

  // local closure Component
  const CircularCheckbox = () => (
    <Checkbox inputProps={{ 'aria-label': props.name }}
              onChange={handleChange}
              icon={<RadioButtonUncheckedIcon />}
              checkedIcon={<CheckCircleIcon sx={{color}} />}
              sx={{ color: color }}
              checked={isChecked}
  />);

  return (
    <FormGroup>
      <FormControlLabel control={<CircularCheckbox />}
                        label={props.name}
                        sx={{
                          textDecorationLine: isChecked? 'line-through': '',
                          textDecorationThickness: isChecked ? '2px': '',
                          color: isChecked ? grey[400] : grey[900],
                        }}
      />
    </FormGroup>
  )
};

export default CircleCheckbox;