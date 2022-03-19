import { Route, useParams } from "react-router-dom";
import Comment from "../components/comments/Comments";

const QuoteDetails = () => {
  const params = useParams();
  return (
    <>
      <h1> Quote Details Page</h1>
      <p>{params.quoteId}</p>
      <Route path="/quotes/:quoteId/comments">
        <Comment />
      </Route>
    </>
  );
};

// Alternative to path="/quotes/:quoteId/comments"
// path={`/quotes/${params.quoteId}/comments`}

export default QuoteDetails;
