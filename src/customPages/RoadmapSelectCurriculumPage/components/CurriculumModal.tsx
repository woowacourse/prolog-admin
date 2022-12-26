import { Modal, TextField } from '@mui/material';
import { FormEvent } from 'react';
import {
  useAddCurriculumMutation,
  useEditCurriculumMutation,
  type Curriculum,
} from '../../../hooks/roadmap';
import useInput from '../../../hooks/useInput';
import CenterBox from '../../common/CenterBox';

interface CurriculumModalProps {
  open: boolean;
  onClose: () => void;
  prevCurriculum?: Curriculum;
}

const CurriculumModal = ({
  open,
  onClose,
  prevCurriculum,
}: CurriculumModalProps) => {
  const name = useInput(prevCurriculum?.name ?? '');

  const { mutateAsync: addCurriculum } = useAddCurriculumMutation();
  // @FIXME: add 상황인 경우 임의로 -1 로 지정
  const { mutateAsync: editCurriculum } = useEditCurriculumMutation(
    prevCurriculum?.curriculumId ?? -1
  );

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!name.value) {
      return;
    }

    if (prevCurriculum) {
      await editCurriculum({
        name: name.value,
      });
    } else {
      await addCurriculum({
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
          <button>커리큘럼 추가</button>
        </form>
      </CenterBox>
    </Modal>
  );
};

export default CurriculumModal;
