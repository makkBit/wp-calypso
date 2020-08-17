/**
 * External dependencies
 */

import React from 'react';
import { connect } from 'react-redux';
import Gridicon from 'wp-calypso-client/components/gridicon';

/**
 * Internal Dependencies
 */
import { setLayoutFocus } from 'wp-calypso-client/state/ui/layout-focus/actions';

/**
 * Style dependencies
 */
import './style.scss';

function MobileBackToSidebar( { children, toggleSidebar } ) {
	return (
		<button className="mobile-back-to-sidebar" onClick={ toggleSidebar }>
			<Gridicon icon="chevron-left" className="mobile-back-to-sidebar__icon" />
			<span className="mobile-back-to-sidebar__content">{ children }</span>
		</button>
	);
}

export default connect( null, { toggleSidebar: () => setLayoutFocus( 'sidebar' ) } )(
	MobileBackToSidebar
);
