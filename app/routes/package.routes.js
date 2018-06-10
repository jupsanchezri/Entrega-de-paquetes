module.exports = (app) => {
    const packages = require('../controllers/package.controller.js');
    // Create a new package
    app.post('/paquetes', packages.create);
    // List all packages
    app.get('/paquetes', packages.findAll);
    // Get a single package by id
    app.get('/paquetes/:id', packages.findOne);
    // Update a package by id
    app.put('/paquetes/:id', packages.update);
    // Delete a package by id
    app.delete('/paquetes/:id', packages.delete);
};