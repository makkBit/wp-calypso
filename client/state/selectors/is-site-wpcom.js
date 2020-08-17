/**
 * Internal dependencies
 */
import createSelector from 'wp-calypso-client/lib/create-selector';
import getSelectedSiteId from 'wp-calypso-client/state/ui/selectors/get-selected-site-id';
import isAtomicSite from 'wp-calypso-client/state/selectors/is-site-automated-transfer';
import isJetpackSite from 'wp-calypso-client/state/sites/selectors/is-jetpack-site';

/**
 * Return true if the questioned site is a WPCOM site ( Atomic or Simple ).
 *
 * @param {object} state the global state tree
 * @param {number} siteId the questioned site ID.
 * @returns {boolean} Whether the site is a WPCOM site ( Atomic or Simple ).
 */
export default createSelector(
	( state, siteId = getSelectedSiteId( state ) ) =>
		! isJetpackSite( state, siteId ) || isAtomicSite( state, siteId ),
	( state, siteId = getSelectedSiteId( state ) ) => [
		isJetpackSite( state, siteId ),
		isAtomicSite( state, siteId ),
	]
);
