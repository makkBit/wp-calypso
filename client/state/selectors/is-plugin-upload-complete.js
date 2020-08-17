/**
 * Internal dependencies
 */

import getUploadedPluginId from 'wp-calypso-client/state/selectors/get-uploaded-plugin-id';

import isPluginUploadInProgress from 'wp-calypso-client/state/selectors/is-plugin-upload-in-progress';

/**
 * Indicates whether a plugin upload has completed
 * for the given site.
 *
 * @param {object} state Global state tree
 * @param {number} siteId the site ID
 * @returns {boolean} true if plugin upload is complete
 */
export default function isPluginUploadComplete( state, siteId ) {
	return !! ( ! isPluginUploadInProgress( state, siteId ) && getUploadedPluginId( state, siteId ) );
}
