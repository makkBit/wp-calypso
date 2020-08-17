/**
 * Internal dependencies
 */
import { assertValidProduct } from 'wp-calypso-client/lib/products-values/utils/assert-valid-product';
import { formatProduct } from 'wp-calypso-client/lib/products-values/format-product';
import { getJetpackProductsDescriptions } from 'wp-calypso-client/lib/products-values/translations';

/**
 * Get Jetpack product description based on the product purchase object.
 *
 * @param   product {object}             Product purchase object
 * @returns         {string|object} Product display name
 */
export function getJetpackProductDescription( product ) {
	product = formatProduct( product );
	assertValidProduct( product );
	const jetpackProductsDescriptions = getJetpackProductsDescriptions();

	return jetpackProductsDescriptions?.[ product.product_slug ];
}
