import React from 'react';
import './App.css';
import Select from './Components/Select/Select';
import MultiSelect from './Components/MultiSelect/MultiSelect';

const App: React.FC = () => {

  const fakeData = [
    { id: "1", title: "Red" },
    { id: "2", title: "Green" },
    { id: "3", title: "Blue" },
    { id: "4", title: "Yellow" },
    { id: "5", title: "Purple" },
    { id: "6", title: "Orange" },
  ]
  return (
    <div className="App">
      <div style={{ width: "300px", margin: "0 auto" }}>
        <Select 
        url="http://37.156.20.117:8585/api/web/v1/Project" 
        initialValue="58"
        onChange={(value: string) => console.log("VALUE: ", value)} optionList= {fakeData} />

        <div style={{ height: "200px" }}>&nbsp;</div>

        <MultiSelect url="http://37.156.20.117:8585/api/web/v1/Project" />
      </div>
    </div>
  );
}

export default App;
