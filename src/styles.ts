import { SxProps, Theme } from '@mui/material';

export const containerStyle: SxProps<Theme> = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  position: 'relative',
  minHeight: 'calc(100vh - 204px)',
  backgroundColor: '#f5f5f5',
  pb: 4,
};

export const paperStyle: SxProps<Theme> = {
  width: '30%',
  maxWidth: '900px',
  mt: 4,
  py: 4,
  px: '50px',
  borderRadius: 2,
  background: `repeating-linear-gradient(
    white,
    white 32px,
    #ececec 32px,
    #ececec 33px
  )`,
};

export const rowStyle: SxProps<Theme> = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  mb: 2,
};

export const textFieldStyle: SxProps<Theme> = {
  '& .MuiInputBase-root': { border: 'none' },
  ml: 1,
  flex: 1,
};

export const sendButtonContainerStyle: SxProps<Theme> = {
  width: '30%',
  maxWidth: '900px',
  left: '25px',
  position: 'relative',
  display: 'flex',
  justifyContent: 'flex-end',
  mt: 2,
};