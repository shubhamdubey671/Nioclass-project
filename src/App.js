import { useState, useEffect } from "react";
import Loader from "./Loader";
import { MathJax } from "better-react-mathjax";
import "./style.scss";
import "./loader.scss";
import "./mediaQuery.scss";

function App() {
  const id = [
    "AreaUnderTheCurve_901",
    "BinomialTheorem_901",
    "DifferentialCalculus2_901",
  ];
  const [question, setQuestion] = useState([]);
  const [nextq, setNextq] = useState(0);
  const [loading, setLoading] = useState(true);
  const server = `https://0h8nti4f08.execute-api.ap-northeast-1.amazonaws.com/getQuestionDetails/getquestiondetails?QuestionID=`;

  const changeQuestion = (nextq) => {
    setNextq(nextq);
    setLoading(true);

    if (nextq < 0) {
      setNextq(2);
    }
    if (nextq > 2) {
      setNextq(0);
    }
  };
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await fetch(`${server}${id[nextq]}`);
        const resJson = await response.json(); 
        setQuestion(resJson[0]);
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
      };
    fetchQuestions();
  }, [server, id, nextq]);

  return (
    <div className="full">
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className="section">
            <h1>{question.ChapterID}</h1>
            <p>
              <MathJax>{question.Question}</MathJax>
            </p>
            
            <div className="buttons">
            <button
              className="button-9"
              role="button"
              onClick={() => changeQuestion(nextq - 1)}
            >
              {" "}
              Prev
            </button>
            <button
              className="button-9"
              role="button"
              onClick={() => changeQuestion(nextq + 1)}
            >
              {" "}
              Next
            </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
export default App;
