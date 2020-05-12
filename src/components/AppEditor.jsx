import React, { useState, useEffect, useRef } from "react";
import format from "date-fns/format";
import { EditorState, convertToRaw, ContentState } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { useAppContext } from "../context/context";

function AppEditor() {
  const ref = useRef();
  const { db, state, dispatch } = useAppContext();

  const [editorState, setEditorState] = useState(
    EditorState.createWithContent(
      ContentState.createFromText(state.list.descriptions || "")
    )
  );
  const [text, setText] = useState("");
  const [note, setNote] = React.useState({ name: "", descriptions: "", id: 0 });

  useEffect(() => {
    if (state.list.id) {
      setNote(state.list);
      setText(state.list.descriptions);
      setEditorState(
        EditorState.createWithContent(
          ContentState.createFromText(state.list.descriptions)
        )
      );
    }
  }, [state.list]);

  useState(() => {
    if (!ref.current) {
      ref.current = true;
      return;
    }
    if (state.list.id && state.list.descriptions !== note.descriptions) {
      setNote(state.list);
      setText(state.list.descriptions);
      setEditorState(
        EditorState.createWithContent(
          ContentState.createFromText(state.list.descriptions)
        )
      );
    }
  });

  async function onEditorStateChange(editorState) {
    setEditorState(editorState);
    const blocks = convertToRaw(editorState.getCurrentContent()).blocks;
    const text = blocks.map((d) => d.text.trim()).join(" ");
    setText(text);
  }

  async function saveNotes(e) {
    if (text && !note.id) {
      const id = await db.add({
        name: text.substring(0, 10),
        descriptions: text,
        date: format(new Date(), "dd/mm/yyyy"),
      });
      console.log(id);
      const res = await db.getByID(id);
      setNote(res);
      const allData = await db.getAll();
      dispatch({ type: "fetchAll", payloads: { lists: allData } });
    } else {
      console.log("update");
      const res = await db.update({
        id: note.id,
        name: text.substring(0, 10) || note.name,
        descriptions: text,
      });
      const allData = await db.getAll();
      dispatch({ type: "fetchAll", payloads: { lists: allData } });
      console.log("updated", res);
    }
  }
  if (!state.list.id || state.lists.length === 0)
    return (
      <div className="h-screen flex justify-center items-center">
        <h1 className="text-3xl">No notes to display</h1>
      </div>
    );
  return (
    <React.Fragment>
      <div className="flex justify-end mr-1 mt-2">
        <button
          className={`bg-green-500 text-white px-2 py-2 hover:bg-green-400 outline-none ${
            !text ? "opacity-50 cursor-not-allowed" : ""
          }`}
          onClick={saveNotes}
          disabled={!text}
        >
          Save
        </button>
      </div>
      <div className="m-1 bg-yellow-100 text-black p-2">
        <Editor
          editorState={editorState}
          wrapperClassName="wrapper"
          editorClassName="editor"
          onEditorStateChange={onEditorStateChange}
        />
      </div>
    </React.Fragment>
  );
}

export default AppEditor;
