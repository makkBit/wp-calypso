/**
 * External dependencies
 */
import React from 'react';
import { connect } from 'react-redux';
import { useTranslate } from 'i18n-calypso';

/**
 * Internal Dependencies
 */
import SidebarNavigation from 'wp-calypso-client/components/sidebar-navigation';
import Gravatar from 'wp-calypso-client/components/gravatar';
import { getCurrentUser } from 'wp-calypso-client/state/current-user/selectors';

/**
 * Style dependencies
 */
import './style.scss';

function MeSidebarNavigation( { currentUser } ) {
	const translate = useTranslate();

	return (
		<SidebarNavigation sectionTitle={ translate( 'Me' ) }>
			<Gravatar user={ currentUser } size={ 30 } imgSize={ 400 } />
		</SidebarNavigation>
	);
}

export default connect( ( state ) => ( {
	currentUser: getCurrentUser( state ),
} ) )( MeSidebarNavigation );
