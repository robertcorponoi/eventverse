'use strict'

const chai = require('chai');
const Eventverse = require('../index');

let person;

describe('Removing listeners', () => {
	beforeEach(() => person = new Eventverse());

	afterEach(() => person = null);

	it('should remove a listener from an event', () => {
		const sayHello = () => console.log('Hello World!');
		const sayHola = () => console.log('Hola World!');
		const sayBonjour = () => console.log('Bonjour World!');

		person.on('hello', sayHello);
		person.on('hello', sayHola);
		person.on('hello', sayBonjour);

		person.removeListener('hello', sayHola);

		chai.expect(person.events.hello.length).to.equal(2);
	});

	it('should return undefined because the event doesnt exist', () => {
		const sayHello = () => console.log('Hello World!');
		const sayHola = () => console.log('Hola World!');
		const sayBonjour = () => console.log('Bonjour World!');

		person.on('hello', sayHello);
		person.on('hello', sayHola);
		person.on('hello', sayBonjour);

		const success = person.removeListener('bye', sayHola);

		chai.expect(success).to.be.undefined;
	});

	it('should remove all listener from an event', () => {
		const sayHello = () => console.log('Hello World!');
		const sayHola = () => console.log('Hola World!');
		const sayBonjour = () => console.log('Bonjour World!');

		person.on('hello', sayHello);
		person.on('hello', sayHola);
		person.on('hello', sayBonjour);

		person.removeAllListeners('hello');

		chai.expect(person.events.hello.length).to.equal(0);
	});
});
