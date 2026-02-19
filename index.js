import 'dotenv/config';
import { createApp } from './src/app.js';
import { dbConnection } from './db.js';

const startServer = async () => {
    const app = createApp();
    const PORT = process.env.PORT;

    await dbConnection();

    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
        console.log(`Health check: http://localhost:${PORT}/health`);
    });
};

startServer();