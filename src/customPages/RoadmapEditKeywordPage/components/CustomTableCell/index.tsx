import { TableCell, Button } from '@mui/material';
import { useSetAtom } from 'jotai';
import { useNavigate, useParams } from 'react-router-dom';
import { KeywordResponse } from '../../../../hooks/roadmap';
import { selectedKeywordIdAtom } from '../../../../store';

export const CustomTableCell = ({ item }: { item: KeywordResponse }) => {
  const { sessionId, keywordId } = useParams();
  const navigate = useNavigate();

  const setSelectedKeywordId = useSetAtom(selectedKeywordIdAtom);

  const handleSubKeywordButtonClick = () => {
    if (location.href.includes('editSubKeywords')) {
      setSelectedKeywordId((prev) => [...prev, item.keywordId]);
    } else {
      navigate(`/roadmap/${sessionId}/${keywordId}/editSubKeywords`);
      setSelectedKeywordId([]);
    }
  };

  return (
    <>
      {Object.values(item).map((itemValue, index) => {
        if (Array.isArray(itemValue)) {
          return (
            <TableCell key={index} component="th" scope="row">
              <Button variant="contained" onClick={handleSubKeywordButtonClick}>
                하위 키워드({itemValue.length}개) 목록 보기
              </Button>
            </TableCell>
          );
        }

        return (
          <TableCell key={index} component="th" scope="row">
            {itemValue}
          </TableCell>
        );
      })}
    </>
  );
};
