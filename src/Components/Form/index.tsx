import * as React from 'react';
import Form from './Form';
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
                        name="username"
                        rules={{
                            required: true
                        }}
                    >
                        <input type="text" name="username" id="username" value="Input value"/>
                    </Form.Item>

                </Form>
            </div>
        );
    }
}

export default FormTest;