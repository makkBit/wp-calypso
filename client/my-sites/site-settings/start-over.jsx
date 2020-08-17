/**
 * External dependencies
 */

import React from 'react';
import { connect } from 'react-redux';
import { localize } from 'i18n-calypso';
import Gridicon from 'wp-calypso-client/components/gridicon';

/**
 * Internal dependencies
 */
import HeaderCake from 'wp-calypso-client/components/header-cake';
import ActionPanel from 'wp-calypso-client/components/action-panel';
import ActionPanelTitle from 'wp-calypso-client/components/action-panel/title';
import ActionPanelBody from 'wp-calypso-client/components/action-panel/body';
import ActionPanelFigure from 'wp-calypso-client/components/action-panel/figure';
import ActionPanelFooter from 'wp-calypso-client/components/action-panel/footer';
import { Button } from '@automattic/components';
import { EMPTY_SITE } from 'wp-calypso-client/lib/url/support';
import { getSelectedSiteSlug } from 'wp-calypso-client/state/ui/selectors';

const StartOver = ( { translate, selectedSiteSlug } ) => {
	return (
		<div
			className="main main-column" // eslint-disable-line wpcalypso/jsx-classname-namespace
			role="main"
		>
			<HeaderCake backHref={ '/settings/general/' + selectedSiteSlug }>
				<h1>{ translate( 'Start Over' ) }</h1>
			</HeaderCake>
			<ActionPanel>
				<ActionPanelBody>
					<ActionPanelFigure inlineBodyText={ true }>
						<img src="/calypso/images/wordpress/logo-stars.svg" alt="" width="170" height="143" />
					</ActionPanelFigure>
					<ActionPanelTitle>{ translate( 'Start Over' ) }</ActionPanelTitle>
					<p>
						{ translate(
							"If you want a site but don't want any of the posts and pages you have now, our support " +
								'team can delete your posts, pages, media, and comments for you.'
						) }
					</p>
					<p>
						{ translate(
							'This will keep your site and URL active, but give you a fresh start on your content ' +
								'creation. Just contact us to have your current content cleared out.'
						) }
					</p>
					<p>
						{ translate(
							'Alternatively, you can delete all content from your site by following the steps here.'
						) }
					</p>
				</ActionPanelBody>
				<ActionPanelFooter>
					<Button
						className="action-panel__support-button is-external" // eslint-disable-line wpcalypso/jsx-classname-namespace
						href={ EMPTY_SITE }
					>
						{ translate( 'Follow the steps' ) }
						<Gridicon icon="external" size={ 48 } />
					</Button>
					<Button
						className="action-panel__support-button" // eslint-disable-line wpcalypso/jsx-classname-namespace
						href="/help/contact"
					>
						{ translate( 'Contact support' ) }
					</Button>
				</ActionPanelFooter>
			</ActionPanel>
		</div>
	);
};

export default connect( ( state ) => ( {
	selectedSiteSlug: getSelectedSiteSlug( state ),
} ) )( localize( StartOver ) );
