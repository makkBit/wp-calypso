/**
 * External dependencies
 */

import { noop } from 'lodash';

/**
 * Internal dependencies
 */
import {
	MEMBERSHIPS_SUBSCRIPTIONS_LIST_REQUEST,
	MEMBERSHIPS_SUBSCRIPTIONS_RECEIVE,
} from 'wp-calypso-client/state/action-types';

import { http } from 'wp-calypso-client/state/data-layer/wpcom-http/actions';
import { dispatchRequest } from 'wp-calypso-client/state/data-layer/wpcom-http/utils';

import { registerHandlers } from 'wp-calypso-client/state/data-layer/handler-registry';

export const handleSubscribedMembershipsList = dispatchRequest( {
	fetch: ( action ) =>
		http(
			{
				method: 'GET',
				path: '/me/memberships/subscriptions',
			},
			action
		),
	onSuccess: ( action, { subscriptions, total } ) => ( {
		type: MEMBERSHIPS_SUBSCRIPTIONS_RECEIVE,
		subscriptions,
		total,
	} ),
	onError: noop,
} );

registerHandlers( 'state/data-layer/wpcom/sites/memberships/subscriptions/index.js', {
	[ MEMBERSHIPS_SUBSCRIPTIONS_LIST_REQUEST ]: [ handleSubscribedMembershipsList ],
} );
