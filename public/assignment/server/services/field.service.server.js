module.exports = function(app, FormModel) {
    app.get('/api/assignment/user/:userId/form', getFormsForUser);
    app.get('/api/assignment/form/:formId', getFormById);
    app.put('/api/assignment/form/:formId', putForm);
    app.delete('/api/assignment/form/:formId', deleteForm);
    app.post('/api/assignment/user/:userId/form', createForm);

    var fm = FormModel;

    function getFormsForUser(req, res) {
        var uid = req.params.userId;
        res.json(fm.findFormByUserId(uid));
    }

    function getFormById(res, res) {
        var fid = req.params.formId;
        res.json(fm.findFormById(fid));
    }

    function putForm(req, res) {
        var fid = req.params.formId;
        var updates = req.body;
        updates._id = fid;
        res.json(fm.updateForm(updates));
    }

    function deleteForm(req, res) {
        var fid = req.params.formId;
        res.json(fm.deleteFormById(fid));
    }

    function createForm() {
        var newForm = req.body;
        var uid = req.params.userId;
        newForm.userId = uid;
        res.json(fm.createForm(newForm));
    }
}
