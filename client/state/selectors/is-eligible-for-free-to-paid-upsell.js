/**
 * Internal dependencies
 */

import canCurrentUser from 'wp-calypso-client/state/selectors/can-current-user';

import { isJetpackSite } from 'wp-calypso-client/state/sites/selectors';
import isMappedDomainSite from 'wp-calypso-client/state/selectors/is-mapped-domain-site';
import isSiteOnFreePlan from 'wp-calypso-client/state/selectors/is-site-on-free-plan';
import isVipSite from 'wp-calypso-client/state/selectors/is-vip-site';
/**
 * Returns true if the current user is eligible to participate in the free to paid plan upsell for the site
 *
 * @param {object} state Global state tree
 * @param {number} siteId Site ID
 * @returns {?boolean} True if the user can participate in the free to paid upsell
 */
const isEligibleForFreeToPaidUpsell = ( state, siteId ) => {
	const userCanManageOptions = canCurrentUser( state, siteId, 'manage_options' );
	const siteHasMappedDomain = isMappedDomainSite( state, siteId );
	const siteIsJetpack = isJetpackSite( state, siteId );
	const siteIsOnFreePlan = isSiteOnFreePlan( state, siteId );
	const siteIsVipSite = isVipSite( state, siteId );

	return (
		userCanManageOptions &&
		! siteHasMappedDomain &&
		siteIsOnFreePlan &&
		! siteIsVipSite &&
		! siteIsJetpack
	);
};

export default isEligibleForFreeToPaidUpsell;
