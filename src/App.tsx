import { useState } from 'react';
import './App.scss';
import { Archive } from './components/Archive/Archive';
import { Header } from './components/Header/Header';
import SectionManager from './components/SectionManager/SectionManager';

function App() {
  const [currentListId, setCurrentListId] = useState<number>(1);

  const handleCurrentListIdClick = (id: number) => {
    setCurrentListId(id);
  };

  return (
    <div className="App">
      <Header currentlistid={currentListId} handleclick={handleCurrentListIdClick} />
      {currentListId === 0 && <Archive />}
      {currentListId === 1 && <SectionManager />}
    </div>
  );
}

export default App;
