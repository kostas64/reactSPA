import QuoteList from "../components/quotes/QuoteList";

const DUMMY_QUOTES = [
  {
    id: 1,
    author: "Kostas",
    text: "Learning React",
  },
  {
    id: 2,
    author: "Maria",
    text: "Cooking",
  },
];

const AllQuotes = () => {
  return <QuoteList quotes={DUMMY_QUOTES} />;
};

export default AllQuotes;
