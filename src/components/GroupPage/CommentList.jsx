import React from 'react';
import Comment from './Comment';

const CommentList = ({ comments }) => {
  return (
    <div>
      {comments.map((comment, index) => (
        <Comment key={index} author={comment.author} text={comment.text} />
      ))}
    </div>
  );
};

export default CommentList;