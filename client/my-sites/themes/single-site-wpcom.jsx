/**
 * External dependencies
 */

import React from 'react';
import { connect } from 'react-redux';

/**
 * Internal dependencies
 */
import Main from 'wp-calypso-client/components/main';
import CurrentTheme from 'wp-calypso-client/my-sites/themes/current-theme';
import SidebarNavigation from 'wp-calypso-client/my-sites/sidebar-navigation';
import FormattedHeader from 'wp-calypso-client/components/formatted-header';
import ThanksModal from 'wp-calypso-client/my-sites/themes/thanks-modal';
import AutoLoadingHomepageModal from 'wp-calypso-client/my-sites/themes/auto-loading-homepage-modal';
import { connectOptions } from './theme-options';
import UpsellNudge from 'wp-calypso-client/blocks/upsell-nudge';
import {
	FEATURE_UNLIMITED_PREMIUM_THEMES,
	PLAN_PREMIUM,
} from 'wp-calypso-client/lib/plans/constants';
import { hasFeature, isRequestingSitePlans } from 'wp-calypso-client/state/sites/plans/selectors';
import QuerySitePlans from 'wp-calypso-client/components/data/query-site-plans';
import QuerySitePurchases from 'wp-calypso-client/components/data/query-site-purchases';
import ThemeShowcase from './theme-showcase';
import { getSiteSlug, isJetpackSite } from 'wp-calypso-client/state/sites/selectors';
import isVipSite from 'wp-calypso-client/state/selectors/is-vip-site';

const ConnectedSingleSiteWpcom = connectOptions( ( props ) => {
	const {
		hasUnlimitedPremiumThemes,
		requestingSitePlans,
		siteId,
		isVip,
		siteSlug,
		translate,
		isJetpack,
	} = props;

	const displayUpsellBanner = ! requestingSitePlans && ! hasUnlimitedPremiumThemes && ! isVip;
	const bannerLocationBelowSearch = ! isJetpack;

	const upsellUrl = `/plans/${ siteSlug }`;
	let upsellBanner = null;
	if ( displayUpsellBanner ) {
		if ( bannerLocationBelowSearch ) {
			upsellBanner = (
				<UpsellNudge
					plan={ PLAN_PREMIUM }
					customerType="business"
					className="themes__showcase-banner"
					title={ translate( 'Unlock ALL premium themes with our Premium and Business plans!' ) }
					event="themes_plans_free_personal"
					forceHref={ true }
					showIcon={ true }
				/>
			);
		} else {
			upsellBanner = (
				<UpsellNudge
					plan={ PLAN_PREMIUM }
					title={ translate(
						'Access all our premium themes with our Premium and Business plans!'
					) }
					description={ translate(
						'Get advanced customization, more storage space, and video support along with all your new themes.'
					) }
					event="themes_plans_free_personal"
					showIcon={ true }
				/>
			);
		}
	}
	return (
		<Main className="themes">
			<SidebarNavigation />
			<FormattedHeader
				brandFont
				className="themes__page-heading"
				headerText={ translate( 'Themes' ) }
				align="left"
			/>
			<CurrentTheme siteId={ siteId } />
			{ bannerLocationBelowSearch ? null : upsellBanner }

			<ThemeShowcase
				{ ...props }
				upsellUrl={ upsellUrl }
				upsellBanner={ bannerLocationBelowSearch ? upsellBanner : null }
				siteId={ siteId }
			>
				{ siteId && <QuerySitePlans siteId={ siteId } /> }
				{ siteId && <QuerySitePurchases siteId={ siteId } /> }
				<ThanksModal source={ 'list' } />
				<AutoLoadingHomepageModal source={ 'list' } />
			</ThemeShowcase>
		</Main>
	);
} );

export default connect( ( state, { siteId } ) => ( {
	isJetpack: isJetpackSite( state, siteId ),
	isVip: isVipSite( state, siteId ),
	siteSlug: getSiteSlug( state, siteId ),
	hasUnlimitedPremiumThemes: hasFeature( state, siteId, FEATURE_UNLIMITED_PREMIUM_THEMES ),
	requestingSitePlans: isRequestingSitePlans( state, siteId ),
} ) )( ConnectedSingleSiteWpcom );
