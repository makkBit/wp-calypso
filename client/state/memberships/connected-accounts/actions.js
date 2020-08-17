/**
 * External dependencies
 */
import requestExternalAccess from '@automattic/request-external-access';
import { change } from 'redux-form';

/**
 * Internal dependencies
 */
import wpcom from 'wp-calypso-client/lib/wp';
import { listMembershipsConnectedAccounts } from '../actions';
import { MEMBERSHIPS_CONNECTED_ACCOUNTS_STRIPE_AUTHORIZE_REQUEST } from 'wp-calypso-client/state/action-types';

import 'wp-calypso-client/state/memberships/init';

import 'wp-calypso-client/state/form/init';

export function authorizeStripeAccount() {
	return ( dispatch ) => {
		dispatch( { type: MEMBERSHIPS_CONNECTED_ACCOUNTS_STRIPE_AUTHORIZE_REQUEST } );

		return wpcom.req.post( '/me/stripe_connect/oauth/url' ).then( ( url ) =>
			requestExternalAccess( url.url, () =>
				dispatch( listMembershipsConnectedAccounts() )
					// After we refresh list of accounts, we have to select it in the form.
					.then( ( accounts ) =>
						dispatch(
							change(
								'simplePaymentsForm',
								'stripe_account',
								Math.max( ...Object.keys( accounts ) ),
								false,
								false
							)
						)
					)
			)
		);
	};
}
