/**
 * External dependencies
 */
import React from 'react';
import PropTypes from 'prop-types';
import { localize } from 'i18n-calypso';

/**
 * Internal dependencies
 */
import DocumentHead from 'wp-calypso-client/components/data/document-head';
import FormattedHeader from 'wp-calypso-client/components/formatted-header';
import Main from 'wp-calypso-client/components/main';
import MeSidebarNavigation from 'wp-calypso-client/me/sidebar-navigation';
import PageViewTracker from 'wp-calypso-client/lib/analytics/page-view-tracker';
import ReauthRequired from 'wp-calypso-client/me/reauth-required';
import SectionHeader from 'wp-calypso-client/components/section-header';
import SecurityCheckupAccountEmail from './account-email';
import SecurityCheckupAccountRecoveryEmail from './account-recovery-email';
import SecurityCheckupAccountRecoveryPhone from './account-recovery-phone';
import SecurityCheckupConnectedApplications from './connected-applications';
import SecurityCheckupPassword from './password';
import SecurityCheckupSocialLogins from './social-logins';
import SecurityCheckupTwoFactorAuthentication from './two-factor-authentication';
import SecurityCheckupTwoFactorBackupCodes from './two-factor-backup-codes';
import twoStepAuthorization from 'wp-calypso-client/lib/two-step-authorization';
import VerticalNav from 'wp-calypso-client/components/vertical-nav';

/**
 * Style dependencies
 */
import './style.scss';

class SecurityCheckupComponent extends React.Component {
	static propTypes = {
		path: PropTypes.string,
		translate: PropTypes.func.isRequired,
		userSettings: PropTypes.object,
	};

	render() {
		const { path, translate } = this.props;

		return (
			<Main className="security security-checkup">
				<PageViewTracker path={ path } title="Me > Security Checkup" />
				<ReauthRequired twoStepAuthorization={ twoStepAuthorization } />
				<MeSidebarNavigation />

				<DocumentHead title={ translate( 'Security' ) } />

				<FormattedHeader headerText={ translate( 'Security' ) } align="left" />

				<SectionHeader label={ translate( 'Security Checklist' ) } />

				<VerticalNav>
					<SecurityCheckupPassword />
					<SecurityCheckupAccountEmail />
					<SecurityCheckupTwoFactorAuthentication />
					<SecurityCheckupTwoFactorBackupCodes />
					<SecurityCheckupAccountRecoveryEmail />
					<SecurityCheckupAccountRecoveryPhone />
				</VerticalNav>

				<SectionHeader label={ translate( 'Connections' ) } className="security-checkup__info" />
				<VerticalNav className="security-checkup__info-nav">
					<SecurityCheckupConnectedApplications />
					<SecurityCheckupSocialLogins />
				</VerticalNav>
			</Main>
		);
	}
}

export default localize( SecurityCheckupComponent );
