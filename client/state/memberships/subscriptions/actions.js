/**
 * Internal dependencies
 */

import {
	MEMBERSHIPS_SUBSCRIPTIONS_LIST_REQUEST,
	MEMBERSHIPS_SUBSCRIPTION_STOP,
	MEMBERSHIPS_SUBSCRIPTION_STOP_SUCCESS,
	MEMBERSHIPS_SUBSCRIPTION_STOP_FAILURE,
} from 'wp-calypso-client/state/action-types';
import wpcom from 'wp-calypso-client/lib/wp';

import 'wp-calypso-client/state/data-layer/wpcom/sites/memberships/subscriptions';
import 'wp-calypso-client/state/memberships/init';

export const requestSubscriptionsList = () => ( {
	type: MEMBERSHIPS_SUBSCRIPTIONS_LIST_REQUEST,
} );

export const requestSubscriptionStop = ( subscriptionId ) => {
	return ( dispatch ) => {
		dispatch( {
			type: MEMBERSHIPS_SUBSCRIPTION_STOP,
			subscriptionId,
		} );
		return wpcom.req
			.post( `/me/memberships/subscriptions/${ subscriptionId }/cancel` )
			.then( () => {
				dispatch( {
					type: MEMBERSHIPS_SUBSCRIPTION_STOP_SUCCESS,
					subscriptionId,
				} );
			} )
			.catch( ( error ) => {
				dispatch( {
					type: MEMBERSHIPS_SUBSCRIPTION_STOP_FAILURE,
					subscriptionId,
					error,
				} );
			} );
	};
};
