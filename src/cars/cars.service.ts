import { Injectable, NotFoundException } from '@nestjs/common';
import { Car } from './interfaces/car.interface';
import { v4 as uuid } from 'uuid';

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
}
