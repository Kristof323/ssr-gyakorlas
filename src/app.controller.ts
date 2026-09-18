import { Controller, Get, Query, Render } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Render('index')
  getHello() {
    return { message: this.appService.getHello() };
  }

  @Get('red-blue')
  @Render('red-blue')
  getRedBlue() {
    return { backgroundColor: Math.random() < 0.5 ? 'blue' : 'red' };
  }

  @Get('color-picker')
  @Render('color-picker')
  getColorPicker(@Query('color') color?: string) {
    const selectedColor = /^#[0-9a-fA-F]{6}$/.test(color ?? '') ? color : '#000000';
    return { selectedColor };
  }

  @Get('quadratic')
  @Render('quadratic')
  getQuadratic(
    @Query('a') aValue?: string,
    @Query('b') bValue?: string,
    @Query('c') cValue?: string,
  ) {
    const a = Number(aValue);
    const b = Number(bValue);
    const c = Number(cValue);
    const submitted = [aValue, bValue, cValue].every(
      (value) => value !== undefined && value.trim() !== '',
    );

    return {
      a: aValue ?? '',
      b: bValue ?? '',
      c: cValue ?? '',
      result: submitted ? this.appService.solveQuadratic(a, b, c) : null,
    };
  }

  @Get('searchCrime')
  @Render('search-crime')
  searchCrime(@Query('q') query?: string) {
    const crimes = this.appService.searchCrimes(query ?? '');
    return { query: query ?? '', crimes };
  }
}
