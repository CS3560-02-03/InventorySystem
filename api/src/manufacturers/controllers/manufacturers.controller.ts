import {
    Body,
    Controller,
    Get,
    HttpException,
    HttpStatus,
    Inject,
    Post,
} from '@nestjs/common';
import { ROUTES, SERVICES, BASIC_SERVICE_ACTIONS } from '../../utils/constants';
import { IManufacturerService } from '../interfaces/manufacturers';

@Controller(ROUTES.MANUFACTURER)
export class ManufacturerController {
    constructor(
        @Inject(SERVICES.MANUFACTURER) private readonly manufacturerService: IManufacturerService,
    ) {}
    
    @Post('create/dummies')
    async createDummyManufacturerData() {
        console.log('Received request to create dummy manufacturers');
        try {
            await this.manufacturerService.createDummyManufacturers();
            return { message: 'Dummy manufacturers created successfully' };
        } catch (error) {
            throw new HttpException(
                'Error creating dummy manufacturers',
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
    }
  
    @Get('all')
    async fetchAllManufacturers() {
        console.log('Received request to fetch all manufacturers');
        try {
            const manufacturers = await this.manufacturerService.fetchAllManufacturers();
            return manufacturers;
        } catch (error) {
            throw new HttpException(
                'Error fetching manufacturers',
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
    }   
}
