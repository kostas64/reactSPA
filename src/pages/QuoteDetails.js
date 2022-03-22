import { Route, useParams, Link, useRouteMatch } from "react-router-dom";
import Comment from "../components/comments/Comments";
import HighlightedQuote from "../components/quotes/HighlightedQuote";

const DUMMY_QUOTES = [
  {
    id: "1",
    author: "Kostas",
    text: "Learning React",
  },
  {
    id: "2",
    author: "Maria",
    text: "Cooking",
  },
];

const QuoteDetails = () => {
  const params = useParams();
  const match = useRouteMatch();
  const quote = DUMMY_QUOTES.find((item) => item.id === params.quoteId);

  if (!quote) {
    return <p>No quote found</p>;
  }

  return (
    <>
      <HighlightedQuote text={quote.text} author={quote.author} />
      <Route path={`${match.path}/`} exact>
        <div className="centered">
          <Link className="btn--flat" to={`${match.url}/comments`}>
            Load Comments
          </Link>
        </div>
      </Route>

      <Route path={`${match.path}/comments`}>
        <Comment />
      </Route>
    </>
  );
};

// Alternative to path="/quotes/:quoteId/comments"
// path={`/quotes/${params.quoteId}/comments`}

export default QuoteDetails;
