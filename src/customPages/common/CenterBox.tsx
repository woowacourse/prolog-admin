import { Box } from '@mui/material';
import { PropsWithChildren } from 'react';

const CenterBox = ({ children }: PropsWithChildren) => {
  return <Box sx={style}>{children}</Box>;
};

export default CenterBox;

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #646464',
  boxShadow: 24,
  p: 4,
};
