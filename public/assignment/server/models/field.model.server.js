module.exports = function(db, mongoose, FormModel, Form, Field) {
    // var FormSchema = require("./form.schema.server.js")(mongoose);
    // var Form = mongoose.model("Form", FormSchema);
    // var FieldSchema = require("./field.schema.server.js")(mongoose);
    // var Field = mongoose.model("Field", FieldSchema);

    var api = {
        getFieldsByFormId: getFieldsByFormId,
        getField: getField,
        addField: addField,
        deleteField: deleteField,
        updateField: updateField,
    };
    return api;

    function addField(formId, field) {
        var newField = new Field(field);
        Form.findById(formId)
            .then(function(err, form) {
                form.fields.push(newField);
                form.save();
            });
    }

    function getFieldsByFormId(formId) {
        Form.findById(formId)
            .then(function(err, form) {
                return form.fields;
            });
    }

    function deleteField(formId, fieldId) {
        Form.findById(formId, function(err, found) {
            found.fields.pull({_id: fieldId});
        });
    }

    function updateField(formId, fieldId, updates) {
        // not sure if this selects a form or a field.. in test.
        Form
            .find({_id: formId, 'fields._id': fieldId})
            .then(function(err, field) {
                console.log("inside update field");
                console.log(field);
                field.update(updates);
            });
    }

    function getField(formId, fieldId) {
        Form
            .find({_id: formId, 'fields._id': fieldId})
            .then(function(err, field) {
                console.log("inside getField");
                console.log(field);
                console.log("not returning, in test.")
            });
    }
};
