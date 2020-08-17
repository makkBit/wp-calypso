/**
 * Internal dependencies
 */
import {
	ORDER_TRANSACTION_FETCH,
	ORDER_TRANSACTION_FETCH_ERROR,
	ORDER_TRANSACTION_SET,
} from 'wp-calypso-client/state/action-types';

import 'wp-calypso-client/state/data-layer/wpcom/me/transactions/order';

export const fetchOrderTransaction = ( orderId ) => ( {
	type: ORDER_TRANSACTION_FETCH,
	orderId,
} );

export const setOrderTransaction = ( orderId, transaction ) => ( {
	type: ORDER_TRANSACTION_SET,
	orderId,
	transaction,
} );

export const setOrderTransactionError = ( orderId, error ) => ( {
	type: ORDER_TRANSACTION_FETCH_ERROR,
	orderId,
	error,
} );
