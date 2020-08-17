/**
 * External dependencies
 */
import React from 'react';
import page from 'page';
import classnames from 'classnames';
import { trim } from 'lodash';
import { slugToCamelCase } from 'wp-calypso-client/devdocs/docs-example/util';

/**
 * Internal dependencies
 */
import Collection from 'wp-calypso-client/devdocs/design/search-collection';
import DocumentHead from 'wp-calypso-client/components/data/document-head';
import HeaderCake from 'wp-calypso-client/components/header-cake';
import Main from 'wp-calypso-client/components/main';
import ReadmeViewer from 'wp-calypso-client/components/readme-viewer';
import SearchCard from 'wp-calypso-client/components/search-card';
import { isEnabled } from 'wp-calypso-client/config';

/**
 * Docs examples
 */
import AllSites from 'wp-calypso-client/blocks/all-sites/docs/example';
import CreditCardForm from 'wp-calypso-client/blocks/credit-card-form/docs/example';
import CalendarButton from 'wp-calypso-client/blocks/calendar-button/docs/example';
import CalendarPopover from 'wp-calypso-client/blocks/calendar-popover/docs/example';
import AuthorSelector from 'wp-calypso-client/blocks/author-selector/docs/example';
import CommentButtons from 'wp-calypso-client/blocks/comment-button/docs/example';
import DisconnectJetpackDialog from 'wp-calypso-client/blocks/disconnect-jetpack/docs/example';
import FollowButton from 'wp-calypso-client/blocks/follow-button/docs/example';
import LikeButtons from 'wp-calypso-client/blocks/like-button/docs/example';
import PostSchedule from 'wp-calypso-client/components/post-schedule/docs/example';
import PostSelector from 'wp-calypso-client/my-sites/post-selector/docs/example';
import ProductPlanOverlapNotices from 'wp-calypso-client/blocks/product-plan-overlap-notices/docs/example';
import ProductSelector from 'wp-calypso-client/blocks/product-selector/docs/example';
import Site from 'wp-calypso-client/blocks/site/docs/example';
import SitePlaceholder from 'wp-calypso-client/blocks/site/docs/placeholder-example';
import SitesDropdown from 'wp-calypso-client/components/sites-dropdown/docs/example';
import SiteIcon from 'wp-calypso-client/blocks/site-icon/docs/example';
import Theme from 'wp-calypso-client/components/theme/docs/example';
import HappinessSupport from 'wp-calypso-client/components/happiness-support/docs/example';
import ThemesListExample from 'wp-calypso-client/components/themes-list/docs/example';
import PlanStorage from 'wp-calypso-client/blocks/plan-storage/docs/example';
import PlanCompareCard from 'wp-calypso-client/my-sites/plan-compare-card/docs/example';
import DomainTip from 'wp-calypso-client/blocks/domain-tip/docs/example';
import PostItem from 'wp-calypso-client/blocks/post-item/docs/example';
import PostStatus from 'wp-calypso-client/blocks/post-status/docs/example';
import ReaderAuthorLink from 'wp-calypso-client/blocks/reader-author-link/docs/example';
import ReaderSiteStreamLink from 'wp-calypso-client/blocks/reader-site-stream-link/docs/example';
import AuthorCompactProfile from 'wp-calypso-client/blocks/author-compact-profile/docs/example';
import RelatedPostCard from 'wp-calypso-client/blocks/reader-related-card/docs/example';
import PlanPrice from 'wp-calypso-client/my-sites/plan-price/docs/example';
import PostShare from 'wp-calypso-client/blocks/post-share/docs/example';
import PlanThankYouCard from 'wp-calypso-client/blocks/plan-thank-you-card/docs/example';
import DismissibleCard from 'wp-calypso-client/blocks/dismissible-card/docs/example';
import PostEditButton from 'wp-calypso-client/blocks/post-edit-button/docs/example';
import PostComment from 'wp-calypso-client/blocks/comments/docs/post-comment-example';
import ReaderAvatar from 'wp-calypso-client/blocks/reader-avatar/docs/example';
import SubscriptionLengthPicker from 'wp-calypso-client/blocks/subscription-length-picker/docs/example';
import ImageEditor from 'wp-calypso-client/blocks/image-editor/docs/example';
import ImageSelector from 'wp-calypso-client/blocks/image-selector/docs/example';
import VideoEditor from 'wp-calypso-client/blocks/video-editor/docs/example';
import ReaderPostCard from 'wp-calypso-client/blocks/reader-post-card/docs/example';
import ReaderCombinedCard from 'wp-calypso-client/blocks/reader-combined-card/docs/example';
import ReaderRecommendedSites from 'wp-calypso-client/blocks/reader-recommended-sites/docs/example';
import ReaderPostOptionsMenu from 'wp-calypso-client/blocks/reader-post-options-menu/docs/example';
import DailyPostButton from 'wp-calypso-client/blocks/daily-post-button/docs/example';
import ReaderSubscriptionListItem from 'wp-calypso-client/blocks/reader-subscription-list-item/docs/example';
import PostLikes from 'wp-calypso-client/blocks/post-likes/docs/example';
import ReaderFeaturedVideo from 'wp-calypso-client/blocks/reader-featured-video/docs/example';
import NpsSurvey from 'wp-calypso-client/blocks/nps-survey/docs/example';
import ReaderExportButton from 'wp-calypso-client/blocks/reader-export-button/docs/example';
import ReaderImportButton from 'wp-calypso-client/blocks/reader-import-button/docs/example';
import SharingPreviewPane from 'wp-calypso-client/blocks/sharing-preview-pane/docs/example';
import ReaderShare from 'wp-calypso-client/blocks/reader-share/docs/example';
import Login from 'wp-calypso-client/blocks/login/docs/example';
import LocationSearch from 'wp-calypso-client/blocks/location-search/docs/example';
import ConversationCommentList from 'wp-calypso-client/blocks/conversations/docs/example';
import SimplePaymentsDialog from 'wp-calypso-client/components/tinymce/plugins/simple-payments/dialog/docs/example';
import ConversationCaterpillar from 'wp-calypso-client/blocks/conversation-caterpillar/docs/example';
import ConversationFollowButton from 'wp-calypso-client/blocks/conversation-follow-button/docs/example';
import ColorSchemePicker from 'wp-calypso-client/blocks/color-scheme-picker/docs/example';
import UserMentions from 'wp-calypso-client/blocks/user-mentions/docs/example';
import SupportArticleDialog from 'wp-calypso-client/blocks/support-article-dialog/docs/example';
import TimeMismatchWarning from 'wp-calypso-client/blocks/time-mismatch-warning/docs/example';
import UpsellNudge from 'wp-calypso-client/blocks/upsell-nudge/docs/example';

export default class AppComponents extends React.Component {
	static displayName = 'AppComponents';
	state = { filter: '' };

	onSearch = ( term ) => {
		this.setState( { filter: trim( term || '' ).toLowerCase() } );
	};

	backToComponents = () => {
		page( '/devdocs/blocks/' );
	};

	render() {
		const className = classnames( 'devdocs', 'devdocs__blocks', {
			'is-single': this.props.component,
			'is-list': ! this.props.component,
		} );

		return (
			<Main className={ className }>
				<DocumentHead title="Blocks" />

				{ this.props.component ? (
					<React.Fragment>
						<HeaderCake onClick={ this.backToComponents } backText="All Blocks">
							{ slugToCamelCase( this.props.component ) }
						</HeaderCake>
						{ isEnabled( 'devdocs/color-scheme-picker' ) && (
							<ColorSchemePicker readmeFilePath="color-scheme-picker" />
						) }
					</React.Fragment>
				) : (
					<div>
						<ReadmeViewer readmeFilePath="/client/devdocs/blocks/README.md" />
						<SearchCard
							onSearch={ this.onSearch }
							initialValue={ this.state.filter }
							placeholder="Search blocks…"
							analyticsGroup="Docs"
						/>
					</div>
				) }
				<Collection
					component={ this.props.component }
					filter={ this.state.filter }
					section="blocks"
				>
					{ isEnabled( 'devdocs/color-scheme-picker' ) && (
						<ColorSchemePicker readmeFilePath="color-scheme-picker" />
					) }
					<AllSites readmeFilePath="all-sites" />
					<AuthorSelector readmeFilePath="author-selector" />
					<CalendarButton readmeFilePath="calendar-button" />
					<CalendarPopover readmeFilePath="calendar-popover" />
					<CommentButtons readmeFilePath="comment-button" />
					<DisconnectJetpackDialog />
					<CreditCardForm readmeFilePath="credit-card-form" />
					<FollowButton readmeFilePath="follow-button" />
					<HappinessSupport />
					<ImageEditor readmeFilePath="image-editor" />
					<VideoEditor readmeFilePath="video-editor" />
					<LikeButtons readmeFilePath="like-button" />
					<Login />
					<LocationSearch readmeFilePath="location-search" />
					<PostEditButton />
					<PlanStorage readmeFilePath="plan-storage" />
					<PostSchedule />
					<PostSelector />
					<ProductPlanOverlapNotices readmeFilePath="product-plan-overlap-notices" />
					<ProductSelector readmeFilePath="product-selector" />
					<Site readmeFilePath="site" />
					<SitePlaceholder />
					<SitesDropdown />
					<SiteIcon readmeFilePath="site-icon" />
					<Theme />
					<ThemesListExample />
					<PlanCompareCard />
					<DomainTip />
					<RelatedPostCard />
					<PostItem readmeFilePath="post-item" />
					<PostStatus readmeFilePath="post-status" />
					<ReaderAuthorLink readmeFilePath="reader-author-link" />
					<ReaderSubscriptionListItem />
					<ReaderSiteStreamLink readmeFilePath="reader-site-stream-link" />
					<AuthorCompactProfile />
					<ReaderPostCard />
					<ReaderCombinedCard />
					<ReaderRecommendedSites />
					<PlanPrice />
					<PostShare readmeFilePath="post-share" />
					<PlanThankYouCard readmeFilePath="plan-thank-you-card" />
					<DismissibleCard readmeFilePath="dismissible-card" />
					<ReaderAvatar readmeFilePath="reader-avatar" />
					<ReaderPostOptionsMenu readmeFilePath="reader-post-options-menu" />
					<DailyPostButton readmeFilePath="daily-post-button" />
					<PostLikes readmeFilePath="post-likes" />
					<ReaderFeaturedVideo readmeFilePath="reader-featured-video" />
					{ isEnabled( 'nps-survey/devdocs' ) && <NpsSurvey readmeFilePath="nps-survey" /> }
					<ReaderExportButton readmeFilePath="reader-export-button" />
					<ReaderImportButton readmeFilePath="reader-import-button" />
					<SharingPreviewPane />
					<SimplePaymentsDialog />
					<SubscriptionLengthPicker />
					<ReaderShare readmeFilePath="reader-share" />
					<ConversationCommentList />
					<PostComment />
					<ConversationCaterpillar readmeFilePath="conversation-caterpillar" />
					<ConversationFollowButton />
					{ isEnabled( 'reader/user-mention-suggestions' ) && (
						<UserMentions readmeFilePath="user-mentions" />
					) }
					<SupportArticleDialog />
					<ImageSelector readmeFilePath="image-selector" />
					<TimeMismatchWarning readmeFilePath="time-mismatch-warning" />
					<UpsellNudge />
				</Collection>
			</Main>
		);
	}
}
