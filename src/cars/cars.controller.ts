import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  ParseUUIDPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { CarsService } from './cars.service';
import { UUID } from 'crypto';
import { CreateCarDto } from './dto/create-car.dto';

// @UsePipes(ValidationPipe) //Controller validation
@Controller('cars')
export class CarsController {
  constructor(private readonly carsService: CarsService) {}

  @Get()
  getAllCars() {
    return this.carsService.findAll();
  }

  @Get(':id')
  getCarById(
    @Param('id', new ParseUUIDPipe({ version: '4' }))
    id: UUID,
  ) {
    return this.carsService.findById(id);
  }

  @Post()
  // @UsePipes(ValidationPipe) //Local validation
  createCart(@Body() createCarDto: CreateCarDto) {
    console.log(
      '🚀 ~ CarsController ~ createCart ~ createCarDto:',
      createCarDto,
    );
    return {
      method: 'POST',
      message: 'Ok',
    };
  }

  @Patch(':id')
  updateCar(@Body() body: any) {
    console.log('🚀 ~ CarsController ~ createCart ~ body:', body);
    return {
      method: 'Patch',
      message: 'Ok',
    };
  }

  @Delete(':id')
  deleteCar(@Param('id', ParseIntPipe) id) {
    console.log('🚀 ~ CarsController ~ createCart ~ body:', id);
    return {
      method: 'Delete',
      message: 'Ok',
    };
  }
}
