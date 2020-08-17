/**
 * External dependencies
 */
import React from 'react';
import page from 'page';
import classnames from 'classnames';
import { slugToCamelCase } from 'wp-calypso-client/devdocs/docs-example/util';
import { trim } from 'lodash';

/**
 * Internal dependencies
 */
import config from 'wp-calypso-client/config';
import DocumentHead from 'wp-calypso-client/components/data/document-head';
import HeaderCake from 'wp-calypso-client/components/header-cake';
import Main from 'wp-calypso-client/components/main';
import ReadmeViewer from 'wp-calypso-client/components/readme-viewer';
import SearchCard from 'wp-calypso-client/components/search-card';

/**
 * Docs examples
 */
import Accordion from 'wp-calypso-client/components/accordion/docs/example';
import ActionCard from 'wp-calypso-client/components/action-card/docs/example';
import ActionPanel from 'wp-calypso-client/components/action-panel/docs/example';
import Animate from 'wp-calypso-client/components/animate/docs/example';
import BackButton from 'wp-calypso-client/components/back-button/docs/example';
import Badge from 'wp-calypso-client/components/badge/docs/example';
import Banner from 'wp-calypso-client/components/banner/docs/example';
import BulkSelect from 'wp-calypso-client/components/bulk-select/docs/example';
import ButtonGroups from 'wp-calypso-client/components/button-group/docs/example';
import Buttons from '@automattic/components/src/button/docs/example';
import CardHeading from 'wp-calypso-client/components/card-heading/docs/example';
import Cards from '@automattic/components/src/card/docs/example';
import Chart from 'wp-calypso-client/components/chart/docs/example';
import Checklist from 'wp-calypso-client/components/checklist/docs/example';
import ClipboardButtonInput from 'wp-calypso-client/components/clipboard-button-input/docs/example';
import ClipboardButtons from 'wp-calypso-client/components/forms/clipboard-button/docs/example';
import Collection from 'wp-calypso-client/devdocs/design/search-collection';
import ColorSchemePicker from 'wp-calypso-client/blocks/color-scheme-picker/docs/example';
import Count from 'wp-calypso-client/components/count/docs/example';
import CountedTextareas from 'wp-calypso-client/components/forms/counted-textarea/docs/example';
import CreditCard from 'wp-calypso-client/components/credit-card/docs/example';
import DatePicker from 'wp-calypso-client/components/date-picker/docs/example';
import DateRange from 'wp-calypso-client/components/date-range/docs/example';
import DiffViewerExample from 'wp-calypso-client/components/diff-viewer/docs/example';
import DotPager from 'wp-calypso-client/components/dot-pager/docs/example';
import DropZones from 'wp-calypso-client/components/drop-zone/docs/example';
import EllipsisMenu from 'wp-calypso-client/components/ellipsis-menu/docs/example';
import EmbedDialog from 'wp-calypso-client/components/tinymce/plugins/embed/docs/example';
import EmojifyExample from 'wp-calypso-client/components/emojify/docs/example';
import EmptyContent from 'wp-calypso-client/components/empty-content/docs/example';
import ExternalLink from 'wp-calypso-client/components/external-link/docs/example';
import FAQ from 'wp-calypso-client/components/faq/docs/example';
import FeatureGate from 'wp-calypso-client/components/feature-example/docs/example';
import FilePickers from 'wp-calypso-client/components/file-picker/docs/example';
import FocusableExample from 'wp-calypso-client/components/focusable/docs/example';
import FoldableCard from 'wp-calypso-client/components/foldable-card/docs/example';
import FormattedDate from 'wp-calypso-client/components/formatted-date/docs/example';
import FormattedHeader from 'wp-calypso-client/components/formatted-header/docs/example';
import FormFields from 'wp-calypso-client/components/forms/docs/example';
import Gauge from 'wp-calypso-client/components/gauge/docs/example';
import GlobalNotices from 'wp-calypso-client/components/global-notices/docs/example';
import Gravatar from 'wp-calypso-client/components/gravatar/docs/example';
import GravatarCaterpillar from 'wp-calypso-client/components/gravatar-caterpillar/docs/example';
import Gridicon from 'wp-calypso-client/components/gridicon/docs/example';
import GSuiteExamples from 'wp-calypso-client/components/gsuite/docs/example';
import HappinessEngineersTray from 'wp-calypso-client/components/happiness-engineers-tray/docs/example';
import HeaderButton from 'wp-calypso-client/components/header-button/docs/example';
import Headers from 'wp-calypso-client/components/header-cake/docs/example';
import ImagePreloader from 'wp-calypso-client/components/image-preloader/docs/example';
import InfoPopover from 'wp-calypso-client/components/info-popover/docs/example';
import InlineSupportLink from 'wp-calypso-client/components/inline-support-link/docs/example';
import InputChrono from 'wp-calypso-client/components/input-chrono/docs/example';
import JetpackColophonExample from 'wp-calypso-client/components/jetpack-colophon/docs/example';
import JetpackBundleCard from 'wp-calypso-client/components/jetpack/card/jetpack-bundle-card/docs/example';
import JetpackHeaderExample from 'wp-calypso-client/components/jetpack-header/docs/example';
import JetpackLogoExample from 'wp-calypso-client/components/jetpack-logo/docs/example';
import JetpackPlanCard from 'wp-calypso-client/components/jetpack/card/jetpack-plan-card/docs/example';
import JetpackProductCard from 'wp-calypso-client/components/jetpack/card/jetpack-product-card/docs/example';
import LanguagePicker from 'wp-calypso-client/components/language-picker/docs/example';
import LineChart from 'wp-calypso-client/components/line-chart/docs/example';
import ListEnd from 'wp-calypso-client/components/list-end/docs/example';
import MarkedLinesExample from 'wp-calypso-client/components/marked-lines/docs/example';
import MultipleChoiceQuestionExample from 'wp-calypso-client/components/multiple-choice-question/docs/example';
import Notices from 'wp-calypso-client/components/notice/docs/example';
import PaginationExample from 'wp-calypso-client/components/pagination/docs/example';
import PaymentLogo from 'wp-calypso-client/components/payment-logo/docs/example';
import PieChart from 'wp-calypso-client/components/pie-chart/docs/example';
import PlansSkipButton from 'wp-calypso-client/components/plans/plans-skip-button/docs/example';
import PodcastIndicator from 'wp-calypso-client/components/podcast-indicator/docs/example';
import Popovers from 'wp-calypso-client/components/popover/docs/example';
import ProductCard from 'wp-calypso-client/components/product-card/docs/example';
import ProductExpiration from 'wp-calypso-client/components/product-expiration/docs/example';
import ProductIcon from '@automattic/components/src/product-icon/docs/example';
import ProgressBar from '@automattic/components/src/progress-bar/docs/example';
import PromoSection from 'wp-calypso-client/components/promo-section/docs/example';
import PromoCard from 'wp-calypso-client/components/promo-section/promo-card/docs/example';
import Ranges from 'wp-calypso-client/components/forms/range/docs/example';
import Rating from 'wp-calypso-client/components/rating/docs/example';
import Ribbon from '@automattic/components/src/ribbon/docs/example';
import ScreenReaderTextExample from '@automattic/components/src/screen-reader-text/docs/example';
import SearchDemo from 'wp-calypso-client/components/search/docs/example';
import SectionHeader from 'wp-calypso-client/components/section-header/docs/example';
import SectionNav from 'wp-calypso-client/components/section-nav/docs/example';
import SegmentedControl from 'wp-calypso-client/components/segmented-control/docs/example';
import SelectDropdown from 'wp-calypso-client/components/select-dropdown/docs/example';
import ShareButton from 'wp-calypso-client/components/share-button/docs/example';
import SiteTitleControl from 'wp-calypso-client/components/site-title/docs/example';
import SocialLogos from 'wp-calypso-client/components/social-logo/docs/example';
import Spinner from 'wp-calypso-client/components/spinner/docs/example';
import SpinnerButton from 'wp-calypso-client/components/spinner-button/docs/example';
import SpinnerLine from 'wp-calypso-client/components/spinner-line/docs/example';
import SplitButton from 'wp-calypso-client/components/split-button/docs/example';
import Suggestions from '@automattic/components/src/suggestions/docs/example';
import SuggestionSearchExample from 'wp-calypso-client/components/suggestion-search/docs/example';
import SupportInfoExample from 'wp-calypso-client/components/support-info/docs/example';
import TextareaAutosize from 'wp-calypso-client/components/textarea-autosize/docs/example';
import TextDiff from 'wp-calypso-client/components/text-diff/docs/example';
import TileGrid from 'wp-calypso-client/components/tile-grid/docs/example';
import Timeline from 'wp-calypso-client/components/timeline/docs/example';
import TimeSince from 'wp-calypso-client/components/time-since/docs/example';
import Timezone from 'wp-calypso-client/components/timezone/docs/example';
import TokenFields from 'wp-calypso-client/components/token-field/docs/example';
import Tooltip from 'wp-calypso-client/components/tooltip/docs/example';
import UserItem from 'wp-calypso-client/components/user/docs/example';
import Version from 'wp-calypso-client/components/version/docs/example';
import VerticalMenu from 'wp-calypso-client/components/vertical-menu/docs/example';
import VerticalNav from 'wp-calypso-client/components/vertical-nav/docs/example';
import Wizard from 'wp-calypso-client/components/wizard/docs/example';
import WizardProgressBar from 'wp-calypso-client/components/wizard-progress-bar/docs/example';
import WpcomColophon from 'wp-calypso-client/components/wpcom-colophon/docs/example';

export default class DesignAssets extends React.Component {
	static displayName = 'DesignAssets';
	state = { filter: '' };

	onSearch = ( term ) => {
		this.setState( { filter: trim( term || '' ).toLowerCase() } );
	};

	backToComponents = () => {
		page( '/devdocs/design/' );
	};

	render() {
		const { component } = this.props;
		const { filter } = this.state;

		const className = classnames( 'devdocs', 'devdocs__components', {
			'is-single': this.props.component,
			'is-list': ! this.props.component,
		} );

		return (
			<Main className={ className }>
				<DocumentHead title="UI Components" />

				{ component ? (
					<React.Fragment>
						<HeaderCake onClick={ this.backToComponents } backText="All Components">
							{ slugToCamelCase( component ) }
						</HeaderCake>
						{ config.isEnabled( 'devdocs/color-scheme-picker' ) && (
							<ColorSchemePicker readmeFilePath="color-scheme-picker" />
						) }
					</React.Fragment>
				) : (
					<div>
						<ReadmeViewer readmeFilePath="/client/devdocs/design/README.md" />
						<SearchCard
							onSearch={ this.onSearch }
							initialValue={ filter }
							placeholder="Search components…"
							analyticsGroup="Docs"
							className="design__ui-components-search"
						/>
					</div>
				) }

				<Collection component={ component } filter={ filter }>
					{ config.isEnabled( 'devdocs/color-scheme-picker' ) && (
						<ColorSchemePicker readmeFilePath="color-scheme-picker" />
					) }
					<Accordion readmeFilePath="accordion" />
					<ActionCard readmeFilePath="action-card" />
					<ActionPanel readmeFilePath="action-panel" />
					<Animate readmeFilePath="animate" />
					<BackButton readmeFilePath="back-button" />
					<Badge readmeFilePath="badge" />
					<Banner readmeFilePath="banner" />
					<BulkSelect readmeFilePath="bulk-select" />
					<ButtonGroups readmeFilePath="button-group" />
					<Buttons readmeFilePath="/packages/components/src/button" />
					<CardHeading readmeFilePath="card-heading" />
					<Cards readmeFilePath="/packages/components/src/card" />
					<Chart readmeFilePath="chart" />
					<Checklist readmeFilePath="checklist" />
					<ClipboardButtonInput readmeFilePath="clipboard-button-input" />
					<ClipboardButtons readmeFilePath="forms/clipboard-button" />
					<Count readmeFilePath="count" />
					<CountedTextareas readmeFilePath="forms/counted-textarea" />
					<CreditCard readmeFilePath="credit-card" />
					<DatePicker readmeFilePath="date-picker" />
					<DateRange readmeFilePath="date-range" />
					<DiffViewerExample readmeFilePath="diff-viewer" />
					<DotPager readmeFilePath="dot-pager" />
					<DropZones searchKeywords="drag" readmeFilePath="drop-zone" />
					<EllipsisMenu readmeFilePath="ellipsis-menu" />
					<EmbedDialog readmeFilePath="tinymce/plugins/embed" />
					<EmojifyExample readmeFilePath="emojify" />
					<EmptyContent readmeFilePath="empty-content" />
					<ExternalLink readmeFilePath="external-link" />
					<FAQ readmeFilePath="faq" />
					<FeatureGate readmeFilePath="feature-example" />
					<FilePickers readmeFilePath="file-picker" />
					<FocusableExample readmeFilePath="focusable" />
					<FoldableCard readmeFilePath="foldable-card" />
					<FormattedDate readmeFilePath="formatted-date" />
					<FormattedHeader readmeFilePath="formatted-header" />
					<FormFields searchKeywords="input textbox textarea radio" readmeFilePath="forms" />
					<Gauge readmeFilePath="gauge" />
					<GlobalNotices readmeFilePath="global-notices" />
					<Gravatar readmeFilePath="gravatar" />
					<GravatarCaterpillar readmeFilePath="gravatar-caterpillar" />
					<Gridicon />
					<GSuiteExamples readmeFilePath="gsuite" />
					<HappinessEngineersTray readmeFilePath="happiness-engineers-tray" />
					<HeaderButton readmeFilePath="header-button" />
					<Headers readmeFilePath="header-cake" />
					<ImagePreloader readmeFilePath="image-preloader" />
					<InfoPopover readmeFilePath="info-popover" />
					<InlineSupportLink readmeFilePath="inline-support-link" />
					<InputChrono readmeFilePath="input-chrono" />
					<JetpackBundleCard readmeFilePath="jetpack-bundle-card" />
					<JetpackColophonExample readmeFilePath="jetpack-colophon" />
					<JetpackHeaderExample readmeFilePath="jetpack-header" />
					<JetpackLogoExample readmeFilePath="jetpack-logo" />
					<JetpackPlanCard readmeFilePath="jetpack-plan-card" />
					<JetpackProductCard readmeFilePath="jetpack-product-card" />
					<LanguagePicker readmeFilePath="language-picker" />
					<LineChart readmeFilePath="line-chart" />
					<ListEnd readmeFilePath="list-end" />
					<MarkedLinesExample readmeFilePath="marked-lines" />
					<MultipleChoiceQuestionExample readmeFilePath="multiple-choice-question" />
					<Notices readmeFilePath="notice" />
					<PaginationExample readmeFilePath="pagination" />
					<PaymentLogo readmeFilePath="payment-logo" />
					<PieChart readmeFilePath="pie-chart" />
					<PlansSkipButton readmeFilePath="plans/plans-skip-button" />
					<PodcastIndicator readmeFilePath="podcast-indicator" />
					<Popovers readmeFilePath="popover" />
					<ProductCard readmeFilePath="product-card" />
					<ProductExpiration readmeFilePath="product-expiration" />
					<ProductIcon readmeFilePath="/packages/components/src/product-icon" />
					<ProgressBar readmeFilePath="/packages/components/src/progress-bar" />
					<PromoCard readmeFilePath="promo-section/promo-card" />
					<PromoSection readmeFilePath="promo-section" />
					<Ranges readmeFilePath="forms/range" />
					<Rating readmeFilePath="rating" />
					<Ribbon readmeFilePath="/packages/components/src/ribbon" />
					<ScreenReaderTextExample readmeFilePath="/packages/components/src/screen-reader-text" />
					<SearchDemo readmeFilePath="search" />
					<SectionHeader readmeFilePath="section-header" />
					<SectionNav readmeFilePath="section-nav" />
					<SegmentedControl readmeFilePath="segmented-control" />
					<SelectDropdown searchKeywords="menu" readmeFilePath="select-dropdown" />
					<ShareButton readmeFilePath="share-button" />
					<SiteTitleControl readmeFilePath="site-title" />
					<SocialLogos />
					<Spinner searchKeywords="loading" readmeFilePath="spinner" />
					<SpinnerButton searchKeywords="loading input submit" readmeFilePath="spinner-button" />
					<SpinnerLine searchKeywords="loading" readmeFilePath="spinner-line" />
					<SplitButton readmeFilePath="split-button" />
					<Suggestions readmeFilePath="/packages/components/src/suggestions" />
					<SuggestionSearchExample />
					<SupportInfoExample />
					<TextareaAutosize readmeFilePath="textarea-autosize" />
					<TextDiff readmeFilePath="text-diff" />
					<TileGrid readmeFilePath="tile-grid" />
					<Timeline readmeFilePath="timeline" />
					<TimeSince readmeFilePath="time-since" />
					<Timezone readmeFilePath="timezone" />
					<TokenFields readmeFilePath="token-field" />
					<Tooltip readmeFilePath="tooltip" />
					<UserItem readmeFilePath="user" />
					<Version readmeFilePath="version" />
					<VerticalMenu readmeFilePath="vertical-menu" />
					<VerticalNav readmeFilePath="vertical-nav" />
					<Wizard readmeFilePath="wizard" />
					<WizardProgressBar readmeFilePath="wizard-progress-bar" />
					<WpcomColophon readmeFilePath="wpcom-colophon" />
				</Collection>
			</Main>
		);
	}
}
