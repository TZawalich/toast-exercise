import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { CircularProgress } from '@mui/material';
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

      <Typography variant="body1" sx={{ fontStyle: 'italic', marginTop: 1 }}>
        {/* List items map */}
        {fetchLoading &&
          <div>
            <CircularProgress />
            <h2>Checking for liked data</h2>
          </div>
        }
        {!fetchLoading && likedList.length === 0 && emptyListMessage}
        <ul className={styles.likedList}>
          {likedList.length > 0 && likedList.map(
            toast =>
              <li key={toast.id}>
                <b>Name: </b>{toast.data.firstName} {toast.data.lastName} -- <b>Email: </b>{toast.data.email}
              </li>)
          }
        </ul>
      </Typography>
    </Box>
  );
}
