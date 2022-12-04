import { Modal, TextField } from '@mui/material';
import { FormEvent } from 'react';
import { useParams } from 'react-router-dom';
import { Quiz, useAddQuiz, useEditQuiz } from '../../hooks/roadmap';
import useInput from '../../hooks/useInput';
import CenterBox from '../common/CenterBox';

interface QuizModalProps {
  open: boolean;
  onClose: () => void;
  prevQuiz?: Quiz;
}

const QuizModal = ({ open, onClose, prevQuiz }: QuizModalProps) => {
  const { sessionId, keywordId } = useParams();
  const question = useInput(prevQuiz?.question ?? '');

  const { mutateAsync: addQuiz } = useAddQuiz({
    sessionId: Number(sessionId),
    keywordId: Number(keywordId),
  });
  const { mutateAsync: editQuiz } = useEditQuiz({
    sessionId: Number(sessionId),
    keywordId: Number(keywordId),
  });

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!question.value) {
      return;
    }

    if (prevQuiz) {
      await editQuiz({ quizId: prevQuiz?.quizId, question: question.value });
    } else {
      await addQuiz(question.value);
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
              onChange={question.onChange}
              value={question.value}
            />
          </div>
          <button>키워드 추가</button>
        </form>
      </CenterBox>
    </Modal>
  );
};

export default QuizModal;
