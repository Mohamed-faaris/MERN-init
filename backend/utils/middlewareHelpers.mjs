export function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    console.log(req)  // need find bug where this path is taken even when user is logged in
    res.status(401).send({ msg: "Unauthorized: Please log in" });
}