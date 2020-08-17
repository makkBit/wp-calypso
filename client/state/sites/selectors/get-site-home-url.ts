/**
 * Internal dependencies
 */
import {
	canCurrentUserUseCustomerHome,
	getSiteSlug,
} from 'wp-calypso-client/state/sites/selectors';
import { getSelectedSiteId } from 'wp-calypso-client/state/ui/selectors';
import { getStatsDefaultSitePage } from 'wp-calypso-client/lib/route/path';

/**
 * Determine the default section to show for the specified site.
 *
 * @param  {object}  state  Global state tree.
 * @param  {?number} siteId Site ID.
 * @returns {string}         Url of the site home.
 */
export default function getSiteHomeUrl( state: object, siteId?: number ): string {
	const selectedSiteId = siteId || getSelectedSiteId( state );
	const siteSlug = getSiteSlug( state, selectedSiteId );

	return canCurrentUserUseCustomerHome( state, selectedSiteId )
		? `/home/${ siteSlug }`
		: getStatsDefaultSitePage( siteSlug );
}
