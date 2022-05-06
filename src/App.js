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
  const [likedToast, setLikedToast] = useState(undefined);


  const [open, setOpen] = useState(false); //used in snackbar

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

  //handles saving the toast to the "db"/localstorage
  const saveLike = async (likedToast) => {
    try {
      await saveLikedFormSubmission(likedToast);
    } catch (error) {
      console.log(error);
      saveLike(likedToast);
    }
  }

  //handles updating likedToast state/passing it to the content for display and triggering the save to
  //localstorage function
  const handleLike = () => {
    const likedToastTrue = currentToast;
    likedToastTrue.data.liked = true;
    setLikedToast(likedToastTrue);
    setOpen(false);
    saveLike(likedToastTrue);
  }

  return (
    <>
      <Header />
      <Container>
        <Content likedToast={likedToast} />
      </Container>
      <Snackbar
        key={currentToast ? currentToast.id : undefined}
        sx={{ "& .MuiSnackbarContent-root": { "borderRadius": 0, color: "#E3E4E4" } }}
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
            <Button size="small" onClick={handleLike} sx={{ color: "#8FEFEF" }}>
              Like
            </Button>
            <IconButton
              aria-label="close"
              color="inherit"
              sx={{ p: 0.5 }}
              onClick={handleClose}
            >
              <CloseIcon sx={{ color: "#E3E4E4" }} />
            </IconButton>
          </React.Fragment>
        }
      />
    </>
  );
}

export default App;
