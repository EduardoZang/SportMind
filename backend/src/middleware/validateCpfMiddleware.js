function isValidCPF(cpf) {
  if (!cpf) return false;
  const cleaned = cpf.replace(/\D/g, '');
  if (cleaned.length !== 11 || /^(\d)\1{10}$/.test(cleaned)) return false;

  const calc = (digits) => {
    let sum = 0;
    for (let i = 0; i < digits - 1; i++) {
      sum += parseInt(cleaned.charAt(i), 10) * (digits - i);
    }
    const rev = 11 - (sum % 11);
    return rev > 9 ? 0 : rev;
  };

  return (
    calc(10) === parseInt(cleaned.charAt(9), 10) &&
    calc(11) === parseInt(cleaned.charAt(10), 10)
  );
}

function validateCpf(req, res, next) {
  const { cpf } = req.body;
  if (!isValidCPF(cpf)) {
    return res.status(400).json({ error: 'CPF inválido' });
  }
  next();
}

module.exports = validateCpf;