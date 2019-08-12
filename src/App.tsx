import React from 'react';
import './App.css';
import Select from './Components/Select/Select';
import MultiSelect from './Components/MultiSelect/MultiSelect';

const App: React.FC = () => {
  return (
    <div className="App">
      <div style={{ width: "300px", margin: "0 auto" }}>
        <Select />

        <div style={{ height: "200px" }}>&nbsp;</div>

        <MultiSelect />
      </div>
    </div>
  );
}

export default App;
