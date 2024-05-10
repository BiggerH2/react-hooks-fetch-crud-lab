import React from "react";

function AdminNavBar({ onChangePage, currentPage }) {
    // Define a helper function to determine if the page is active
    function isActive(page) {
        return currentPage === page ? 'active' : '';
    }

    return (
        <nav>
            <button
                onClick={() => onChangePage("Form")}
                aria-label="New Question"
                className={isActive("Form")}
            >
                New Question
            </button>
            <button
                onClick={() => onChangePage("List")}
                aria-label="View Questions"
                className={isActive("List")}
            >
                View Questions
            </button>
        </nav>
    );
}

export default AdminNavBar;
