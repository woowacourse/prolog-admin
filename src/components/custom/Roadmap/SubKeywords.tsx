import { useGetChildrenKeywordList } from '../../../hooks/roadmap';
import { useNavigate, useParams } from 'react-router-dom';
import KeywordList from '../../common/TopKeywordList';

const SubKeywords = () => {
  const navigate = useNavigate();
  const { sessionId, keywordId } = useParams();
  const {childrenKeywordList}= useGetChildrenKeywordList({
    sessionId: Number(sessionId),
    keywordId: Number(keywordId),
  });

  console.log(childrenKeywordList);
  if (typeof childrenKeywordList === 'undefined') {
    return <h3>선택하신 최상위 키워드 {keywordId}에 키워드가 존재하지 않습니다.</h3>;
  }

  return (
    <div>
      <h2>키워드 선택</h2>
      {/* <KeywordList
        rows={childrenKeywordList}
        onClickMove={(keywordId: number) => {
          // navigate(`/roadmap/${sessionId}/${keywordId}`);
        }}
      /> */}
    </div>
  );
};

export default SubKeywords;
