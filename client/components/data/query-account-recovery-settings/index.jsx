/**
 * External dependencies
 */

import { Component } from 'react';
import { connect } from 'react-redux';

/**
 * Internal dependencies
 */
import { accountRecoverySettingsFetch } from 'wp-calypso-client/state/account-recovery/settings/actions';
import { isFetchingAccountRecoverySettings } from 'wp-calypso-client/state/account-recovery/selectors';

class QueryAccountRecoverySettings extends Component {
	componentDidMount() {
		if ( ! this.props.isFetching ) {
			this.props.accountRecoverySettingsFetch();
		}
	}

	render() {
		return null;
	}
}

export default connect(
	( state ) => ( {
		isFetching: isFetchingAccountRecoverySettings( state ),
	} ),
	{ accountRecoverySettingsFetch }
)( QueryAccountRecoverySettings );
