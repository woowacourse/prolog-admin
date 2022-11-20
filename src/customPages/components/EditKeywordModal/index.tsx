import { Modal, Box, TextField } from '@mui/material';
import useInput from '../../../hooks/useInput';
import { ChildrenKeyword } from '../../../types';
import { validateName } from '../../../utils/validator';

export const EditKeywordModal = ({
  open,
  onClose,
  keywordContents,
}: {
  open: boolean;
  onClose: () => void;
  keywordContents?: ChildrenKeyword;
}) => {
  const name = useInput(
    keywordContents ? keywordContents.name : '',
    validateName
  );
  const order = useInput(keywordContents ? String(keywordContents.order) : '');
  const importance = useInput(
    keywordContents ? String(keywordContents.importance) : ''
  );
  const description = useInput(
    keywordContents ? keywordContents.description : ''
  );

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <form
          onSubmit={(event) => {
            event.preventDefault();
            console.log('수정완료', name.value, order.value);
          }}
        >
          <div>
            <TextField
              required
              label="이름"
              onChange={name.onChange}
              value={name.value}
              error={!name.isValidated}
              helperText={name.message}
              fullWidth
            />
          </div>
          <div>
            <TextField
              required
              label="설명"
              onChange={description.onChange}
              value={description.value}
              error={!description.isValidated}
              helperText={description.message}
              fullWidth
            />
          </div>
          <div>
            <TextField
              required
              label="순서"
              onChange={order.onChange}
              value={order.value}
              error={!order.isValidated}
              helperText={order.message}
              fullWidth
            />
          </div>
          <div>
            <TextField
              required
              label="중요도"
              onChange={importance.onChange}
              value={importance.value}
              error={!importance.isValidated}
              helperText={importance.message}
              fullWidth
            />
          </div>

          <button>수정 완료</button>
        </form>
      </Box>
    </Modal>
  );
};

export const style = {
  position: 'absolute' as const,
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 700,
  bgcolor: 'background.paper',
  border: '2px solid #646464',
  boxShadow: 24,
  p: 4,
};
