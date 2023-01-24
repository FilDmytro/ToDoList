import React from "react";
import { Input} from "@mui/material";
import AddBoxIcon from '@mui/icons-material/AddBox';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      toDoList: [],
      inputValue: "",
    };
  }
  
  addNewTask = () => {
    const newToDoTask = {
      text: this.state.inputValue,
      status: false,
      id: Math.random().toFixed(5),
    };
    this.setState((prevState) => {
      const newToDoList = prevState.toDoList.slice();
      if (newToDoTask.text === "") {
        return;
      } else {
        newToDoList.push(newToDoTask);
      }
      return {
        ...prevState,
        toDoList: newToDoList,
        inputValue: "",
      };
    });
  };

  compleeteTask = (id) => {
    const task = this.state.toDoList.map((element) => element.id).indexOf(id);
    this.setState((state) => {
      let { toDoList } = state;
      toDoList[task].status = true;
      return toDoList;
    });
  };

  deleteTask = (id) => {
    this.setState((prevState) => {
      const newToDoList = this.state.toDoList.filter((element) => {
        return element.id !== id;
      });
      return {
        ...prevState,
        toDoList: newToDoList,
      };
    });
  };

  addInputValue = (event) => {
    this.setState({ inputValue: event.target.value });
  };
  render() {
    const completed = { textDecoration: "line-through" };
    return (
      <div className="wrapper">
        <h1>To Do List</h1>
        <Input
          color="primary"
          placeholder="add To Do..."
          className="input"
          onChange={this.addInputValue}
          value={this.state.inputValue}
        />
        <AddBoxIcon
          color="disabled"
          className="btn"
          onClick={this.addNewTask}
        />
        <ul className="list-style">
          {this.state.toDoList.map((element) => {
            return (
              <li className="list-item" key={element.id}>
                <span
                  className="task-text"
                  style={element.status === true ? completed : null}
                >
                  {element.text}
                </span>
                <CheckCircleIcon
                  color="disabled"
                  className="submit"
                  type="submit"
                  onClick={() => this.compleeteTask(element.id)}
                />
                <CancelIcon
                  color="disabled"
                  className="cancel"
                  type="submit"
                  onClick={() => this.deleteTask(element.id)}
                />
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}

export default Main;
