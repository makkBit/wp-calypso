/**
 * External dependencies
 */
import { map, pickBy } from 'lodash';
import createSelector from 'wp-calypso-client/lib/create-selector';

/**
 * Internal dependencies
 */
import 'wp-calypso-client/state/reader/init';

/**
 * Returns a list of site IDs dismissed by the user
 *
 * @param  {object}  state  Global state tree
 * @returns {Array}        Dimissed site IDs
 */
export const getDismissedSites = createSelector(
	( state ) => map( Object.keys( pickBy( state.reader.siteDismissals.items ) ), Number ),
	( state ) => [ state.reader.siteDismissals.items ]
);
