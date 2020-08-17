/**
 * Internal dependencies
 */

import { withoutPersistence } from 'wp-calypso-client/state/utils';
import {
	WOOCOMMERCE_CURRENCIES_REQUEST,
	WOOCOMMERCE_CURRENCIES_REQUEST_SUCCESS,
} from 'woocommerce/state/action-types';
import { LOADING } from 'woocommerce/state/constants';

// TODO: Handle error

export default withoutPersistence( ( state = null, action ) => {
	switch ( action.type ) {
		case WOOCOMMERCE_CURRENCIES_REQUEST: {
			return LOADING;
		}
		case WOOCOMMERCE_CURRENCIES_REQUEST_SUCCESS: {
			const { data } = action;
			return data;
		}
	}

	return state;
} );
