import { createContext, useRef } from 'react';
import './App.css';
import AddNoteCard from './components/AddNoteCard';
import KeepCard from './components/KeepCard';
import TestAnimate from './components/TestAnimate';
import { AnimatePresence, motion } from "framer-motion"
import { useState } from 'react';
import { SlideshowItem } from './components/SlideShowItem'
import { ContentCard} from './components/ContentCard';


interface KeepNote {
  noteTitle: string;
  noteContent: string;
}
const keepCards: KeepNote[] = [
  {
    noteTitle: 'Todolist',
    noteContent: 'Pay speeding ticket, call grandma, resign gym '
  },
  {
    noteTitle: 'Morning routine',
    noteContent: 'Wake up, make my bed, breath fresh air, breakfast, brush my teeth, go to school.'
  },
  {
    noteTitle: 'Project ideas',
    noteContent: 'My Journal : very visual project where the user handles his notes.'
  },
  {
    noteTitle: 'Groceries',
    noteContent: 'Meat, yogurts, vegetables, Ice tea.'
  }    
]

const App = () => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [selectedText, setSelectedText] = useState<number>(0);


const Context = createContext<KeepNote[]>(keepCards)

  const containerStyle: React.CSSProperties = {
    margin: '30px',
    display: 'grid',
    gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr',
    gridTemplateRows: '1fr 1fr 1fr 1fr 1fr',
    height: 'calc(100vh - 60px)',
    width: 'calc(100vw - 60px)',
  }

  const htmlArray: any[] = [];

  keepCards.forEach((note: KeepNote,index:number) => {
    htmlArray.push(<SlideshowItem key={index}><ContentCard {...note} /></SlideshowItem>)
  });

  const refContainer = useRef(null);

  const newStyle:  React.CSSProperties = {
    width:'50%',
    margin: 'auto'
  }
  return (
    <div>
      <div style={newStyle} >
        <button onClick={() => setSelectedText(selectedText-1)}>previous slide</button>
        <button onClick={() => setSelectedText(selectedText+1)}>Next slide</button>

        {htmlArray[selectedText]}

        <button onClick={ () => setIsVisible(!isVisible)}>TOGGLE</button>
        <TestAnimate isVisible={isVisible} />

        { /*
        <motion.div animate={{ x: '500px' }}   transition={{ duration: 3, delay:1 }}>aled</motion.div>
        */ }
      </div>
      <Context.Provider value={keepCards}>
      <div style={containerStyle} ref={refContainer}>
        <AddNoteCard parentContainer={refContainer}/>
        {keepCards.map((card) => 
          <KeepCard parentContainer={refContainer} noteTitle={card.noteTitle} noteContent={card.noteContent} />
        )}
      </div>
    </Context.Provider>
  </div>
  );
}

export default App;
