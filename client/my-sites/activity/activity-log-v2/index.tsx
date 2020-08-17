/**
 * External dependencies
 */
import { useSelector, useDispatch } from 'react-redux';
import { useTranslate } from 'i18n-calypso';
import classNames from 'classnames';
import React, { FunctionComponent, useEffect } from 'react';
import { get } from 'lodash';

/**
 * Internal dependencies
 */
import { isFreePlan } from 'wp-calypso-client/lib/plans';
import { recordTracksEvent } from 'wp-calypso-client/state/analytics/actions';
import { getHttpData } from 'wp-calypso-client/state/data-layer/http-data';
import {
	requestActivityLogs,
	getRequestActivityLogsId,
} from 'wp-calypso-client/state/data-getters';
import { siteHasBackupProductPurchase } from 'wp-calypso-client/state/purchases/selectors';
import { getCurrentPlan } from 'wp-calypso-client/state/sites/plans/selectors';
import { getSelectedSiteId, getSelectedSiteSlug } from 'wp-calypso-client/state/ui/selectors';
import ActivityCardList from 'wp-calypso-client/components/activity-card-list';
import DocumentHead from 'wp-calypso-client/components/data/document-head';
import QuerySitePlans from 'wp-calypso-client/components/data/query-site-plans';
import QuerySitePurchases from 'wp-calypso-client/components/data/query-site-purchases';
import FormattedHeader from 'wp-calypso-client/components/formatted-header';
import Upsell from 'wp-calypso-client/components/jetpack/upsell';
import getActivityLogFilter from 'wp-calypso-client/state/selectors/get-activity-log-filter';
import isVipSite from 'wp-calypso-client/state/selectors/is-vip-site';
import isJetpackCloud from 'wp-calypso-client/lib/jetpack/is-jetpack-cloud';
import Main from 'wp-calypso-client/components/main';
import PageViewTracker from 'wp-calypso-client/lib/analytics/page-view-tracker';
import SidebarNavigation from 'wp-calypso-client/my-sites/sidebar-navigation';

/**
 * Style dependencies
 */
import './style.scss';

const ActivityLogV2: FunctionComponent = () => {
	const translate = useTranslate();
	const dispatch = useDispatch();

	const siteId = useSelector( getSelectedSiteId );
	const filter = useSelector( ( state ) => getActivityLogFilter( state, siteId ) );
	const logs = useSelector( () => getHttpData( getRequestActivityLogsId( siteId, filter ) ).data );
	const selectedSiteSlug = useSelector( getSelectedSiteSlug );
	const siteIsOnFreePlan = useSelector(
		( state ) =>
			isFreePlan( get( getCurrentPlan( state, siteId ), 'productSlug' ) ) &&
			! isVipSite( state, siteId )
	);
	const siteHasBackupPurchase = useSelector( ( state ) =>
		siteHasBackupProductPurchase( state, siteId )
	);

	const showUpgrade = siteIsOnFreePlan && ! siteHasBackupPurchase;
	const showFilter = ! showUpgrade;

	const jetpackCloudHeader = showUpgrade ? (
		<Upsell
			headerText={ translate( 'Welcome to your site’s activity' ) }
			bodyText={ translate(
				'With your free plan, you can monitor the 20 most recent events. A paid plan unlocks more powerful features. You can access all site activity for the last 30 days and filter events by type and date range to quickly find the information you need. '
			) }
			buttonLink={ `https://wordpress.com/plans/${ selectedSiteSlug }?feature=offsite-backup-vaultpress-daily&plan=jetpack_personal_monthly` }
			buttonText={ translate( 'Upgrade Now' ) }
			onClick={ () =>
				dispatch( recordTracksEvent( 'calypso_jetpack_activity_log_upgrade_click' ) )
			}
		/>
	) : (
		<div className="activity-log-v2__header">
			<h2>{ translate( 'Find a backup or restore point' ) }</h2>
			<p>
				{ translate(
					'This is the complete event history for your site. Filter by date range and/or activity type.'
				) }
			</p>
		</div>
	);

	// when the filter changes, re-request the logs
	useEffect( () => {
		requestActivityLogs( siteId, filter );
	}, [ filter, siteId ] );

	return (
		<Main
			className={ classNames( 'activity-log-v2', {
				wordpressdotcom: ! isJetpackCloud(),
			} ) }
			wideLayout={ ! isJetpackCloud() }
		>
			{ siteId && <QuerySitePlans siteId={ siteId } /> }
			{ siteId && <QuerySitePurchases siteId={ siteId } /> }
			<DocumentHead title={ translate( 'Activity log' ) } />
			<SidebarNavigation />
			<PageViewTracker path="/activity-log/:site" title="Activity log" />
			{ isJetpackCloud() ? (
				jetpackCloudHeader
			) : (
				<FormattedHeader
					headerText="Activity"
					subHeaderText={ translate(
						'This is the complete event history for your site. Filter by date range and/or activity type.'
					) }
					align="left"
				/>
			) }
			<div className="activity-log-v2__content">
				<ActivityCardList logs={ logs } pageSize={ 10 } showFilter={ showFilter } />
			</div>
		</Main>
	);
};

export default ActivityLogV2;
