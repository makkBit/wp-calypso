/**
 * External dependencies
 */

import React from 'react';

/**
 * Internal dependencies
 */
import Rating from 'wp-calypso-client/components/rating';

export default class RatingExample extends React.PureComponent {
	static displayName = 'Rating';

	render() {
		return <Rating rating={ 70 } size={ 48 } />;
	}
}
