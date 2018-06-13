const Registry = require('../models/registry.model.js');
const Package = require('../models/package.model.js');
// Create and save a new Registry
exports.create = (req, res) => {
    // Validate if the request's body is empty
    // (does not include required data)
    if (Object.keys(req.body).length === 0) {
        return res.status(400).send({
            message: "Registry data can not be empty"
        });
    }
    // Create a new Registry with request's data
    const registry = new Registry({
        location: {
            type: "Point",
            coordinates: [req.body.longitude, req.body.latitude]
        },
        isClosed: req.body.isCLosed | false,
        desciption: req.body.description,
        state: req.body.state
    });
    // Save the Registry in the database
    registry.save()
        .then(data => {
            Package.findByIdAndUpdate(req.params.packageid, { $push: { notifications: data._id }}, { new: true })
            res.status(200).send(data);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Something wrong occurred while creating the record."
            });
        });
};

// Retrieve and list all Registries
exports.findAll = (req, res) => {
    Registry.find()
        .sort({date: 'descending'})
        .then(registry => {
            res.status(200).send(registry);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Something wrong occurred while retrieving the records."
            });
        });
};

// Get a single Registry by its id
exports.findOne = (req, res) => {
    Registry.findById(req.params.id)
        .then(registry => {
            if (!registry) {
                return res.status(404).send({
                    message: "Registry not found with id:" + req.params.id
                });
            }
            res.status(200).send(registry);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Registry not found with id:" + req.params.id
                });
            }
            return res.status(500).send({
                message: "Something wrong ocurred while retrieving the record with id:"
                    + req.params.id
            });
        });
};

// Retrieve and list all Registries by Package
exports.findAllByPackage = (req, res) => {
    Registry.find({packageID: req.params.packageid})
        .sort({date: 'descending'})
        .then(registry => {
            res.status(200).send(registry);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Something wrong occurred while retrieving the records."
            });
        });
};