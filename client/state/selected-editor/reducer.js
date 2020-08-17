/**
 * External dependencies
 */

/**
 * Internal dependencies
 */
import { EDITOR_TYPE_SET } from 'wp-calypso-client/state/action-types';
import { keyedReducer } from 'wp-calypso-client/state/utils';

export const selectedEditor = ( state, { type, editor } ) =>
	type === EDITOR_TYPE_SET ? editor : state;

export default keyedReducer( 'siteId', selectedEditor );
