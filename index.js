// CPF 1 - 901.004.990-66 / CPF 2 - 852.201.760-30
/*

9x 0x 1x 0x 0x 4x 9x 9x 0x  
10 9  8  7  6  5  4  3  2
90 0  8  0  0  20 36 27 0 = 181

11 - (181 % 11) = 6 (primeiro digito)
se o digito for maior que 9, cosideramos 0

9x 0x 1x 0x 0x 4x 9x 9x 0x 6x 
11 10 9  8  7  6  5  4  3  2
99 0  9  0  0  24 45 36 0  12 = 225

11 - (225 % 11) = 6 (segundo digito)
se o digito for maior que 9, cosideramos 0

*/

function ValidaCpf(cpfEnviado) {
	Object.defineProperty(this, "cpfLimpo", {
		enumerable: true,

		get: function () {
			return cpfEnviado.replace(/\D+/g, "");
		},
	});
}

ValidaCpf.prototype.valida = function () {
	const cpfParcial = this.cpfLimpo.slice(0, -2);

	const digito1 = this.criaDigito(cpfParcial);

	const digito2 = this.criaDigito(cpfParcial + digito1);

	const novoCpf = cpfParcial + digito1 + digito2;

	if (typeof this.cpfLimpo === "undefined") return false;

	if (this.cpfLimpo.length !== 11) return false;

	if (this.sequencia() === true) return false;

	return novoCpf === this.cpfLimpo;
};

ValidaCpf.prototype.criaDigito = function (cpfParcial) {
	const cpfArray = Array.from(cpfParcial);

	let regressivo = cpfArray.length + 1;

	const total = cpfArray.reduce((ac, val) => {
		ac += regressivo * Number(val);

		regressivo--;

		return ac;
	}, 0);

	let digito = 11 - (total % 11);

	return digito > 9 ? "0" : String(digito);
};

ValidaCpf.prototype.sequencia = function () {
	const sequencia = this.cpfLimpo[0].repeat(this.cpfLimpo.length);

	return sequencia === this.cpfLimpo;
};

const cpf = new ValidaCpf("901.004.990-66");

const verificacao = cpf.valida() ? "CPF válido" : "CPF inválido";

console.log(verificacao);
