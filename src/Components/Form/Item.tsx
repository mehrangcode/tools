import * as React from 'react';

export interface IProps {
    value: string | boolean | number;
    text: string;
}
 
export interface IState {
    
}
 
class Item extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.state = {   };
    }
    
}
 
export default Item;