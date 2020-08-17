/**
 * External dependencies
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';

/**
 * Internal dependencies
 */
import { loadTrackingTool } from 'wp-calypso-client/state/analytics/actions';

export default ( trackingTool ) => ( EnhancedComponent ) => {
	class WithTrackingTool extends Component {
		static displayName = `WithTrackingTool( ${
			EnhancedComponent.displayName || EnhancedComponent.name || ''
		} )`;

		componentDidMount() {
			this.props.loadTrackingTool( trackingTool );
		}

		render() {
			return <EnhancedComponent { ...this.props } />;
		}
	}

	return connect( null, {
		loadTrackingTool,
	} )( WithTrackingTool );
};
