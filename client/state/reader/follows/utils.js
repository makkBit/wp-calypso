/**
 * Internal Dependencies
 */
import { untrailingslashit } from 'wp-calypso-client/lib/route';

export function prepareComparableUrl( url ) {
	const preparedUrl = url && untrailingslashit( url );
	return preparedUrl && preparedUrl.replace( /^https?:\/\//, '' ).toLowerCase();
}
