import { Controller, Get, Query, Render } from '@nestjs/common';
import { AppService } from './app.service.js';
import fs from 'node:fs';
import { Criminal } from './Criminal.js';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Render('index')
  getHello() {
    return {
      title: 'My First NestJS App'
    }
  }

 @Get('Piros-Kek')
 @Render('red-blue')
 GetRedBlue() {
      const random = Math.random();
      const bgColor = random < 0.5 ? 'red' : 'blue';
    return {
      bgColor
    }
 }

 @Get('wanted')
 @Render('wanted')
getWanted() {
  const criminal = JSON.parse(
    fs.readFileSync('wanted.json',{encoding: 'utf-8'})
  )
    return { criminal }
  }

  @Get('searchCrime')
  searchCrime(@Query('keresett') keresett: string)
  {
    const criminal = JSON.parse(
      fs.readFileSync('wanted.json',{encoding: 'utf-8'})
    ) as Criminal;
    
    return {
      talalatok: criminal.crimes
      .filter(crime => crime.toLowerCase().includes(keresett.toLowerCase()))
    }
  } 
}
