import { SaveService } from './save.service';
import type { Req__with__user } from 'src/interfaces/getUser.interface';
import { SaveDto } from './dto/save.dto';
export declare class SaveController {
    private readonly saveService;
    constructor(saveService: SaveService);
    findAll(): Promise<{
        save: {
            id: string;
            createdAt: Date;
            userId: string;
            postId: string;
        }[];
    }>;
    findById(req: Req__with__user): Promise<{
        save: {
            id: string;
            createdAt: Date;
            userId: string;
            postId: string;
        }[];
    }>;
    create(dto: SaveDto, req: Req__with__user): Promise<{
        message: string;
        success?: undefined;
    } | {
        success: boolean;
        message?: undefined;
    }>;
}
