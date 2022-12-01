export type AddKeywordModalProps = {
  open: boolean;
  onClose: () => void;
  sessionId: number;
  parentKeywordId: number | null;
};
