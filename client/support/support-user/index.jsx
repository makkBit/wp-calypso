/**
 * External dependencies
 */

import { Component } from 'react';
import { connect } from 'react-redux';

/**
 * Internal dependencies
 */
import KeyboardShortcuts from 'wp-calypso-client/lib/keyboard-shortcuts';
import { rebootNormally } from 'wp-calypso-client/lib/user/support-user-interop';
import { isSupportSession } from 'wp-calypso-client/state/support/selectors';

class SupportUser extends Component {
	componentDidMount() {
		KeyboardShortcuts.on( 'exit-support-user', this.onKeyboardShortcut );
	}

	componentWillUnmount() {
		KeyboardShortcuts.off( 'exit-support-user', this.onKeyboardShortcut );
	}

	onKeyboardShortcut = () => {
		if ( this.props.isSupportSession ) {
			rebootNormally();
		}
	};

	render() {
		return null;
	}
}

export default connect( ( state ) => ( {
	isSupportSession: isSupportSession( state ),
} ) )( SupportUser );
