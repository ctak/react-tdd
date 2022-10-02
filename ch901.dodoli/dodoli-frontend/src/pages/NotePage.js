import React from 'react';
import Responsive from '../components/common/Responsive';
import NoteContainer from '../containers/note/NoteContainer';

const NotePage = () => {
  return (
    <Responsive>
      <NoteContainer />
    </Responsive>
  );
}

export default NotePage;
