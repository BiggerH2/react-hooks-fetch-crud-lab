import React, { useEffect, useState } from "react";
import AdminNavBar from "./AdminNavBar";
import QuestionForm from "./QuestionForm";
import QuestionList from "./QuestionList";

function App() {
    const [page, setPage] = useState("List");
    const [questions, setQuestions] = useState([]);

    // Fetch questions from the API when the component mounts
    useEffect(() => {
        fetch('http://localhost:4000/questions')
            .then(response => response.json())
            .then(data => setQuestions(data))
            .catch(error => console.error('Error fetching questions:', error));
    }, []);

    // Callback function to handle adding a new question
    function handleAddQuestion(newQuestionData) {
        fetch('http://localhost:4000/questions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newQuestionData),
        })
            .then(response => response.json())
            .then(newQuestion => {
                // Update the questions state with the newly added question
                setQuestions(prevQuestions => [...prevQuestions, newQuestion]);
            })
            .catch(error => console.error('Error adding question:', error));
    }

    // Callback function to handle updating a question
    function handleUpdateQuestion(id, newCorrectIndex) {
        fetch(`http://localhost:4000/questions/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ correctIndex: newCorrectIndex }),
        })
            .then(response => response.json())
            .then(updatedQuestion => {
                setQuestions(prevQuestions =>
                    prevQuestions.map(question =>
                        question.id === updatedQuestion.id ? updatedQuestion : question
                    )
                );
            })
            .catch(error => console.error('Error updating question:', error));
    }

    // Callback function to handle deleting a question
    function handleDeleteQuestion(id) {
        fetch(`http://localhost:4000/questions/${id}`, {
            method: 'DELETE',
        })
            .then(() => {
                setQuestions(prevQuestions =>
                    prevQuestions.filter(question => question.id !== id)
                );
            })
            .catch(error => console.error('Error deleting question:', error));
    }

    return (
        <main>
            <AdminNavBar onChangePage={setPage} />
            {page === "Form" ? (
                <QuestionForm onAddQuestion={handleAddQuestion} />
            ) : (
                <QuestionList
                    questions={questions}
                    onUpdateQuestion={handleUpdateQuestion}
                    onDeleteQuestion={handleDeleteQuestion}
                />
            )}
        </main>
    );
}

export default App;
