//#region Token
/** @enum {String} */ const TokenType = {
	unknown: `UNKNOWN`,
	operator: `OPERATOR`,
	digit: `DIGIT`,
	bracket: `BRACKET`,
};
class Token {
	/**
	 * 
	 * @param {TokenType} type 
	 * @param {String} value 
	 */
	constructor(type, value) {
		this.#type = type;
		this.#value = value;
	}
	/** @type {TokenType} */ #type;
	/** @readonly */ get type() {
		return this.#type;
	}
	/** @type {String} */ #value;
	/** @readonly */ get value() {
		return this.#value;
	}
	/**
	 * 
	 * @returns 
	 */
	toString() {
		return `${this.#type}('${this.#value}')`;
	}
}
//#endregion
//#region Operation
/** @enum {String} */ const Operator = {
	plus: `+`,
	minus: `-`,
	multiply: `*`,
	divide: `/`,
};
class Operation {
	/**
	 * 
	 * @param {Operator} operator 
	 * @param {any} left 
	 * @param {any} right 
	 */
	constructor(operator, left, right) {
		this.#operator = operator;
		this.#left = left;
		this.#right = right;
	}
	/** @type {Operator} */ #operator;
	/** @readonly */ get operator() {
		return this.#operator;
	}
	/** @type {any} */ #left;
	/** @readonly */ get left() {
		return this.#left;
	}
	/** @type {any} */ #right;
	/** @readonly */ get right() {
		return this.#right;
	}
}
//#endregion
//#region Interpreter
class Interpreter {
	//#region tokenize()
	/**
	 * 
	 * @param {String} code 
	 */
	static tokenize(code) {
		const filters = new Map([
			[/[\+\-\*\/]/g, TokenType.operator],
			[/\d+(\.\d+)?/g, TokenType.digit],
			[/[\(\)]/g, TokenType.bracket],
		]);
		const results = [];
		for (const filter of filters) {
			for (let exec = null; exec = filter[0].exec(code);) {
				const match = exec[0];
				results.push({ index: exec.index, token: new Token(filter[1], match) });
			}
		}
		return results.sort((a, b) => a.index - b.index).map((value) => value.token);
	}
	//#endregion
	//#region parse()
	/**
	 * 
	 * @param {Array<Token>} tokens 
	 */
	static parse(tokens) {
		const current = tokens[0];
		if (current) {
			switch (current.type) {
				case TokenType.operator: {
					switch (current.value) {
						case Operator.plus:
						case Operator.minus: {
							return new Operation(current.value, null, Interpreter.parse(tokens.slice(1)));
						} break;
						default: throw new SyntaxError(`Only '+' and '-' operators can be at start of row.`);
					}
				} break;
				case TokenType.digit: {

				} break;
				case TokenType.bracket: {

				} break;
				default: throw new TypeError(`Invalid token type: ${current}.`);
			}
		} else return null;
	}
	//#endregion
	//#region evaluate()
	static evaluate(tree) {

	}
	//#endregion
}
//#endregion
//#region Metadata
const locked = true;
//#endregion