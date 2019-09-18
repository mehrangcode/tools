import React from 'react';
import Form, { FormItem } from "./Form";
import Select from '../Select/Select';
const fakeData = [
  { id: "1", title: "Red" },
  { id: "2", title: "Green" },
  { id: "3", title: "Blue" },
  { id: "4", title: "Yellow" },
  { id: "5", title: "Purple" },
  { id: "6", title: "Orange" },
]
const FormTest: React.FC = () => {
  return (
    <div className="App">
      <Form onSubmit={(values: any, err: any) => {
        console.log("onSubmit", values, err);
        if (err) {
          console.log("err=>")
          return;
        }
        // valid

      }}>
        <FormItem label="User Name"
          name="firstName"
          initialValue="Mehran"
          rules={[{ required: true, msg: "filed is require" }]}
          component={<input id="baghali" type="text" />} />
        <FormItem name="lastName"
          rules={[{ required: true, msg: "lastName is require" },
          { max: 3, msg: "max lenght 3" }]}
          component={<input type="text" onChange={(e) => console.log("Input Changed", e.target.name)} />} />

        <FormItem
          name="Project"
          component={<Select
            // url="http://37.156.20.117:8585/api/web/v1/Project" 
            initialValue="4"
            optionList={fakeData}
          />}
        />
        <button type="submit">Submit</button>
      </Form>
    </div>
  );
}

export default FormTest;
