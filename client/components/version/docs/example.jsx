/**
 * External dependencies
 */

import React, { PureComponent } from 'react';

/**
 * Internal dependencies
 */
import Version from 'wp-calypso-client/components/version';

export default class VersionExample extends PureComponent {
	static displayName = 'VersionExample';

	render() {
		return (
			<div>
				<Version icon="my-sites" version={ 4.4 } />
				<Version icon="plugins" version={ 3.8 } />
			</div>
		);
	}
}
