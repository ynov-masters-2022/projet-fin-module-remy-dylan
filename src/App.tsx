import { PanInfo, Point } from 'framer-motion';
import { useContext, useRef, useState } from 'react';
import './App.css';
import AddNoteCard from './components/AddNoteCard';
import KeepCard from './components/KeepCard';
import Trash from './components/Trash';
import { v4 as uuidv4 } from 'uuid';
import { AppContext, AppProvider } from './components/Context';
import { KeepNoteType } from './components/reducers/KeepReducer';

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
      if(point.x >= refTrash.current.offsetLeft && point.y >= refTrash.current.offsetTop
        && point.x <= refTrash.current.offsetLeft + refTrash.current.offsetWidth
        && point.x <= refTrash.current.offsetTop + refTrash.current.offsetHeight) {
        isIn = true;
      }
    }

    return isIn;
  }

  return (
      <AppProvider>
        <div style={containerStyle} ref={refContainer}>
          <AddNoteCard parentContainer={refContainer}/>
          <div 
            style={{
              gridArea: '6 / 4 / 5 / 3',
              zIndex: 99,
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
      </AppProvider>
  );
}

export default App;
