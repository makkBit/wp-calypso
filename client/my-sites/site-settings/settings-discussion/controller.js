/**
 * External dependencies
 */

import React from 'react';

/**
 * Internal dependencies
 */
import DiscussionMain from 'wp-calypso-client/my-sites/site-settings/settings-discussion/main';

export function discussion( context, next ) {
	context.primary = React.createElement( DiscussionMain );
	next();
}
