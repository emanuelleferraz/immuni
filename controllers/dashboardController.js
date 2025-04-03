const User = require('../models/User')
const Vaccine = require('../models/Vaccine')
const RecordVaccine = require('../models/RecordVaccine')

class DashboardController {
  static async showDashboard(req, res) {
    try {
      const userId = req.session.userId;

      // Busca o usuário com seus registros de vacinas
      const user = await User.findByPk(userId, {
        include: {
          model: RecordVaccine,
          include: [Vaccine]
        }
      });

      if (!user) {
        req.flash('error_msg', 'Usuário não encontrado!');
        return res.redirect('/login');
      }

      // Calcula o progresso
      const allVaccines = await Vaccine.findAll();
      const progress = allVaccines.length > 0 
        ? Math.round((user.RecordVaccines.length / allVaccines.length) * 100)
        : 0;

      res.render('dashboard/index', {
        title: 'Dashboard',
        user,
        records: user.RecordVaccines,
        progress,
        layout: 'main'
      });

    } catch (error) {
      console.error('Erro ao carregar dashboard:', error);
      req.flash('error_msg', 'Erro ao carregar informações!');
      return res.redirect('/');
    }
  }
}

module.exports = DashboardController