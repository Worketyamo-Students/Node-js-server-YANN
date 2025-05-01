import http from "http"
import { url } from "inspector";

// Fonction utilitaire pour envoyer une réponse
function sendResponse(res, statusCode, data, headers = {}) {
    res.writeHead(statusCode, { 'Content-Type': 'text/plain', ...headers });
    res.end(data);
}

const server = http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url, true); // true => query string parsée
    const pathname = parsedUrl.pathname;
    const method = req.method;

    // Exercice 1 – Affiche méthode et URL
    console.log(`Méthode: ${method}, URL: ${req.url}`);

    // Exercice 2 – Routage basique
    if (pathname === '/' && method === 'GET') {
        sendResponse(res, 200, 'Bienvenue sur la page d’accueil !');
    } else if (pathname === '/about' && method === 'GET') {
        sendResponse(res, 200, 'À propos de moi');
    }

    // Exercice 3 – Lecture de paramètres
    else if (pathname === '/search' && method === 'GET') {
        const query = parsedUrl.query.q || '';
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ query }));
    }

    // Exercice 4 – POST /echo avec JSON
    else if (pathname === '/echo' && method === 'POST') {
        let body = '';
        req.on('data', chunk => { body += chunk; });
        req.on('end', () => {
            try {
                const json = JSON.parse(body);
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify(json));
            } catch (err) {
                sendResponse(res, 400, 'Corps JSON invalide');
            }
        });
    }

    // Exercice 5 – En-têtes personnalisés
    else if (pathname === '/headers' && method === 'GET') {
        const headersToShow = {
            'user-agent': req.headers['user-agent'],
            'accept': req.headers['accept'],
        };
        res.writeHead(200, {
            'Content-Type': 'application/json',
            'X-Mon-EnTete': 'ValeurCustom'
        });
        res.end(JSON.stringify(headersToShow, null, 2));
    } else if (pathname === '/unauthorized') {
        sendResponse(res, 401, 'Erreur : accès non autorisé');
    }

    // 404 par défaut
    else {
        sendResponse(res, 404, 'Page non trouvée');
    }
});

server.listen(3000, () => {
    console.log('Serveur démarré sur http://localhost:3000');
});
