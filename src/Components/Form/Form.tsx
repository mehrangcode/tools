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
        rules.map((rule: any) => {
            if (rule.required && isValid) {
                console.log("Required", isValid, this.state)
                isValid = value.trim() !== ""
                if (!isValid) {
                    msg = rule.msg
                }
                this.setState({
                    err: {
                        ...this.state.err,
                        [name]: { msg, isValid }
                    }
                })
            }
            if (rule.max && isValid) {
                console.log("Required", isValid, this.state)
                isValid = value.length <= rule.max
                if (!isValid) {
                    msg = rule.msg
                }
                this.setState({
                    err: {
                        ...this.state.err,
                        [name]: { msg, isValid }
                    }
                })
            }
        })
    }

    componentDidMount() {
        const elements = this.getChild()
        this.setState({elements})
    }

    private childChangeHandler = (name: string, e: any, rules: any) => {
        let value = e;
        if (e.target) {
            value = e.target.value
        }

        this.setState({data:{...this.state.data,  [name]: value} })
        this.itemValidation(name, value, rules);
    }

    getChild = () => {
        let data: any = {}
        let err: any = {}
        var items = React.Children.map(this.props.children, (child: any, index) => {
            if (child.type === FormItem) {
                var comp = child.props.component;
                const El = React.cloneElement(comp, {
                    id: comp.props.id ? comp.props.id : child.props.name,
                    onChange: (e: any) => this.childChangeHandler(child.props.name, e, child.props.rules),
                    value: this.state.data && this.state.data[child.props.name] ? this.state.data[child.props.name] : ""
                }, null);
                data[child.props.name] = ""
                err[child.props.name]= {msg: "", isValid: false}
                this.setState({
                    data,
                    err
                })
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
        const {data, err} = this.state
        let isValid = true;
        if(err){
            for(const x in err){
                isValid = err[x]
            }
        }
        this.props.onSubmit(data, err);
    }

    render() {
        console.log("FORM STATE => ", this.state)
        return <form onSubmit={this.onFormSubmit}>
            {this.state.elements && this.state.elements}
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