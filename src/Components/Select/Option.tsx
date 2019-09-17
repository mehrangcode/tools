import React from "react";

export interface IOptionProps {
    value: string;
    text: string;
}

export interface IOptionState {

}

class Option extends React.Component<IOptionProps, IOptionState> {
    constructor(props: IOptionProps) {
        super(props);
    }
}

export default Option;