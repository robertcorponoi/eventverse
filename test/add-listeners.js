'use strict'

const chai = require('chai');
const Eventverse = require('../index');

let person;

describe('Adding listeners', () => {
	beforeEach(() => person = new Eventverse());

	afterEach(() => person = null);

	it('should add an event listener to a new event', () => {
		const sayHello = () => console.log('Hello World!');

		person.on('hello', sayHello);

		chai.expect(person.events.hello.length).to.equal(1) && chai.expect(typeof person.events.hello[0].fn).to.equal('function') && chai.expect(person.events.hello[0].once).to.be.false;
	});

	it('should add an event listener to an existing event', () => {
		const sayHello = () => console.log('Hello World!');
		const sayHola = () => console.log('Hola World!');

		person.on('hello', sayHello);
		person.on('hello', sayHola);

		chai.expect(person.events.hello.length).to.equal(2);
	});

	it('should add an event listener to a new event using the `on` method', () => {
		const sayHello = () => console.log('Hello World!');

		person.on('hello', sayHello)

		chai.expect(person.events.hello.length).to.equal(1) && chai.expect(typeof person.events.hello[0].fn).to.equal('function') && chai.expect(person.events.hello[0].once).to.be.false;
	});

	it('should add an event listener to an existing event using the `on` method', () => {
		const sayHello = () => console.log('Hello World!');
		const sayHola = () => console.log('Hola World!');

		person.on('hello', sayHello);
		person.on('hello', sayHola);

		chai.expect(person.events.hello.length).to.equal(2);
	});

	it('should add an event listener to a new event to run once using the `once` method', () => {
		const sayHello = () => console.log('Hello World!');

		person.once('hello', sayHello);

		chai.expect(person.events.hello.length).to.equal(1) && chai.expect(typeof person.events.hello[0].fn).to.equal('function') && chai.expect(person.events.hello[0].once).to.be.true;
	});

	it('should add an event listener to an existing event to run once using the `once` method', () => {
		const sayHello = () => console.log('Hello World!');
		const sayHola = () => console.log('Hola World!');

		person.once('hello', sayHello);
		person.once('hello', sayHola);

		chai.expect(person.events.hello.length).to.equal(2);
	});

	it('should not add an event listener to an event because it exceeds the max amount of listeners', () => {
		const sayHello = () => console.log('Hello World!');

		for (let i = 0; i < 15; ++i) person.on('hello', sayHello);

		chai.expect(person.events.hello.length).to.equal(10);
	});

	it('should add an event listener that only has 2 uses', () => {
		const sayHello = () => console.log('Hello World!');

		person.on('hello', sayHello, 2);

		person.emit('hello');
		person.emit('hello');

		chai.expect(person.events.hello.length).to.equal(0);
	});
});