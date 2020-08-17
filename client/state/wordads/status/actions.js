/**
 * Internal dependencies
 */
import {
	WORDADS_STATUS_REQUEST,
	WORDADS_STATUS_RECEIVE,
} from 'wp-calypso-client/state/action-types';
import { pick } from 'lodash';

import 'wp-calypso-client/state/data-layer/wpcom/wordads/status';
import 'wp-calypso-client/state/wordads/init';

export const requestWordadsStatus = ( siteId ) => ( {
	type: WORDADS_STATUS_REQUEST,
	siteId,
} );

export const receiveStatus = ( siteId, status ) => ( {
	type: WORDADS_STATUS_RECEIVE,
	siteId,
	status: pick( status, [ 'approved', 'unsafe', 'active' ] ),
} );
