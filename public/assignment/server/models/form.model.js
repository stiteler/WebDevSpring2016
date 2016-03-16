module.exports = function(app) {
    var api = {
        createForm: createForm,
        findAllForms: findAllForms,
        findFormById: findFormById,
        updateForm: updateForm,
        deleteFormById: deleteFormById,
        findFormByTitle: findFormByTitle,
        findFormByUserId: findFormByUserId,
    }
    return api;

    var forms = findAllForms();

    function findAllForms() {
        if (forms) {
            return forms;
        }
        var fs = require('fs');
        return JSON.parse(fs.readFileSync('./public/assignment/server/models/form.mock.json', 'utf8'));
    }

    function findFormByUserId(userId) {
        return _findFormByKey('userId', userId);
    }

    function findFormById(formId) {
        return _findFormByKey('_id', formId);
    }

    function findFormByTitle(title) {
        return _findFormByKey('title', title);
    }

    function createForm(form) {
        form._id = (new Date()),getTime();
        forms.push(form);
        return forms;
    }

    function updateForm(updates) {
        var existing = findFormById(updates._id);
        if (existing) {
            for (var key in updates) {
                if (updates[key]) {
                    var u = updates[i];
                    existing[attr] = u;
                }
            }
            return existing;
        }
        return null;
    }

    function deleteFormById(formId) {
        var forms = findAllForms();
        var form = findFormById();
        if (form) {
            var index = forms.indexOf(form);
            forms.splice(index, 1);
        }
    }

    function _findFormByKey(key, value) {
        var forms = findAllForms();
        for(var i in forms) {
            if (forms[i]) {
                var u = forms[i];
                if (u[key] == value) {
                    return u;
                }
            }
        }
        return null;
    }
}
