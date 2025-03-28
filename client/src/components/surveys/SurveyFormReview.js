// SurveyFormReview shows users their form inputs for review
import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import formFields from "./formFields";
import _ from "lodash"
import * as actions from "../../actions";

const SurveyFormReview = ({ onCancel, formValues, submitSurvey, history}) => {
    //显示所有字段及用户填写的值
    const reviewFields = _.map(formFields, ({name, label}) => {
        return (
            <div key={name}>
                <label>{label}</label>
                <div>
                    {formValues[name]}
                </div>
            </div>
        )
    });
    return (
        <div>
            <h5>Please confirm your entries</h5>
            {reviewFields}
            <button
                className="yellow darken-4 white-text btn-flat"
                onClick={onCancel}
            >
             Back 
            </button>
            <button
                onClick={() => submitSurvey(formValues, history)}
                className="green btn-flat right white-text"
            >
                Send Survey
                <i className="material-icons right">email</i>
            </button>
        </div>
    );
}

//提取 Redux 中表单的数据
function mapStateToProps(state) {
    return {
        formValues: state.form.surveyForm.values
    };
}

export default connect(mapStateToProps, actions)(withRouter(SurveyFormReview));