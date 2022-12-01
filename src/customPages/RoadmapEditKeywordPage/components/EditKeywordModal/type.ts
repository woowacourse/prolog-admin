import { ChildrenKeyword } from '../../../../types';

export type EditKeywordModalProps = {
  open: boolean;
  onClose: () => void;
  keywordContents: ChildrenKeyword;
  sessionId: number;
  keywordId: number;
};
