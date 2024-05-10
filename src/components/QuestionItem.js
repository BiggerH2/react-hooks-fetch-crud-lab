import React from "react";

function QuestionItem({ question, onUpdateQuestion, onDeleteQuestion }) {
    const { id, prompt, answers, correctIndex } = question;

    // Event handler for changing the correct answer
    function handleChangeCorrectIndex(e) {
        const newCorrectIndex = Number(e.target.value);
        onUpdateQuestion(id, newCorrectIndex);
    }

    // Event handler for deleting the question
    function handleDelete() {
        onDeleteQuestion(id);
    }

    const options = answers.map((answer, index) => (
        <option key={index} value={index}>
            {answer}
        </option>
    ));

    return (
        <li>
            <h4>Question {id}</h4>
            <h5>Prompt: {prompt}</h5>
            <label>
                Correct Answer:
                <select
                    value={correctIndex}
                    onChange={handleChangeCorrectIndex}
                >
                    {options}
                </select>
            </label>
            <button onClick={handleDelete}>Delete Question</button>
        </li>
    );
}

export default QuestionItem;
