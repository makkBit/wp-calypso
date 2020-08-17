/**
 * Internal dependencies
 */
import { combineReducers } from 'wp-calypso-client/state/utils';
import languageNames from './language-names/reducer';
import localeSuggestions from './locale-suggestions/reducer';

export default combineReducers( {
	languageNames,
	localeSuggestions,
} );
