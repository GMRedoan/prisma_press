import app from "./app";
import config from "./config";
import { prisma } from "./lib/prisma";
 
const PORT = config.port;

async function main () {
    try {
        await prisma.$connect();
        console.log("database connected");
        app.listen(PORT, ()=> {
            console.log(`server is running on port ${PORT}`);
        })
    } catch (error) {
        console.error("something went wrong", error);
        await prisma.$disconnect();
        process.exit(1);
    }
}

main();