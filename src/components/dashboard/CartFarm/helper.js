export function extractUserDetails(user) {
    return {
        displayName: user.displayName,
        email: user.email,
        uid: user.uid
    }
}