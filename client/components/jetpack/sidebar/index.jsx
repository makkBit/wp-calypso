/**
 * External dependencies
 */
import { connect } from 'react-redux';
import { format as formatUrl, parse as parseUrl } from 'url';
import { localize } from 'i18n-calypso';
import { memoize } from 'lodash';
import PropTypes from 'prop-types';
import React, { Component } from 'react';

/**
 * Internal dependencies
 */
import { getSelectedSiteId, getSelectedSiteSlug } from 'wp-calypso-client/state/ui/selectors';
import { recordTracksEvent } from 'wp-calypso-client/state/analytics/actions';
import CurrentSite from 'wp-calypso-client/my-sites/current-site';
import getSiteAdminUrl from 'wp-calypso-client/state/sites/selectors/get-site-admin-url';
import JetpackCloudSidebarMenuItems from './menu-items/jetpack-cloud';
import Sidebar from 'wp-calypso-client/layout/sidebar';
import SidebarFooter from 'wp-calypso-client/layout/sidebar/footer';
import SidebarItem from 'wp-calypso-client/layout/sidebar/item';
import SidebarMenu from 'wp-calypso-client/layout/sidebar/menu';
import SidebarRegion from 'wp-calypso-client/layout/sidebar/region';

/**
 * Style dependencies
 */
import './style.scss';
// We import these styles from here because this is the only section that gets always
// loaded when a user visits Jetpack Cloud. We might have to find a better place for
// this in the future.
import 'wp-calypso-client/landing/jetpack-cloud/style.scss';

class JetpackCloudSidebar extends Component {
	static propTypes = {
		path: PropTypes.string.isRequired,
		selectedSiteSlug: PropTypes.string,
		threats: PropTypes.array,
	};

	onNavigate = memoize( ( menuItem ) => () => {
		this.props.dispatchRecordTracksEvent( 'calypso_jetpack_sidebar_menu_click', {
			menu_item: menuItem,
		} );

		window.scrollTo( 0, 0 );
	} );

	render() {
		const { translate, jetpackAdminUrl, path } = this.props;

		return (
			<Sidebar className="sidebar__jetpack-cloud">
				<SidebarRegion>
					<CurrentSite />
					<SidebarMenu>
						<JetpackCloudSidebarMenuItems path={ path } />
					</SidebarMenu>
				</SidebarRegion>
				<SidebarFooter>
					<SidebarMenu>
						<SidebarItem
							label={ translate( 'Get help', {
								comment: 'Jetpack Cloud sidebar navigation item',
							} ) }
							link="https://jetpack.com/support"
							materialIcon="help"
							materialIconStyle="filled"
							onNavigate={ this.onNavigate( 'Jetpack Cloud / Support' ) }
						/>
						<SidebarItem
							label={ translate( 'WP Admin', {
								comment: 'Jetpack Cloud sidebar navigation item',
							} ) }
							link={ jetpackAdminUrl }
							icon="my-sites"
						/>
					</SidebarMenu>
				</SidebarFooter>
			</Sidebar>
		);
	}
}

// Borrowed from Calypso: /client/my-sites/sidebar/index.jsx:683
const getJetpackAdminUrl = ( state, siteId ) =>
	formatUrl( {
		...parseUrl( getSiteAdminUrl( state, siteId ) + 'admin.php' ),
		query: { page: 'jetpack' },
	} );

export default connect(
	( state ) => {
		const siteId = getSelectedSiteId( state );
		const jetpackAdminUrl = getJetpackAdminUrl( state, siteId );

		return {
			jetpackAdminUrl,
			selectedSiteSlug: getSelectedSiteSlug( state ),
		};
	},
	{
		dispatchRecordTracksEvent: recordTracksEvent,
	}
)( localize( JetpackCloudSidebar ) );
