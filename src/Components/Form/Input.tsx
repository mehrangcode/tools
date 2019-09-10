import * as React from 'react';

type IProps = {
    name:string;
    id?:string;
}

class Input extends React.Component<IProps> {

    state ={
        val: "ss"
    }

    onChangeHandler = (e:any) =>{
        this.setState({val: e.target.value})
    }

    render() {
        return <input type="text" name={this.props.name} onChange={this.onChangeHandler} id={this.props.id} value={this.state.val}  />
    }
}


export default Input