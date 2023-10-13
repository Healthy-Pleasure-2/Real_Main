import React from "react";

const Comment = ({ author, text }) => {
  return (
    <div className="comment">
      <h4>{author}</h4>
      <p>{text}</p>
    </div>
  );
};

export default Comment;
