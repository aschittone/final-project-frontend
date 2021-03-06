import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import {
	Route,
	Redirect,
} from 'react-router-dom'

/**
 * Alerts are urgent interruptions, requiring acknowledgement, that inform the user about a situation.
 */
export default class DialogExampleAlert extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			open: true,
		};
		this.handleClick = this.handleClick.bind(this)
	}

	handleClick = (lastHistory) => {
		this.props.history.history.push('/')
	}

	render() {
		const actions = [
			<FlatButton
				label="Search Again"
				primary={true}
				onClick={() => this.handleClick(this.props.history.history)}
			/>
		];

		return (
			<div>
				<Dialog
					actions={actions}
					modal={false}
					open={this.state.open}
					onRequestClose={this.handleClose}
				>
					Unfortunately, we do not have any records for this property. Please search for another address.

        </Dialog>
			</div>
		);
	}
}
