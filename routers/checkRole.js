export default function checkRole(allowedRoles = []) {
    return function (req, res, next) {
        const cookies = req.cookies;
        let userData;

        try {
            userData = JSON.parse(cookies.hamburger || '{}');
        } catch {
            return res.status(404).render('404');
        }

        const role = userData.tipeuser?.toLowerCase();
        const allowed = allowedRoles.map(r => r.toLowerCase());

        if (!allowed.includes(role)) {
            return res.status(404).render('404');
        }

        req.user = userData;
        next();
    };
}
