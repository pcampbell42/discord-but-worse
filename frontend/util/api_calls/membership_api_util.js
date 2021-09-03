
export const createMembership = membership => (
    $.ajax({
        method: "POST",
        url: "/api/memberships",
        data: { membership }
    })
);

export const deleteMembership = membershipId => (
    $.ajax({
        method: "DELETE",
        url: `/api/memberships/${membershipId}`
    })
);
