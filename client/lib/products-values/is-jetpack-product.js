/**
 * Internal dependencies
 */
import { assertValidProduct } from 'wp-calypso-client/lib/products-values/utils/assert-valid-product';
import { formatProduct } from 'wp-calypso-client/lib/products-values/format-product';
import { isJetpackProductSlug } from 'wp-calypso-client/lib/products-values/is-jetpack-product-slug';

export function isJetpackProduct( product ) {
	product = formatProduct( product );
	assertValidProduct( product );

	return isJetpackProductSlug( product.product_slug );
}
