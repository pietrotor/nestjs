import { Injectable, NotFoundException } from '@nestjs/common';
import { Car } from './interfaces/car.interface';
import { v4 as uuid } from 'uuid';
import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car-dto';

@Injectable()
export class CarsService {
  private cars: Car[] = [
    {
      id: uuid(),
      brand: 'Toyota',
      model: 'Corolla',
    },
    {
      id: uuid(),
      brand: 'Honda',
      model: 'Civic',
    },
    {
      id: uuid(),
      brand: 'Jeep',
      model: 'Renegade',
    },
  ];

  public findAll() {
    return this.cars;
  }

  public findById(id: string) {
    const selectedCar = this.cars.find(({ id: carId }) => carId === id);
    if (!selectedCar) {
      throw new NotFoundException(`Car with id: '${id}' not found`);
    }
    return selectedCar;
  }

  public create(createCarDto: CreateCarDto) {
    const newCar: Car = {
      id: uuid(),
      ...createCarDto,
    };

    this.cars.push(newCar);

    return newCar;
  }

  public update(id: string, updateCarDto: UpdateCarDto) {
    this.findById(id);

    let cardInstance = this.findById(id);

    this.cars = this.cars.map((car) => {
      if (car.id === id) {
        cardInstance = {
          ...cardInstance,
          ...updateCarDto,
          id,
        };

        return cardInstance;
      }
      return car;
    });

    return cardInstance;
  }

  public delete(id: string) {
    const carInstance = this.findById(id);
    this.cars = this.cars.filter(({ id: carId }) => carId !== id);

    return carInstance;
  }

  public fillCarsWithSeedData(cars: Car[]) {
    this.cars = cars;

    return this.cars;
  }
}
