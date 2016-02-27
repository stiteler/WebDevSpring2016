(function () {
    'use strict';

    angular
        .module('FormBuilderApp')
        .factory('FormService', FormService);

    function FormService() {
        var forms = _getForms();

        var api = {
            createFormForUser: createFormForUser,
            findAllFormsForUser: findAllFormsForUser,
            deleteFormById: deleteFormById,
            updateFormById: updateFormById,
        };
        return api;

        function createFormForUser(userId, form, callback) {
            form._id = (new Date()).getTime();
            form.userId = userId;
            forms.push(form);
            callback(_copyForm(form));
        }

        function findAllFormsForUser(userId, callback) {
            var result = _searchForms('userId', userId);
            callback(result);
        }

        function deleteFormById(formId, callback) {
            var matches = _searchForms('_id', formId);
            if (matches.length > 0) {
                // a form was found with that id.
                var match = matches[0];
                var index = forms.indexOf(match);
                forms.splice(index, 1);
            }
            // this is a vuln. if alice can get bob's forms.
            callback(forms);
        }

        function updateFormById(formId, newForm, callback) {
            var matches = _searchForms('_id', formId);
            if (matches.length > 0) {
                var match = matches[0];
                // for each update in newForm
                // apply to match
                for (var attr in newForm) {
                    if (newForm[attr]) {
                        match[attr] = newForm[attr];
                    }
                }
                callback(_copyForm(match));
            } else {
                callback(null);
            }
        }

        function _copyForm(form) {
            var copy = {
                _id: form._id,
                title: form.title,
                userId: form.userId,
            };
            return copy;
        }

        function _searchForms(attr, value) {
            // returns forms where the given attr
            // ie. userId or _id match value.
            var rtn = [];
            for (var ind in forms) {
                if (forms[ind]) {
                    var form = forms[ind];
                    if (form[attr] === value) {
                        rtn.push(form);
                    }
                }
            }
            return rtn;
        }

        function _getForms() {
            return [
              {_id: '000', title: 'Contacts', userId: 123},
              {_id: '010', title: 'ToDo',     userId: 123},
              {_id: '020', title: 'CDs',      userId: 234},
            ];
        }
    }
}());
