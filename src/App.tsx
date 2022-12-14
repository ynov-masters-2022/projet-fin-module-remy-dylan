import { Point } from 'framer-motion';
import { useContext, useRef } from 'react';
import './App.css';
import AddNoteCard from './components/AddNoteCard';
import KeepCard from './components/KeepCard';
import Trash from './components/Trash';
import { AppContext, AppProvider } from './components/Context';
import { KeepNoteType } from './reducers/KeepReducer';

const containerStyle: React.CSSProperties = {
  margin: '30px',
  display: 'grid',
  gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr',
  gridTemplateRows: '1fr 1fr 1fr 1fr 1fr',
  height: 'calc(100vh - 60px)',
  width: 'calc(100vw - 60px)',
}

const App = () => {
  const { state } = useContext(AppContext);

  const refContainer = useRef<HTMLDivElement>(null);

  const refTrash = useRef<HTMLDivElement>(null);

  const isInTrash = (point: Point): boolean => {
    let isIn = false;
    if(refTrash.current !== undefined && refTrash.current !== null) {
      if(point.x >= refTrash.current.offsetLeft+25 && point.y >= refTrash.current.offsetTop+25
        && point.x <= refTrash.current.offsetLeft+25 + refTrash.current.offsetWidth+25
        && point.x <= refTrash.current.offsetTop+25 + refTrash.current.offsetHeight+25) {
        isIn = true;
      }
    }

    return isIn;
  }

  return (
      <div style={containerStyle} ref={refContainer}>
        <AddNoteCard parentContainer={refContainer}/>
        <div 
          style={{
            gridArea: '6 / 4 / 5 / 3',
            display:'flex',
            alignItems:'center',
            justifyContent:'center'
          }}
          ref={refTrash}
        >
          <Trash/>
        </div>
        {state.keepNote.map((card: KeepNoteType) => 
          <KeepCard 
            parentContainer={refContainer} 
            keepNote={card}
            isInTrashFn={isInTrash}
            key={card.id}
          />
        )}
      </div>
  );
}

export default App;
