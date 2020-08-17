/**
 * Internal dependencies
 */
import { LEGAL_SET } from 'wp-calypso-client/state/action-types';
import { withStorageKey } from 'wp-calypso-client/state/utils';

const reducer = ( state = {}, { type, legalData } ) => ( type === LEGAL_SET ? legalData : state );
export default withStorageKey( 'legal', reducer );
