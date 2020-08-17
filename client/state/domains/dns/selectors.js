/**
 * Internal dependencies
 */
import { initialState } from './reducer';

import 'wp-calypso-client/state/domains/init';

export function getDomainDns( state, domain ) {
	return state.domains.dns[ domain ] || initialState;
}
