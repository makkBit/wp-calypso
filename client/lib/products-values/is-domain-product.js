/**
 * Internal dependencies
 */
import { assertValidProduct } from 'wp-calypso-client/lib/products-values/utils/assert-valid-product';
import { formatProduct } from 'wp-calypso-client/lib/products-values/format-product';
import { isDomainMapping } from 'wp-calypso-client/lib/products-values/is-domain-mapping';
import { isDomainRegistration } from 'wp-calypso-client/lib/products-values/is-domain-registration';

export function isDomainProduct( product ) {
	product = formatProduct( product );
	assertValidProduct( product );

	return isDomainMapping( product ) || isDomainRegistration( product );
}
