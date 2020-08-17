/**
 * Internal dependencies
 */
import getPreviousRoute from 'wp-calypso-client/state/selectors/get-previous-route';

export const isPreviousRouteGutenberg = ( state ) =>
	0 === getPreviousRoute( state ).indexOf( '/block-editor' );

export default isPreviousRouteGutenberg;
