import { useEffect, useRef, useState } from "react";
import { Prompt } from "react-router-dom";
import Card from "../UI/Card";
import LoadingSpinner from "../UI/LoadingSpinner";
import classes from "./QuoteForm.module.css";

const QuoteForm = (props) => {
  const authorInputRef = useRef();
  const textInputRef = useRef();
  const [isFocused, setIsFocused] = useState(false);
  const [errorAuthor, setErrorAuthor] = useState(null);
  const [errorText, setErrorText] = useState(null);

  function submitFormHandler(event) {
    event.preventDefault();

    const enteredAuthor = authorInputRef.current.value;
    const enteredText = textInputRef.current.value;

    if (enteredAuthor.length === 0 || enteredText.length === 0) {
      return;
    }

    props.onAddQuote({ author: enteredAuthor, text: enteredText });
  }

  const formFocusHandler = () => {
    setIsFocused(true);
  };

  const formBlurHandler = () => {
    if (authorInputRef.current.value.length === 0) {
      setErrorAuthor(true);
    } else {
      setErrorAuthor(false);
    }
    if (textInputRef.current.value.length === 0) {
      setErrorText(true);
    } else {
      setErrorText(false);
    }
  };

  const finishEnteringHandler = () => {
    setIsFocused(false);
  };

  return (
    <>
      <Prompt
        when={isFocused}
        message={(location) =>
          "Are you sure you want to leave? Your data will be lost"
        }
      />
      <Card>
        <form
          onBlur={formBlurHandler}
          onFocus={formFocusHandler}
          className={classes.form}
          onSubmit={submitFormHandler}
        >
          {props.isLoading && (
            <div className={classes.loading}>
              <LoadingSpinner />
            </div>
          )}

          <div
            className={[
              errorAuthor
                ? `${classes.control} ${classes.error}`
                : classes.control,
            ]}
          >
            <label htmlFor="author">Author</label>
            <input type="text" id="author" ref={authorInputRef} />
          </div>
          <div
            className={
              errorText
                ? `${classes.control} ${classes.error}`
                : classes.control
            }
          >
            <label htmlFor="text">Text</label>
            <textarea id="text" rows="5" ref={textInputRef}></textarea>
          </div>
          <div className={classes.actions}>
            <button onClick={finishEnteringHandler} className="btn">
              Add Quote
            </button>
          </div>
        </form>
      </Card>
    </>
  );
};

export default QuoteForm;
