import { Modal, TextField } from '@mui/material';
import { FormEvent } from 'react';
import { useParams } from 'react-router-dom';
import {
  RecommendedPost,
  useAddRecommendedPost,
  useEditRecommendedPost,
} from '../../hooks/roadmap';
import useInput from '../../hooks/useInput';
import CenterBox from '../common/CenterBox';

interface RecommendedPostModalProps {
  open: boolean;
  onClose: () => void;
  prevRecommendedPost?: RecommendedPost;
}

const RecommendedPostModal = ({
  open,
  onClose,
  prevRecommendedPost,
}: RecommendedPostModalProps) => {
  const { keywordId } = useParams();
  const url = useInput(prevRecommendedPost?.url ?? '');

  const { mutateAsync: addRecommendedPost } = useAddRecommendedPost({
    keywordId: Number(keywordId),
  });
  const { mutateAsync: editRecommendedPost } = useEditRecommendedPost({
    keywordId: Number(keywordId),
  });

  const clearAllValue = () => {
    url.setValue('');
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!url.value) {
      return;
    }

    if (prevRecommendedPost) {
      await editRecommendedPost({
        id: prevRecommendedPost?.id,
        url: url.value,
      });
    } else {
      await addRecommendedPost(url.value);
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
              onChange={url.onChange}
              value={url.value}
            />
          </div>
          <button>추천 포스트 {prevRecommendedPost ? '수정' : '추가'}</button>
        </form>
      </CenterBox>
    </Modal>
  );
};

export default RecommendedPostModal;
