/**
 * External dependencies
 */

import React from 'react';

/**
 * Internal dependencies
 */
import config from 'wp-calypso-client/config';
import SitePicker from 'wp-calypso-client/my-sites/picker';
import AsyncLoad from 'wp-calypso-client/components/async-load';

class MySitesNavigation extends React.Component {
	static displayName = 'MySitesNavigation';

	preventPickerDefault = ( event ) => {
		event.preventDefault();
		event.stopPropagation();
	};

	render() {
		const asyncProps = {
			placeholder: null,
			path: this.props.path,
			siteBasePath: this.props.siteBasePath,
		};

		const asyncSidebar = config.isEnabled( 'jetpack-cloud' ) ? (
			<AsyncLoad require="wp-calypso-client/components/jetpack/sidebar" { ...asyncProps } />
		) : (
			<AsyncLoad require="wp-calypso-client/my-sites/sidebar" { ...asyncProps } />
		);

		return (
			<div>
				<SitePicker
					allSitesPath={ this.props.allSitesPath }
					siteBasePath={ this.props.siteBasePath }
					onClose={ this.preventPickerDefault }
				/>
				{ asyncSidebar }
			</div>
		);
	}
}

export default MySitesNavigation;
