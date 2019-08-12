import React from 'react';
import './App.css';
import Select from './Components/Select/Select';
import MultiSelect from './Components/MultiSelect/MultiSelect';

const App: React.FC = () => {
  return (
    <div className="App">
      <Select />

      <div style={{height:"200px"}}>&nbsp;</div>

      <MultiSelect />
    </div>
  );
}

export default App;
