import * as React from 'react';
import Form from './Form';
import Input from './Input';
export interface IProps {

}

export interface IState {

}

class FormTest extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.state = {};
    }
    render() {
        return (
            <div>
                <p>Form Test</p>

                <Form>

                    <Form.Item
                        rules={{
                            required: true
                        }}
                    >
                        <Input name="username" />
                    </Form.Item>

                </Form>
            </div>
        );
    }
}

export default FormTest;