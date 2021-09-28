import { Controller, Get, HttpException, HttpStatus, Param, Post, Redirect, Req } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('/shorten')
  async shorten(@Req() req){
		// try {
			return await this.appService.shorten(req.body["urlToShorten"])
		// }
		// catch(err){
		// 	throw new HttpException("Bad Request", HttpStatus.BAD_REQUEST)
		// }
  }
  @Get('/:url')
  @Redirect(process.env.HOST_NAME, 301)
  async getURL(@Param('url') url) {
		try {			
			return { url: await this.appService.getUrl(url) };
		}  
		catch (err) {
			throw new HttpException("Not Found", HttpStatus.NOT_FOUND)
		}
}	
  @Get('/:url/views')
  async getViewCount(@Param('url') url) {
		try {
			return await this.appService.getViewCount(url);
		}
		catch (err) {
			throw new HttpException("Not Found", HttpStatus.NOT_FOUND)
		}
	}	
}
