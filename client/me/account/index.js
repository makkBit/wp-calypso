/**
 * External dependencies
 */
import page from 'page';

/**
 * Internal dependencies
 */
import { account } from './controller';
import { makeLayout, render as clientRender } from 'wp-calypso-client/controller';
import { sidebar } from 'wp-calypso-client/me/controller';

export default function () {
	page( '/me/account', sidebar, account, makeLayout, clientRender );
}
