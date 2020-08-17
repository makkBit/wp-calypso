/**
 * External dependencies
 */
import React from 'react';

/**
 * Internal dependencies
 */
import AsyncLoad from 'wp-calypso-client/components/async-load';

const SignupSitePreview = ( props ) => (
	<AsyncLoad
		{ ...props }
		require="wp-calypso-client/components/signup-site-preview/component"
		placeholder={ null }
	/>
);

export default SignupSitePreview;
