import React, { useState } from 'react';
import { Dashboard } from "./component/Dashboard";
import Navbar from "./component/Navbar";

function App() {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <>
      <Navbar onSearch={setSearchTerm} />
      <Dashboard searchTerm={searchTerm} />
    </>
  );
}

export default App;
