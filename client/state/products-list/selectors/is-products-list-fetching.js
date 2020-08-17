/**
 * Internal dependencies
 */
import 'wp-calypso-client/state/products-list/init';

export function isProductsListFetching( state ) {
	return state.productsList.isFetching;
}
