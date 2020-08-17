/**
 * Internal dependencies
 */
import { assertValidProduct } from 'wp-calypso-client/lib/products-values/utils/assert-valid-product';
import { formatProduct } from 'wp-calypso-client/lib/products-values/format-product';
import { isBlogger } from 'wp-calypso-client/lib/products-values/is-blogger';
import { isBusiness } from 'wp-calypso-client/lib/products-values/is-business';
import { isEcommerce } from 'wp-calypso-client/lib/products-values/is-ecommerce';
import { isEnterprise } from 'wp-calypso-client/lib/products-values/is-enterprise';
import { isJpphpBundle } from 'wp-calypso-client/lib/products-values/is-jpphp-bundle';
import { isPersonal } from 'wp-calypso-client/lib/products-values/is-personal';
import { isPremium } from 'wp-calypso-client/lib/products-values/is-premium';

export function isPlan( product ) {
	product = formatProduct( product );
	assertValidProduct( product );

	return (
		isBlogger( product ) ||
		isPersonal( product ) ||
		isPremium( product ) ||
		isBusiness( product ) ||
		isEcommerce( product ) ||
		isEnterprise( product ) ||
		isJpphpBundle( product )
	);
}
