import React, { useState } from "react";

var initNote = {
  title: "",
  content: "",
};

function CreateArea(props) {
  const [note, setNote] = useState(initNote);

  function handleChange(event) {
    const { value, name } = event.target;
    setNote((prevNotes) => ({
      ...prevNotes,
      [name]: value,
    }));
  }

  function addClick(event) {
    props.handleClick(note);
    setNote(initNote);
    event.preventDefault();
  }

  return (
    <div>
      <form>
        <input
          name="title"
          value={note.title}
          onChange={handleChange}
          placeholder="Title"
        />
        <textarea
          name="content"
          value={note.content}
          onChange={handleChange}
          placeholder="Take a note..."
          rows="3"
        />
        <button onClick={addClick}>Add</button>
      </form>
    </div>
  );
}

export default CreateArea;
