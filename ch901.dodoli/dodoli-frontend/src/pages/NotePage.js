import React from 'react';
import Responsive from '../components/common/Responsive';
import NotePlayerContainer from '../containers/note/NotePlayerContainer';

const NotePage = () => {
  return (
    <Responsive>
      <NotePlayerContainer />
    </Responsive>
  );
}

export default NotePage;
