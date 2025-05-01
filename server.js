// import { log } from "console";
import http from "http"

// const port = 3000

// function server(index,home,contact,about) {
//     const serv = http.createServer((req, res) => {
//         if (req.url === "/") res.end(index);
//         if (req.url === "/home") res.end(home);
//         if (req.url === "/contact") res.end(contact);
//         if (req.url === "/about") res.end(about);
//     });
//     serv.listen(port, (err) => {
//         if (err) throw err
//         console.log(`le serveur tourne sur le lien http://localhost:${port}`);
//     });
// }

// export default server;

import { parse } from "url";

const port = 3000;

function server() {
    const serv = http.createServer((req, res) => {
        const parsedUrl = parse(req.url, true);
        const path = parsedUrl.pathname;
        const method = req.method;

        // Exercice 1
        console.log(`${method} ${req.url}`);

        // Exercice 2
        if (path === "/" && method === "GET") {
            res.writeHead(200, { "Content-Type": "text/plain" });
            return res.end("Hello World!");
        }

        if (path === "/about" && method === "GET") {
            res.writeHead(200, { "Content-Type": "text/plain" });
            return res.end("À propos de moi");
        }

        // Exercice 3
        if (path === "/search" && method === "GET") {
            const query = parsedUrl.query.q || "";
            res.writeHead(200, { "Content-Type": "application/json" });
            return res.end(JSON.stringify({ query }));
        }

        // Exercice 4
        if (path === "/echo" && method === "POST") {
            let body = '';
            req.on("data", chunk => {
                body += chunk.toString();
            });
            req.on("end", () => {
                try {
                    const data = JSON.parse(body);
                    res.writeHead(200, { "Content-Type": "application/json" });
                    res.end(JSON.stringify(data));
                } catch (err) {
                    res.writeHead(400, { "Content-Type": "text/plain" });
                    res.end("Invalid JSON");
                }
            });
            return;
        }

        // Exercice 5
        if (path === "/headers" && method === "GET") {
            const headersInfo = {
                "user-agent": req.headers["user-agent"]
            };
            res.writeHead(200, {
                "Content-Type": "application/json",
                "X-Mon-EnTete": "ValeurCustom"
            });
            return res.end(JSON.stringify(headersInfo));
        }

        if (path === "/unauthorized" && method === "GET") {
            res.writeHead(401, { "Content-Type": "text/plain" });
            return res.end("Unauthorized");
        }

        res.writeHead(404, { "Content-Type": "text/plain" });
        res.end("Page non trouvée");
    });

    serv.listen(port, () => {
        console.log(`Server running at http://localhost:${port}/`);
    });
}

export default server;
