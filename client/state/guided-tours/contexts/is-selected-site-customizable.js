/**
 * Internal dependencies
 */
import { getSelectedSite } from 'wp-calypso-client/state/ui/selectors';

/**
 * Returns true if the current user can run customizer for the selected site
 *
 * @param {object} state Global state tree
 * @returns {boolean} True if user can run customizer, false otherwise.
 */
export const isSelectedSiteCustomizable = ( state ) =>
	getSelectedSite( state ) && getSelectedSite( state ).is_customizable;
