import React from 'react';

const TaskModal = ({ task, onClose }) => {
  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>&times;</span>
        <h2>Task Details</h2>
        {task && (
          <div>
            <p><strong>Name:</strong> {task.name}</p>
            <p><strong>Description:</strong> {task.description}</p>
            <p><strong>Due Date:</strong> {task.dueDate.toLocaleDateString()}</p>
            {/* Add more task details here */}
          </div>
        )}
      </div>
    </div>
  );
};

export default TaskModal;
