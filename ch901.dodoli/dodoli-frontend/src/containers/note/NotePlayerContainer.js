import React from 'react';
import NotePlayer from '../../components/note/NotePlayer';

const NotePlayerContainer = () => {
  const note = {
    source: {
      // src: "https://www.youtube.com/watch?v=UF8uR6Z6KLc",
      src: 'https://www.youtube.com/watch?v=yLlgy7Vnelo', // 내 사람이여
      type: "video/youtube",
    },
    // duration: undefined,
    // phrases: [],
  };

  return <NotePlayer note={note} />;
};

export default NotePlayerContainer;
