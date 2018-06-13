const Package = require('../models/package.model.js');
// Create and save a new Package
exports.create = (req, res) => {
    // (does not include required data)
    if (Object.keys(req.body).length === 0 || Object.keys(req.files).length === 0) {
        return res.status(400).send({
            message: (Object.keys(req.body).length === 0 ? "Package data can not be empty " : "")
                + (Object.keys(req.files).length === 0 ? "Package image can not be empty" : "")
        });
    }
    // Create a new Package with request's data
    const package = new Package({
        fromPersonName: req.body.fromPersonName,
        toPersonName: req.body.toPersonName,
        phone: req.body.phone,
        toAddress: req.body.toAddress,
        packageImage: {
            data: req.files.packageImage.data,
            contentType: req.files.packageImage.mimetype
        },
        weight: req.body.weight,
        dimention: req.body.dimencion
    });
    // Save the Package in the database
    package.save()
        .then(data => {
            res.status(200).send(data);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Something wrong occurred while creating the record."
            });
        });
};
// Retrieve and list all Packages
exports.findAll = (req, res) => {
    let query = Object();
    if(req.body.longitude && req.body.latitude) {
        query = {
            location: {
                $near: {
                    $geometry: { type: "Point", coordinates: [req.body.longitude, req.body.latitude] }
                }
            }
        };
    }

    Package.find(query)
        .then(packages => {
            res.status(200).send(packages);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Something wrong occurred while retrieving the records."
            });
        });
};
// Get a single Package by its id
exports.findOne = (req, res) => {
    Package.findById(req.params.id)
        .then(packages => {
            if (!packages) {
                return res.status(404).send({
                    message: "Packages not found with id:" + req.params.id
                });
            }
            res.status(200).send(packages);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Packages not found with id:" + req.params.id
                });
            }
            return res.status(500).send({
                message: "Something wrong ocurred while retrieving the record with id:"
                    + req.params.id
            });
        });
};
// Update a Package by its id
exports.update = (req, res) => {
    // (does not include required data)
    if (Object.keys(req.body).length === 0 && Object.keys(req.files).length === 0) {
        return res.status(400).send({
            message: (Object.keys(req.body).length === 0 ? "Package data can not be empty " : "")
            + (Object.keys(req.files).length === 0 ? "Package image can not be empty" : "")
        });
    }

    // Update info if the data is received
    const packageToUpdate = {};
    if(req.body.fromPersonName) packageToUpdate.fromPersonName = req.body.fromPersonName;
    if(req.body.toPersonName) packageToUpdate.toPersonName = req.body.toPersonName;
    if(req.body.phone) packageToUpdate.phone = req.body.phone;
    if(req.body.toAddress) packageToUpdate.toAddress = req.body.toAddress;
    if(req.body.weight) packageToUpdate.weight = req.body.weight;
    if(req.body.dimention) packageToUpdate.dimention = req.body.dimention;
    if(req.body.packageImage) {
        packageToUpdate.packageImage = {
            data: req.files.packageImage.data,
            contentType: req.files.packageImage.mimetype
        };
    }

    // Find the Package and update it with the request body data
    Package.findByIdAndUpdate(req.params.id, packageToUpdate, { new: true })
        .then(package => {
            if (!package) {
                return res.status(404).send({
                    message: "Package not found with id:" + req.params.id
                });
            }
            res.status(200).send(package);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Package not found with id:" + req.params.id
                });
            }
            return res.status(500).send({
                message: "Something wrong ocurred while updating the record with id:" +
                    req.params.id
            });
        });
};
// Delete a Package by its id
exports.delete = (req, res) => {
    Package.findByIdAndRemove(req.params.id)
        .then(package => {
            if (!package) {
                return res.status(404).send({
                    message: "Packages not found with id:" + req.params.id
                });
            }
            res.status(200).send({ message: "Packages deleted successfully!" });
        }).catch(err => {
            if (err.kind === 'ObjectId' || err.name === 'NotFound') {
                return res.status(404).send({
                    message: "Packages not found with id:" + req.params.id
                });
            }
            return res.status(500).send({
                message: "Something wrong ocurred while deleting the record with id:" +
                    req.params.id
            });
        });
};
