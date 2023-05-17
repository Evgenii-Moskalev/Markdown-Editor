import React from "react"
import Sidebar from "./components/Sidebar"
import Editor from "./components/Editor"
import Split from "react-split"
import { nanoid } from "nanoid"
import "react-mde/lib/styles/css/react-mde-all.css"

export default function App() {

  const [notes, setNotes] = React.useState(
    JSON.parse(localStorage.getItem("notes")) || []
  )
  // const [currentNoteId, setCurrentNoteId] = React.useState(
  //   (notes[0] && notes[0].id) || ""
  // )
  //Or using Optional chaining (?.) operator to rewrite code above
  const [currentNoteId, setCurrentNoteId] = React.useState(
    (notes[0]?.id) || "")

  const currentNote = notes.find(note => note.id === currentNoteId)
    || notes[0];

  React.useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes))
  }, [notes])

  function createNewNote() {
    const newNote = {
      id: nanoid(),
      body: "# Type your markdown note's title here"
    }
    setNotes(prevNotes => [newNote, ...prevNotes])
    setCurrentNoteId(newNote.id)
  }

  function updateNote(text) {
    // Put the most recently-modified note at the top
    setNotes(oldNotes => {
      const newArray = [];
      for (let i = 0; i < oldNotes.length; i++) {
        // const oldNote = oldNotes[i];
        if (oldNotes[i].id === currentNoteId) {
          newArray.unshift({ ...oldNotes[i], body: text })
        } else {
          newArray.push(oldNotes[i])
        }
      }
      return newArray
    })
  }

  function deleteNote(event, noteId) {
    event.stopPropagation();
    setNotes(oldNotes => oldNotes.filter(note => note.id !== noteId));
  }

  // function findCurrentNote() {
  //   return notes.find(note => {
  //     return note.id === currentNoteId
  //   }) || notes[0]
  // }

  return (
    <main>
      {
        notes.length > 0
          ?
          <Split
            sizes={[30, 70]}
            direction="horizontal"
            className="split"
          >
            <Sidebar
              notes={notes}
              currentNote={currentNote}
              setCurrentNoteId={setCurrentNoteId}
              newNote={createNewNote}
              deleteNote={deleteNote}
            />
            {
              currentNoteId &&
              notes.length > 0 &&
              <Editor
                currentNote={currentNote}
                updateNote={updateNote}
              />
            }
          </Split>
          :
          <div className="no-notes">
            <h1>You have no notes</h1>
            <button
              className="first-note"
              onClick={createNewNote}
            >
              Create one now
            </button>
          </div>

      }
    </main>
  )
}