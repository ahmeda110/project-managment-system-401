import { IoIosCloseCircle } from "react-icons/io";
import "../../assets/styles/Dashboard.css";

const TaskSideBar = ({ tasks, setIsSideMenuOpen, isSideMenuOpen, title }) => {
  console.log("isSideMenuOpen", isSideMenuOpen);
  return (
    <div
      className={`side-menu ${isSideMenuOpen ? "open" : ""}`}
      style={{ maxHeight: "100vh", overflowY: "auto", overflowX: "hidden" }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          paddingBottom: "15px",
        }}
      >
        <h2>{title ?? "Tasks"}</h2>
        <IoIosCloseCircle
          size={30}
          onClick={() => setIsSideMenuOpen(false)}
          style={{ cursor: "pointer" }}
        />
      </div>
      {tasks.map((task, i) => (
        <TaskView key={i} task={task} setIsSideMenuOpen={setIsSideMenuOpen} />
      ))}
    </div>
  );
};

const TaskView = ({ task, setIsSideMenuOpen }) => {
  return (
    <div
      style={{
        border: "1px solid #eee",
        borderRadius: "5px",
        padding: "20px",
        margin: "10px",
        width: "400px",
      }}
    >
      <>
        <h2>{task.name}</h2>
        <p>Description: {task.description}</p>
        <p>Due: {task.due_date}</p>
        <p>Status: {task.status ? "Completed" : "Incomplete"}</p>
        <p>Priority: {task.priority}</p> {/* Display priority */}
        <p>Assigned To: {task.assigned_to}</p>{" "}
        {/* Needs to be converted to name obviously */}
      </>
    </div>
  );
};

export default TaskSideBar;
