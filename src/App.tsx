import './App.css';
import KeepCard from './components/KeepCard';
import TestAnimate from './components/TestAnimate';
import Card from './components/Card';
import { AnimatePresence, motion } from "framer-motion"
import { useState } from 'react';
import { SlideshowItem } from './components/SlideShowItem'
import { ContentCard ,ContentCardProps} from './components/ContentCard';

const App = () => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [selectedText, setSelectedText] = useState<number>(0);
  /*
  const [selectedId, setSelectedId] = useState<string | undefined >(undefined)
  const containerStyle: React.CSSProperties = {
    padding: '10px',
    display: 'grid',
    gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr',
    gridTemplateRows: '1fr 1fr 1fr 1fr 1fr',
  }
  */

  const notesArray = [
    {
      id:1,
      name: 'Todolist',
      content: 'Pay speeding ticket, call grandma, resign gym '
    },
    {
      id:2,
      name: 'Morning routine',
      content: 'Wake up, make my bed, breath fresh air, breakfast, brush my teeth, go to school.'
    },
    {
      id:3,
      name: 'Project ideas',
      content: 'My Journal : very visual project where the user handles his notes.'
    },
    {
      id:4,
      name: 'Groceries',
      content: 'Meat, yogurts, vegetables, Ice tea.'
    }    
  ]
  const htmlArray: any[] = [];

  notesArray.forEach((note: ContentCardProps,index:number) => {
    htmlArray.push(<SlideshowItem key={index}><ContentCard {...note} /></SlideshowItem>)
  });
  const newStyle:  React.CSSProperties = {
    width:'50%',
    margin: 'auto'
  }
  return (
    <div style={newStyle} >
      <button onClick={() => setSelectedText(selectedText-1)}>previous slide</button>
      <button onClick={() => setSelectedText(selectedText+1)}>Next slide</button>

      {htmlArray[selectedText]}

      <button onClick={ () => setIsVisible(!isVisible)}>TOGGLE</button>
      <TestAnimate isVisible={isVisible} />

      { /*
      <motion.div animate={{ x: '500px' }}   transition={{ duration: 3, delay:1 }}>aled</motion.div>
      */ }
      { /*
      <motion.div layoutId={'1'} onClick={() => setSelectedId('1')} >
        <KeepCard/>
      </motion.div>
      */}
      {/*
      <Card cardId={'1'} toDoOnClick={setSelectedId}></Card>
      
      <AnimatePresence>
        {selectedId && (
          <motion.div layoutId={selectedId}>
            <KeepCard/>

            <motion.button onClick={() => setSelectedId(undefined)} />
          </motion.div>
        )}
      </AnimatePresence>
      */}
    </div>
  );
}

export default App;
