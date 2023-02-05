import React from "react";
import Button from "../Buttons/Button";
import checkMark from "../../assets/images/icon-check.svg";
import cross from "../../assets/images/icon-cross.svg";
import "../ToDo/ToDo.scss";

class ToDo extends React.Component {
  constructor() {
    super();
    this.state = {
      text: "",
      items: [],
    };
  }

  // Method for handling input change
  handleTodoInput = ({ target: { value } }) =>
    this.setState({
      text: value,
    });

  // Method for handling form submission
  handleSubmit = (e) => {
    const createTodo = document.getElementById("todoInput");
    const { text } = this.state;
    const newItem = {
      text: text,
    };

    // Update state to add new item and clear input text
    this.setState((prev) => ({
      items: [...prev.items, newItem],
      text: "",
    }));

    // Reset text input to be empty
    createTodo.value = "";

    // Prevint default form submission
    e.preventDefault();
  };

  // Method for handling completion of ToDo task
  handleCompleteItem = (e) => {
    const { target: btn } = e;

    // Get reference to checkMark element
    const checkMark = btn.nextSibling;
    // Get reference to list item element
    const listItem = checkMark.parentElement.nextSibling;
    btn.classList.toggle("showCompletedBackground");
    checkMark.classList.toggle("showCheckMark");
    listItem.classList.toggle("complete");
  };

  // Handles deletion of an item from the items array
  // index - Index of item to be deleted
  handleDeleteItem = (index) => {
    this.setState((prev) => ({
      items: prev.items.filter((item, i) => i !== index),
    }));
  };

  render() {
    const { items } = this.state;
    const itemsLength = items.length;

    return (
      <form onSubmit={this.handleSubmit} className="todo">
        {/* Input element for creating new ToDo tasks */}
        <input
          onChange={this.handleTodoInput}
          id="todoInput"
          className="todo__input"
          type="text"
          placeholder="Create a new todo..."
          autoComplete="off"
        />

        {/* Unordered list to display ToDo tasks */}
        <ul className="todoList">
          {/* Map over items in state and render each task item */}
          {items.map((item, index) => {
            return (
              <div key={index} className="listItem">
                <div className="completeItem">
                  <Button
                    onClick={this.handleCompleteItem}
                    className="btn btn--completeItem"
                  />

                  <img
                    className="completeItem__checkMark"
                    src={checkMark}
                    alt="checked"
                  />
                </div>

                <li className="listItem__item">{item.text}</li>

                <img
                  onClick={() => this.handleDeleteItem(index)}
                  className="listItem__delete"
                  src={cross}
                  alt="Delete Item"
                />
              </div>
            );
          })}
        </ul>

        <div>
          <Button
            className="btn btn--transparent"
            text={`${itemsLength} items left`}
          />
          <div>
            <Button className="btn btn--transparent" text="All" />
            <Button className="btn btn--transparent" text="Active" />
            <Button className="btn btn--transparent" text="Completed" />
          </div>
          <Button className="btn btn--transparent" text="Clear Completed" />
        </div>
      </form>
    );
  }
}

export default ToDo;
