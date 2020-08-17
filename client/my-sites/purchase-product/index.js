/**
 * External dependencies
 */
import page from 'page';

/**
 * Internal dependencies
 */
import userFactory from 'wp-calypso-client/lib/user';
import * as controller from './controller';
import { login } from 'wp-calypso-client/lib/paths';
import { makeLayout, render as clientRender } from 'wp-calypso-client/controller';

/**
 * Style dependencies
 */
import '../../jetpack-connect/style.scss';

export default function () {
	const user = userFactory();
	const isLoggedOut = ! user.get();

	if ( isLoggedOut ) {
		page(
			'/purchase-product/:type(jetpack_search|wpcom_search)/:interval(yearly|monthly)?',
			( { path } ) => page( login( { isNative: true, isJetpack: true, redirectTo: path } ) )
		);
	} else {
		page(
			'/purchase-product/:type(jetpack_search|wpcom_search)/:interval(yearly|monthly)?',
			controller.persistMobileAppFlow,
			controller.setMasterbar,
			controller.purchase,
			makeLayout,
			clientRender
		);
	}
}
