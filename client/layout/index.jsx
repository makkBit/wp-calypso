/**
 * External dependencies
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { startsWith, get } from 'lodash';
import classnames from 'classnames';

/**
 * Internal dependencies
 */
import AsyncLoad from 'wp-calypso-client/components/async-load';
import MasterbarLoggedIn from 'wp-calypso-client/layout/masterbar/logged-in';
import JetpackCloudMasterbar from 'wp-calypso-client/components/jetpack/masterbar';
import HtmlIsIframeClassname from 'wp-calypso-client/layout/html-is-iframe-classname';
import notices from 'wp-calypso-client/notices';
import config from 'wp-calypso-client/config';
import OfflineStatus from 'wp-calypso-client/layout/offline-status';
import QueryPreferences from 'wp-calypso-client/components/data/query-preferences';
import QuerySites from 'wp-calypso-client/components/data/query-sites';
import QuerySiteSelectedEditor from 'wp-calypso-client/components/data/query-site-selected-editor';
import { isOffline } from 'wp-calypso-client/state/application/selectors';
import {
	getSelectedSiteId,
	hasSidebar,
	masterbarIsVisible,
	getSectionGroup,
	getSectionName,
	getSelectedSite,
} from 'wp-calypso-client/state/ui/selectors';
import isAtomicSite from 'wp-calypso-client/state/selectors/is-site-automated-transfer';
import isHappychatOpen from 'wp-calypso-client/state/happychat/selectors/is-happychat-open';
import { isJetpackSite } from 'wp-calypso-client/state/sites/selectors';
import { isSupportSession } from 'wp-calypso-client/state/support/selectors';
import SitePreview from 'wp-calypso-client/blocks/site-preview';
import { getCurrentLayoutFocus } from 'wp-calypso-client/state/ui/layout-focus/selectors';
import { getCurrentRoute } from 'wp-calypso-client/state/selectors/get-current-route';
import getCurrentQueryArguments from 'wp-calypso-client/state/selectors/get-current-query-arguments';
import DocumentHead from 'wp-calypso-client/components/data/document-head';
import { getPreference } from 'wp-calypso-client/state/preferences/selectors';
import KeyboardShortcutsMenu from 'wp-calypso-client/lib/keyboard-shortcuts/menu';
import SupportUser from 'wp-calypso-client/support/support-user';
import { isCommunityTranslatorEnabled } from 'wp-calypso-client/components/community-translator/utils';
import { isE2ETest } from 'wp-calypso-client/lib/e2e';
import { getMessagePathForJITM } from 'wp-calypso-client/lib/route';
import BodySectionCssClass from './body-section-css-class';
import { retrieveMobileRedirect } from 'wp-calypso-client/jetpack-connect/persistence-utils';
import { isWooOAuth2Client } from 'wp-calypso-client/lib/oauth2-clients';
import { getCurrentOAuth2Client } from 'wp-calypso-client/state/oauth2-clients/ui/selectors';
import LayoutLoader from './loader';
import wooDnaConfig from 'wp-calypso-client/jetpack-connect/woo-dna-config';
import { getABTestVariation } from 'wp-calypso-client/lib/abtest';
import { getCurrentFlowName } from 'wp-calypso-client/state/signup/flow/selectors';

/**
 * Style dependencies
 */
// goofy import for environment badge, which is SSR'd
import 'wp-calypso-client/components/environment-badge/style.scss';
import './style.scss';
import { getShouldShowAppBanner } from './utils';

class Layout extends Component {
	static propTypes = {
		primary: PropTypes.element,
		secondary: PropTypes.element,
		focus: PropTypes.object,
		// connected props
		masterbarIsHidden: PropTypes.bool,
		isSupportSession: PropTypes.bool,
		isOffline: PropTypes.bool,
		sectionGroup: PropTypes.string,
		sectionName: PropTypes.string,
		colorSchemePreference: PropTypes.string,
		shouldShowAppBanner: PropTypes.bool,
	};

	componentDidMount() {
		if ( ! config.isEnabled( 'me/account/color-scheme-picker' ) ) {
			return;
		}
		if ( typeof document !== 'undefined' ) {
			if ( this.props.colorSchemePreference ) {
				document
					.querySelector( 'body' )
					.classList.add( `is-${ this.props.colorSchemePreference }` );
			}
		}
	}

	componentDidUpdate( prevProps ) {
		if ( ! config.isEnabled( 'me/account/color-scheme-picker' ) ) {
			return;
		}
		if ( prevProps.colorSchemePreference === this.props.colorSchemePreference ) {
			return;
		}
		if ( typeof document !== 'undefined' ) {
			const classList = document.querySelector( 'body' ).classList;
			classList.remove( `is-${ prevProps.colorSchemePreference }` );
			classList.add( `is-${ this.props.colorSchemePreference }` );
		}

		// intentionally don't remove these in unmount
	}

	shouldLoadInlineHelp() {
		if ( ! config.isEnabled( 'inline-help' ) ) {
			return false;
		}

		const exemptedSections = [ 'jetpack-connect', 'happychat', 'devdocs', 'help' ];
		const exemptedRoutes = [ '/jetpack/new', '/log-in/jetpack', '/me/account/closed' ];

		return (
			! exemptedSections.includes( this.props.sectionName ) &&
			! exemptedRoutes.includes( this.props.currentRoute )
		);
	}

	renderMasterbar() {
		const MasterbarComponent = config.isEnabled( 'jetpack-cloud' )
			? JetpackCloudMasterbar
			: MasterbarLoggedIn;

		return (
			<MasterbarComponent
				section={ this.props.sectionGroup }
				isCheckout={ this.props.sectionName === 'checkout' }
			/>
		);
	}

	render() {
		const sectionClass = classnames(
			'layout',
			`is-group-${ this.props.sectionGroup }`,
			`is-section-${ this.props.sectionName }`,
			`focus-${ this.props.currentLayoutFocus }`,
			{
				'is-add-site-page': this.props.currentRoute === '/jetpack/new',
				'is-support-session': this.props.isSupportSession,
				'has-no-sidebar': ! this.props.hasSidebar,
				'has-chat': this.props.chatIsOpen,
				'has-no-masterbar': this.props.masterbarIsHidden,
				'is-jetpack-login': this.props.isJetpackLogin,
				'is-jetpack-site': this.props.isJetpack,
				'is-jetpack-mobile-flow': this.props.isJetpackMobileFlow,
				'is-jetpack-woocommerce-flow':
					config.isEnabled( 'jetpack/connect/woocommerce' ) && this.props.isJetpackWooCommerceFlow,
				'is-jetpack-woo-dna-flow': this.props.isJetpackWooDnaFlow,
				'is-wccom-oauth-flow':
					config.isEnabled( 'woocommerce/onboarding-oauth' ) &&
					isWooOAuth2Client( this.props.oauth2Client ) &&
					this.props.wccomFrom,
			}
		);

		const optionalBodyProps = () => {
			const optionalProps = {};

			const bodyClass = classnames( {
				'is-new-launch-flow': this.props.isNewLaunchFlow || this.props.isCheckoutFromGutenboarding,
				'is-white-signup':
					'signup' === this.props.sectionName &&
					this.props.isOnboardingFlow &&
					'reskinned' === getABTestVariation( 'reskinSignupFlow' ),
			} );

			if ( bodyClass ) {
				optionalProps.bodyClass = bodyClass;
			}

			return optionalProps;
		};

		const { shouldShowAppBanner } = this.props;

		return (
			<div className={ sectionClass }>
				<BodySectionCssClass
					group={ this.props.sectionGroup }
					section={ this.props.sectionName }
					{ ...optionalBodyProps() }
				/>
				<HtmlIsIframeClassname />
				<DocumentHead />
				<QuerySites primaryAndRecent={ ! config.isEnabled( 'jetpack-cloud' ) } />
				{ this.props.shouldQueryAllSites && <QuerySites allSites /> }
				<QueryPreferences />
				{ config.isEnabled( 'layout/query-selected-editor' ) && (
					<QuerySiteSelectedEditor siteId={ this.props.siteId } />
				) }
				{ config.isEnabled( 'layout/guided-tours' ) && (
					<AsyncLoad require="wp-calypso-client/layout/guided-tours" placeholder={ null } />
				) }
				{ config.isEnabled( 'layout/nps-survey-notice' ) && ! isE2ETest() && (
					<AsyncLoad require="wp-calypso-client/layout/nps-survey-notice" placeholder={ null } />
				) }
				{ config.isEnabled( 'keyboard-shortcuts' ) ? <KeyboardShortcutsMenu /> : null }
				{ this.renderMasterbar() }
				{ config.isEnabled( 'support-user' ) && <SupportUser /> }
				<LayoutLoader />
				{ this.props.isOffline && <OfflineStatus /> }
				<div id="content" className="layout__content">
					{ config.isEnabled( 'jitms' ) && this.props.isEligibleForJITM && (
						<AsyncLoad
							require="wp-calypso-client/blocks/jitm"
							messagePath={ `calypso:${ this.props.sectionJitmPath }:admin_notices` }
							sectionName={ this.props.sectionName }
						/>
					) }
					<AsyncLoad
						require="wp-calypso-client/components/global-notices"
						placeholder={ null }
						id="notices"
						notices={ notices.list }
					/>
					<div id="secondary" className="layout__secondary" role="navigation">
						{ this.props.secondary }
					</div>
					<div id="primary" className="layout__primary">
						{ this.props.primary }
					</div>
				</div>
				{ config.isEnabled( 'i18n/community-translator' )
					? isCommunityTranslatorEnabled() && (
							<AsyncLoad require="wp-calypso-client/components/community-translator" />
					  )
					: config( 'restricted_me_access' ) && (
							<AsyncLoad
								require="wp-calypso-client/layout/community-translator/launcher"
								placeholder={ null }
							/>
					  ) }
				{ this.props.sectionGroup === 'sites' && <SitePreview /> }
				{ config.isEnabled( 'happychat' ) && this.props.chatIsOpen && (
					<AsyncLoad require="wp-calypso-client/components/happychat" />
				) }
				{ 'development' === process.env.NODE_ENV && (
					<AsyncLoad
						require="wp-calypso-client/components/webpack-build-monitor"
						placeholder={ null }
					/>
				) }
				{ this.shouldLoadInlineHelp() && (
					<AsyncLoad require="wp-calypso-client/blocks/inline-help" placeholder={ null } />
				) }
				{ config.isEnabled( 'layout/support-article-dialog' ) && (
					<AsyncLoad
						require="wp-calypso-client/blocks/support-article-dialog"
						placeholder={ null }
					/>
				) }
				{ shouldShowAppBanner && config.isEnabled( 'layout/app-banner' ) && (
					<AsyncLoad require="wp-calypso-client/blocks/app-banner" placeholder={ null } />
				) }
				{ config.isEnabled( 'gdpr-banner' ) && (
					<AsyncLoad require="wp-calypso-client/blocks/gdpr-banner" placeholder={ null } />
				) }
				{ config.isEnabled( 'legal-updates-banner' ) && (
					<AsyncLoad require="wp-calypso-client/blocks/legal-updates-banner" placeholder={ null } />
				) }
			</div>
		);
	}
}

export default connect( ( state ) => {
	const sectionGroup = getSectionGroup( state );
	const sectionName = getSectionName( state );
	const currentRoute = getCurrentRoute( state );
	const siteId = getSelectedSiteId( state );
	const shouldShowAppBanner = getShouldShowAppBanner( getSelectedSite( state ) );
	const sectionJitmPath = getMessagePathForJITM( currentRoute );
	const isJetpackLogin = startsWith( currentRoute, '/log-in/jetpack' );
	const isJetpack = isJetpackSite( state, siteId ) && ! isAtomicSite( state, siteId );
	const isCheckoutFromGutenboarding =
		'checkout' === sectionName && '1' === getCurrentQueryArguments( state )?.preLaunch;
	const noMasterbarForRoute =
		isJetpackLogin || isCheckoutFromGutenboarding || currentRoute === '/me/account/closed';
	const noMasterbarForSection = 'signup' === sectionName || 'jetpack-connect' === sectionName;
	const isJetpackMobileFlow = 'jetpack-connect' === sectionName && !! retrieveMobileRedirect();
	const isJetpackWooCommerceFlow =
		( 'jetpack-connect' === sectionName || 'login' === sectionName ) &&
		'woocommerce-onboarding' === get( getCurrentQueryArguments( state ), 'from' );
	const isJetpackWooDnaFlow =
		( 'jetpack-connect' === sectionName || 'login' === sectionName ) &&
		wooDnaConfig( getCurrentQueryArguments( state ) ).isWooDnaFlow();
	const oauth2Client = getCurrentOAuth2Client( state );
	const wccomFrom = get( getCurrentQueryArguments( state ), 'wccom-from' );
	const isEligibleForJITM =
		[ 'stats', 'plans', 'themes', 'plugins', 'comments' ].indexOf( sectionName ) >= 0;
	const isNewLaunchFlow = startsWith( currentRoute, '/start/new-launch' );
	const isOnboardingFlow = 'onboarding' === getCurrentFlowName( state );

	return {
		masterbarIsHidden:
			! masterbarIsVisible( state ) || noMasterbarForSection || noMasterbarForRoute,
		isJetpack,
		isJetpackLogin,
		isJetpackWooCommerceFlow,
		isJetpackWooDnaFlow,
		isJetpackMobileFlow,
		isEligibleForJITM,
		oauth2Client,
		wccomFrom,
		isSupportSession: isSupportSession( state ),
		sectionGroup,
		sectionName,
		sectionJitmPath,
		shouldShowAppBanner,
		hasSidebar: hasSidebar( state ),
		isOffline: isOffline( state ),
		currentLayoutFocus: getCurrentLayoutFocus( state ),
		chatIsOpen: isHappychatOpen( state ),
		colorSchemePreference: getPreference( state, 'colorScheme' ),
		currentRoute,
		siteId,
		/* We avoid requesting sites in the Jetpack Connect authorization step, because this would
		request all sites before authorization has finished. That would cause the "all sites"
		request to lack the newly authorized site, and when the request finishes after
		authorization, it would remove the newly connected site that has been fetched separately.
		See https://github.com/Automattic/wp-calypso/pull/31277 for more details. */
		shouldQueryAllSites: currentRoute && currentRoute !== '/jetpack/connect/authorize',
		isNewLaunchFlow,
		isCheckoutFromGutenboarding,
		isOnboardingFlow,
	};
} )( Layout );
