import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';


type ListProps = {
  rows: { id: number }[];
  onClickMove: (id: number) => void;
  // onClickEdit;
  // onClickDelete;
};

const SessionList = ({
  rows,
  onClickMove,
}: // onClickAdd,
// onClickEdit,
// onClickDelete,
ListProps) => {
  const columns = Object.keys(rows[0]);

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            {columns.map((column) => (
              <TableCell key={column}>{column}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              {Object.values(row).map((value, index) => (
                <TableCell key={index} component="th" scope="row">
                  {value}
                </TableCell>
              ))}
              <TableCell onClick={() => onClickMove(row.id)} align="right">
                <Button>이동</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default SessionList;
