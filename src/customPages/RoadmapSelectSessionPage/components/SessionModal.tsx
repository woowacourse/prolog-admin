import { Modal, TextField } from '@mui/material';
import { FormEvent } from 'react';
import {
  useAddSessionMutation,
  useEditSessionMutation,
  type Session,
} from '../../../hooks/roadmap';
import useInput from '../../../hooks/useInput';
import CenterBox from '../../common/CenterBox';

interface SessionModalProps {
  open: boolean;
  onClose: () => void;
  prevSession?: Session;
}

const SessionModal = ({ open, onClose, prevSession }: SessionModalProps) => {
  const name = useInput(prevSession?.name ?? '');

  const { mutateAsync: addSession } = useAddSessionMutation();
  // @FIXME: add 상황인 경우 임의로 -1 로 지정
  const { mutateAsync: editSession } = useEditSessionMutation(
    prevSession?.id ?? -1
  );

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!name.value) {
      return;
    }

    if (prevSession) {
      await editSession({
        name: name.value,
      });
    } else {
      await addSession({
        name: name.value,
      });
    }

    onClose();
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <CenterBox>
        <form onSubmit={handleSubmit}>
          <div>
            <TextField
              required
              label="설명"
              fullWidth
              multiline
              maxRows={4}
              onChange={name.onChange}
              value={name.value}
            />
          </div>
          <button>세션 추가</button>
        </form>
      </CenterBox>
    </Modal>
  );
};

export default SessionModal;
