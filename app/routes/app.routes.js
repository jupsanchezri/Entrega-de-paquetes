module.exports = (app, path) => {
    app.get('/', (req, res) => {
        res.sendFile(path.join(__dirname + '/../templates/index.html'));
    });
    app.get('/formulario-paquete', (req, res) => {
        res.sendFile(path.join(__dirname + '/../templates/package-form.html'));
    });
    app.get('/formulario-registro', (req, res) => {
        res.sendFile(path.join(__dirname + '/../templates/registry-form.html'));
    });
};