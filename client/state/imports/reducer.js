/**
 * Internal dependencies
 */
import { combineReducers, withStorageKey } from 'wp-calypso-client/state/utils';
import uploadsReducer from 'wp-calypso-client/state/imports/uploads/reducer';
import siteImporterReducer from 'wp-calypso-client/state/imports/site-importer/reducer';

const combinedReducer = combineReducers( {
	uploads: uploadsReducer,
	siteImporter: siteImporterReducer,
} );

export default withStorageKey( 'imports', combinedReducer );
