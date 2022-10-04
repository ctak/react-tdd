import React from 'react';
import NotePlayer from '../../components/note/NotePlayer';

const NotePlayerContainer = () => {
  const note = {
    source: {
      // src: "https://www.youtube.com/watch?v=UF8uR6Z6KLc",
      // src: 'https://www.youtube.com/watch?v=yLlgy7Vnelo', // 내 사람이여
      // src: 'https://www.youtube.com/watch?v=UuV2BmJ1p_I', // 아무 노래 / 지코
      // src: 'https://www.youtube.com/watch?v=GdoNGNe5CSg', // 주저하는 연인들을 위해
      src: 'https://www.youtube.com/watch?v=XzjQV5oRtOQ', // 25 Phrases
      type: "video/youtube",
    },
    // duration: undefined,
    // phrases: [],
  };

  return <NotePlayer note={note} />;
};

export default NotePlayerContainer;
