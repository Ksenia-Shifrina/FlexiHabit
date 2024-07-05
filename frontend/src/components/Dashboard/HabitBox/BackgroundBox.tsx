import React from 'react';
import { Box, Typography, IconButton } from '@mui/material';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import { useNavigate } from 'react-router-dom';

export interface BackgroundBoxProps {
  targetDaysDefaultCount: number;
  statement: string;
  id: string;
}

const BackgroundBox: React.FC<BackgroundBoxProps> = ({ targetDaysDefaultCount, statement, id }) => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        position: 'absolute',
        top: { xs: -55, sm: -65 },
        left: -40,
        width: '100%',
        height: '100%',
        bgcolor: 'secondary.main',
        borderRadius: '10px',
        boxShadow: 1,
        zIndex: 1,
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        pl: { xs: 1.5, sm: 3 },
        pt: { xs: 1, sm: 1.5 },
        m: 3,
      }}
    >
      <Typography
        variant="body2"
        sx={{ textAlign: 'left', color: 'secondary.contrastText', fontSize: { xs: '0.8rem', sm: '0.9rem' } }}
      >
        {targetDaysDefaultCount === 7 && `I will ${statement} every day.`}
        {targetDaysDefaultCount === 1 && `I will ${statement} 1 time a week.`}
        {targetDaysDefaultCount > 1 &&
          targetDaysDefaultCount < 7 &&
          `I will ${statement} ${targetDaysDefaultCount} times a week.`}
      </Typography>
      <IconButton
        sx={{
          color: 'icons.light',
          mr: 1.5,
          p: 0,
        }}
        onClick={() => navigate(`/flexihabit/edithabit/${id}`)}
      >
        <EditRoundedIcon
          sx={{
            fontSize: { xs: '0.7rem', sm: '1rem' },
          }}
        />
      </IconButton>
    </Box>
  );
};

export default BackgroundBox;
