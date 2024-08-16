import { Box, IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useDeleteHabit } from '../../hooks/habitApiHooks';

export interface PageContentWrapperProps {
  children: React.ReactNode;
}

const PageContentWrapper: React.FC<PageContentWrapperProps> = ({ children }) => {
  return (
    <Box
      sx={{
        flexGrow: 1,
        height: '100%',
        width: 'auto',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      {children}
    </Box>
  );
};

export default PageContentWrapper;
