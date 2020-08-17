/**
 * External dependencies
 */
import { get } from 'lodash';

/**
 * Internal dependencies
 */
import 'wp-calypso-client/state/memberships/init';

export function getAllSubscriptions( state ) {
	return get( state, [ 'memberships', 'subscriptions', 'items' ] );
}

export function getSubscription( state, subscriptionId ) {
	return ( getAllSubscriptions( state ) ?? [] )
		.filter( ( sub ) => sub.ID === subscriptionId )
		.pop();
}

export function getStoppingStatus( state, subscriptionId ) {
	return get(
		state,
		[ 'memberships', 'subscriptions', 'stoppingSubscription', subscriptionId ],
		false
	);
}
