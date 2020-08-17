/**
 * Internal dependencies
 */
import { http } from 'wp-calypso-client/state/data-layer/wpcom-http/actions';
import { dispatchRequest } from 'wp-calypso-client/state/data-layer/wpcom-http/utils';
import { registerHandlers } from 'wp-calypso-client/state/data-layer/handler-registry';
import {
	HOME_LAYOUT_REQUEST,
	HOME_LAYOUT_SKIP_CURRENT_VIEW,
} from 'wp-calypso-client/state/action-types';
import { setHomeLayout } from 'wp-calypso-client/state/home/actions';
import config from 'wp-calypso-client/config';

const requestLayout = ( action ) => {
	const isDev = config.isEnabled( 'home/layout-dev' ) || action.isDev;
	return http(
		{
			method: 'GET',
			path: `/sites/${ action.siteId }/home/layout`,
			apiNamespace: 'wpcom/v2',
			query: {
				...( isDev && { dev: true } ),
				...( isDev && action.forcedView && { view: action.forcedView } ),
			},
		},
		action
	);
};

const skipCurrentView = ( action ) => {
	return http(
		{
			method: 'POST',
			path: `/sites/${ action.siteId }/home/layout/skip`,
			apiNamespace: 'wpcom/v2',
			...( config.isEnabled( 'home/layout-dev' ) && { query: { dev: true } } ),
			body: {
				...( action.reminder && { reminder: action.reminder } ),
			},
		},
		action
	);
};

const setLayout = ( { siteId }, layout ) => setHomeLayout( siteId, layout );

registerHandlers( 'state/data-layer/wpcom/sites/home/layout/index.js', {
	[ HOME_LAYOUT_REQUEST ]: [
		dispatchRequest( {
			fetch: requestLayout,
			onSuccess: setLayout,
		} ),
	],
	[ HOME_LAYOUT_SKIP_CURRENT_VIEW ]: [
		dispatchRequest( {
			fetch: skipCurrentView,
			onSuccess: setLayout,
		} ),
	],
} );
