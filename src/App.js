import React from 'react';
import Container from '@mui/material/Container';

import Header from './Header';
import Content from './Content';

function App() {
// current toast state, all toast state?, liked state

//set callback onMessage useeffect

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
