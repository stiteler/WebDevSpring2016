var q = require('q');
module.exports = function(db, mongoose, FormModel, Form, Field) {

    var api = {
        getFieldsByFormId: getFieldsByFormId,
        getField: getField,
        addField: addField,
        deleteField: deleteField,
        updateField: updateField,
    };
    return api;

    function addField(formId, field) {
        var deferred = q.defer()
        var newField = new Field(field);

        Form.findById(formId)
            .then(function(form) {
                form.fields.push(newField);
                form.save();
                deferred.resolve(form.fields);
            }, function(err) {
                console.log("Unable to add new field");
                deferred.reject(err);
            });

        return deferred.promise;
    }

    function getFieldsByFormId(formId) {
        return Form.findById(formId)
            .then(function(form) {
                return form.fields;
            });
    }

    function deleteField(formId, fieldId) {
        var deferred = q.defer();
        
        Form
            .findById(mongoose.Types.ObjectId(formId))
            .then(function(form) {
                form.fields.pull({_id: fieldId});
                form.save();
                deferred.resolve(form.fields);
            }, function(err) {
                console.log("Couldn't delete field: %j", err);
                deferred.reject();
            });

        return deferred.promise;

    }

    function updateField(formId, fieldId, updates) {
        // not sure if this selects a form or a field.. in test.
        var deferred = q.defer();
        // scrub for _id updates, causes errors.
        delete updates._id;

        Form.findById(formId, function(err, found) {
            if(!err) {
                var field = found.fields.id(fieldId);

                // mongoose doesn't support .update() on subdocuments.
                for (var key in updates) {
                    if (updates.hasOwnProperty(key)) {
                        field[key] = updates[key];
                    }
                }
                found.save()

                deferred.resolve(found.fields);
            } else {
                deferred.reject(err);
            }
        });

        return deferred.promise;
    }

    function getField(formId, fieldId) {
        var deferred = q.defer();

        var form = Form.findById(formId, function(err, found) {
            if(!err) {
                var field = found.fields.id(fieldId);
                deferred.resolve(field);
            } else {
                deferred.reject(err);
            }
        });

        return deferred.promise;
    }
};
