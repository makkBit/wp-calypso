/**
 * Internal dependencies
 */
import { assertValidProduct } from 'wp-calypso-client/lib/products-values/utils/assert-valid-product';
import { formatProduct } from 'wp-calypso-client/lib/products-values/format-product';
import { isDomainTransfer } from 'wp-calypso-client/lib/products-values/is-domain-transfer';

export function isDomainTransferProduct( product ) {
	product = formatProduct( product );
	assertValidProduct( product );

	return isDomainTransfer( product );
}
