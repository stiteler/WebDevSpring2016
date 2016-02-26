(function(){
    angular
        .module("FormBuilderApp")
        .factory("FormService", FormService);

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
            form._id = (new Date).getTime();
            form.userId = userId;
            forms.push(form);
            callback(form);
        }

        function findAllFormsForUser(userId, callback) {
            result = _searchForms('userId', userId);
            callback(result);
        }

        function deleteFormById(formId, callback) {
            matches = _searchForms('_id', formId);
            if (matches.length > 0) {
                // a form was found with that id.
                match = matches[0];
                index = forms.indexOf(match);
                forms.splice(index, 1);
            }
            callback(forms);
        }

        function updateFormById(formId, newForm, callback) {
            matches = _searchForms('_id', formId);
            if (matches.length > 0) {
                match = matches[0];
                // for each update in newForm
                // apply to match
                for (attr in newForm) {
                    match[attr] = newForm[attr];
                }
                callback(match);
            } else {
                callback(null);
            }
        }

        function _searchForms(attr, value) {
            // returns forms where the given attr
            // ie. userId or _id match value.
            rtn = [];
            for(ind in forms) {
                form = forms[ind];
                if(form[attr] === value ) {
                    rtn.push(form);
                };
            };
            return rtn;
        }

        function _getForms() {
            return [
              {_id: "000", title: "Contacts", userId: 123},
              {_id: "010", title: "ToDo",     userId: 123},
              {_id: "020", title: "CDs",      userId: 234},
            ];
        }
    }
}());