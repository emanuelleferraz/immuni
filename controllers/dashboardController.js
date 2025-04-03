const User = require('../models/User');
const Vaccine = require('../models/Vaccine');
const RecordVaccine = require('../models/RecordVaccine');

class DashboardController {
  static async showDashboard(req, res) {
    try {
      const userId = req.session.userId;

      // Busca o usuário e seus registros de vacinas
      const user = await User.findByPk(userId);
      
      if (!user) {
        req.flash('error_msg', 'Usuário não encontrado!');
        return res.redirect('/login');
      }

      // Busca todas as vacinas registradas pelo usuário
      const userVaccines = await RecordVaccine.findAll({
        where: { usuario_id: userId },
        include: Vaccine,
        order: [['data_aplicacao', 'DESC']]
      });

      // Busca todas as vacinas disponíveis no sistema
      const allVaccines = await Vaccine.findAll();

      // Filtra as vacinas não tomadas
      const takenVaccineIds = userVaccines.map(v => v.vacina_id);
      const notTakenVaccines = allVaccines.filter(v => !takenVaccineIds.includes(v.id));

      // Calcula estatísticas para os gráficos
      const totalVaccines = allVaccines.length;
      const takenCount = userVaccines.length;
      const notTakenCount = totalVaccines - takenCount;
      const progress = totalVaccines > 0 
        ? Math.round((takenCount / totalVaccines) * 100)
        : 0;

      res.render('dashboard/index', {
        title: 'Dashboard',
        user,
        userVaccines,
        notTakenVaccines,
        takenCount,
        notTakenCount,
        percentageTaken: progress, 
        hasRecords: userVaccines.length > 0,
        layout: 'main'
      });

    } catch (error) {
      console.error('Erro ao carregar dashboard:', error);
      req.flash('error_msg', 'Erro ao carregar informações!');
      return res.redirect('/');
    }
  }
}

module.exports = DashboardController;