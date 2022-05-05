import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { CircularProgress, Divider, List, ListItem, ListItemText } from '@mui/material';
import { fetchLikedFormSubmissions } from './service/mockServer';
import styles from "./Content.module.css"


export default function Content(props) {
  const [fetchLoading, setFetchLoading] = useState(true);
  const [likedList, setLikedList] = useState([]);
  const [emptyListMessage, setEmptyListMessage] = useState("You haven't liked anything yet")

  //liked State?

  //calls "database" for saved forms once on load
  useEffect(() => {
    const fetchedData = async () => {
      try {
        const data = await fetchLikedFormSubmissions();
        if (data.formSubmissions.length !== 0) {
          setLikedList((prevState) => [...prevState, ...data.formSubmissions])
        }
        //hide loading spinner/message
        setFetchLoading(false)
      } catch (error) {
        console.log(error)
        //retry server if it fails. Could use limiter loop if dealing with real server failures. 
        fetchedData()
      }
    }

    fetchedData()
  }, [])

  //push new liked toast to page
  //push list to react version, let handler in app deal with saving
  useEffect(() => {
    if (props.likedToast) { setLikedList((prevState) => [...prevState, props.likedToast]) }
  }, [props.likedToast])

  console.log(likedList)
  console.log(fetchLoading)
  return (
    <Box sx={{ marginTop: 3 }}>
      <Typography variant="h4">Liked Form Submissions</Typography>

      <Typography variant="body1" sx={{ marginTop: 1 }}>
        {fetchLoading &&
          <div>
            <CircularProgress />
            <h2>Checking for liked data</h2>
          </div>
        }
        {!fetchLoading && likedList.length === 0 && emptyListMessage}

        <List sx={{ width: '100%', maxWidth: 300, bgcolor: 'background.paper' }}>
          {likedList.length > 0 && likedList.map(toast => {
            return (
              <React.Fragment>
                <ListItem alignItems="flex-start" key={toast.id}>
                  <ListItemText
                  primary={`Name: ${toast.data.firstName} ${toast.data.lastName}`}
                  secondary={`Email: ${toast.data.email}`}
                  />
                </ListItem>
                <Divider component="li" />
              </React.Fragment>
            )
          })}
        </List>
      </Typography>
    </Box>
  );
}
