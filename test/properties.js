'use strict'

const chai = require('chai');
const Eventverse = require('../index');

let person;

describe('Getting listener count', () => {

	beforeEach(() => person = new Eventverse());

	afterEach(() => person = null);

	it('should get the amount of listeners for an event', () => {

		const sayHello = () => console.log('Hello World!');
		const sayHola = () => console.log('Hola World!');
		const sayBonjour = () => console.log('Bonjour World!');

		person.addListener('hello', sayHello);
		person.addListener('hello', sayHola);
		person.addListener('hello', sayBonjour);

		const listeners = person.listenerCount('hello');

		chai.expect(listeners).to.equal(3);

	});

});