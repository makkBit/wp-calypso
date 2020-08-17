/**
 * External dependencies
 */
import { translate } from 'i18n-calypso';

/**
 * Internal dependencies
 */
import { http } from 'wp-calypso-client/state/data-layer/wpcom-http/actions';
import { dispatchRequest } from 'wp-calypso-client/state/data-layer/wpcom-http/utils';
import { errorNotice } from 'wp-calypso-client/state/notices/actions';
import { READER_LIST_ITEM_DELETE_TAG } from 'wp-calypso-client/state/reader/action-types';
import { registerHandlers } from 'wp-calypso-client/state/data-layer/handler-registry';

registerHandlers( 'state/data-layer/wpcom/read/lists/tags/delete/index.js', {
	[ READER_LIST_ITEM_DELETE_TAG ]: [
		dispatchRequest( {
			fetch: ( action ) =>
				http(
					{
						method: 'POST',
						path: `/read/lists/${ action.listOwner }/${ action.listSlug }/tags/${ action.tagSlug }/delete`,
						apiVersion: '1.2',
						body: {},
					},
					action
				),
			onError: () => errorNotice( translate( 'Unable to remove tag from list' ) ),
		} ),
	],
} );
