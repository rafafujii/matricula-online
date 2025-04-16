import React, { useState } from 'react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import './index.css';

export default function MatriculaForm() {
  const [form, setForm] = useState({});

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({
      ...form,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const generatePDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(12);
    doc.text('Formulário de Matrícula - Escola Municipal', 10, 10);

    const data = Object.entries(form).map(([key, value]) => [key, String(value)]);
    doc.autoTable({ head: [['Campo', 'Valor']], body: data, startY: 20 });

    doc.save('formulario_matricula.pdf');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (form.medicamentoContinuo === 'sim' && !form.quaisMedicamentos) {
      alert('Por favor, informe quais medicamentos são utilizados.');
      return;
    }
    if (form.alergico === 'sim' && !form.alergias) {
      alert('Por favor, informe quais alergias o estudante possui.');
      return;
    }
    if (form.restricaoFisica === 'sim' && !form.tipoRestricao) {
      alert('Por favor, informe o tipo de restrição física.');
      return;
    }

    generatePDF();
    alert('Formulário enviado com sucesso! PDF gerado.');
  };

  return (
    <div className="container">
      <h1>Solicitação de Renovação de Matrícula</h1>
      <form onSubmit={handleSubmit}>
        <h2>Informações Pessoais</h2>
        <label>Nome do Responsável<input name="responsavel" onChange={handleChange} required /></label>
        <label>Nome do Aluno<input name="aluno" onChange={handleChange} required /></label>
        <label>Telefone<input name="telefone" onChange={handleChange} required /></label>
        <label>Período de Aula Desejado<select name="periodo" onChange={handleChange} required>
          <option value="">Selecione</option><option value="manha">Manhã</option><option value="tarde">Tarde</option>
        </select></label>
        <label>Participa do Bolsa Família?<select name="bolsaFamilia" onChange={handleChange} required>
          <option value="">Selecione</option><option value="sim">Sim</option><option value="nao">Não</option>
        </select></label>
        <label>Utiliza transporte escolar?<select name="transporte" onChange={handleChange} required>
          <option value="">Selecione</option><option value="nao">Não</option><option value="sim">Sim</option>
        </select></label>
        <label>Cor/Raça<select name="corRaca" onChange={handleChange} required>
          <option value="">Selecione</option><option value="amarela">Amarela</option><option value="branca">Branca</option><option value="parda">Parda</option><option value="indigena">Indígena</option><option value="preta">Preta</option>
        </select></label>
        <label>Tipo de Moradia<select name="tipoMoradia" onChange={handleChange} required>
          <option value="">Selecione</option><option value="casa">Casa</option><option value="apartamento">Apartamento</option><option value="comodo">Cômodo</option><option value="coletiva">Coletiva</option>
        </select></label>
        <label>Tipo de Construção<select name="tipoConstrucao" onChange={handleChange} required>
          <option value="">Selecione</option><option value="alvenaria">Alvenaria</option><option value="madeira">Madeira</option><option value="mista">Mista</option>
        </select></label>
        <label>Residem com o aluno<input name="residemCom" onChange={handleChange} /></label>
        <label>Nº de pessoas na residência<input name="numPessoas" type="number" onChange={handleChange} required /></label>

        <h2>Ficha de Saúde</h2>
        <label>Possui plano de saúde?<select name="planoSaude" onChange={handleChange} required>
          <option value="">Selecione</option><option value="nao">Não</option><option value="sim">Sim</option>
        </select></label>
        <label>Nome do plano<input name="nomePlano" onChange={handleChange} /></label>
        <label>Uso de medicamento contínuo?<select name="medicamentoContinuo" onChange={handleChange} required>
          <option value="">Selecione</option><option value="nao">Não</option><option value="sim">Sim</option>
        </select></label>
        <label>Quais?<textarea name="quaisMedicamentos" onChange={handleChange} /></label>
        <label>Vacinação em dia?<select name="vacinacao" onChange={handleChange} required>
          <option value="">Selecione</option><option value="sim">Sim</option><option value="nao">Não</option>
        </select></label>
        <label>É alérgico?<select name="alergico" onChange={handleChange} required>
          <option value="">Selecione</option><option value="nao">Não</option><option value="sim">Sim</option>
        </select></label>
        <label>Quais?<textarea name="alergias" onChange={handleChange} /></label>
        <label>Doenças crônicas<textarea name="doencasCronicas" onChange={handleChange} /></label>
        <label>Deficiências<textarea name="deficiencias" onChange={handleChange} /></label>
        <label>Restrição física?<select name="restricaoFisica" onChange={handleChange} required>
          <option value="">Selecione</option><option value="nao">Não</option><option value="sim">Sim</option>
        </select></label>
        <label>Tipo de restrição<textarea name="tipoRestricao" onChange={handleChange} /></label>

        <button type="submit">Enviar</button>
      </form>
    </div>
  );
}
