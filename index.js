import os from "os"
import fs from "fs"
import server from "./server.js"

const readFile = () => {
    const index = fs.readFileSync('index.html', 'utf-8', (err) => {
        return data;
    });
    const home = fs.readFileSync('home.html', 'utf-8', (err) => {
        return data;
    });
    const contact = fs.readFileSync('contact.html', 'utf-8', (err) => {
        return data;
    });
    const about = fs.readFileSync('about.html', 'utf-8', (err) => {
        return data;
    });

    server(index, home, contact, about)
}

readFile()