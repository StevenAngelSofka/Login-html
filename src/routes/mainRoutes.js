import express from 'express';
const router = express.Router();

router.get('/', (req, res) => {
    res.render('login/login');
});

router.get('/register', (req, res) => {
    res.render('register/register');
});

router.get('/dashboard', (req, res) => {
    const user = req.query.user ? JSON.parse(req.query.user) : null;

    res.render('dashboard/dashboard', { user });
});

export default router;