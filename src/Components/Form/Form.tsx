import * as React from 'react';
import Item from './Item';

export interface IProps {
    
}
 
export interface IState {
    [key: string]: any;
}
 
class Form extends React.Component<IProps, IState> {
    public static Item: typeof Item = Item;
    constructor(props: IProps) {
        super(props);
        this.state = {   };
    }

    componentDidMount() {
        
    }
    onChangeHandler = (e: any) => {
        e.preventDefault();
        console.log(e.target.name, e.target.value)
    }
    submitHandler = () => {
        console.log("submitHandler: ", this.state)
    }
    render() { 
        return ( 
            <form onSubmit={this.submitHandler}>
                {this.props.children}

                <button>Submit</button>
            </form>
         );
    }
}
 
export default Form;