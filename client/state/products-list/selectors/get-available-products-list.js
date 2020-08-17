/**
 * External dependencies
 */
import { pickBy } from 'lodash';

/**
 * Internal dependencies
 */
import 'wp-calypso-client/state/products-list/init';

export function getAvailableProductsList( state ) {
	return pickBy( state.productsList.items, ( product ) => product.available );
}
