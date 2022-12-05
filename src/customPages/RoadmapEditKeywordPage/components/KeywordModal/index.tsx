import { Modal, TextField } from '@mui/material';
import { FormEvent } from 'react';
import { useParams } from 'react-router-dom';
import {
  KeywordResponse,
  useAddKeyword,
  useEditKeyword,
} from '../../../../hooks/roadmap';
import useInput from '../../../../hooks/useInput';
import {
  validateDescription,
  validateName,
  validateImportance,
  validateOrder,
} from '../../../../utils/validator';
import CenterBox from '../../../common/CenterBox';

export type KeywordModalProps = {
  open: boolean;
  onClose: () => void;
  keywordCount?: number;
  prevKeyword?: KeywordResponse;
  parentKeywordId?: number | null;
};

export const KeywordModal = ({
  open,
  onClose,
  keywordCount,
  prevKeyword,
  parentKeywordId,
}: KeywordModalProps) => {
  const sessionId = Number(useParams().sessionId);

  const { mutateAsync: addKeyword } = useAddKeyword();
  const { mutateAsync: editKeyword } = useEditKeyword();

  const name = useInput(prevKeyword?.name ?? '', validateName);
  const importance = useInput(
    String(prevKeyword?.importance ?? ''),
    validateImportance
  );
  const description = useInput(
    prevKeyword?.description ?? '',
    validateDescription
  );
  const order = useInput(
    String(prevKeyword?.order ?? keywordCount ?? 1),
    validateOrder
  );

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (name.value && importance.value && description.value) {
      if (prevKeyword) {
        await editKeyword({
          sessionId,
          keywordId: prevKeyword.keywordId,
          name: name.value,
          importance: Number(importance.value),
          description: description.value,
          order: prevKeyword.order,
          parentKeywordId: prevKeyword.parentKeywordId,
        });
      }

      if (parentKeywordId !== undefined) {
        await addKeyword({
          sessionId,
          name: name.value,
          importance: Number(importance.value),
          description: description.value,
          order: Number(order.value),
          parentKeywordId,
        });
      }
      onClose();
    }
  };

  const isAllValidated =
    name.isValidated && description.isValidated && importance.isValidated;

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
              multiline
              maxRows={4}
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
          <div>
            <TextField
              required
              disabled
              label="순서"
              defaultValue={prevKeyword?.order}
              fullWidth
            />
          </div>
          <div>
            <TextField
              required
              disabled
              label="상위 키워드 Id"
              defaultValue={prevKeyword?.parentKeywordId}
              fullWidth
            />
          </div>
          <button disabled={!isAllValidated}>
            {prevKeyword ? '수정 완료' : '키워드 추가'}
          </button>
        </form>
      </CenterBox>
    </Modal>
  );
};
