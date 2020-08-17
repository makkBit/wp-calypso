/**
 * External dependencies
 */
import { get } from 'lodash';

import 'wp-calypso-client/state/form/init';

export default function getEditedSimplePaymentsStripeAccount( state, formName ) {
	return get( state, [ 'form', formName, 'values', 'stripe_account' ], '' );
}
