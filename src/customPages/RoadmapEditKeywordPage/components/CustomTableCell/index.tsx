import { Button, TableCell } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { KeywordResponse } from '../../../../hooks/roadmap';
import { useQueryParams } from '../../../../hooks/useQueryParams';

export const CustomTableCell = ({
  item,
  depth,
}: {
  item: KeywordResponse;
  depth: number;
}) => {
  const { sessionId, keywordId } = useParams();
  const queryParams = useQueryParams();
  const navigate = useNavigate();

  const handleRecommendedPostsButtonClick = () => {
    if (location.href.includes('editRecommendedPosts')) {
      const search =
        depth === 1
          ? `?second=${item.keywordId}`
          : depth === 2
          ? `?second=${queryParams.second}&thrid=${item.keywordId}`
          : '';
      navigate({
        search,
      });
    } else {
      navigate(`/roadmap/${sessionId}/${keywordId}/editRecommendedPosts`, {
        state: item,
      });
    }
  };

  const handleSubKeywordButtonClick = () => {
    if (location.href.includes('editSubKeywords')) {
      const search =
        depth === 1
          ? `?second=${item.keywordId}`
          : depth === 2
          ? `?second=${queryParams.second}&thrid=${item.keywordId}`
          : '';
      navigate({
        search,
      });
    } else {
      navigate(`/roadmap/${sessionId}/${keywordId}/editSubKeywords`);
    }
  };

  return (
    <>
      {Object.values(item).map((itemValue, index) => {
        if (Array.isArray(itemValue)) {
          if (depth >= 2) {
            return;
          }
          return (
            <TableCell key={index} component="th" scope="row">
              {index === 6 ? (
                <Button
                  variant="contained"
                  onClick={handleRecommendedPostsButtonClick}
                >
                  추천 포스트({itemValue.length}개) 목록 보기
                </Button>
              ) : (
                <Button
                  variant="contained"
                  onClick={handleSubKeywordButtonClick}
                >
                  하위 키워드({itemValue.length}개) 목록 보기
                </Button>
              )}
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
