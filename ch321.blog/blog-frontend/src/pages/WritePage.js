import React from 'react';
import EditorContainer from '../containers/write/EditorContainer';
import Responsive from '../components/common/Responsive';
import TagBoxContainer from '../containers/write/TagBoxContainer';
import WriteActionButtonsContainer from '../containers/write/WriteActionButtonsContainer';
import { Helmet } from 'react-helmet-async';

const WritePage = () => {
  return (
    <Responsive>
      <Helmet>
        <title>새 글 작성하기 - REACTERS</title>
      </Helmet>
      <EditorContainer />
      <TagBoxContainer />
      <WriteActionButtonsContainer />
    </Responsive>
  )
}

export default WritePage;
