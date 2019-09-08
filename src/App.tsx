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
          // url="http://37.156.20.117:8585/api/web/v1/Project"
          // initialValue="58"
          onChange={(value: string) => console.log("VALUE: ", value)}
          valueProp="value"
          displayProp="text"
        // optionList={fakeData}
        >
          <Select.Option text="asdasd2" value="optionValue1" />
          <Select.Option text="asdasd23" value="optionValue2" />
          <Select.Option text="asdasd3" value="optionValue3" />
          <Select.COption text="select1" value="customSelet1">
            {
              (item: any) => <p style={{ backgroundColor: "red", color: "white", border: "2px solid" }}>Custom ui {item.text} </p>
            }
          </Select.COption>
          <Select.COption text="select2" value="customSelet1233">
            <p style={{ backgroundColor: "red", color: "white", border: "2px solid" }}>Custom ui2</p>
          </Select.COption>
        </Select>

        <div style={{ height: "200px" }}>&nbsp;</div>

        <MultiSelect
          initialValue={["58", "55"]}
          url="http://37.156.20.117:8585/api/web/v1/Project"
        />
      </div>
    </div>
  );
}

export default App;
