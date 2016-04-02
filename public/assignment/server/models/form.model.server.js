module.exports = function(db, mongoose, Form) {
    // var FormSchema = require("./form.schema.server.js")(mongoose);
    // var Form = mongoose.model("Form", FormSchema);

    var api = {
        createForm: createForm,
        findAllForms: findAllForms,
        findFormsByUserId: findFormsByUserId,
        findFormById: findFormById,
        updateForm: updateForm,
        deleteFormById: deleteFormById,
        findFormByTitle: findFormByTitle,
    };
    return api;

    function findFormsByUserId(userId) {
        return Form.find({userId: userId});
    }

    function findAllForms() {
        return Form.find();
    }

    function findFormById(formId) {
        return Form.findById(formId);
    }

    function findFormByTitle(title) {
        return Form.findOne({title: title});
    }

    function createForm(form) {
        return Form.create(form);
    }

    function updateForm(formId, updates) {
        // scrub for _id updates, causes errors.
        delete updates._id;
        return Form
            .findByIdAndUpdate(
                mongoose.Types.ObjectId(formId),
                {$set: updates});
    }

    function deleteFormById(formId) {
        return Form.findByIdAndRemove(formId);
    };
};
