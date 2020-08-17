/**
 * External dependencies
 */
import { translate } from 'i18n-calypso';

/**
 * Internal dependencies
 */
import { http } from 'wp-calypso-client/state/data-layer/wpcom-http/actions';
import { dispatchRequest } from 'wp-calypso-client/state/data-layer/wpcom-http/utils';
import { registerHandlers } from 'wp-calypso-client/state/data-layer/handler-registry';
import { errorNotice } from 'wp-calypso-client/state/notices/actions';
import { setMediaExportData } from 'wp-calypso-client/state/exporter/actions';
import { EXPORT_MEDIA_REQUEST } from 'wp-calypso-client/state/action-types';

export const fetch = ( action ) =>
	http(
		{
			method: 'GET',
			path: `/sites/${ action.siteId }/exports/media`,
			apiNamespace: 'rest/v1.1',
			query: {
				http_envelope: 1,
			},
		},
		action
	);

export const onSuccess = ( action, { mediaExportUrl } ) => setMediaExportData( mediaExportUrl );

export const onError = () =>
	errorNotice(
		translate( "We couldn't export your media library at the moment. Please try again later." )
	);

export const fromApi = ( response ) => ( {
	mediaExportUrl: response.media_export_url,
} );

registerHandlers( 'state/data-layer/wpcom/sites/exports/media/index.js', {
	[ EXPORT_MEDIA_REQUEST ]: [
		dispatchRequest( {
			fetch,
			onSuccess,
			onError,
			fromApi,
		} ),
	],
} );
