// This component will be used to show the form for the user to add a new survey.
import _ from "lodash";
import React, {Component} from "react";
import {reduxForm, Field} from "redux-form";
import {Link} from "react-router-dom";
import SurveyField from "./SurveyField";
import validateEmails from "../../utils/validateEmails";
import formFields from "./formFields";

class SurveyForm extends Component {
    renderFields() {
        return _.map(formFields, ({label, name}) => {
            return (
                <Field
                    key={name}
                    component={SurveyField}
                    type="text"
                    label={label}
                    name={name}/>
            );
        });
    }

    render() {
        return (
            <div>
                //
                <form onSubmit={this.props.handleSubmit(this.props.onSurveySubmit)}>
                    /**
                     表单提交时，调用 this.props.handleSubmit，这是 Redux Form 提供的机制，
                     会先做验证（validate），再交给 onSurveySubmit 函数处理。
                     */
                    {this.renderFields()}
                    <Link to="/surveys" className="red btn-flat white-text">
                        Cancel
                    </Link>
                    <button type="submit" className="teal btn-flat right white-text">
                        Next
                        <i className="material-icons right">done</i>
                    </button>
                </form>
            </div>
        );
    }
}

function validate(values) {
    const errors = {};

    _.each(formFields, ({name}) => {
        if (!values[name]) {
            errors[name] = `You must provide a value`;
        }
    });

    errors.recipients = validateEmails(values.recipients || '');

    return errors;
}

//使用 reduxForm 包装 SurveyForm 组件，这样 SurveyForm 就可以访问 Redux Store 了。
// validate：表单验证函数，返回错误对象。
// form：表单名称，可以有多个表单。
// destroyOnUnmount：是否在组件销毁时销毁表单数据。
export default reduxForm({
    validate,
    form: 'surveyForm',
    destroyOnUnmount: false
})(SurveyForm);