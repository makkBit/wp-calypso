/**
 * Internal dependencies
 */
import { getSiteByUrl } from 'wp-calypso-client/state/sites/selectors';

import 'wp-calypso-client/state/jetpack-connect/init';

export const getJetpackSiteByUrl = ( state, url ) => {
	const site = getSiteByUrl( state, url );
	if ( site && ! site.jetpack ) {
		return null;
	}
	return site;
};
