/**
 * Internal dependencies
 */
import { costToUSD } from 'wp-calypso-client/lib/analytics/utils';

import { recordAddToCart as trackAddToCart } from 'wp-calypso-client/lib/analytics/ad-tracking';
import { gaRecordEvent } from './ga';

export function recordAddToCart( { cartItem } ) {
	// TODO: move Tracks event here?
	// Google Analytics
	const usdValue = costToUSD( cartItem.cost, cartItem.currency );
	gaRecordEvent( 'Checkout', 'calypso_cart_product_add', '', usdValue ? usdValue : undefined );
	// Marketing
	trackAddToCart( cartItem );
}
