/**
 * External dependencies
 */
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { localize } from 'i18n-calypso';

/**
 * Internal dependencies
 */
import AppleIcon from 'wp-calypso-client/components/social-icons/apple';
import { CompactCard } from '@automattic/components';
import config from 'wp-calypso-client/config';
import DocumentHead from 'wp-calypso-client/components/data/document-head';
import { getRequestError } from 'wp-calypso-client/state/login/selectors';
import GoogleIcon from 'wp-calypso-client/components/social-icons/google';
import HeaderCake from 'wp-calypso-client/components/header-cake';
import Main from 'wp-calypso-client/components/main';
import MeSidebarNavigation from 'wp-calypso-client/me/sidebar-navigation';
import Notice from 'wp-calypso-client/components/notice';
import PageViewTracker from 'wp-calypso-client/lib/analytics/page-view-tracker';
import ReauthRequired from 'wp-calypso-client/me/reauth-required';
import SecuritySectionNav from 'wp-calypso-client/me/security-section-nav';
import twoStepAuthorization from 'wp-calypso-client/lib/two-step-authorization';
import SocialLoginService from './service';

/**
 * Style dependencies
 */
import './style.scss';

class SocialLogin extends Component {
	static displayName = 'SocialLogin';

	static propTypes = {
		errorUpdatingSocialConnection: PropTypes.object,
		path: PropTypes.string,
		socialService: PropTypes.string,
		socialServiceResponse: PropTypes.object,
		translate: PropTypes.func.isRequired,
	};

	renderContent() {
		const { translate, errorUpdatingSocialConnection, path } = this.props;

		const redirectUri = typeof window !== 'undefined' ? window.location.origin + path : null;

		return (
			<div>
				{ errorUpdatingSocialConnection && (
					<Notice status={ 'is-error' } showDismiss={ false }>
						{ errorUpdatingSocialConnection.message }
					</Notice>
				) }

				<CompactCard>
					{ translate(
						'You’ll be able to log in faster by linking your WordPress.com account with the following ' +
							'third-party services. We’ll never post without your permission.'
					) }
				</CompactCard>

				<SocialLoginService service="google" icon={ <GoogleIcon /> } />

				{ config.isEnabled( 'sign-in-with-apple' ) && (
					<SocialLoginService
						service="apple"
						icon={ <AppleIcon /> }
						redirectUri={ redirectUri }
						socialServiceResponse={
							this.props.socialService === 'apple' ? this.props.socialServiceResponse : null
						}
					/>
				) }
			</div>
		);
	}

	render() {
		const { path, translate } = this.props;
		const useCheckupMenu = config.isEnabled( 'security/security-checkup' );
		const title = useCheckupMenu ? translate( 'Social Logins' ) : translate( 'Social Login' );

		return (
			<Main className="security social-login">
				<PageViewTracker path="/me/security/social-login" title="Me > Social Login" />
				<DocumentHead title={ title } />
				<MeSidebarNavigation />

				{ ! useCheckupMenu && <SecuritySectionNav path={ path } /> }
				{ useCheckupMenu && (
					<HeaderCake backText={ translate( 'Back' ) } backHref="/me/security">
						{ title }
					</HeaderCake>
				) }

				<ReauthRequired twoStepAuthorization={ twoStepAuthorization } />

				{ this.renderContent() }
			</Main>
		);
	}
}

export default connect( ( state ) => ( {
	errorUpdatingSocialConnection: getRequestError( state ),
} ) )( localize( SocialLogin ) );
