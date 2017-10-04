import React from 'react';
import createClass from 'create-react-class';
import Formsy from 'formsy-react';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import MenuItem from 'material-ui/MenuItem';
import { FormsyText } from 'formsy-material-ui/lib';
import Auth from '../adapters/auth'
import SnackBar from './SnackBar'
import { Card, CardActions } from 'material-ui/Card';
import Avatar from 'material-ui/Avatar';
import LockIcon from 'material-ui/svg-icons/action/lock-outline';
import { cyan500, pinkA200 } from 'material-ui/styles/colors';


const styles = {
	main: {
		display: 'flex',
		flexDirection: 'column',
		minHeight: '100vh',
		alignItems: 'center',
		justifyContent: 'center',
	},
	card: {
		minWidth: 300,
	},
	avatar: {
		margin: '1em',
		textAlign: 'center ',
	},
	form: {
		padding: '0 1em 1em 1em',
	},
	input: {
		display: 'flex',
	},
	hint: {
		textAlign: 'center',
		marginTop: '1em',
		color: '#ccc',
	},
};

function getColorsFromTheme(theme) {
	if (!theme) return { primary1Color: cyan500, accent1Color: pinkA200 };
	const {
        palette: {
            primary1Color,
		accent1Color,
        },
      } = theme;
	return { primary1Color, accent1Color };
}

class Main extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			canSumit: false,
			errorMsg: ''
		}
		this.enableButton = this.enableButton.bind(this)
		this.disableButton = this.disableButton.bind(this)
		this.submitForm = this.submitForm.bind(this)

	}

	errorMessages = {
		wordsError: "Please only use letters",
		numericError: "Please provide a number",
		urlError: "Please provide a valid URL"
	}

	enableButton() {
		this.setState({
			canSubmit: true,
		});
	}

	disableButton() {
		this.setState({
			canSubmit: false,
		});
	}

	submitForm(data, event) {
		this.setState({
			errorMsg: ''
		})
		const userParams = {
			username: data.email,
			password: data.password
		}
		Auth.login(userParams)
			.then((res) => {
				if (res.msg === "Success") {
					localStorage.setItem("token", res.jwt)
					localStorage.getItem('lastUrl') ? localStorage.getItem('lastUrl') : localStorage.setItem('lastUrl', window.location)
					let url = localStorage.getItem('lastUrl')
					let split = url.split("/")
					if (split[3] === "listing") {
						this.props.history.go(-1)
					} else {
						this.props.history.push('/')
					}
				} else {
					this.setState({
						errorMsg: res.msg
					})
				}
			})
	}

	notifyFormError(data) {
		console.error('Form error:', data);
	}

	render() {
		const muiTheme = getMuiTheme();
		const { primary1Color, accent1Color } = getColorsFromTheme(muiTheme);

		return (
			<div>
				<div className="blur"></div>
				{this.state.errorMsg !== '' ? <SnackBar text={this.state.errorMsg} /> : null}
				<MuiThemeProvider muiTheme={getMuiTheme()}>
					<div style={{ ...styles.main }} className="div-with-bg">
						<Card style={styles.card}>
							<div style={styles.avatar}>
								<Avatar backgroundColor={accent1Color} icon={<LockIcon />} size={60} />
							</div>
							<Formsy.Form
								onValid={this.enableButton}
								onInvalid={this.disableButton}
								onValidSubmit={this.submitForm}
								onInvalidSubmit={this.notifyFormError}>
								<div style={styles.form}>
									<p style={styles.hint}>Login</p>
									<div style={styles.input} >
										<FormsyText
											name="email"
											validations="isEmail"
											validationError={"Please enter a valid email"}
											required
											hintText="Email"
											floatingLabelText="Email"
											floatingLabelStyle={{ color: '#000' }}
											floatingLabelFocusStyle={{ color: '#000' }}
											underlineFocusStyle={{ borderColor: '#000' }}

										/>
									</div>
									<div style={styles.input} >
										<FormsyText
											name="password"
											type="password"
											required
											hintText="Password"
											floatingLabelText="Password"
											updateImmediately
											floatingLabelStyle={{ color: '#000' }}
											floatingLabelFocusStyle={{ color: '#000' }}
											underlineFocusStyle={{ borderColor: '#000' }}

										/>
									</div>
								</div>
								<CardActions>
									<RaisedButton
										type="submit"
										label="Login"
										disabled={!this.state.canSubmit}
										fullWidth
									/>
								</CardActions>
							</Formsy.Form>
						</Card>
					</div>
				</MuiThemeProvider>
			</div >
		);
	}
}

// <MuiThemeProvider muiTheme={muiTheme}>
// 	<div style={{ ...styles.main, backgroundColor: primary1Color }}>
// 		<Card style={styles.card}>
// 			<div style={styles.avatar}>
// 				<Avatar backgroundColor={accent1Color} icon={<LockIcon />} size={60} />
// 			</div>
// 			<form onSubmit={handleSubmit(this.login)}>
// 				<div style={styles.form}>
// 					<p style={styles.hint}>Hint: demo / demo</p>
// 					<div style={styles.input} >
// 						<Field
// 							name="username"
// 							component={renderInput}
// 							floatingLabelText={translate('aor.auth.username')}
// 						/>
// 					</div>
// 					<div style={styles.input}>
// 						<Field
// 							name="password"
// 							component={renderInput}
// 							floatingLabelText={translate('aor.auth.password')}
// 							type="password"
// 						/>
// 					</div>
// 				</div>
// 				<CardActions>
// 					<RaisedButton type="submit" primary disabled={submitting} label={translate('aor.auth.sign_in')} fullWidth />
// 				</CardActions>
// 			</form>
// 		</Card>
// 		<Notification />
// 	</div>
// </MuiThemeProvider>



export default Main;