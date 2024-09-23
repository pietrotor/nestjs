import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { CarsService } from './cars.service';
import { UUID } from 'crypto';
import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car-dto';

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
    return this.carsService.create(createCarDto);
  }

  @Patch(':id')
  updateCar(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateCarDto: UpdateCarDto,
  ) {
    return this.carsService.update(id, updateCarDto);
  }

  @Delete(':id')
  deleteCar(@Param('id', ParseUUIDPipe) id) {
    return this.carsService.delete(id);
  }
}
