/**
 * External dependencies
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { localize } from 'i18n-calypso';
import { isEmpty, partial } from 'lodash';

/**
 * Internal dependencies
 */
import config from 'wp-calypso-client/config';
import { Card } from '@automattic/components';
import CompactFormToggle from 'wp-calypso-client/components/forms/form-toggle/compact';
import JetpackModuleToggle from 'wp-calypso-client/my-sites/site-settings/jetpack-module-toggle';
import SettingsSectionHeader from 'wp-calypso-client/my-sites/site-settings/settings-section-header';
import SupportInfo from 'wp-calypso-client/components/support-info';
import QueryJetpackModules from 'wp-calypso-client/components/data/query-jetpack-modules';
import QuerySiteMonitorSettings from 'wp-calypso-client/components/data/query-site-monitor-settings';
import { getSelectedSiteId } from 'wp-calypso-client/state/ui/selectors';
import { updateSiteMonitorSettings } from 'wp-calypso-client/state/sites/monitor/actions';
import { recordGoogleEvent } from 'wp-calypso-client/state/analytics/actions';
import getSiteMonitorSettings from 'wp-calypso-client/state/selectors/get-site-monitor-settings';
import isActivatingJetpackModule from 'wp-calypso-client/state/selectors/is-activating-jetpack-module';
import isDeactivatingJetpackModule from 'wp-calypso-client/state/selectors/is-deactivating-jetpack-module';
import isFetchingJetpackModules from 'wp-calypso-client/state/selectors/is-fetching-jetpack-modules';
import isJetpackModuleActive from 'wp-calypso-client/state/selectors/is-jetpack-module-active';
import isRequestingSiteMonitorSettings from 'wp-calypso-client/state/selectors/is-requesting-site-monitor-settings';
import isUpdatingSiteMonitorSettings from 'wp-calypso-client/state/selectors/is-updating-site-monitor-settings';

class SiteSettingsFormJetpackMonitor extends Component {
	state = {};

	UNSAFE_componentWillReceiveProps( nextProps ) {
		if ( isEmpty( this.state ) && nextProps.monitorSettings ) {
			this.setState( nextProps.monitorSettings );
		}
	}

	recordEvent = ( event ) => {
		return () => {
			this.props.trackEvent( event );
		};
	};

	handleToggle = ( name ) => () => {
		this.props.trackEvent( `Toggled ${ name }` );
		this.setState(
			{
				...this.state,
				[ name ]: ! this.state[ name ],
			},
			this.saveSettings
		);
	};

	saveSettings = () => {
		const { siteId } = this.props;

		this.props.updateSiteMonitorSettings( siteId, this.state );
	};

	settingsMonitorEmailCheckbox() {
		const { monitorActive, translate } = this.props;

		return (
			<CompactFormToggle
				disabled={ this.disableForm() || ! monitorActive }
				onChange={ this.handleToggle( 'email_notifications' ) }
				checked={ !! this.state.email_notifications }
			>
				{ translate( 'Send notifications to your {{a}}WordPress.com email address{{/a}}', {
					components: {
						a: (
							<a
								href="/me/account"
								onClick={ this.recordEvent(
									'Clicked on Monitor Link to WordPress.com Email Address'
								) }
							/>
						),
					},
				} ) }
			</CompactFormToggle>
		);
	}

	settingsMonitorWpNoteCheckbox() {
		const { monitorActive, translate } = this.props;
		return (
			<CompactFormToggle
				disabled={ this.disableForm() || ! monitorActive }
				onChange={ this.handleToggle( 'wp_note_notifications' ) }
				checked={ !! this.state.wp_note_notifications }
			>
				{ translate( 'Send notifications via WordPress.com notification' ) }
			</CompactFormToggle>
		);
	}

	disableForm() {
		return (
			this.props.activatingMonitor ||
			this.props.deactivatingMonitor ||
			this.props.updatingMonitorSettings ||
			this.props.fetchingJetpackModules ||
			this.props.requestingMonitorSettings
		);
	}

	handleActivationButtonClick = () => {
		const { siteId } = this.props;
		this.props.activateModule( siteId, 'monitor', true );
	};

	handleDeactivationButtonClick = () => {
		const { siteId } = this.props;
		this.props.deactivateModule( siteId, 'monitor', true );
	};

	render() {
		const { siteId, translate } = this.props;

		if ( ! config.isEnabled( 'settings/security/monitor' ) ) {
			return null;
		}

		/* eslint-disable wpcalypso/jsx-classname-namespace */
		return (
			<div className="site-settings__security-settings">
				<QueryJetpackModules siteId={ siteId } />
				<QuerySiteMonitorSettings siteId={ siteId } />

				<SettingsSectionHeader title={ translate( 'Downtime monitoring' ) } />

				<Card className="jetpack-monitor-settings">
					<SupportInfo
						text={ translate(
							'Jetpack will continuously monitor your site, and alert you the moment downtime is detected.'
						) }
						link="https://jetpack.com/support/monitor/"
					/>

					<JetpackModuleToggle
						siteId={ siteId }
						moduleSlug="monitor"
						label={ translate(
							'Get alerts if your site goes offline. We’ll let you know when it’s back up, too.'
						) }
						disabled={ this.disableForm() }
					/>

					<div className="site-settings__child-settings">
						{ this.settingsMonitorEmailCheckbox() }
						{ config.isEnabled( 'settings/security/monitor/wp-note' ) &&
							this.settingsMonitorWpNoteCheckbox() }
					</div>
				</Card>
			</div>
		);
		/* eslint-enable wpcalypso/jsx-classname-namespace */
	}
}

export default connect(
	( state ) => {
		const siteId = getSelectedSiteId( state );

		return {
			siteId,
			monitorActive: isJetpackModuleActive( state, siteId, 'monitor' ),
			activatingMonitor: isActivatingJetpackModule( state, siteId, 'monitor' ),
			deactivatingMonitor: isDeactivatingJetpackModule( state, siteId, 'monitor' ),
			fetchingJetpackModules: isFetchingJetpackModules( state, siteId ),
			monitorSettings: getSiteMonitorSettings( state, siteId ),
			requestingMonitorSettings: isRequestingSiteMonitorSettings( state, siteId ),
			updatingMonitorSettings: isUpdatingSiteMonitorSettings( state, siteId ),
		};
	},
	{
		trackEvent: partial( recordGoogleEvent, 'Site Settings' ),
		updateSiteMonitorSettings,
	}
)( localize( SiteSettingsFormJetpackMonitor ) );
