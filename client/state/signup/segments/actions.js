/**
 * Internal dependencies
 */
import { SIGNUP_SEGMENTS_REQUEST, SIGNUP_SEGMENTS_SET } from 'wp-calypso-client/state/action-types';

import 'wp-calypso-client/state/data-layer/wpcom/signup/segments';
import 'wp-calypso-client/state/signup/init';

/**
 * Action creator: Request segments data.
 *
 * @returns {object} The action object.
 */
export const requestSegments = () => ( {
	type: SIGNUP_SEGMENTS_REQUEST,
} );

/**
 * Action creator: Store segments in the state tree.
 *
 * @param {Array} segments Collection of site segment objects
 *
 * @returns {object} The action object.
 */
export const setSegments = ( segments ) => ( {
	type: SIGNUP_SEGMENTS_SET,
	segments,
} );
