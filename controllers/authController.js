const User  = require('../models/User');
const bcrypt = require('bcryptjs');
const authMiddleware = require('../middlewares/authMiddleware');

module.exports = class AuthController {
  static login(req, res) {
    res.render('auth/login', {
      title: 'Login',
      layout: 'layouts/main'
    });
  }

  static async loginPost(req, res) {
    const { email, password } = req.body;

    try {
      // Verifica se o usuário existe
      const user = await User.findOne({ where: { email } });

      if (!user) {
        req.flash('error_msg', 'Usuário não encontrado!');
        return res.redirect('/login');
      }

      // Verifica a senha
      const passwordMatch = bcrypt.compareSync(password, user.password);

      if (!passwordMatch) {
        req.flash('error_msg', 'Senha inválida!');
        return res.redirect('/login');
      }

      // Autentica o usuário e redireciona para a Dashboard
      req.session.userId = user.id;
      req.flash('success_msg', 'Login realizado com sucesso!');
      return res.redirect('/dashboard');

    } catch (error) {
      console.error('Erro no login:', error);
      req.flash('error_msg', 'Erro no servidor!');
      return res.redirect('/login');
    }
  }

  static register(req, res) {
    res.render('auth/register', {
      title: 'Cadastro',
      layout: 'layouts/main'
    });
  }

  static async registerPost(req, res) {
    const { name, email, password, confirmpassword } = req.body;

    try {
      // Validação de senha
      if (password !== confirmpassword) {
        req.flash('error_msg', 'As senhas não conferem!');
        return res.redirect('/register');
      }

      // Verifica se o e-mail já existe
      const checkIfUserExists = await User.findOne({ where: { email } });

      if (checkIfUserExists) {
        req.flash('error_msg', 'O e-mail já está em uso!');
        return res.redirect('/register');
      }

      // Criptografa a senha
      const salt = bcrypt.genSaltSync(10);
      const hashedPassword = bcrypt.hashSync(password, salt);

      // Cria o usuário
      const user = await User.create({
        name,
        email,
        password: hashedPassword
      });

      // Autentica e redireciona para a Dashboard
      req.session.userId = user.id;
      req.flash('success_msg', 'Cadastro realizado com sucesso!');
      return res.redirect('/dashboard');

    } catch (error) {
      console.error('Erro no cadastro:', error);
      req.flash('error_msg', 'Erro ao cadastrar usuário!');
      return res.redirect('/register');
    }
  }

  static logout(req, res) {
    req.session.destroy();
    res.redirect('/');
  }
}