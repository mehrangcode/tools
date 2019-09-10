import * as React from 'react';

export interface IProps {
    
}
 
export interface IState {
    [key: string]: any;
}
 
class Form extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.state = {   };
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