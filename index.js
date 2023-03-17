import Hapi from "@hapi/hapi";
import routes from "./route.js";

const init = async () => {
    const server = Hapi.server({
        port: 9000,
        host: "localhost",
        routes: {
            cors: {
                origin: ["*"],
            },
        },
    });

    // use route
    server.route(routes);

    await server.start();
    console.log(
        `Server is running on ${server.info.host} with port ${server.info.port}`
    );
};

init();
