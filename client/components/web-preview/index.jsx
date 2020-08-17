/**
 * External dependencies
 */
import React from 'react';

/**
 * Internal dependencies
 */
import AsyncLoad from 'wp-calypso-client/components/async-load';

const WebPreview = ( props ) => {
	if ( ! props.showPreview ) {
		return null;
	}

	return <AsyncLoad { ...props } require="wp-calypso-client/components/web-preview/component" />;
};

export default WebPreview;
