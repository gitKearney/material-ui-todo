import {Box, Button, Modal, Typography} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import InputForm from "./InputForm";
import {grey, red} from "@mui/material/colors";
import {useModalStore} from "../../stores/modalStore.ts";

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function InputModal() {
  const {open, setOpen, todoIndex} = useModalStore((state) => state);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Button variant="text" onClick={handleOpen}><AddIcon sx={{color: red[400]}} />
        <Typography sx={{color: grey[500]}}>Add Task</Typography>
      </Button>
      <Modal open={open} onClose={handleClose} aria-labelledby="modal-form" aria-describedby="modal-new-task">
        <Box sx={style}>
          <Typography variant="h6" component="h2" id="modal-form">New Task</Typography>
          <Box id="modal-new-task">
            <InputForm todoIndex={todoIndex} />
          </Box>
        </Box>
      </Modal>
    </div>
  )
}