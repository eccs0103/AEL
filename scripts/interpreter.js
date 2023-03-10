try {
	//#region Initialize
	const formInterpreter = (/** @type {HTMLFormElement} */ (document.querySelector(`form#interpreter`)));
	const textareaInput = (/** @type {HTMLTextAreaElement} */ (document.querySelector(`textarea#input`)));
	const textareaOutput = (/** @type {HTMLTextAreaElement} */ (document.querySelector(`textarea#output`)));
	function launch() {
		if (formInterpreter.checkValidity()) {
			const tokens = Interpreter.tokenize(textareaInput.value);
			textareaOutput.value = tokens.map(token => token.toString()).join(`\n`);
		}
	}
	//#region Search by url
	const input = window.decodeURI(location.search).replace(/\?/, ``);
	const search = Object.assign({}, ...input.split(`&`).map((part) => {
		const [key, value] = part.split(`=`);
		return { [key]: value };
	}));
	const expression = Reflect.get(search, `expression`);
	if (expression) {
		textareaInput.value = expression;
		launch();
	}
	//#endregion
	const buttonRun = (/** @type {HTMLButtonElement} */ (document.querySelector(`button#run`)));
	buttonRun.addEventListener(`click`, (event) => {
		launch();
		window.history.pushState({}, ``, `${location.origin}${location.pathname}?expression=${window.encodeURI(textareaInput.value)}`);
	});
	window.addEventListener(`keydown`, (event) => {
		if (event.code == `Enter` && !event.shiftKey) {
			event.preventDefault();
			if (document.activeElement && document.activeElement.isSameNode(textareaInput)) {
				buttonRun.focus();
				buttonRun.click();
			} else {
				textareaInput.focus();
			}
		}
	});
	//#endregion
} catch (exception) {
	if (locked) {
		window.alert(exception instanceof Error ? exception.stack ?? `${exception.name}: ${exception.message}` : `Invalid exception type.`);
	} else console.log(exception);
}