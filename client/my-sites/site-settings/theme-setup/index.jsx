/**
 * External dependencies
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { localize } from 'i18n-calypso';
import page from 'page';

/**
 * Internal dependencies
 */
import HeaderCake from 'wp-calypso-client/components/header-cake';
import Main from 'wp-calypso-client/components/main';
import QueryActiveTheme from 'wp-calypso-client/components/data/query-active-theme';
import QueryTheme from 'wp-calypso-client/components/data/query-theme';
import ThemeSetupCard from './theme-setup-card';
import ThemeSetupPlaceholder from './theme-setup-placeholder';
import { getSelectedSiteId, getSelectedSiteSlug } from 'wp-calypso-client/state/ui/selectors';
import { getActiveTheme, getTheme } from 'wp-calypso-client/state/themes/selectors';
import { isJetpackSite } from 'wp-calypso-client/state/sites/selectors';
import { toggleDialog } from 'wp-calypso-client/state/theme-setup/actions';

/**
 * Style dependencies
 */
import './style.scss';

class ThemeSetup extends Component {
	componentDidUpdate( prevProps ) {
		const { siteIsJetpack, siteId } = this.props;

		if ( siteId !== prevProps.siteId && siteIsJetpack ) {
			this.redirectToGeneral();
		}
	}

	redirectToGeneral = () => {
		const { siteSlug } = this.props;
		page.redirect( '/settings/general/' + siteSlug );
	};

	render() {
		const { siteId, theme, themeId, translate } = this.props;

		return (
			<Main className="theme-setup">
				{ siteId && <QueryActiveTheme siteId={ siteId } /> }
				{ themeId && <QueryTheme siteId="wpcom" themeId={ themeId } /> }

				<HeaderCake onClick={ this.redirectToGeneral }>
					<h1>{ translate( 'Theme Setup' ) }</h1>
				</HeaderCake>

				{ siteId && theme ? (
					<ThemeSetupCard onClick={ this.props.toggleDialog } theme={ theme } />
				) : (
					<ThemeSetupPlaceholder />
				) }
			</Main>
		);
	}
}

const mapStateToProps = ( state ) => {
	const siteId = getSelectedSiteId( state );
	const siteIsJetpack = isJetpackSite( state, siteId );
	const siteSlug = getSelectedSiteSlug( state ) || '';
	const themeId = siteId && getActiveTheme( state, siteId );
	const theme = themeId && getTheme( state, 'wpcom', themeId );
	return {
		siteId,
		siteIsJetpack,
		siteSlug,
		themeId,
		theme,
	};
};

export default connect( mapStateToProps, { toggleDialog } )( localize( ThemeSetup ) );
