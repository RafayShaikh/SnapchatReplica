import { Avatar } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import React, { useEffect, useState } from 'react';
import './Chats.css';
import ChatBubbleIcon from '@material-ui/icons/ChatBubble';
import { auth, db } from '../firebase';
import Chat from './Chat';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser } from './appSlice';
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import { useHistory } from 'react-router-dom';
import { resetCameraImage } from './cameraSlice';

function Chats() {
  const [posts, setPosts] = useState([]);
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const history = useHistory();

  const takeSnap = () => {
    dispatch(resetCameraImage());
    history.push('/');
  };
  useEffect(() => {
    db.collection('posts')
      .orderBy('timestamp', 'desc')
      .onSnapshot((snapshot) =>
        setPosts(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }))
        )
      );
  }, []);

  return (
    <div className='chats'>
      <div className='chats_header'>
        <Avatar
          src={user.profilePic}
          onClick={() => auth.signOut()}
          className='chats_avatar'
        />
        <div className='chats_search'>
          <SearchIcon className='chats_searchIcon' />
          <input placeholder='Friends' type='text' />
          <ChatBubbleIcon className='chats_chatIcon' />
        </div>
      </div>
      <div className='chats_posts'>
        {posts.map(
          ({
            id,
            data: { profilePic, username, timestamp, imageUrl, read },
          }) => (
            <Chat
              key={id}
              id={id}
              profilePic={profilePic}
              username={username}
              timestamp={timestamp}
              imageUrl={imageUrl}
              read={read}
            />
          )
        )}
      </div>
      <RadioButtonUncheckedIcon
        className='chats_takePicIcon'
        onClick={takeSnap}
        fontSize='large'
      />
    </div>
  );
}

export default Chats;
