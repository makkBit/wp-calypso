/**
 * External dependencies
 */
import classNames from 'classnames';
import { useTranslate } from 'i18n-calypso';
import React from 'react';
import { useSelector } from 'react-redux';

/**
 * Internal dependencies
 */
import DocumentHead from 'wp-calypso-client/components/data/document-head';
import QueryJetpackScanHistory from 'wp-calypso-client/components/data/query-jetpack-scan-history';
import EmptyContent from 'wp-calypso-client/components/empty-content';
import FormattedHeader from 'wp-calypso-client/components/formatted-header';
import ThreatHistoryList from 'wp-calypso-client/components/jetpack/threat-history-list';
import Main from 'wp-calypso-client/components/main';
import PageViewTracker from 'wp-calypso-client/lib/analytics/page-view-tracker';
import isJetpackCloud from 'wp-calypso-client/lib/jetpack/is-jetpack-cloud';
import SidebarNavigation from 'wp-calypso-client/my-sites/sidebar-navigation';
import { getSelectedSiteId } from 'wp-calypso-client/state/ui/selectors';
import canCurrentUser from 'wp-calypso-client/state/selectors/can-current-user';
import ScanNavigation from '../navigation';

/**
 * Style dependencies
 */
import './style.scss';

interface Props {
	filter: string;
}

export default function ScanHistoryPage( { filter }: Props ) {
	const translate = useTranslate();
	const siteId = useSelector( getSelectedSiteId );
	const isAdmin = useSelector( ( state ) => canCurrentUser( state, siteId, 'manage_options' ) );
	const isJetpackPlatform = isJetpackCloud();

	return (
		<Main
			className={ classNames( 'scan history', {
				is_jetpackcom: isJetpackPlatform,
			} ) }
		>
			<DocumentHead title={ translate( 'Scan' ) } />
			<SidebarNavigation />
			<PageViewTracker path="/scan/history/:site" title="Scan History" />
			{ ! isJetpackPlatform && (
				<FormattedHeader headerText={ 'Jetpack Scan' } align="left" brandFont />
			) }
			{ ! isAdmin && (
				<EmptyContent
					illustration="/calypso/images/illustrations/illustration-404.svg"
					title={ translate( 'You are not authorized to view this page' ) }
				/>
			) }
			{ isAdmin && (
				<>
					<QueryJetpackScanHistory siteId={ siteId } />
					<ScanNavigation section={ 'history' } />
					<section className="history__body">
						<p className="history__description">
							{ translate(
								'The scanning history contains a record of all previously active threats on your site.'
							) }
						</p>
						<ThreatHistoryList filter={ filter } />
					</section>
				</>
			) }
		</Main>
	);
}
