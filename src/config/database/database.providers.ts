import * as mongoose from 'mongoose';

export const databaseProviders = [
    {
        provide: 'localhost:27017',
        useFactory: (): Promise<typeof mongoose> =>
            mongoose.connect('mongodb://localhost/nest'),
    },
];