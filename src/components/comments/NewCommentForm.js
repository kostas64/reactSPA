import { useRef, useEffect, useState } from "react";

import useHttp from "../../hooks/use-http";
import { addComment } from "../../lib/api";
import LoadingSpinner from "../UI/LoadingSpinner";
import classes from "./NewCommentForm.module.css";

const NewCommentForm = (props) => {
  const commentTextRef = useRef();

  const { sendRequest, status, error } = useHttp(addComment);
  const [errorComment, setErrorComment] = useState(false);

  const { onAddedComment } = props;

  useEffect(() => {
    if (status === "completed" && !error) {
      commentTextRef.current.value = "";
      onAddedComment();
    }
  }, [status, error, onAddedComment]);

  const submitFormHandler = (event) => {
    event.preventDefault();

    const enteredText = commentTextRef.current.value;

    if (commentTextRef.current.value.length === 0) {
      return;
    }

    sendRequest({ commentData: { text: enteredText }, quoteId: props.quoteId });
  };

  const onBlurHandler = () => {
    if (commentTextRef.current.value.length === 0) {
      setErrorComment(true);
    } else {
      setErrorComment(false);
    }
  };

  return (
    <form
      className={classes.form}
      onSubmit={submitFormHandler}
      onBlur={onBlurHandler}
    >
      {status === "pending" && (
        <div className="centered">
          <LoadingSpinner />
        </div>
      )}
      <div
        className={
          errorComment ? `${classes.control} ${classes.error}` : classes.control
        }
        onSubmit={submitFormHandler}
      >
        <label htmlFor="comment">Your Comment</label>
        <textarea id="comment" rows="5" ref={commentTextRef}></textarea>
      </div>
      <div className={classes.actions}>
        <button className="btn">Add Comment</button>
      </div>
    </form>
  );
};

export default NewCommentForm;
