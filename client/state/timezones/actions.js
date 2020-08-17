/**
 * Internal dependencies
 */
import { TIMEZONES_RECEIVE, TIMEZONES_REQUEST } from 'wp-calypso-client/state/action-types';

import 'wp-calypso-client/state/data-layer/wpcom/timezones';
import 'wp-calypso-client/state/timezones/init';

export const requestTimezones = () => ( {
	type: TIMEZONES_REQUEST,
} );

export const timezonesReceive = ( data ) => ( {
	type: TIMEZONES_RECEIVE,
	...data,
} );
