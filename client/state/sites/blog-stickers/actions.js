/**
 * Internal dependencies
 */

import {
	SITES_BLOG_STICKER_ADD,
	SITES_BLOG_STICKER_REMOVE,
	SITES_BLOG_STICKER_LIST,
	SITES_BLOG_STICKER_LIST_RECEIVE,
} from 'wp-calypso-client/state/action-types';

import 'wp-calypso-client/state/data-layer/wpcom/sites/blog-stickers';
import 'wp-calypso-client/state/data-layer/wpcom/sites/blog-stickers/add';
import 'wp-calypso-client/state/data-layer/wpcom/sites/blog-stickers/remove';

export function addBlogSticker( blogId, stickerName ) {
	return {
		type: SITES_BLOG_STICKER_ADD,
		payload: {
			blogId,
			stickerName,
		},
	};
}

export function removeBlogSticker( blogId, stickerName ) {
	return {
		type: SITES_BLOG_STICKER_REMOVE,
		payload: {
			blogId,
			stickerName,
		},
	};
}

export function listBlogStickers( blogId ) {
	return {
		type: SITES_BLOG_STICKER_LIST,
		payload: {
			blogId,
		},
	};
}

export function receiveBlogStickers( blogId, stickers ) {
	return {
		type: SITES_BLOG_STICKER_LIST_RECEIVE,
		payload: { blogId, stickers },
	};
}
