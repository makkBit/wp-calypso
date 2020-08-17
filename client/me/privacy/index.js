/**
 * External dependencies
 */

import page from 'page';

/**
 * Internal dependencies
 */
import { makeLayout, render as clientRender } from 'wp-calypso-client/controller';
import { privacy } from './controller';
import { sidebar } from 'wp-calypso-client/me/controller';

export default function () {
	page( '/me/privacy', sidebar, privacy, makeLayout, clientRender );
}
