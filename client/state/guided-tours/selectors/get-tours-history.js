/**
 * Internal dependencies
 */
import { getPreference } from 'wp-calypso-client/state/preferences/selectors';

import 'wp-calypso-client/state/guided-tours/init';

export default ( state ) => getPreference( state, 'guided-tours-history' );
