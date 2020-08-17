/**
 * External dependencies
 */
import React from 'react';

/**
 * Internal dependencies
 */
import AccountSettingsCloseComponent from 'wp-calypso-client/me/account-close/main';
import AccountSettingsClosedComponent from 'wp-calypso-client/me/account-close/closed';
import { hideSidebar } from 'wp-calypso-client/state/ui/actions';

const removeSidebar = ( context ) => context.store.dispatch( hideSidebar() );

export function accountClose( context, next ) {
	context.primary = React.createElement( AccountSettingsCloseComponent );
	next();
}

export function accountClosed( context, next ) {
	removeSidebar( context );
	context.primary = React.createElement( AccountSettingsClosedComponent );
	next();
}
