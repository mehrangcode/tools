import React from 'react';

interface IProps {
    onSubmit: (values: any, err: any) => void
}
interface IState {
    [key: string]: any;
}
export default class Form extends React.Component<IProps, IState>{
    constructor(props: any) {
        super(props);
        this.state = {

        };
    }

    itemValidation = (name: string, value: string, rules: any) => {
        let isValid = true;
        let msg = ""
        const err = this.state.err
        rules.map((rule: any) => {
            if (rule.required && isValid) {
                isValid = value.trim() !== ""
                if (!isValid) {
                    msg = rule.msg
                }
                    err [name]= { msg, isValid }
            }
            if (rule.max && isValid) {
                isValid = value.length <= rule.max
                if (!isValid) {
                    msg = rule.msg
                }
                err [name]= { msg, isValid }
            }
        })
        this.setState({ err })
        return isValid
    }

    componentDidMount() {
        // const elements = this.getChild()
        // this.setState({elements})
        this.setStateValues()
    }

    private childChangeHandler = (name: string, e: any, rules: any) => {
        let value = e;
        if (e.target) {
            value = e.target.value
        }

        this.setState({data:{...this.state.data,  [name]: value} })
        this.itemValidation(name, value, rules);
    }

    setStateValues = () => {
        let data: any = {}
        let err: any = {}
        let rules: any = {}

        React.Children.map(this.props.children, (child: any, index) => {
            if (child.type === FormItem) {
                data[child.props.name] = ""
                err[child.props.name]= {msg: "", isValid: false}
                rules[child.props.name]= child.props.rules
            }
        });
        this.setState({
            data,
            err,
            rules
        })
    }
    getChild = () => {
        var items = React.Children.map(this.props.children, (child: any, index) => {
            if (child.type === FormItem) {
                var comp = child.props.component;
                const El = React.cloneElement(comp, {
                    id: comp.props.id ? comp.props.id : child.props.name,
                    onChange: (e: any) => this.childChangeHandler(child.props.name, e, child.props.rules),
                    // value: this.state.data && this.state.data[child.props.name] ? this.state.data[child.props.name] : ""
                }, null);
                return <FromItemWrapper
                    label={child.props.label}
                    id = {comp.props.id ? comp.props.id : child.props.name}
                    name={child.props.name}
                    itemElement={El}
                    err={this.state.err && this.state.err[child.props.name] ? this.state.err[child.props.name].msg : null} />
            }
            else if (child.type === "button") {
                return child
            }
        });
        return items;
    }

    onFormSubmit = (event: any) => {
        event.preventDefault();
        const {data, rules} = this.state
        let err: any = {}
        let isValid = true;
        for(const item in rules){
            let localValidation = false;
            if(isValid) {
                isValid = this.itemValidation(item, this.state.data[item], this.state.rules[item])
            }
            localValidation = this.itemValidation(item, this.state.data[item], this.state.rules[item])
            if(!localValidation) {
                err[item] = this.state.err[item]
            } 
            
        }
        if(isValid){
            err = null
        }
        this.props.onSubmit(data, err);
    }

    render() {
        const elements = this.getChild();
        return <form onSubmit={this.onFormSubmit}>
            {/* {this.state.elements && this.state.elements} */}
            {elements}
        </form>;
    }
}

const FromItemWrapper = (props: any) => {
    return (
        <div>
            {props.label && <label htmlFor={props.id}>{props.label}</label>}
            {props.itemElement}
            {props.err && <small> {props.err} </small>}
        </div>
    )
}

export class FormItem extends React.Component<any, any>{
    // render() {
    //     return <p>{this.props.name}</p>;
    // }
}