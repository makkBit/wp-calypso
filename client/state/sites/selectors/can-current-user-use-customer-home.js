/**
 * Internal dependencies
 */
import canCurrentUser from 'wp-calypso-client/state/selectors/can-current-user';
import { isJetpackSite } from 'wp-calypso-client/state/sites/selectors';
import isVipSite from 'wp-calypso-client/state/selectors/is-vip-site';
import isAtomicSite from 'wp-calypso-client/state/selectors/is-site-automated-transfer';
import { getSelectedSiteId } from 'wp-calypso-client/state/ui/selectors';
import getSite from './get-site';

/**
 * Returns true if the current user should be able to use the customer home screen
 *
 * @param  {object}   state  Global state tree
 * @param  {?number}  siteId Site ID
 * @returns {?boolean}        Whether the site can use the customer home screen
 */
export default function canCurrentUserUseCustomerHome( state, siteId = null ) {
	if ( ! siteId ) {
		siteId = getSelectedSiteId( state );
	}

	if ( isVipSite( state, siteId ) ) {
		return false;
	}

	if ( isJetpackSite( state, siteId ) && ! isAtomicSite( state, siteId ) ) {
		return false;
	}

	const site = getSite( state, siteId );
	return site && !! canCurrentUser( state, siteId, 'manage_options' );
}
