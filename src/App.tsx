import { createContext, useRef } from 'react';
import './App.css';
import AddNoteCard from './components/AddNoteCard';
import KeepCard from './components/KeepCard';

interface KeepNote {
  noteTitle: string;
  noteContent: string;
}

const keepCards: KeepNote[] = [
  {
    noteTitle: 'Liste de course',
    noteContent: 'Coquillettes'
  },
  {
    noteTitle: 'Adresse',
    noteContent: '1 rue'
  },
  {
    noteTitle: 'Cours',
    noteContent: 'Math'
  },
]

const Context = createContext<KeepNote[]>(keepCards)

const App = () => {
  const containerStyle: React.CSSProperties = {
    margin: '30px',
    display: 'grid',
    gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr',
    gridTemplateRows: '1fr 1fr 1fr 1fr 1fr',
    height: 'calc(100vh - 60px)',
    width: 'calc(100vw - 60px)',
  }

  const refContainer = useRef(null);

  return (
    <Context.Provider value={keepCards}>
      <div style={containerStyle} ref={refContainer}>
        <AddNoteCard parentContainer={refContainer}/>
        {keepCards.map((card) => 
          <KeepCard parentContainer={refContainer} noteTitle={card.noteTitle} noteContent={card.noteContent} />
        )}
      </div>
    </Context.Provider>
  );
}

export default App;
