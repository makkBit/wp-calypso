/**
 * External dependencies
 */
import React from 'react';

/**
 * Internal dependencies
 */
import userSettings from 'wp-calypso-client/lib/user-settings';
import PrivacyComponent from 'wp-calypso-client/me/privacy/main';

export function privacy( context, next ) {
	context.primary = React.createElement( PrivacyComponent, {
		userSettings: userSettings,
	} );
	next();
}
