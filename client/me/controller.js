/**
 * External dependencies
 */
import React from 'react';
import page from 'page';
import i18n from 'i18n-calypso';

/**
 * Internal dependencies
 */
import userSettings from 'wp-calypso-client/lib/user-settings';
import { setDocumentHeadTitle as setTitle } from 'wp-calypso-client/state/document-head/actions';
import SidebarComponent from 'wp-calypso-client/me/sidebar';
import AppsComponent from 'wp-calypso-client/me/get-apps';

export function sidebar( context, next ) {
	context.secondary = React.createElement( SidebarComponent, {
		context: context,
	} );

	next();
}

export function profile( context, next ) {
	// FIXME: Auto-converted from the Flux setTitle action. Please use <DocumentHead> instead.
	context.store.dispatch( setTitle( i18n.translate( 'My Profile', { textOnly: true } ) ) );

	const ProfileComponent = require( 'wp-calypso-client/me/profile' ).default;

	context.primary = React.createElement( ProfileComponent, {
		userSettings: userSettings,
		path: context.path,
	} );
	next();
}

export function apps( context, next ) {
	// FIXME: Auto-converted from the Flux setTitle action. Please use <DocumentHead> instead.
	context.store.dispatch( setTitle( i18n.translate( 'Get Apps', { textOnly: true } ) ) );

	context.primary = React.createElement( AppsComponent, {
		userSettings: userSettings,
		path: context.path,
	} );
	next();
}

export function profileRedirect() {
	page.redirect( '/me' );
}

export function trophiesRedirect() {
	page.redirect( '/me' );
}

export function findFriendsRedirect() {
	page.redirect( '/me' );
}
