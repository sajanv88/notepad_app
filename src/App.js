import React from "react";
import NotesList from "./components/NotesList";
import AppEditor from "./components/AppEditor";

function App() {
  return (
    <div className="container-full h-screen bg-gray-400">
      <div className="flex h-screen">
        <div className="w-1/3 h-screen bg-gray-700">
          <NotesList />
        </div>
        <div className="w-full bg-gray-600">
          <AppEditor />
        </div>
      </div>
    </div>
  );
}

export default App;
