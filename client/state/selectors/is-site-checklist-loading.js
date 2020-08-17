/**
 * Internal dependencies
 */
import getRequest from 'wp-calypso-client/state/selectors/get-request';
import { requestSiteChecklist } from 'wp-calypso-client/state/checklist/actions';

/**
 * Returns the loading state for the checklist API call
 *
 * @param  {object}  state  Global state tree
 * @param  {number}  siteId Site ID
 * @returns {Bool}    Whether the checklist is loading
 */
export default function isSiteChecklistLoading( state, siteId ) {
	return getRequest( state, requestSiteChecklist( siteId ) ).isLoading;
}
