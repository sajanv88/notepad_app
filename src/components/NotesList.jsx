import React, { useEffect, useState, useRef } from "react";
import format from "date-fns/format";
import Search from "./Search";
import { useAppContext } from "../context/context";
import { FaTrash, FaPlusCircle } from "react-icons/fa";

function NotesList() {
  const ref = useRef();
  const { db, state, dispatch } = useAppContext();
  const [list, setList] = useState([]);

  console.log(db);
  useEffect(() => {
    async function loadList() {
      const res = await db.getAll();
      dispatch({ type: "fetchAll", payloads: { lists: res } });
      setList(res);
    }
    loadList();
  }, []);

  useEffect(() => {
    if (!ref.current) {
      ref.current = true;
      return;
    }
    if (state.lists.lenght !== list.length) {
      setList(state.lists);
    }
  });

  function onSearchandler(e) {
    const { value } = e.target;
    if (value) {
      const data = list.filter((item) => item.name.includes(value));
      if (data.length === 0) setList([]);
      else setList(data);
    } else {
      setList(state.lists);
    }
  }

  async function onDelete(e, id) {
    e.stopPropagation();
    await db.deleteRecord(id);
    const res = await db.getAll();
    dispatch({ type: "fetchAll", payloads: { lists: res } });
  }

  async function onselect(e, item) {
    e.preventDefault();
    dispatch({ type: "new", payloads: { list: item } });
  }

  async function onAddNewNote(e) {
    const id = await db.add({
      name: "New Note",
      descriptions: "New note..",
      date: format(new Date(), "dd/mm/yyyy"),
    });
    const newNote = await db.getByID(id);
    dispatch({ type: "new", payloads: { list: newNote } });
    const allNotes = await db.getAll();
    dispatch({ type: "fetchAll", payloads: { lists: allNotes } });
  }

  return (
    <React.Fragment>
      <div className="container">
        <Search onSearchandler={onSearchandler} />
        <div className="m-2 text-gray-900">
          <button
            className="outline-none bg-green-500 hover:bg-green-400 px-2 py-3 w-full"
            onClick={onAddNewNote}
          >
            <div className="flex justify-center items-center text-white">
              <span className="text-sm">Create new note</span>
              <span className="ml-3 text-sm">
                <FaPlusCircle />
              </span>
            </div>
          </button>
        </div>
        <div className="overflow-y-auto notes-list">
          {list.map((item) => (
            <div
              key={item.id}
              className={`px-3 py-2 flex justify-between items-center  mb-1 ${
                state.list.id === item.id
                  ? "bg-gray-900 text-white"
                  : "bg-yellow-200 text-gray-800"
              }`}
              onClick={(e) => onselect(e, item)}
            >
              <span>
                {item.name} <em className="text-sm">{item.date}</em>
              </span>
              <span
                className="text-red-600 cursor-pointer hover:text-red-500"
                onClick={(e) => onDelete(e, item.id)}
              >
                <FaTrash />
              </span>
            </div>
          ))}
        </div>
      </div>
    </React.Fragment>
  );
}

export default NotesList;
