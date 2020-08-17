/**
 * Internal dependencies
 */

import createSelector from 'wp-calypso-client/lib/create-selector';
import getSites from 'wp-calypso-client/state/selectors/get-sites';
import { getSelectedSite } from 'wp-calypso-client/state/ui/selectors';

export default createSelector(
	( state ) => {
		const selectedSite = getSelectedSite( state );
		return selectedSite ? [ selectedSite ] : getSites( state );
	},
	[ getSelectedSite, getSites ]
);
