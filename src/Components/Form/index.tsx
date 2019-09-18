import React from 'react';
import Form, { FormItem } from "./Form";
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
        rules={[{ required: true, msg: "filed is require" }]} 
        component={<input id="baghali" type="text" />} />
        <FormItem name="lastName" 
        rules={[{ required: true, msg: "lastName is require" }, 
        { max: 3, msg: "max lenght 3" }]} 
        component={<input type="text" onChange={(e) => console.log("Input Changed", e.target.name)} />} />
        <button type="submit">Submit</button>
      </Form>
    </div>
  );
}

export default FormTest;
