/**
 * External dependencies
 */
import { get } from 'lodash';

/**
 * Internal dependencies
 */
import 'wp-calypso-client/state/automated-transfer/init';

export const getAutomatedTransfer = ( state, siteId: number | null ) =>
	get( state, [ 'automatedTransfer', siteId ], {} );
