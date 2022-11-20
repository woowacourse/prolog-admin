import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';


type ListProps = {
    childrenKeywordList: { keywordId: number }[];
  // onClickEdit;
  // onClickDelete;
};

const SubKeywordList = ({
  childrenKeywordList,
}: // onClickAdd,
// onClickEdit,
// onClickDelete,
ListProps) => {
  const columns = Object.keys(childrenKeywordList[0]);
  console.log(columns);

    
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead sx={{ backgroundColor: '#E2E2E2'}}>
          <TableRow>
            {columns.map((column) => (
              <TableCell key={column}>{column}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {childrenKeywordList.map((topKeyword) => (
            <TableRow
              key={topKeyword.keywordId}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              {Object.values(topKeyword).map((topKeywordValue, index) => {
                if (Array.isArray(topKeywordValue)) {
                  return <SubKeywordList key={index} childrenKeywordList={topKeywordValue} />;
                } else {
                  return (
                    <TableCell key={index} component="th" scope="row">
                      {topKeywordValue}
                    </TableCell>
                  );
                }
              })}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default SubKeywordList;
