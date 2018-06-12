module.exports = (app) => {
    const packages = require('../controllers/package.controller.js');
    // Create a new package
    app.post('/api/paquetes', packages.create);
    // List all packages
    app.get('/api/paquetes', packages.findAll);
    // Get a single package by id
    app.get('/api/paquetes/:id', packages.findOne);
    // Update a package by id
    app.put('/api/paquetes/:id', packages.update);
    // Delete a package by id
    app.delete('/api/paquetes/:id', packages.delete);
};