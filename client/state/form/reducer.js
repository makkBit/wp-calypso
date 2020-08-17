/**
 * External dependencies
 */
import { reducer } from 'redux-form';

/**
 * Internal dependencies
 */
import { withStorageKey } from 'wp-calypso-client/state/utils';

export default withStorageKey( 'form', reducer );
