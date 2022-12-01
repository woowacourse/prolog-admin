import { KeywordResponse } from '../../../../hooks/roadmap';

export type EditKeywordModalProps = {
  open: boolean;
  onClose: () => void;
  prevKeyword?: KeywordResponse;
};
