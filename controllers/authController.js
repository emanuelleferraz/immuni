const User = require('../models/User');
const bcrypt = require('bcryptjs');

module.exports = class AuthController {
  static login(req, res) {
    res.render('auth/login', {
      title: 'Login',
      layout: 'main'
    });
  }

  static async loginPost(req, res) {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ where: { email } });
        
        if (!user) {
            req.flash('error_msg', 'Usuário não encontrado');
            return res.render('auth/login', {
                title: 'Login',
                layout: 'main',
                messages: req.flash(),
                values: { email }
            });
        }

        const passwordMatch = bcrypt.compareSync(password, user.password);
        
        if (!passwordMatch) {
            req.flash('error_msg', 'Senha incorreta');
            return res.render('auth/login', {
                title: 'Login',
                layout: 'main',
                messages: req.flash(),
                values: { email }
            });
        }

        // Cria a sessão de forma segura
        req.session.regenerate(err => {
            if (err) {
                console.error('Erro ao regenerar sessão:', err);
                return res.render('auth/login', {
                    title: 'Login',
                    layout: 'main',
                    messages: { error_msg: 'Erro durante o login' }
                });
            }

            req.session.userId = user.id;
            req.session.save(err => {
                if (err) {
                    console.error('Erro ao salvar sessão:', err);
                    return res.render('auth/login', {
                        title: 'Login',
                        layout: 'main',
                        messages: { error_msg: 'Erro durante o login' }
                    });
                }
                
                req.flash('success_msg', 'Login realizado com sucesso!');
                return res.redirect('/dashboard');
            });
        });

    } catch (error) {
        console.error('Erro no login:', error);
        req.flash('error_msg', 'Erro no servidor');
        return res.render('auth/login', {
            title: 'Login',
            layout: 'main',
            messages: req.flash()
        });
    }
}

  static register(req, res) {
    res.render('auth/register', {
      title: 'Cadastro',
      layout: 'main'
    });
  }

  static async registerPost(req, res) {
    const { name, data_nascimento, email, password } = req.body;

    try {
      // Criptografa a senha
      const salt = bcrypt.genSaltSync(10);
      const hashedPassword = bcrypt.hashSync(password, salt);

      // Cria o usuário 
      const user = await User.create({
        name,
        data_nascimento: data_nascimento || null,
        email,
        password: hashedPassword
      });

      // Garante que a sessão está salva antes do redirecionamento
      req.session.userId = user.id;
      req.session.save(err => {
        if (err) {
          console.error('Erro ao salvar sessão:', err);
          req.flash('error_msg', 'Erro durante o cadastro');
          return res.redirect('/register');
        }
        
        req.flash('success_msg', 'Cadastro realizado com sucesso!');
        return res.render('dashboard/index', {
          title: 'Dashboard',
          user: user,
          layout: 'main'
        });
      });

    } catch (error) {
      console.error('Erro no cadastro:', error);
      req.flash('error_msg', 'Erro ao cadastrar usuário!');
      return res.redirect('/register');
    }
  }

  static logout(req, res) {
    req.session.destroy(err => {
      if (err) {
        console.error('Erro ao destruir sessão:', err);
        return res.redirect('/dashboard');
      }
      res.redirect('/');
    });
  }
}