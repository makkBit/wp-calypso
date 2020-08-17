/**
 * External dependencies
 */
import { get } from 'lodash';

/**
 * Internal dependencies
 */
import 'wp-calypso-client/state/signup/init';

export const getVerticals = ( state, searchTerm = '', siteType = '' ) =>
	get( state, [ 'signup', 'verticals', siteType, searchTerm.trim().toLowerCase() ], null );
