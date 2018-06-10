module.exports = (app) => {
    const registries = require('../controllers/registry.controller.js');
    // Create a new registry
    app.post('/paquetes/:idpackage/registros', registries.create);
    // List all registries
    app.get('/paquetes/:idpackage/registros', registries.findAll);
    // Get a single registry by id
    app.get('/paquetes/:idpackage/registros/:idregistry', registries.findOne);
    // Update a registry by id
    app.put('/paquetes/:idpackage/registros/:idregistry', registries.update);
    // Delete a registry by id
    app.delete('/paquetes/:idpackage/registros/:idregistry', registries.delete);
};