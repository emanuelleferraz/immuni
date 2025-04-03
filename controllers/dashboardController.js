const User = require('../models/User')
const Vaccine = require('../models/Vaccine')
const RecordVaccine = require('../models/RecordVaccine')

module.exports = class DashboardController {
  static async showDashboard(req, res) {
    try {
      const userId = req.session.userid;
      const user = await User.findByPk(userId, {
        include: {
          model: RecordVaccine,
          include: [Vaccine]
        }
      });

      if (!user) {
        req.flash('message', 'Usuário não encontrado');
        return res.redirect('/login');
      }

      res.render('dashboard/index', { user });
    } catch (error) {
      console.error('Dashboard error:', error);
      req.flash('message', 'Erro ao carregar dashboard');
      res.redirect('/login');
    }
  }

  static async showProgress(req, res) {
    try {
      const userId = req.session.userid;
      // Lógica para calcular progresso - REVISÃO
      res.render('dashboard/progress');
    } catch (error) {
      console.error('Progress error:', error);
      req.flash('message', 'Erro ao carregar progresso');
      res.redirect('/dashboard');
    }
  }
}