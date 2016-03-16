module.exports = function(app, FormModel, uuid) {
    app.get('/api/assignment/form/:formId/field', getFieldsByFormId);
    app.get('/api/assignment/form/:formId/field/:fieldId', getField);
    app.delete('/api/assignment/form/:formId/field/:fieldId', deleteField);
    app.post('/api/assignment/form/:formId/field', createField);
    app.put('/api/assignment/form/:formId/field/:fieldId', updateField);

    var fm = FormModel;

    function getFieldsByFormId(req, res) {
        var fid = req.params.formId;
        var form = fm.findFormById(fid);
        if(form) {
            res.json(form.fields);
        } else {
            res.json([]);
        }
    }

    function getField(req, res) {
        var formId = req.params.formId;
        var fieldId = req.params.fieldId;

        res.json(fm.getField(formId, fieldId));
    }

    function createField(req, res) {
        var field = req.body;
        field._id = uuid.v4();
        var formId = req.params.formId;
        fm.addField(formId, field);
        res.send(200);
    }

    function deleteField(req, res) {
        var formId = req.params.formId;
        var fieldId = req.params.fieldId;
        if(fm.deleteField(formId, fieldId)) {
            res.send(200);
        } else {
            res.send(400);
        }
    }

    function updateField(req, res) {
        var formId = req.params.formId;
        var fieldId = req.params.fieldId;
        var updates = req.body;

        var updated = fm.updateField(formId, fieldId, updates);
        res.json(updated);
    }

}
