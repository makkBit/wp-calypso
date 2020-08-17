/**
 * Internal dependencies
 */
import { and } from 'wp-calypso-client/layout/guided-tours/utils';
import { isNewUser, isEnabled } from 'wp-calypso-client/state/guided-tours/contexts';

export default {
	name: 'main',
	version: '20160601',
	path: '/',
	when: and( isNewUser, isEnabled( 'guided-tours/main' ) ),
};
