/**
 * Internal dependencies
 */
import { assertValidProduct } from 'wp-calypso-client/lib/products-values/utils/assert-valid-product';
import { formatProduct } from 'wp-calypso-client/lib/products-values/format-product';

export function isDomainRedemption( product ) {
	product = formatProduct( product );
	assertValidProduct( product );

	return product.product_slug === 'domain_redemption';
}
