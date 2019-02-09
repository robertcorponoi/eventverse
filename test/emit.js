'use strict'

const chai = require('chai');
const sinon = require('sinon');
const Eventverse = require('../index');

let person;

describe('Emitting events', () => {

	beforeEach(() => {

		person = new Eventverse();

	});

	afterEach(() => {

		person = null;

	});

	it('should call the listener functions for the event when the event is emitted', () => {

		const sayHelloWorld = () => {

			return 'Hello World';

		}

		const sayHolaWorld = () => {

			return 'Hola World!';

		}

		const spy1 = sinon.spy(sayHelloWorld);
		const spy2 = sinon.spy(sayHolaWorld);

		person.on('hello', spy1);
		person.on('hello', spy2);

		person.emit('hello');

		chai.expect(spy1.calledOnce).to.be.true && chai.expect(spy2.calledOnce).to.be.true;

	});

	it('should call the listener functions for the event the appropriate number of times when the event is emitted', () => {

		let helloWorldCalls = 0;
		let holaWorldCalls = 0;

		const sayHelloWorld = () => {

			helloWorldCalls++;

		}

		const sayHolaWorld = () => {

			holaWorldCalls++;

		}

		person.on('hello', sayHelloWorld);
		person.once('hello', sayHolaWorld);

		person.emit('hello');
		person.emit('hello');
		person.emit('hello');

		chai.expect(helloWorldCalls).to.equal(3) && chai.expect(holaWorldCalls).to.equal(1);

	});

	it('should call the listener functions with the supplied parameters', () => {

		let res1;
		let res2;

		const sayHelloWorld = (name) => {

			res1 = name;

		}

		const sayHolaWorld = (name, age, address, nickname) => {

			res2 = `${name} ${age} ${address} ${nickname}`;

		}

		person.on('hello', sayHelloWorld);
		person.on('hello', sayHolaWorld, true);

		person.emit('hello', 'Bill Gates', 50, '1 Microsoft Way', 'Billy');

		chai.expect(res1).to.equal('Bill Gates') && chai.expect(res2).to.equal('Bill Gates 50 1 Microsoft Way Billy');

	});

	it('should call the listener functions with a different context', () => {

		let result;

		function helloWorld() {

			result = this.hello;

		}

		const that = { hello: 'Bonjour World!' };

		person.on('hello', helloWorld, that);

		person.emit('hello');

		chai.expect(result).to.equal('Bonjour World!');

	});

});