import React, { Component } from "react";
import "./App.css";

class App extends Component {
  constructor() {
    super();
    this.state = {
      data: [],
      itemName: "",
      update: new Date()
    };
    this.fetchData = this.fetchData.bind(this);
    this.onDelete = this.onDelete.bind(this);
    this.onTextChange = this.onTextChange.bind(this);
    this.onAdd = this.onAdd.bind(this);
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData() {
    fetch("http://localhost:5000/api/todoitems")
      .then(response => response.json())
      .then(data => this.setState({ data: data }));
  }

  onDelete(id) {
    fetch("http://localhost:5000/api/todoitems/" + id, {
      method: "delete"
    }).then(response => (response.status === 200 ? this.fetchData() : null));
  }

  onAdd() {
    fetch("http://localhost:5000/api/todoitems", {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ name: this.state.itemName })
    }).then(response => (response.status === 201 ? this.fetchData() : null));
  }

  onTextChange(e) {
    const { value } = e.target;
    this.setState({ itemName: value });
  }

  render() {
    return (
      <div>
        <div style={{ paddingLeft: "30px" }}>
          <input
            type="text"
            placeholder="Name"
            value={this.state.itemName}
            onChange={this.onTextChange}
          />
          <input type="button" value="Add" onClick={this.onAdd} />
        </div>
        {this.state.data.map(e => {
          return (
            <div className="list-item" key={e.id}>
              {e.id}-{e.name}
              <input
                type="button"
                style={{ width: "50px" }}
                value="Delete"
                onClick={() => this.onDelete(e.id)}
              />
            </div>
          );
        })}
      </div>
    );
  }
}

export default App;
