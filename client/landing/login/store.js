/**
 * External dependencies
 */
import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';

/**
 * Internal dependencies
 */
import wpcomApiMiddleware from 'wp-calypso-client/state/data-layer/wpcom-api-middleware';
import analyticsMiddleware from 'wp-calypso-client/state/analytics/middleware';
import {
	reducer as httpData,
	enhancer as httpDataEnhancer,
} from 'wp-calypso-client/state/data-layer/http-data';
import { combineReducers, addReducerEnhancer } from 'wp-calypso-client/state/utils';
import documentHead from 'wp-calypso-client/state/document-head/reducer';
import language from 'wp-calypso-client/state/ui/language/reducer';
import masterbarVisibility from 'wp-calypso-client/state/ui/masterbar-visibility/reducer';
import section from 'wp-calypso-client/state/ui/section/reducer';
import notices from 'wp-calypso-client/state/notices/reducer';
import i18n from 'wp-calypso-client/state/i18n/reducer';
import users from 'wp-calypso-client/state/users/reducer';
import currentUser from 'wp-calypso-client/state/current-user/reducer';

// Legacy reducers
// The reducers in this list are not modularized, and are always loaded on boot.
const rootReducer = combineReducers( {
	documentHead,
	httpData,
	notices,
	i18n,
	users,
	currentUser,
	ui: combineReducers( {
		language,
		masterbarVisibility,
		section,
	} ),
} );

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default () =>
	createStore(
		rootReducer,
		composeEnhancers(
			addReducerEnhancer,
			httpDataEnhancer,
			applyMiddleware( thunkMiddleware, wpcomApiMiddleware, analyticsMiddleware )
		)
	);
