/* eslint react/no-multi-comp: 0, react/prop-types: 0 */
import React from 'react';
import {Button, Popover, PopoverBody} from 'reactstrap';
import Popper from 'popper.js';
import {Blackout} from '../../../../apps/repository/js/Blackout';
import {IStyleMap} from '../../react/IStyleMap';

const Styles: IStyleMap = {

    title: {
        fontSize: "20px",
        fontWeight: "bold"
    },

    subtitle: {
        fontSize: "14px"
    },

    popover: {
        // minWidth: '350px',
        // width: '350px'
    }

};

export class ConfirmPopover extends React.Component<IProps, IState> {

    constructor(props: IProps) {
        super(props);

    }

    public componentWillReceiveProps(nextProps: Readonly<IProps>, nextContext: any): void {

        if (this.props.open !== nextProps.open) {
            Blackout.toggle(nextProps.open);
        }

    }

    public componentWillUnmount(): void {
        Blackout.disable();
    }

    public render() {

        return (

            <Popover placement={this.props.placement || 'bottom'}
                     isOpen={this.props.open}
                     target={this.props.target}
                     className="confirm-popover"
                     style={Styles.popover}>

                <PopoverBody className="text-center">

                    <div className="w-100 p-1" style={Styles.title}>
                        {this.props.title}
                    </div>

                    <div className="w-100 p-1 muted" style={Styles.subtitle}>
                        {this.props.subtitle || ""}
                    </div>

                    <Button color="secondary"
                            size="sm"
                            className="m-1"
                            onClick={() => this.props.onCancel()}>Cancel</Button>

                    <Button color="primary"
                            size="sm"
                            className="m-1"
                            onClick={() => this.props.onConfirm()}>Confirm</Button>

                </PopoverBody>

            </Popover>
        );
    }

}

interface IProps {
    open: boolean;
    target: string;
    title: string;
    subtitle?: string;
    placement?: Popper.Placement;
    onCancel: () => void;
    onConfirm: () => void;
}

interface IState {
    open: boolean;
}

