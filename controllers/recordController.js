const RecordVaccine = require('../models/RecordVaccine')
const Vaccine = require('../models/Vaccine')

module.exports = class RecordController {
  static async createForm(req, res) {
    try {
      const vaccines = await Vaccine.findAll({
        attributes: ['id', 'nome'], 
        order: [['nome', 'ASC']]    
      });
      
      res.render('records/create', { 
        vaccines,
        pageTitle: 'Registrar Vacinação' 
      });
      
    } catch (error) {
      console.error('Record form error:', error);
      req.flash('message', 'Erro ao carregar formulário');
      res.redirect('/dashboard');
    }
}

  static async create(req, res) {
    try {
      await RecordVaccine.create({
        usuario_id: req.session.userId,
        vacina_id: req.body.vacina_id,
        data_aplicacao: req.body.data_aplicacao,
        dose: req.body.dose
      });
      
      req.flash('message', 'Vacina registrada com sucesso!');
      res.redirect('/dashboard');
    } catch (error) {
      console.error('Create record error:', error);
      req.flash('message', 'Erro ao registrar vacina');
      res.redirect('/registrar-vacina');
    }
  }

  static async editForm(req, res) {
    try {
      const record = await RecordVaccine.findByPk(req.params.id);
      const vaccines = await Vaccine.findAll();
      
      if (!record || record.usuario_id !== req.session.userId) {
        req.flash('message', 'Registro não encontrado');
        return res.redirect('/dashboard');
      }

      res.render('records/edit', { record, vaccines });
    } catch (error) {
      console.error('Edit form error:', error);
      req.flash('message', 'Erro ao carregar edição');
      res.redirect('/dashboard');
    }
  }

  static async update(req, res) {
    try {
      // Ajusta a data para evitar problemas de timezone
      const dataAplicacao = new Date(req.body.data_aplicacao);
      dataAplicacao.setDate(dataAplicacao.getDate() + 1); // Adiciona um dia para compensar
      
      await RecordVaccine.update({
        vacina_id: req.body.vacina_id,
        data_aplicacao: dataAplicacao, // Usa a data ajustada
        dose: req.body.dose
      }, {
        where: { 
          id: req.params.id,
          usuario_id: req.session.userId 
        }
      });
      
      req.flash('message', 'Registro atualizado com sucesso!');
      res.redirect('/dashboard');
    } catch (error) {
      console.error('Update error:', error);
      req.flash('message', 'Erro ao atualizar registro');
      res.redirect(`/editar-registro/${req.params.id}`);
    }
  }

  static async delete(req, res) {
    try {
      await RecordVaccine.destroy({ 
        where: { 
          id: req.params.id,
          usuario_id: req.session.userId 
        } 
      });
      
      req.flash('message', 'Registro removido com sucesso!');
      res.redirect('/dashboard');
    } catch (error) {
      console.error('Delete error:', error);
      req.flash('message', 'Erro ao remover registro');
      res.redirect('/dashboard');
    }
  }
}