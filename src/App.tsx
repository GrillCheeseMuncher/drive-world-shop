import { useState } from 'react';
import './App.scss';
import { Archive } from './components/Archive/Archive';
import { Header } from './components/Header/Header';
import SectionManager, { Section } from './components/SectionManager/SectionManager';

function App() {
  const [currentListId, setCurrentListId] = useState<number>(1);
  const [archivedSections, setArchivedSections] = useState<Section[]>([]);

  const handleCurrentListIdClick = (id: number) => {
    setCurrentListId(id);
  };

  return (
    <div className="App">
      <Header currentlistid={currentListId} handleclick={handleCurrentListIdClick} />
      {currentListId === 0 && <Archive sections={archivedSections} />}
      {currentListId === 1 && <SectionManager setArchivedSections={setArchivedSections} />}
    </div>
  );
}

export default App;
