const User  = require('../models/User');
const bcrypt = require('bcryptjs');

module.exports = {
  checkAuthenticated: (req, res, next) => {
    if (req.session.userid) {
      return next();
    }
    req.flash('message', 'Por favor, faça login para acessar esta página');
    res.redirect('/login');
  },

  checkNotAuthenticated: (req, res, next) => {
    if (!req.session.userid) {
      return next();
    }
    res.redirect('/dashboard');
  },

  validateLogin: async (req, res, next) => {
    const { email, password } = req.body;
    
    if (!email || !password) {
      req.flash('message', 'Por favor, preencha todos os campos');
      return res.redirect('/login');
    }

    try {
      const user = await User.findOne({ where: { email } });
      
      if (!user) {
        req.flash('message', 'Usuário não encontrado');
        return res.redirect('/login');
      }

      if (!bcrypt.compareSync(password, user.password)) {
        req.flash('message', 'Senha incorreta');
        return res.redirect('/login');
      }

      req.user = user;
      next();
    } catch (error) {
      console.error('Middleware auth error:', error);
      req.flash('message', 'Erro no servidor');
      res.redirect('/login');
    }
  },

  validateRegister: async (req, res, next) => {
    const { name, email, password, confirmpassword } = req.body;
    
    if (password !== confirmpassword) {
      req.flash('message', 'As senhas não conferem');
      return res.redirect('/register');
    }

    try {
      const userExists = await User.findOne({ where: { email } });
      if (userExists) {
        req.flash('message', 'Email já cadastrado');
        return res.redirect('/register');
      }
      next();
    } catch (error) {
      console.error('Middleware register error:', error);
      req.flash('message', 'Erro no servidor');
      res.redirect('/register');
    }
  }
}