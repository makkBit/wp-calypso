/**
 * Internal dependencies
 */
import 'wp-calypso-client/state/products-list/init';

export function getProductsList( state ) {
	return state.productsList.items;
}
