import * as React from 'react';

export interface IProps {
    value?: string | boolean | number;
    name: string;
    rules: any;
}
 
export interface IState {
    
}

class Item extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.state = {   };
    }

    componentDidMount(){
        React.Children.map(this.props.children, x => {
            let child = x as any
            if(child.props.value){
                console.log("Item:: ", child.props.value)
            }
        })
    }
    render() {
        return this.props.children
    }
}
 
export default Item;