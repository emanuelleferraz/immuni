const { User } = require('../models');
const bcrypt = require('bcryptjs');
const authMiddleware = require('../middlewares/authMiddleware');

module.exports = class AuthController {
  static login(req, res) {
    res.render('auth/login');
  }

  static async loginPost(req, res) {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ where: { email } });

      if (!user) {
        req.flash('message', 'Usuário não encontrado');
        return res.render('auth/login');
      }

      if (!bcrypt.compareSync(password, user.password)) {
        req.flash('message', 'Senha incorreta');
        return res.render('auth/login');
      }

      req.session.userid = user.id;
      req.flash('message', 'Login realizado com sucesso!');

      req.session.save(() => {
        res.redirect('/dashboard');
      });
    } catch (error) {
      console.error('Login error:', error);
      req.flash('message', 'Erro no servidor');
      res.redirect('/login');
    }
  }

  static register(req, res) {
    res.render('auth/register');
  }

  static async registerPost(req, res) {
    const { name, email, password, confirmpassword } = req.body;

    if (password !== confirmpassword) {
      req.flash('message', 'As senhas não conferem');
      return res.render('auth/register');
    }

    try {
      const salt = bcrypt.genSaltSync(10);
      const hashedPassword = bcrypt.hashSync(password, salt);

      const user = await User.create({
        name,
        email,
        password: hashedPassword
      });

      req.session.userid = user.id;
      req.flash('message', 'Cadastro realizado com sucesso!');

      req.session.save(() => {
        res.redirect('/dashboard');
      });
    } catch (error) {
      console.error('Register error:', error);
      req.flash('message', 'Erro ao cadastrar usuário');
      res.redirect('/register');
    }
  }

  static logout(req, res) {
    req.session.destroy();
    res.redirect('/login');
  }
}