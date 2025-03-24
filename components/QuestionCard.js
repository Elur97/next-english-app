export default function QuestionCard({ question, options, onSelect }) {
  return (
    <div className="p-6 bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-bold mb-4">{question}</h2>
      <ul>
        {options.map((option, index) => (
          <li key={index}>
            <button
              className="w-full text-left px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
              onClick={() => onSelect(option)}
            >
              {option}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}