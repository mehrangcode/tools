import * as React from 'react';

export interface IProps {
    rules: any;
}
 
export interface IState {
    
}

class Item extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.state = {   };
    }
    onChangeHandler = (e:any) =>{
        this.setState({val: e.target.value})
    }
    componentDidMount(){
        React.Children.map(this.props.children, x => {
            let child = x as any
                console.log("Item:: ", child.props)
        })
    }
    render() {
        return this.props.children
    }
}
 
export default Item;