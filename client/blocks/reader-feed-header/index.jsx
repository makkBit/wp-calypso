/**
 * External Dependencies
 */
import classnames from 'classnames';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { localize } from 'i18n-calypso';
import { connect } from 'react-redux';
import config from 'wp-calypso-client/config';

/**
 * Internal Dependencies
 */
import { Card } from '@automattic/components';
import ReaderFollowButton from 'wp-calypso-client/reader/follow-button';
import { isAuthorNameBlocked } from 'wp-calypso-client/reader/lib/author-name-blocklist';
import HeaderBack from 'wp-calypso-client/reader/header-back';
import { getSiteDescription, getSiteName, getSiteUrl } from 'wp-calypso-client/reader/get-helpers';
import SiteIcon from 'wp-calypso-client/blocks/site-icon';
import BlogStickers from 'wp-calypso-client/blocks/blog-stickers';
import ReaderFeedHeaderSiteBadge from './badge';
import ReaderSiteNotificationSettings from 'wp-calypso-client/blocks/reader-site-notification-settings';
import getUserSetting from 'wp-calypso-client/state/selectors/get-user-setting';
import { isFollowing } from 'wp-calypso-client/state/reader/follows/selectors';
import QueryUserSettings from 'wp-calypso-client/components/data/query-user-settings';
import Gridicon from 'wp-calypso-client/components/gridicon';
import { requestMarkAllAsSeen } from 'wp-calypso-client/state/reader/seen-posts/actions';

/**
 * Style dependencies
 */
import './style.scss';

class FeedHeader extends Component {
	static propTypes = {
		site: PropTypes.object,
		feed: PropTypes.object,
		showBack: PropTypes.bool,
		streamKey: PropTypes.string,
	};

	getFollowerCount = ( feed, site ) => {
		if ( site && site.subscribers_count ) {
			return site.subscribers_count;
		}

		if ( feed && feed.subscribers_count > 0 ) {
			return feed.subscribers_count;
		}

		return null;
	};

	markAllAsSeen = () => {
		this.props.requestMarkAllAsSeen( {
			identifier: this.props.streamKey,
			feedIds: [ this.props.feed.feed_ID ],
			feedUrls: [ this.props.feed.URL ],
		} );
	};

	render() {
		const { site, feed, showBack, translate, following, isEmailBlocked } = this.props;
		const followerCount = this.getFollowerCount( feed, site );
		const ownerDisplayName = site && ! site.is_multi_author && site.owner && site.owner.name;
		const description = getSiteDescription( { site, feed } );
		const siteTitle = getSiteName( { feed, site } );
		const siteUrl = getSiteUrl( { feed, site } );
		const siteId = site && site.ID;

		const classes = classnames( 'reader-feed-header', {
			'is-placeholder': ! site && ! feed,
			'has-back-button': showBack,
		} );

		return (
			<div className={ classes }>
				<QueryUserSettings />
				<div className="reader-feed-header__back-and-follow">
					{ showBack && <HeaderBack /> }
					<div className="reader-feed-header__follow">
						{ followerCount && (
							<span className="reader-feed-header__follow-count">
								{ ' ' }
								{ translate( '%s follower', '%s followers', {
									count: followerCount,
									args: [ this.props.numberFormat( followerCount ) ],
									comment: '%s is the number of followers. For example: "12,000,000"',
								} ) }
							</span>
						) }
						<div className="reader-feed-header__follow-and-settings">
							{ feed && ! feed.is_error && (
								<div className="reader-feed-header__follow-button">
									<ReaderFollowButton siteUrl={ feed.feed_URL } iconSize={ 24 } />
								</div>
							) }

							{ site && following && ! isEmailBlocked && (
								<div className="reader-feed-header__email-settings">
									<ReaderSiteNotificationSettings siteId={ siteId } />
								</div>
							) }

							{ config.isEnabled( 'reader/seen-posts' ) && feed && (
								<button
									onClick={ this.markAllAsSeen }
									className="reader-feed-header__seen-button"
									disabled={ feed.unseen_count === 0 }
								>
									<Gridicon icon="visible" size={ 18 } />
									<span title={ translate( 'Mark all as seen' ) }>
										{ translate( 'Mark all as seen' ) }
									</span>
								</button>
							) }
						</div>
					</div>
				</div>
				<Card className="reader-feed-header__site">
					<a href={ siteUrl } className="reader-feed-header__site-icon">
						<SiteIcon site={ site } size={ 96 } />
					</a>
					<div className="reader-feed-header__site-title">
						{ site && (
							<span className="reader-feed-header__site-badge">
								<ReaderFeedHeaderSiteBadge site={ site } />
								<BlogStickers blogId={ site.ID } />
							</span>
						) }
						<a className="reader-feed-header__site-title-link" href={ siteUrl }>
							{ siteTitle }
						</a>
					</div>
					<div className="reader-feed-header__details">
						<span className="reader-feed-header__description">{ description }</span>
						{ ownerDisplayName && ! isAuthorNameBlocked( ownerDisplayName ) && (
							<span className="reader-feed-header__byline">
								{ translate( 'by %(author)s', {
									args: {
										author: ownerDisplayName,
									},
								} ) }
							</span>
						) }
					</div>
				</Card>
			</div>
		);
	}
}

export default connect(
	( state, ownProps ) => ( {
		following: ownProps.feed && isFollowing( state, { feedUrl: ownProps.feed.feed_URL } ),
		isEmailBlocked: getUserSetting( state, 'subscription_delivery_email_blocked' ),
	} ),
	{ requestMarkAllAsSeen }
)( localize( FeedHeader ) );
