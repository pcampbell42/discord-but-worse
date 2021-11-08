import * as MembershipAPIUtil from "../util/api_calls/membership_api_util";


// ---------------------- Constants ----------------------

export const RECEIVE_MEMBERSHIP = "RECEIVE_MEMBERSHIP";
export const REMOVE_MEMBERSHIP = "REMOVE_MEMBERSHIP";
export const RECEIVE_MEMBERSHIP_ERROR = "RECEIVE_MEMBERSHIP_ERROR";
export const CLEAR_MEMBERSHIP_ERRORS = "CLEAR_MEMBERSHIP_ERRORS";


// ---------------------- Normal Actions ----------------------

const receiveMembership = membership => ({
    type: RECEIVE_MEMBERSHIP,
    membership
});

const removeMembership = membershipId => ({
    type: REMOVE_MEMBERSHIP,
    membershipId
});

export const receiveMembershipError = error => ({
    type: RECEIVE_MEMBERSHIP_ERROR,
    error
});

export const clearMembershipErrors = () => ({
    type: CLEAR_MEMBERSHIP_ERRORS
});


// ---------------------- Function Actions ----------------------

export const createMembership = membership => dispatch => MembershipAPIUtil.createMembership(membership)
    .then(membership => dispatch(receiveMembership(membership)),
        err => dispatch(receiveMembershipError(err.responseJSON)));

export const updateMembership = formMembership => dispatch => MembershipAPIUtil.updateMembership(formMembership)
    .then(membership => dispatch(receiveMembership(membership)));

export const deleteMembership = membershipId => dispatch => MembershipAPIUtil.deleteMembership(membershipId)
    .then(() => dispatch(removeMembership(membershipId)));
    