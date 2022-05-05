import React, { useEffect, useState } from 'react';
import Container from '@mui/material/Container';
import { onMessage, saveLikedFormSubmission } from './service/mockServer';
import { Snackbar, Button, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

import Header from './Header';
import Content from './Content';

function App() {
  const [toastData, setToastData] = useState([]);
  const [currentToast, setCurrentToast] = useState(undefined);

  const [open, setOpen] = useState(false); //used in snackbar

  // liked state

  //One off setting the onMessage callback on first load
  useEffect(() => {
    const toastCallback = (formSubmission) => {
      setToastData((prevState) => [...prevState, formSubmission])
    }
    onMessage(toastCallback);
  }, [])


  // snackbar logic taken and modified from materialUI component
  //following MUI design theory to only have one snackbar/toast at a time -- can modify if necessary
  useEffect(() => {
    if (toastData.length && !currentToast) {
      // Set a new snack when we don't have an active one
      setCurrentToast({ ...toastData[0] });
      setToastData((prev) => prev.slice(1));
      setOpen(true);
    } else if (toastData.length && currentToast && open) {
      // Close an active snack when a new one is added
      setOpen(false);
    }
  }, [toastData, currentToast, open]);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  //when toast snackbar is exited
  const handleExited = () => {
    setCurrentToast(undefined);
  };


  //like handler/ data
  //save liked toast to "db" and loop if fails

  return (
    <>
      <Header />
      <Container>
        <Content />
      </Container>
      <Snackbar
        key={currentToast ? currentToast.id : undefined}
        open={open}
        TransitionProps={{ onExited: handleExited }}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        message={
          currentToast ?
            <div>
              {currentToast.data.firstName} {currentToast.data.lastName}<br />
              {currentToast.data.email}
            </div>
            : undefined
        }
        action={
          <React.Fragment>
            <Button color="primary" size="small" >
              Like
            </Button>
            <IconButton
              aria-label="close"
              color="inherit"
              sx={{ p: 0.5 }}
              onClick={handleClose}
            >
              <CloseIcon />
            </IconButton>
          </React.Fragment>
        }
      />
    </>
  );
}

export default App;
