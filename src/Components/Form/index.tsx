import * as React from 'react';
export interface IProps {
    
}
 
export interface IState {
    
}
 
class FormTest extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.state = {   };
    }
    render() { 
        return ( 
            <p>Test</p>
         );
    }
}
 
export default FormTest;