import React, { useEffect, useState } from 'react';
import Container from '@mui/material/Container';
import { onMessage, saveLikedFormSubmission } from './service/mockServer';

import Header from './Header';
import Content from './Content';

function App() {
const [toastData, setToastData] = useState([]);

// current toast state, all toast state?, liked state

//set callback onMessage useeffect

useEffect(() => {
  const toastCallback = (formSubmission) => {
    console.log(formSubmission)
    setToastData((prevState) => [...prevState, formSubmission])
  }

  onMessage(toastCallback);
}, [])

console.log("state", toastData)

// snackbar logic if not in own component

//like handler/ data
//save liked toast to "db" and loop if fails

  return (
    <>
      <Header />
      <Container>
        <Content />
      </Container>
      {/* toast notification snackbar */}
    </>
  );
}

export default App;
