export type ChildrenKeyword = {
  keywordId: number;
  name: string;
  order: number;
  importance: number;
  description: string;
  parentKeywordId: number | null;
};
