import { Box, IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useDeleteHabit } from '../../hooks/habitApiHooks';

export interface DeleteButtonProps {
  habitId: string;
}

const DeleteButton: React.FC<DeleteButtonProps> = ({ habitId }) => {
  const navigate = useNavigate();
  const { deleteHabit } = useDeleteHabit();

  const handleDelete = () => {
    deleteHabit(habitId);
    navigate('/flexihabit/dashboard');
  };
  return (
    <IconButton
      onClick={handleDelete}
      sx={{
        color: 'secondary.contrastText',
        fontSize: { xs: '1.2rem', sm: '1.4rem' },
        fontFamily: 'Kalam',
        p: '0.5rem',
        borderRadius: '40px',
        mb: '2rem',
        '&:hover': {
          borderRadius: '40px',
        },
      }}
    >
      Delete
    </IconButton>
  );
};

export default DeleteButton;
