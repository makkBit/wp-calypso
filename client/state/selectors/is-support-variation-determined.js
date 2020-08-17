/**
 * Internal Dependencies
 */
import config from 'wp-calypso-client/config';

// State Selectors
import {
	isTicketSupportConfigurationReady,
	getTicketSupportRequestError,
} from 'wp-calypso-client/state/help/ticket/selectors';
import isHappychatUserEligible from 'wp-calypso-client/state/happychat/selectors/is-happychat-user-eligible';
import isDirectlyFailed from 'wp-calypso-client/state/selectors/is-directly-failed';
import isDirectlyReady from 'wp-calypso-client/state/selectors/is-directly-ready';
import isDirectlyUninitialized from 'wp-calypso-client/state/selectors/is-directly-uninitialized';
import getHappychatConnectionStatus from 'wp-calypso-client/state/happychat/selectors/get-happychat-connection-status';

/**
 * @param {object} state Global state tree
 * @returns {boolean} Have each of the required async checks been made?
 */
export default function isSupportVariationDetermined( state ) {
	const ticketReadyOrError =
		isTicketSupportConfigurationReady( state ) || getTicketSupportRequestError( state ) !== null;

	const isHappyChatConnecting = getHappychatConnectionStatus( state ) === 'connecting';
	const happychatReadyOrDisabled =
		! config.isEnabled( 'happychat' ) ||
		! isHappychatUserEligible( state ) ||
		! isHappyChatConnecting;

	const directlyIsReadyOrFailed =
		isDirectlyFailed( state ) || isDirectlyUninitialized( state ) || isDirectlyReady( state );

	return ticketReadyOrError && happychatReadyOrDisabled && directlyIsReadyOrFailed;
}
