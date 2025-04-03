const { Vaccine } = require('../models');

module.exports = class VaccineController {
  static async listAll(req, res) {
    try {
      const vaccines = await Vaccine.findAll();
      res.render('vaccines/list', { vaccines });
    } catch (error) {
      console.error('List vaccines error:', error);
      req.flash('message', 'Erro ao listar vacinas');
      res.redirect('/dashboard');
    }
  }

  static async showDetails(req, res) {
    try {
      const vaccine = await Vaccine.findByPk(req.params.id);
      
      if (!vaccine) {
        req.flash('message', 'Vacina não encontrada');
        return res.redirect('/vacinas');
      }

      res.render('vaccines/details', { vaccine });
    } catch (error) {
      console.error('Vaccine details error:', error);
      req.flash('message', 'Erro ao carregar detalhes');
      res.redirect('/vacinas');
    }
  }
}