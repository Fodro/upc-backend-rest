import { Injectable } from '@nestjs/common';
import { nanoid } from 'nanoid';
import { Link } from 'src/models/link.model';
import { PostResponse, ViewsCountResponse } from 'src/types';

@Injectable()
export class AppService {
	async shorten(url: string): Promise<PostResponse> {
		url = url.includes("http://") || url.includes("https://") ? url : "http://" + url;
		const shortId = nanoid(8);
		const shortLink =  process.env.HOST_NAME + shortId;
		const linkRecord = new Link(url, shortId)
		await linkRecord.save();
		return {
			status: "Created",
			shortenedUrl: shortLink,
		};
	}

	async getUrl(url: string): Promise<string> {
		const link = await Link.findOneOrFail({ shortenId: url});
		link.viewCount += 1;
		await link.save();
		return link.source;
  	}

	async getViewCount(url: string): Promise<ViewsCountResponse>{
		const link = await Link.findOneOrFail({ shortenId: url });
		return {
			viewCount: link.viewCount,
		};
	}
}
