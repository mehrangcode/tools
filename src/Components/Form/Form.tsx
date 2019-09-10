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

    private getChildren = () => {
        React.Children.map(this.props.children, (x,i) => {
            // let y = x as React.ReactElement;
            
        })
    }
    componentDidMount() {
        this.getChildren()
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