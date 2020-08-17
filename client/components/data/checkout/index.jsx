/**
 * External dependencies
 */

import React from 'react';

/**
 * Internal dependencies
 */
import StoreConnection from 'wp-calypso-client/components/data/store-connection';
import CartStore from 'wp-calypso-client/lib/cart/store';
import TransactionStore from 'wp-calypso-client/lib/transaction/store';

const stores = [ TransactionStore, CartStore ];

function getStateFromStores() {
	return {
		transaction: TransactionStore.get(),
		cart: CartStore.get(),
	};
}

class CheckoutData extends React.Component {
	render() {
		return (
			<StoreConnection stores={ stores } getStateFromStores={ getStateFromStores }>
				{ this.props.children }
			</StoreConnection>
		);
	}
}

export default CheckoutData;
