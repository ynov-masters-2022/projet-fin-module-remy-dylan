import './App.css';
import KeepCard from './components/KeepCard';

const App = () => {

  const containerStyle: React.CSSProperties = {
    padding: '10px',
    display: 'grid',
    gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr',
    gridTemplateRows: '1fr 1fr 1fr 1fr 1fr',
  }

  return (
    <div style={containerStyle}>
      <KeepCard/>
      <KeepCard/>
      <KeepCard/>
      <KeepCard/>
      <KeepCard/>
      <KeepCard/>
      <KeepCard/>
      <KeepCard/>
      <KeepCard/>
      <KeepCard/>
      <KeepCard/>
      <KeepCard/>
      <KeepCard/>
      <KeepCard/>
      <KeepCard/>
      <KeepCard/>
      <KeepCard/>
      <KeepCard/>
      <KeepCard/>
      <KeepCard/>
      <KeepCard/>
    </div>
  );
}

export default App;
