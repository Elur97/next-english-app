"use client";

import { useState, useEffect } from "react";

export default function QuizApp() {
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [incorrectWords, setIncorrectWords] = useState([]);
  const [quizFinished, setQuizFinished] = useState(false);

  useEffect(() => {
    fetch("/questions.json")
      .then((response) => response.json())
      .then((data) => setQuestions(data))
      .catch((error) => console.error("Error loading questions:", error));
  }, []);

  if (questions.length === 0) {
    return <div>Loading...</div>;
  }

  const handleAnswerClick = (option) => {
    setSelectedAnswer(option);

    // Check if the answer is correct and update incorrect words if necessary
    if (option !== questions[currentQuestion].answer) {
      setIncorrectWords((prevIncorrectWords) => [
        ...prevIncorrectWords,
        questions[currentQuestion].question,
      ]);
    }

    setTimeout(() => {
      moveToNextQuestion();
    }, 1500); // 1.5秒遅延して次の質問へ
  };

  const moveToNextQuestion = () => {
    if (currentQuestion + 1 < questions.length) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
    } else {
      setQuizFinished(true);
    }
  };

  const getTextForQuestionGroup = () => {
    const groupIndex = Math.floor(currentQuestion / 20); // 20問ごとに切り替え
    switch (groupIndex) {
      case 0:
        return "「今日もわたしたちと一緒に、勉強がんばろうね！！」";
      case 1:
        return "「覚えてもすぐに忘れちゃう...?そんなの何回も復習すればいいだけでしょ？」";
      case 2:
        return "「気楽に少しずつ覚えていきましょう。気負い過ぎても続かないわ。」";
      case 3:
        return "「単語の意味だけじゃなくて、発音も調べながら学ぶのがオススメよ。」";
      case 4:
        return "「あなたなら最後までできる！！頑張って！！」";
      case 5:
        return "「べ、べつにあなたがしっかり勉強してるか気になって見に来たわけじゃないから！」";
      case 6:
        return "「人は一日経つと覚えたことの70%は忘れるらしいよ。でも復習し続けると定着率もどんどん上がるんだって！」";
      case 7:
        return "「おー頑張ってるじゃん！でもあまり無理はしちゃだめだからね！」";
      case 8:
        return "「私たちも応援してるよ！えいえいおー！！」";
      case 9:
        return "「お疲れさま…明日も来てくれるよね？」";
      default:
        return ""; // 空文字を返すようにします
    }
  };

  // 画像のインデックスは質問番号に基づいて決まる
  const imageIndex = Math.floor(currentQuestion / 20) % 10 + 1;

  return (
    <div
      className={`min-h-screen flex flex-col items-center ${!quizFinished ? "bg-cover bg-center" : "bg-gray-100"}`}
      style={{
        backgroundImage:
          !quizFinished && questions.length > 0 ? "url('/image/classroom.jpg')" : "",
        backgroundAttachment: !quizFinished ? "fixed" : "",
        backgroundSize: !quizFinished ? "cover" : "",
      }}
    >
      <div className="h-150 w-225 flex flex-col items-center justify-center bg-gray-100 p-2">
        <div className="w-full bg-white p-6 rounded-lg shadow-lg">
          {/* 問題番号 */}
          <div className="text-lg font-bold text-center mb-4">
            問題 {currentQuestion + 1} / {questions.length}
          </div>
          {/* 問題文 */}
          <h2 className="text-4xl font-semibold text-center mb-4">
            {questions[currentQuestion].question}
          </h2>
          {/* 選択肢 */}
          <div className="grid grid-cols-2 gap-5">
            {questions[currentQuestion].options.map((option, index) => (
              <button
                key={index}
                className={`justify-center p-3 border rounded-lg text-2xl font-medium transition-colors duration-200 ${
                  selectedAnswer
                    ? option === questions[currentQuestion].answer
                      ? "bg-green-300"
                      : "bg-red-300"
                    : "bg-gray-100 hover:bg-gray-200"
                }`}
                onClick={() => handleAnswerClick(option)}
                disabled={selectedAnswer !== null}
              >
                {option}
                {selectedAnswer &&
                  (option === questions[currentQuestion].answer ? (
                    <span className="top-0 left-0 ml-2 bg-green-500 text-white text-sm px-2 py-1 rounded-full">
                      〇
                    </span>
                  ) : (
                    <span className="top-2 left-0 ml-2 bg-red-500 text-white text-sm px-2 py-0.75 rounded-full">
                      ✕
                    </span>
                  ))}
              </button>
            ))}
          </div>

          {/* 間違えた単語リスト */}
          {quizFinished && (
            <div className="mt-100 w-full max-w-5xl mx-auto">
              <h3 className="text-3xl pb-5 font-bold text-center text-gray-800 mb-6">
                【間違えた単語リスト】
              </h3>
              <div className="max-h-250 overflow-y-auto">
                <div className="text-3xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-1">
                  {incorrectWords.map((question, index) => (
                    <div
                      key={index}
                      className="bg-white p-4 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-200"
                    >
                      <p className="text-lg font-medium text-gray-700">{question}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* 画像とセリフ */}
          <div className="mt-6 flex items-center">
            {!quizFinished && (
              <img
                src={`/image/image${imageIndex}.jpg`}
                alt="Quiz"
                className="w-25 h-25 ml-10 object-cover rounded-full shadow-md"
              />
            )}
            <div className="mb-4 text-2xl ml-10 font-bold">
              {/* セリフの部分 */}
              {quizFinished ? null : getTextForQuestionGroup()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
