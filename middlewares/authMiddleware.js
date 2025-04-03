const User = require('../models/User');
const bcrypt = require('bcryptjs');

module.exports = {
  checkAuthenticated: (req, res, next) => {
    if (req.session.userId) {  
      return next();
    }
    req.flash('error_msg', 'Por favor, faça login para acessar esta página!');
    return res.render('auth/login', { 
      title: 'Login',
      layout: 'main',
      messages: req.flash() 
    });
  },

  checkNotAuthenticated: (req, res, next) => {
    if (!req.session.userId) {  
      return next();
    }
    res.redirect('/dashboard');
  },

  validateLogin: async (req, res, next) => {
    const { email, password } = req.body;
    
    if (!email || !password) {
      req.flash('error_msg', 'Por favor, preencha todos os campos!');
      return res.render('auth/login', {
        title: 'Login',
        layout: 'main',
        messages: req.flash(),
        values: req.body // Mantém os valores preenchidos
      });
    }

    try {
      const user = await User.findOne({ where: { email } });
      
      if (!user) {
        req.flash('error_msg', 'Usuário não encontrado!');
        return res.render('auth/login', {
          title: 'Login',
          layout: 'main',
          messages: req.flash(),
          values: req.body
        });
      }

      if (!bcrypt.compareSync(password, user.password)) {
        req.flash('error_msg', 'Senha incorreta!');
        return res.render('auth/login', {
          title: 'Login',
          layout: 'main',
          messages: req.flash(),
          values: req.body
        });
      }

      req.user = user;
      next();
    } catch (error) {
      console.error('Middleware auth error:', error);
      req.flash('error_msg', 'Erro no servidor');
      res.render('auth/login', {
        title: 'Login',
        layout: 'main',
        messages: req.flash()
      });
    }
  },

  validateRegister: async (req, res, next) => {
    const { name, email, password, confirmpassword, data_nascimento } = req.body;
    
    if (!name || !email || !password || !confirmpassword) {
      req.flash('error_msg', 'Todos os campos são obrigatórios!');
      return res.render('auth/register', {
        title: 'Cadastro',
        layout: 'main',
        messages: req.flash(),
        values: req.body
      });
    }

    if (password !== confirmpassword) {
      req.flash('error_msg', 'As senhas não conferem!');
      return res.render('auth/register', {
        title: 'Cadastro',
        layout: 'main',
        messages: req.flash(),
        values: req.body
      });
    }

    if (password.length < 6) {
      req.flash('error_msg', 'A senha deve ter pelo menos 6 caracteres!');
      return res.render('auth/register', {
        title: 'Cadastro',
        layout: 'main',
        messages: req.flash(),
        values: req.body
      });
    }

    try {
      const userExists = await User.findOne({ where: { email } });
      if (userExists) {
        req.flash('error_msg', 'Email já cadastrado!');
        return res.render('auth/register', {
          title: 'Cadastro',
          layout: 'main',
          messages: req.flash(),
          values: req.body
        });
      }
      next();
    } catch (error) {
      console.error('Middleware register error:', error);
      req.flash('error_msg', 'Erro no servidor');
      res.render('auth/register', {
        title: 'Cadastro',
        layout: 'main',
        messages: req.flash()
      });
    }
  }
};