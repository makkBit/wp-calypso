/**
 * External dependencies
 */
import { connect } from 'react-redux';

/**
 * Internal dependencies
 */
import config from 'wp-calypso-client/config';
import { getHappychatAuth } from 'wp-calypso-client/state/happychat/utils';
import isHappychatConnectionUninitialized from 'wp-calypso-client/state/happychat/selectors/is-happychat-connection-uninitialized';
import { initConnection } from 'wp-calypso-client/state/happychat/connection/actions';
import { HappychatConnection } from 'wp-calypso-client/components/happychat/connection';

export default connect(
	( state ) => ( {
		getAuth: getHappychatAuth( state ),
		isConnectionUninitialized: isHappychatConnectionUninitialized( state ),
		isHappychatEnabled: config.isEnabled( 'happychat' ),
	} ),
	{ initConnection }
)( HappychatConnection );
