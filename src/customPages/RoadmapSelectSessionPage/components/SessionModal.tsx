import { Modal, TextField } from '@mui/material';
import { FormEvent } from 'react';
import { useParams } from 'react-router-dom';
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
  const params = useParams();
  const curriculumId = Number(params.curriculumId);

  const name = useInput(prevSession?.name ?? '');

  const { mutateAsync: addSession } = useAddSessionMutation(curriculumId);
  // @FIXME: add 상황인 경우 임의로 -1 로 지정
  const { mutateAsync: editSession } = useEditSessionMutation(
    curriculumId,
    prevSession?.sessionId ?? -1
  );

  const clearAllValue = () => {
    name.setValue('');
  };

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
    clearAllValue();
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
          <button>세션 {prevSession ? '수정' : '추가'}</button>
        </form>
      </CenterBox>
    </Modal>
  );
};

export default SessionModal;
