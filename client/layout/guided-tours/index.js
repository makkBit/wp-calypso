/**
 * External dependencies
 */
import React from 'react';
import { connect } from 'react-redux';

/**
 * Internal dependencies
 */
import AsyncLoad from 'wp-calypso-client/components/async-load';
import { getGuidedTourState } from 'wp-calypso-client/state/guided-tours/selectors';

function GuidedTours( { shouldShow } ) {
	if ( ! shouldShow ) {
		return null;
	}

	return <AsyncLoad require="wp-calypso-client/layout/guided-tours/component" />;
}

export default connect( ( state ) => {
	const tourState = getGuidedTourState( state );
	return {
		shouldShow: tourState && tourState.shouldShow,
	};
} )( GuidedTours );
