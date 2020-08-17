/**
 * Internal dependencies
 */
import { isGSuiteOrExtraLicenseProductSlug } from 'wp-calypso-client/lib/gsuite';
import { assertValidProduct } from 'wp-calypso-client/lib/products-values/utils/assert-valid-product';
import { formatProduct } from 'wp-calypso-client/lib/products-values/format-product';

export function isGoogleApps( product ) {
	product = formatProduct( product );
	assertValidProduct( product );

	return isGSuiteOrExtraLicenseProductSlug( product.product_slug );
}
