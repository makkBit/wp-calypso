/**
 * External dependencies
 */
import React, { Fragment } from 'react';
import { connect, useDispatch } from 'react-redux';
import { localize, getLocaleSlug } from 'i18n-calypso';
import debugFactory from 'debug';

/**
 * Internal dependencies
 */
import QuerySitePlans from 'wp-calypso-client/components/data/query-site-plans';
import isDomainOnlySite from 'wp-calypso-client/state/selectors/is-domain-only-site';
import { getCurrentUserCountryCode } from 'wp-calypso-client/state/current-user/selectors';
import isEligibleForFreeToPaidUpsell from 'wp-calypso-client/state/selectors/is-eligible-for-free-to-paid-upsell';
import { isJetpackSite } from 'wp-calypso-client/state/sites/selectors';
import getSites from 'wp-calypso-client/state/selectors/get-sites';
import getPrimarySiteId from 'wp-calypso-client/state/selectors/get-primary-site-id';
import getPrimarySiteSlug from 'wp-calypso-client/state/selectors/get-primary-site-slug';
import { clickUpgradeNudge } from 'wp-calypso-client/state/marketing/actions';
import UpsellNudge from 'wp-calypso-client/blocks/upsell-nudge';

const debug = debugFactory( 'calypso:reader:sidebar-nudges' );

function renderFreeToPaidPlanNudge( { siteId, siteSlug, translate }, dispatch ) {
	return (
		<UpsellNudge
			event={ 'free-to-paid-sidebar-reader' }
			forceHref={ true }
			callToAction={ translate( 'Upgrade' ) }
			compact
			href={ '/plans/' + siteSlug }
			title={ translate( 'Free domain with a plan' ) }
			onClick={ () => dispatch( clickUpgradeNudge( siteId ) ) }
			tracksClickName={ 'calypso_upgrade_nudge_cta_click' }
			tracksImpressionName={ 'calypso_upgrade_nudge_impression' }
		/>
	);
}

export function ReaderSidebarNudges( props ) {
	const dispatch = useDispatch();

	return (
		<Fragment>
			<QuerySitePlans siteId={ props.siteId } />
			{ props.isEligibleForFreeToPaidUpsellNudge && renderFreeToPaidPlanNudge( props, dispatch ) }
		</Fragment>
	);
}

function mapStateToProps( state ) {
	const isDevelopment = 'development' === process.env.NODE_ENV;
	const siteCount = getSites( state ).length;
	const siteId = getPrimarySiteId( state );
	const siteSlug = getPrimarySiteSlug( state );
	const devCountryCode = isDevelopment && global.window && global.window.userCountryCode;
	const countryCode = devCountryCode || getCurrentUserCountryCode( state );
	const userLocale = getLocaleSlug( state );
	const isEnglish = [ 'en', 'en-gb' ].indexOf( userLocale ) !== -1;

	isDevelopment &&
		debug(
			'country: %s, locale: %s, siteCount: %d, eligible: %s',
			countryCode,
			userLocale,
			siteCount,
			isEligibleForFreeToPaidUpsell( state, siteId )
		);

	return {
		siteId,
		siteSlug,
		isEligibleForFreeToPaidUpsellNudge:
			siteCount === 1 && // available when a user owns one site only
			! isJetpackSite( state, siteId ) && // not for Jetpack sites
			! isDomainOnlySite( state, siteId ) && // not for domain only sites
			isEligibleForFreeToPaidUpsell( state, siteId ) &&
			// This nudge only shows up to US EN users.
			isEnglish &&
			'US' === countryCode,
	};
}

export default connect( mapStateToProps )( localize( ReaderSidebarNudges ) );
