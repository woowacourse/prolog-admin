import { TableCell, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { KeywordResponse } from '../../../../hooks/roadmap';

export const CustomTableCell = ({
  item,
  sessionId,
}: {
  item: KeywordResponse;
  sessionId: number;
}) => {
  const navigate = useNavigate();

  return (
    <>
      {Object.values(item).map((itemValue, index) => {
        if (Array.isArray(itemValue)) {
          return (
            <TableCell key={index} component="th" scope="row">
              <Button
                variant="contained"
                onClick={() =>
                  navigate(`/roadmap/${sessionId}/editSubKeywords`, {
                    state: item,
                  })
                }
              >
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
