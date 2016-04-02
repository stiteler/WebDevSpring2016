module.exports = function(app, FieldModel, FormModel) {
    app.get('/api/assignment/form/:formId/field', getFieldsByFormId);
    app.get('/api/assignment/form/:formId/field/:fieldId', getField);
    app.delete('/api/assignment/form/:formId/field/:fieldId', deleteField);
    app.post('/api/assignment/form/:formId/field', createField);
    app.put('/api/assignment/form/:formId/field/:fieldId', updateField);

    function getFieldsByFormId(req, res) {
        var fid = req.params.formId;
        FieldModel
            .getFieldsByFormId(fid)
            .then(function(fields) {
                res.json(fields);
            }, function(err) {
                console.log("error retrieving fields by form id: %j", fields);
                res.status(400).send("Error retrieving fields for this form.");
            });
    }

    function getField(req, res) {
        var formId = req.params.formId;
        var fieldId = req.params.fieldId;

        FieldModel.getField(formId, fieldId)
            .then(function(fields) {
                res.json(fields);
            }, function(err) {
                console.log("error getting field: %j", err);
                res.status(400).send("Unable to retrieve field");
            });
    }

    function createField(req, res) {
        var field = req.body;
        var formId = req.params.formId;
        FieldModel
            .addField(formId, field)
            .then(function(fields) {
                res.json(fields);
            }, function(err) {
                res.status(400).send("Unable to create new field");
            });
    }

    function deleteField(req, res) {
        var formId = req.params.formId;
        var fieldId = req.params.fieldId;
        FieldModel
            .deleteField(formId, fieldId)
            .then(function(fields) {
                res.json(fields);
            }, function(err) {
                res.status(400).send(err);
            });
    }

    function updateField(req, res) {
        var formId = req.params.formId;
        var fieldId = req.params.fieldId;
        var updates = req.body;

        FieldModel
            .updateField(formId, fieldId, updates)
            .then(function(fields) {
                res.json(fields);
            }, function(err) {
                console.log("Failed to update field");
                res.status(400).send("Unable to update field.");
            });
    }

};
