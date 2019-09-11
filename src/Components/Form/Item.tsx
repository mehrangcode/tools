import * as React from 'react';

// const ItemWrapper = (props:any) => (Com: any) => {
//     let err =""
//     console.log("ItemWrapper: ", props)
//     return err = "ERR"
// }

// const Item = (props: any) => {
//     const c = ItemWrapper(props.rules)(props.children)
//     return  (
//         <div>
//             <label htmlFor={props.name}>{props.label}</label>
//             {props.children}
//             <small> {c} </small>
//         </div>
//     )
    
// }
type IProps ={
    label: string;
    rules: any;
}
class Item extends React.Component<IProps> {
    constructor(props:IProps) {
        super(props)
    }
}
 
export default Item;