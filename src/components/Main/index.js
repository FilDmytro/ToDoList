import React, { useState } from "react";
import { Input } from "@mui/material";
import AddBoxIcon from "@mui/icons-material/AddBox";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import DeleteIcon from "@mui/icons-material/Delete";
import CreateIcon from "@mui/icons-material/Create";
import CancelIcon from "@mui/icons-material/Cancel";

function Main() {
  const [toDo, setToDo] = useState([]);

  const [newTask, setNewTask] = useState("");
  const [updateData, setUpdateData] = useState("");

  const addTask = () => {
    if (newTask.trim().length !== 0) {
      let num = toDo.length + 1;
      let newEntry = { id: num, title: newTask, status: false };
      setToDo([...toDo, newEntry]);
      setNewTask("");
    }
  };

  const deleteTask = (id) => {
    let newTasks = toDo.filter((task) => task.id !== id);
    setToDo(newTasks);
  };

  const taskComplited = (id) => {
    let newTask = toDo.map((task) => {
      if (task.id === id) {
        return { ...task, status: !task.status };
      }
      return task;
    });
    setToDo(newTask);
  };

  const changeTask = (e) => {
    let newEntry = {
      id: updateData.id,
      title: e.target.value,
      status: updateData.status ? true : false,
    };
    setUpdateData(newEntry);
  };

  const updateTask = () => {
    let filterRecords = [...toDo].filter((task) => task.id !== updateData.id);
    let updateObject = [...filterRecords, updateData];
    setToDo(updateObject);
    setUpdateData("");
  };

  const cancelChangeTask = () => {
    setUpdateData("");
  };

  return (
    <div className="wrapper">
      <h1>To Do List</h1>
      {updateData && updateData ? (
        <>
          <div className="row">
            <div className="col">
              <Input
                value={updateData && updateData.title}
                onChange={(e) => changeTask(e)}
                className="form-control form-control-lg"
                color="success"
                sx={"color: silver"}
              />
            </div>
            <div className="col-auto">
              <AddBoxIcon onClick={updateTask} id="addIcon" />
            </div>
            <div className="col-auto" id="cancel">
              <CancelIcon onClick={cancelChangeTask} />
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="row">
            <div className="col">
              <Input
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
                className="form-control form-control-lg"
                color="success"
                sx={"color: silver"}
              />
            </div>
            <div className="col-auto" id="addIcon">
              <AddBoxIcon onClick={addTask} />
            </div>
          </div>
        </>
      )}
      {toDo && toDo.length ? "" : "No Tasks..."}
      {toDo &&
        toDo
          .sort((a, b) => (a.id > b.id ? 1 : -1))
          .map((task, index) => {
            return (
              <React.Fragment key={task.id}>
                <div className="col taskBg">
                  <div className={task.status ? "done row" : "row"}>
                    <span className="taskNumber">{index + 1}</span>
                    <span className="taskText">{task.title}</span>
                    <div className="iconsWrap">
                      <span title="Completed / Not Completed">
                        <CheckCircleIcon
                          onClick={(e) => taskComplited(task.id)}
                        />
                      </span>
                      {task.status ? null : (
                        <span title="Edit">
                          <CreateIcon
                            onClick={() =>
                              setUpdateData({
                                id: task.id,
                                title: task.title,
                                status: task.status ? true : false,
                              })
                            }
                          />
                        </span>
                      )}
                      <span title="Delete">
                        <DeleteIcon onClick={() => deleteTask(task.id)} />
                      </span>
                    </div>
                  </div>
                </div>
              </React.Fragment>
            );
          })}
    </div>
  );
}

export default Main;
