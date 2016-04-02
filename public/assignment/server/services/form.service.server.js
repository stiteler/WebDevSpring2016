module.exports = function(app, FormModel) {
    app.get('/api/assignment/user/:userId/form', getFormsForUser);
    app.get('/api/assignment/form/:formId', getFormById);
    app.put('/api/assignment/form/:formId', putForm);
    app.delete('/api/assignment/form/:formId', deleteForm);
    app.post('/api/assignment/user/:userId/form', createForm);

    var FormModel = FormModel;

    function getFormsForUser(req, res) {
        var uid = req.params.userId;
        FormModel
            .findFormsByUserId(uid)
            .then(function(forms) {
                res.json(forms);
            }, function(err) {
                console.log("unable to find all forms");
                res.status(400).send("Unable to find forms for user.")
            });
    }

    function getFormById(req, res) {
        var fid = req.params.formId;
        FormModel
            .findFormById(fid)
            .then(function(form) {
                res.json(form);
            }, function(err) {
                console.log("error fetching form by id %j", err);
                res.json(400).send("Unable to find form with that id.");
            });
    }

    function putForm(req, res) {
        var fid = req.params.formId;
        var updates = req.body;
        // updates._id = fid;
        FormModel
            .updateForm(fid, updates)
            .then(function(success) {
                res.status(200).json(success);
            }, function(err) {
                console.log("Error updating form: %j", err);
                res.status(200).send("Unable to update this form.");
            });
    }

    function deleteForm(req, res) {
        var fid = req.params.formId;
        FormModel
            .deleteFormById(fid)
            .then(function(good) {
                res.send(200);
            }, function(err) {
                console.log("Unable to delete the form: %j", err);
                res.status(400).send("Unable to delete form.");
            });
    }

    function createForm(req, res) {
        var newForm = req.body;
        var uid = req.params.userId;
        newForm.userId = uid;
        FormModel
            .createForm(newForm)
            .then(function(form) {
                res.json(form);
            }, function (err) {
                console.log('error in form creation');
                console.log("%j", err);
                res.status(400).send("Unable to create form");
            });
    }
};
