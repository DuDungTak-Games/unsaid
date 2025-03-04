import { useState, useEffect } from 'react'
import PocketBase from 'pocketbase'

import './App.css'
import {
  containerStyle,
  paperStyle,
  rowStyle,
  textFieldStyle,
  sendButtonContainerStyle,
} from './styles';

import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  IconButton,
  TextField,
  Paper,
} from '@mui/material';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';


const pb = new PocketBase(import.meta.env.VITE_DB_URL);
function App() {
  // 상대방 정보
  const [receiverName, setReceiverName] = useState('');
  const [receiverBirthYear, setReceiverBirthYear] = useState('');

  // 내 정보
  const [senderName, setSenderName] = useState('');
  const [senderBirthYear, setSenderBirthYear] = useState('');

  // 메시지
  const [message, setMessage] = useState('');

  // "보내기" 확인 다이얼로그
  const [openConfirm, setOpenConfirm] = useState(false);

  // "연도 설정" 다이얼로그 (수신자/발신자 구분)
  const [openYearDialog, setOpenYearDialog] = useState<null | 'receiver' | 'sender'>(null);
  const [tempYear, setTempYear] = useState('');

  // 보내기 버튼 클릭 시
  const handleSendClick = () => setOpenConfirm(true);
  const handleCloseConfirm = () => setOpenConfirm(false);
  const handleConfirmSend = () => {
    console.log('=== 편지 전송 ===');
    console.log(`To. ${receiverName} (${receiverBirthYear})`);
    console.log(`From. ${senderName} (${senderBirthYear})`);
    console.log('Message:', message);
    setOpenConfirm(false);
  };

  // 연도 설정 다이얼로그 열기
  const handleOpenYearDialog = (target: 'receiver' | 'sender') => {
    setOpenYearDialog(target);
    setTempYear('');
  };
  const handleCloseYearDialog = () => setOpenYearDialog(null);
  const handleSaveYear = () => {
    if (openYearDialog === 'receiver') {
      setReceiverBirthYear(tempYear);
    } else {
      setSenderBirthYear(tempYear);
    }
    setOpenYearDialog(null);
  };

  return (
    <>
      {/* 상단바 (헤더) */}
      <AppBar position="fixed">
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Typography variant="h6">못다한 말</Typography>
          <Box>
            <Button color="inherit">편지 쓰기</Button>
            <Button color="inherit">로그인</Button>
            <Button color="inherit">회원가입</Button>
          </Box>
        </Toolbar>
      </AppBar>

      {/* 메인 컨테이너 */}
      <Box sx={{...containerStyle, py:'100px',}}>
        {/* 편지지: 흰색 바탕 + 얇은 줄 */}
        <Paper elevation={3} sx={paperStyle}>
          {/* 수신자 (To.) */}
          <Box sx={rowStyle}>
            <Box sx={{ display: 'flex', alignItems: 'center', flex: 1 }}>
              <Typography variant="body1" sx={{ minWidth: 30 }}>
                To.
              </Typography>
              <TextField
                placeholder="(상대방 이름)"
                variant="standard"
                InputProps={{ disableUnderline: true, sx: { fontSize: '1.1rem' } }}
                sx={textFieldStyle}
                value={receiverName}
                onChange={(e) => setReceiverName(e.target.value)}
              />
            </Box>

            {/* 연도 설정 아이콘 + 표시 */}
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <IconButton onClick={() => handleOpenYearDialog('receiver')} sx={{ color: '#666' }}>
                <CalendarMonthIcon fontSize="small" />
              </IconButton>
              {receiverBirthYear && (
                <Typography variant="body2" sx={{ ml: 1, color: '#333' }}>
                  ({receiverBirthYear})
                </Typography>
              )}
            </Box>
          </Box>

          {/* 메시지 입력 (멀티라인) */}
          <TextField
            variant="standard"
            placeholder="편지 내용을 작성하세요..."
            multiline
            fullWidth
            minRows={6}
            maxRows={100}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            InputProps={{
              disableUnderline: true,
              sx: {
                fontSize: '1rem',
                lineHeight: '33px',
              },
            }}
            sx={{
              // border 제거, 패딩/마진 등 원하는 스타일
              '& .MuiInput-underline:before, & .MuiInput-underline:hover:before': { borderBottom: 'none' },
              my: '12px',
            }}
          />


          {/* 발신자 (From.) */}
          <Box sx={{ ...rowStyle, mt: '14px' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', flex: 1 }}>
              <Typography variant="body1" sx={{ minWidth: 30 }}>
                From.
              </Typography>
              <TextField
                placeholder="(내 이름)"
                variant="standard"
                InputProps={{ disableUnderline: true, sx: { fontSize: '1.1rem' } }}
                sx={textFieldStyle}
                value={senderName}
                onChange={(e) => setSenderName(e.target.value)}
              />
            </Box>

            {/* 연도 설정 아이콘 + 표시 */}
            <Box sx={{ display: 'flex', alignItems: 'center'}}>
              <IconButton onClick={() => handleOpenYearDialog('sender')} sx={{ color: '#666' }}>
                <CalendarMonthIcon fontSize="small" />
              </IconButton>
              {senderBirthYear && (
                <Typography variant="body2" sx={{ ml: 1, color: '#333' }}>
                  ({senderBirthYear})
                </Typography>
              )}
            </Box>
          </Box>
        </Paper>

        {/* 보내기 버튼 (편지지 영역 아래, 오른쪽 정렬) */}
        <Box sx={sendButtonContainerStyle}>
          <Button variant="contained" color="primary" onClick={handleSendClick}>
            보내기
          </Button>
        </Box>
      </Box>

      {/* "보내기" 확인 Dialog */}
      <Dialog open={openConfirm} onClose={handleCloseConfirm}>
        <DialogTitle>정말 보내시겠습니까?</DialogTitle>
        <DialogContent>
          <DialogContentText>한 번 보낸 메일은 수정하거나 취소할 수 없습니다.</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseConfirm}>취소</Button>
          <Button onClick={handleConfirmSend} autoFocus>
            확인
          </Button>
        </DialogActions>
      </Dialog>

      {/* 태어난 연도 설정 Dialog */}
      <Dialog open={!!openYearDialog} onClose={handleCloseYearDialog}>
        <DialogTitle>태어난 연도 설정</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="연도"
            type="text"
            fullWidth
            variant="standard"
            value={tempYear}
            onChange={(e) => setTempYear(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseYearDialog}>취소</Button>
          <Button onClick={handleSaveYear}>확인</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

/* 
추후 이 부분을 superUser로 로그인하는것이 아닌
일반 유저로 로그인하여 데이터를 가져오는 방식으로 변경해야함
*/
async function authenticate(pb: PocketBase) {
  try {
    console.log(`${import.meta.env.VITE_DB_EMAIL} 임`);
    console.log("하이요");
    const authData = await pb.admins.authWithPassword(
      import.meta.env.VITE_DB_EMAIL,
      import.meta.env.VITE_DB_PASSWORD
    );
    console.log('Authenticated successfully:', authData.token);

    await fetchData(pb);
  } catch (error) {
    console.error('Error during authentication:', error);
  }
}

async function fetchData(pb: PocketBase) {
  try {
    const records = await pb.collection('user_mt').getFullList();
    console.log(records);
  } catch (error) {
    console.error('Error fetching data:', error)
  }
}

export default App