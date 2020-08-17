/**
 * Internal dependencies
 */
import { CHECKOUT_TOGGLE_CART_ON_MOBILE } from 'wp-calypso-client/state/action-types';

export function toggleCartOnMobile() {
	return { type: CHECKOUT_TOGGLE_CART_ON_MOBILE };
}
