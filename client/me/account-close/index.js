/**
 * External dependencies
 */
import page from 'page';

/**
 * Internal dependencies
 */
import { accountClose, accountClosed } from './controller';
import { makeLayout, render as clientRender } from 'wp-calypso-client/controller';
import { sidebar } from 'wp-calypso-client/me/controller';
import { isEnabled } from 'wp-calypso-client/config';

export default function () {
	if ( isEnabled( 'me/account-close' ) ) {
		page( '/me/account/close', sidebar, accountClose, makeLayout, clientRender );
		page( '/me/account/closed', accountClosed, makeLayout, clientRender );
	}
}
