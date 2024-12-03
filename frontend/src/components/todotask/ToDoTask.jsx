import React, { useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";

var initNotes = [
  {
    title: "Note title 1",
    content: "Note content 1",
  },
  {
    title: "Note title 2",
    content: "Note content 2",
  },
];

function App() {
  const [notes, setNotes] = useState(initNotes);

  function addNotes(note) {
    setNotes((prevNotes) => [...prevNotes, note]);
  }
  function deleteNotes(index) {
    setNotes((prevNotes) =>
      prevNotes.filter((note, currentIndex) => currentIndex != index)
    );
  }

  return (
    <div>
      <Header />
      <CreateArea handleClick={(note) => addNotes(note)} />
      {notes.map((note, index) => (
        <Note
          title={note.title}
          content={note.content}
          handleClick={() => deleteNotes(index)}
        />
      ))}

      <Footer />
    </div>
  );
}

export default App;
