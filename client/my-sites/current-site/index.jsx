/**
 * External dependencies
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { localize } from 'i18n-calypso';
import PropTypes from 'prop-types';
import { isEnabled } from 'wp-calypso-client/config';

/**
 * Internal dependencies
 */
import AllSites from 'wp-calypso-client/blocks/all-sites';
import AsyncLoad from 'wp-calypso-client/components/async-load';
import { Button, Card } from '@automattic/components';
import Site from 'wp-calypso-client/blocks/site';
import Gridicon from 'wp-calypso-client/components/gridicon';
import { setLayoutFocus } from 'wp-calypso-client/state/ui/layout-focus/actions';
import { getSelectedSite } from 'wp-calypso-client/state/ui/selectors';
import getSelectedOrAllSites from 'wp-calypso-client/state/selectors/get-selected-or-all-sites';
import { getCurrentUserSiteCount } from 'wp-calypso-client/state/current-user/selectors';
import { recordGoogleEvent } from 'wp-calypso-client/state/analytics/actions';
import { hasAllSitesList } from 'wp-calypso-client/state/sites/selectors';

/**
 * Style dependencies
 */
import './style.scss';

class CurrentSite extends Component {
	static propTypes = {
		siteCount: PropTypes.number.isRequired,
		setLayoutFocus: PropTypes.func.isRequired,
		selectedSite: PropTypes.object,
		translate: PropTypes.func.isRequired,
		anySiteSelected: PropTypes.array,
		forceAllSitesView: PropTypes.bool,
	};

	switchSites = ( event ) => {
		event.preventDefault();
		event.stopPropagation();
		this.props.setLayoutFocus( 'sites' );
		this.props.recordGoogleEvent( 'Sidebar', 'Clicked Switch Site' );
	};

	render() {
		const { selectedSite, translate, anySiteSelected } = this.props;

		if ( ! anySiteSelected.length || ( ! selectedSite && ! this.props.hasAllSitesList ) ) {
			/* eslint-disable wpcalypso/jsx-classname-namespace, jsx-a11y/anchor-is-valid */
			return (
				<Card className="current-site is-loading">
					<div className="site">
						<a className="site__content">
							<div className="site-icon" />
							<div className="site__info">
								<span className="site__title">{ translate( 'Loading My Sites…' ) }</span>
							</div>
						</a>
					</div>
				</Card>
			);
			/* eslint-enable wpcalypso/jsx-classname-namespace, jsx-a11y/anchor-is-valid */
		}

		return (
			<Card className="current-site">
				{ this.props.siteCount > 1 && (
					<span className="current-site__switch-sites">
						<Button borderless onClick={ this.switchSites }>
							<Gridicon icon="chevron-left" />
							<span className="current-site__switch-sites-label">
								{ translate( 'Switch Site' ) }
							</span>
						</Button>
					</span>
				) }

				{ selectedSite ? (
					<div>
						<Site site={ selectedSite } homeLink={ true } />
					</div>
				) : (
					<AllSites />
				) }
				{ selectedSite && isEnabled( 'current-site/domain-warning' ) && (
					<AsyncLoad
						require="wp-calypso-client/my-sites/current-site/domain-warnings"
						placeholder={ null }
					/>
				) }
				{ selectedSite && isEnabled( 'current-site/stale-cart-notice' ) && (
					<AsyncLoad
						require="wp-calypso-client/my-sites/current-site/stale-cart-items-notice"
						placeholder={ null }
					/>
				) }
				{ selectedSite && isEnabled( 'current-site/notice' ) && (
					<AsyncLoad
						require="wp-calypso-client/my-sites/current-site/notice"
						placeholder={ null }
						site={ selectedSite }
					/>
				) }
			</Card>
		);
	}
}

export default connect(
	( state, ownProps ) => ( {
		selectedSite: ownProps.forceAllSitesView ? null : getSelectedSite( state ),
		anySiteSelected: getSelectedOrAllSites( state ),
		siteCount: getCurrentUserSiteCount( state ),
		hasAllSitesList: hasAllSitesList( state ),
	} ),
	{ recordGoogleEvent, setLayoutFocus }
)( localize( CurrentSite ) );
